require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 8080,
  MONGODB_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret_key',
  NODE_ENV: process.env.NODE_ENV || 'development',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://127.0.0.1:5173',
};
