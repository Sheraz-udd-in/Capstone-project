const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
  farmerName: {
    type: String,
    required: true,
  },
  farmerEmail: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  query: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Crop', 'Fertilizer', 'Weather', 'Pest', 'Disease', 'Other'],
    default: 'Other',
  },
  status: {
    type: String,
    enum: ['pending', 'answered'],
    default: 'pending',
  },
  answer: {
    type: String,
    default: null,
  },
  answeredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  answeredAt: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model('Query', querySchema);
