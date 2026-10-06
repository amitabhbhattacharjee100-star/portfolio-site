const express = require('express');
const bcrypt = require('bcryptjs');
const { generateToken, authenticateToken, requireAdmin, revokeToken } = require('../middleware/auth');
const { findUserByEmail, createUser, getUsers } = require('../data/repository');
const { isConfigured, supabaseRequest, getProfile } = require('../config/supabase');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { name, password } = req.body;
  const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : '';

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email and password are required.' });
  }
  if (typeof name !== 'string' || typeof password !== 'string' || password.length < 8 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: 'Use a valid email and a password with at least 8 characters.' });
  }
  if (isConfigured()) {
    const session = await supabaseRequest('/auth/v1/signup', 'POST', { email, password, data: { name } });
    if (!session.access_token) {
      return res.status(201).json({ confirmationRequired: true, message: 'Account created. Check your email to confirm it, then sign in.' });
    }
    const user = await getProfile(session.user, session.access_token);
    return res.status(201).json({ user, token: session.access_token, message: 'Account created.' });
  }

  if (await findUserByEmail(email)) {
    return res.status(400).json({ message: 'This email is already registered.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await createUser({
    name,
    email,
    password: hashedPassword,
    role: 'user',
  });

  const token = generateToken(user);
  res.status(201).json({
    message: 'User registered successfully.',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  });
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }
  if (isConfigured()) {
    const session = await supabaseRequest('/auth/v1/token?grant_type=password', 'POST', { email, password });
    const user = await getProfile(session.user, session.access_token);
    return res.json({ user, token: session.access_token, message: 'Signed in successfully.' });
  }

  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  const token = generateToken(user);
  res.json({
    message: 'Signed in successfully.',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  });
});

router.get('/me', authenticateToken, async (req, res) => {
  res.json({
    user: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    },
  });
});

router.get('/signout', authenticateToken, async (req, res) => {
  await revokeToken(req);
  return res.json({ message: 'Signed out successfully.' });
});

router.get('/users', authenticateToken, requireAdmin, async (req, res) => {
  if (isConfigured()) return res.json([req.user]);
  const safeUsers = (await getUsers()).map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  }));

  res.json(safeUsers);
});

module.exports = router;


