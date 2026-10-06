const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const { isConfigured, supabaseRequest } = require('./config/supabase');
const authRoutes = require('./routes/auth');
const portfolioRoutes = require('./routes/portfolio');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let initialization;
function initializeDatabase() {
  if (!initialization) {
    initialization = (isConfigured()
      ? supabaseRequest('/rest/v1/assignment3_projects?select=id&limit=1')
      : Promise.resolve())
      .catch((error) => {
        initialization = null;
        throw error;
      });
  }
  return initialization;
}

app.use('/api', async (req, res, next) => {
  if (!process.env.VERCEL) return next();
  try {
    if (!isConfigured()) throw new Error('Supabase configuration is required for deployment.');
    await initializeDatabase();
    next();
  } catch (error) {
    console.error('API initialization failed:', error.message);
    res.status(503).json({ message: 'The account and portfolio service is unavailable. Please try again later.' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Portfolio API is running.' });
});

app.use('/api/auth', authRoutes);
app.use('/api', portfolioRoutes);

const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

app.use((err, req, res, next) => {
  if (err && err.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Invalid JSON payload.' });
  }

  if (err.status && err.status >= 400 && err.status < 500) return res.status(err.status).json({ message: err.message });
  if (err.code === 11000) return res.status(409).json({ message: 'This email is already registered.' });
  console.error(err);
  return res.status(500).json({ message: 'Internal server error.' });
});

app.get(/^(?!\/api).*/, (req, res) => {
  return res.sendFile(path.join(distPath, 'index.html'));
});

async function startServer() {
  await initializeDatabase();

  app.listen(PORT, () => {
    console.log(`Portfolio app running on http://localhost:${PORT}`);
  });
}

if (require.main === module) {
  startServer().catch((error) => {
    console.error('Server startup failed:', error.message);
    process.exitCode = 1;
  });
}

module.exports = app;

