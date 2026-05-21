const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✓ MongoDB connected');
  } catch (error) {
    console.error('✗ MongoDB connection error:', error.message);
    // Do NOT crash Railway app
    // Keep server alive even if DB reconnects later
  }
};

module.exports = connectDB;
