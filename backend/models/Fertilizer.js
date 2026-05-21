const mongoose = require('mongoose');

const fertilizerSchema = new mongoose.Schema({
  crop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Crop',
    required: true,
  },
  cropName: {
    type: String,
    required: true,
  },
  nitrogen: {
    type: String,
    required: true,
  },
  phosphorus: {
    type: String,
    required: true,
  },
  potassium: {
    type: String,
    required: true,
  },
  organic: {
    type: String,
    required: true,
  },
  applicationType: {
    type: String,
    enum: ['Basal', 'Top Dressing', 'Foliar'],
    default: 'Basal',
  },
  season: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Fertilizer', fertilizerSchema);
