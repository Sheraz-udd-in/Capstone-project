const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  season: {
    type: String,
    required: true,
    enum: ['Kharif', 'Rabi', 'Year-round'],
  },
  waterRequirement: {
    type: String,
    required: true,
    enum: ['Low', 'Medium', 'High', 'Very High'],
  },
  duration: {
    type: String,
    required: true,
  },
  yield: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Very High'],
    required: true,
  },
  soilTypes: [
    {
      type: String,
      enum: ['Black Soil', 'Red Soil', 'Alluvial Soil', 'Clay Soil', 'Loamy Soil', 'Sandy Soil'],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Crop', cropSchema);
