const jwt = require('jsonwebtoken');
const { randomUUID, createHash } = require('crypto');
const { findUserById } = require('../data/repository');
const { isConfigured, supabaseRequest, getProfile } = require('../config/supabase');

const JWT_SECRET = process.env.JWT_SECRET || 'local-portfolio-test-secret';
const revokedTokens = new Map();
const tokenHash = (token) => createHash('sha256').update(token).digest('hex');

function generateToken(user) {
  return jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d', jwtid: randomUUID() });
}

async function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Please sign in first.' });
  try {
    if (isConfigured()) {
      const authUser = await supabaseRequest('/auth/v1/user', 'GET', null, token);
      const hash = tokenHash(token);
      const revoked = await supabaseRequest(`/rest/v1/assignment3_revoked_sessions?token_hash=eq.${hash}&select=token_hash`, 'GET', null, token);
      if (revoked.length) return res.status(401).json({ message: 'This session has signed out.' });
      req.user = await getProfile(authUser, token);
      req.session = JSON.parse(Buffer.from(token.split('.')[1], 'base64url').toString());
    } else {
      const decoded = jwt.verify(token, JWT_SECRET);
      for (const [id, expiry] of revokedTokens) {
        if (expiry <= Date.now() / 1000) revokedTokens.delete(id);
      }
      if (revokedTokens.has(decoded.jti)) return res.status(401).json({ message: 'This session has signed out.' });
      req.user = await findUserById(decoded.id);
      req.session = decoded;
    }
    if (!req.user) return res.status(401).json({ message: 'Account not found.' });
    req.accessToken = token;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Please sign in again. Your session is invalid or expired.' });
  }
}

function optionalAuthentication(req, res, next) {
  if (!req.headers.authorization) return next();
  return authenticateToken(req, res, next);
}

function requireAdmin(req, res, next) {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Admin access required.' });
  next();
}

async function revokeToken(req) {
  if (isConfigured()) {
    await supabaseRequest('/rest/v1/assignment3_revoked_sessions', 'POST', {
      token_hash: tokenHash(req.accessToken),
      owner_id: req.user.id,
      expires_at: new Date(req.session.exp * 1000).toISOString(),
    }, req.accessToken);
    await supabaseRequest('/auth/v1/logout?scope=local', 'POST', null, req.accessToken);
  } else {
    revokedTokens.set(req.session.jti, req.session.exp);
  }
}

module.exports = { generateToken, authenticateToken, optionalAuthentication, requireAdmin, revokeToken };
