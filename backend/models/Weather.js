const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  district: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  temperature: {
    type: Number,
    required: true,
  },
  humidity: {
    type: Number,
    required: true,
  },
  rainfall: {
    type: Number,
    required: true,
  },
  condition: {
    type: String,
    required: true,
  },
  forecast: [
    {
      day: String,
      temp: Number,
      condition: String,
      rainfall: Number,
    },
  ],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Weather', weatherSchema);
