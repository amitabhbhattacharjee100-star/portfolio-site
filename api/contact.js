const MAX_MESSAGE_LENGTH = 5000;

function cleanText(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const firstName = cleanText(req.body?.firstName, 80);
  const lastName = cleanText(req.body?.lastName, 80);
  const contactNumber = cleanText(req.body?.contactNumber, 30);
  const email = cleanText(req.body?.email, 254).toLowerCase();
  const message = cleanText(req.body?.message, MAX_MESSAGE_LENGTH);

  if (!firstName || !lastName || !contactNumber || !email || !message) {
    return res.status(400).json({ error: 'Please complete every field.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }
  if (message.length < 5) return res.status(400).json({ error: 'Please enter a longer message.' });

  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/+$/, '');
  const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!supabaseUrl || !publishableKey) {
    return res.status(503).json({ error: 'The contact service is not configured yet. Please try again later.' });
  }

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/assignment4_contact_messages`, {
      method: 'POST',
      headers: {
        apikey: publishableKey,
        Authorization: `Bearer ${publishableKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        contact_number: contactNumber,
        email,
        message,
        source: 'portfolio-contact-form',
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      console.error('Contact form Supabase write failed with status:', response.status);
      return res.status(502).json({ error: 'We could not save your message right now. Please try again later.' });
    }

    return res.status(201).json({ ok: true, message: 'Message saved successfully.' });
  } catch (error) {
    console.error('Contact form Supabase request failed:', error.message);
    return res.status(502).json({ error: 'We could not save your message right now. Please try again later.' });
  }
}
