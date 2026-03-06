require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const { getDb } = require('./db/connection');

const alumniRoutes    = require('./routes/alumni');
const directoryRoutes = require('./routes/directory');
const authRoutes      = require('./routes/auth');
const chatRoutes      = require('./routes/chat');

const app  = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(express.json());

// Routes
app.use('/api/alumni',    alumniRoutes);
app.use('/api/directory', directoryRoutes);
app.use('/api/auth',      authRoutes);
app.use('/api/chat',      chatRoutes);

// Health check
app.get('/api/health', (_req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

// 404 fallback
app.use((_req, res) => res.status(404).json({ error: 'Route not found' }));

// Error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// Load DB first, then listen
getDb().then(() => {
  app.listen(PORT, () => {
    console.log(`✅  AlumniConnect API running on http://localhost:${PORT}`);
    if (!process.env.GROQ_API_KEY) {
      console.warn('⚠️   GROQ_API_KEY not set — add it to .env for AI chat to work');
    }
  });
}).catch(err => {
  console.error('❌  Failed to load database:', err.message);
  process.exit(1);
});
