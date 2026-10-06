function isConfigured() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_PUBLISHABLE_KEY);
}

async function supabaseRequest(path, method = 'GET', body, token) {
  if (!isConfigured()) throw new Error('Supabase is not configured.');
  const response = await fetch(`${process.env.SUPABASE_URL}${path}`, {
    method,
    headers: {
      apikey: process.env.SUPABASE_PUBLISHABLE_KEY,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
    signal: AbortSignal.timeout(15000),
  });
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  if (!response.ok) {
    const error = new Error(data?.msg || data?.message || data?.error_description || 'Unable to save or load the record.');
    error.status = data?.code === '23505' ? 409 : response.status;
    throw error;
  }
  return data;
}

async function getProfile(authUser, token) {
  const path = `/rest/v1/assignment3_profiles?id=eq.${authUser.id}&select=*`;
  const profiles = await supabaseRequest(path, 'GET', null, token);
  if (profiles.length) return profiles[0];
  const profile = {
    id: authUser.id,
    email: authUser.email,
    name: authUser.user_metadata?.name || authUser.email,
    role: 'user',
  };
  const created = await supabaseRequest('/rest/v1/assignment3_profiles', 'POST', profile, token);
  return created[0];
}

module.exports = { isConfigured, supabaseRequest, getProfile };
