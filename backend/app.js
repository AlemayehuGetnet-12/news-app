const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config');
const newsRoutes = require('./routes/newsRoutes');

const app = express();

// ── Middleware ────────────────────────────────────────────────
app.use(cors({ origin: config.frontendUrl, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(config.nodeEnv === 'development' ? 'dev' : 'combined'));

// ── Routes ────────────────────────────────────────────────────
app.use('/api/news', newsRoutes);

app.get('/api/health', (req, res) =>
  res.json({ status: 'ok', env: config.nodeEnv, uptime: process.uptime() })
);

// ── 404 ───────────────────────────────────────────────────────
app.use((req, res) =>
  res.status(404).json({ success: false, message: 'Route not found' })
);

// ── Global Error Handler ──────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(`[ERROR] ${err.message}`);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(config.nodeEnv === 'development' && { stack: err.stack }),
  });
});

app.listen(config.port, () => {
  console.log(`\n📰  News API running → http://localhost:${config.port}`);
  console.log(`   Health       → http://localhost:${config.port}/api/health`);
  console.log(`   Top News     → http://localhost:${config.port}/api/news`);
  console.log(`   Search       → http://localhost:${config.port}/api/news?search=AI`);
  console.log(`   Category     → http://localhost:${config.port}/api/news?category=technology`);
  console.log(`   Country      → http://localhost:${config.port}/api/news?country=us\n`);
});

module.exports = app;
