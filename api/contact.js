import { MongoClient } from 'mongodb';

const MAX_MESSAGE_LENGTH = 5000;
let cachedClientPromise;

function getMongoClient() {
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is not configured');
  if (!cachedClientPromise) {
    const client = new MongoClient(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 8000 });
    cachedClientPromise = client.connect().catch((error) => {
      cachedClientPromise = undefined;
      throw error;
    });
  }
  return cachedClientPromise;
}

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

  const databaseName = process.env.MONGODB_DB;
  if (!process.env.MONGODB_URI || !databaseName) {
    return res.status(503).json({ error: 'The contact service is not configured yet. Please try again later.' });
  }

  try {
    const client = await getMongoClient();
    await client.db(databaseName).collection('contactMessages').insertOne({
      firstName, lastName, contactNumber, email, message,
      createdAt: new Date(),
      source: 'portfolio-contact-form',
    });
    return res.status(201).json({ ok: true, message: 'Message saved successfully.' });
  } catch (error) {
    console.error('Contact form database write failed:', error.message);
    return res.status(500).json({ error: 'We could not save your message right now. Please try again later.' });
  }
}
