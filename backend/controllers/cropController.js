const Crop = require('../models/Crop');
const { sendSuccess, sendError } = require('../utils/response');

// Get all crops
const getAllCrops = async (req, res) => {
  try {
    const crops = await Crop.find();
    sendSuccess(res, crops, 'Crops retrieved successfully');
  } catch (error) {
    console.error('Get all crops error:', error);
    sendError(res, 'Failed to retrieve crops', 500);
  }
};

// Get crop recommendations based on soil type
const getRecommendations = async (req, res) => {
  try {
    const { soilType, state } = req.query;

    if (!soilType) {
      return sendError(res, 'Soil type is required', 400);
    }

    const crops = await Crop.find({
      soilTypes: soilType,
    });

    if (crops.length === 0) {
      return sendSuccess(res, [], 'No crops found for this soil type', 200);
    }

    sendSuccess(res, crops, 'Crop recommendations retrieved successfully');
  } catch (error) {
    console.error('Get recommendations error:', error);
    sendError(res, 'Failed to get recommendations', 500);
  }
};

// Get single crop
const getCropById = async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);
    if (!crop) {
      return sendError(res, 'Crop not found', 404);
    }
    sendSuccess(res, crop, 'Crop retrieved successfully');
  } catch (error) {
    console.error('Get crop by ID error:', error);
    sendError(res, 'Failed to retrieve crop', 500);
  }
};

// Create crop (admin only)
const createCrop = async (req, res) => {
  try {
    const { name, season, waterRequirement, duration, yield: yieldValue, soilTypes } = req.body;

    if (!name || !season || !waterRequirement || !duration || !yieldValue) {
      return sendError(res, 'All required fields must be provided', 400);
    }

    const crop = new Crop({
      name,
      season,
      waterRequirement,
      duration,
      yield: yieldValue,
      soilTypes,
    });

    const savedCrop = await crop.save();
    sendSuccess(res, savedCrop, 'Crop created successfully', 201);
  } catch (error) {
    console.error('Create crop error:', error);
    sendError(res, 'Failed to create crop', 500);
  }
};

// Update crop (admin only)
const updateCrop = async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);
    if (!crop) {
      return sendError(res, 'Crop not found', 404);
    }

    const { name, season, waterRequirement, duration, yield: yieldValue, soilTypes } = req.body;

    if (name) crop.name = name;
    if (season) crop.season = season;
    if (waterRequirement) crop.waterRequirement = waterRequirement;
    if (duration) crop.duration = duration;
    if (yieldValue) crop.yield = yieldValue;
    if (soilTypes) crop.soilTypes = soilTypes;

    const updated = await crop.save();
    sendSuccess(res, updated, 'Crop updated successfully');
  } catch (error) {
    console.error('Update crop error:', error);
    sendError(res, 'Failed to update crop', 500);
  }
};

// Delete crop (admin only)
const deleteCrop = async (req, res) => {
  try {
    const crop = await Crop.findByIdAndDelete(req.params.id);
    if (!crop) {
      return sendError(res, 'Crop not found', 404);
    }
    sendSuccess(res, null, 'Crop deleted successfully');
  } catch (error) {
    console.error('Delete crop error:', error);
    sendError(res, 'Failed to delete crop', 500);
  }
};

module.exports = {
  getAllCrops,
  getRecommendations,
  getCropById,
  createCrop,
  updateCrop,
  deleteCrop,
};
