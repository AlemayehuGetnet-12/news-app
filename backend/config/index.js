require('dotenv').config();

const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  newsApiKey: process.env.NEWS_API_KEY,
  newsApiUrl: process.env.NEWS_API_URL || 'https://newsapi.org/v2',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  mongoUri: process.env.MONGO_URI || null,
};

if (!config.newsApiKey) {
  console.error('❌  NEWS_API_KEY is missing in .env — server cannot start.');
  process.exit(1);
}

module.exports = config;
