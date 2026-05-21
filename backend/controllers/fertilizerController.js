const Fertilizer = require('../models/Fertilizer');
const { sendSuccess, sendError } = require('../utils/response');

// Get all fertilizers
const getAllFertilizers = async (req, res) => {
  try {
    const fertilizers = await Fertilizer.find().populate('crop', 'name season');
    sendSuccess(res, fertilizers, 'Fertilizers retrieved successfully');
  } catch (error) {
    console.error('Get all fertilizers error:', error);
    sendError(res, 'Failed to retrieve fertilizers', 500);
  }
};

// Get fertilizer for specific crop
const getFertilizerByCrop = async (req, res) => {
  try {
    const { cropName } = req.params;

    const fertilizer = await Fertilizer.findOne({
      cropName: new RegExp(cropName, 'i'),
    }).populate('crop', 'name season');

    if (!fertilizer) {
      return sendError(res, 'Fertilizer guide not found for this crop', 404);
    }

    sendSuccess(res, fertilizer, 'Fertilizer guide retrieved successfully');
  } catch (error) {
    console.error('Get fertilizer by crop error:', error);
    sendError(res, 'Failed to retrieve fertilizer guide', 500);
  }
};

// Get single fertilizer
const getFertilizerById = async (req, res) => {
  try {
    const fertilizer = await Fertilizer.findById(req.params.id).populate('crop');
    if (!fertilizer) {
      return sendError(res, 'Fertilizer not found', 404);
    }
    sendSuccess(res, fertilizer, 'Fertilizer retrieved successfully');
  } catch (error) {
    console.error('Get fertilizer by ID error:', error);
    sendError(res, 'Failed to retrieve fertilizer', 500);
  }
};

// Create fertilizer guide (admin only)
const createFertilizer = async (req, res) => {
  try {
    const { crop, cropName, nitrogen, phosphorus, potassium, organic, applicationType, season } = req.body;

    if (!cropName || !nitrogen || !phosphorus || !potassium || !organic) {
      return sendError(res, 'All required fields must be provided', 400);
    }

    const fertilizer = new Fertilizer({
      crop,
      cropName,
      nitrogen,
      phosphorus,
      potassium,
      organic,
      applicationType,
      season,
    });

    const savedFertilizer = await fertilizer.save();
    await savedFertilizer.populate('crop');
    sendSuccess(res, savedFertilizer, 'Fertilizer guide created successfully', 201);
  } catch (error) {
    console.error('Create fertilizer error:', error);
    sendError(res, 'Failed to create fertilizer guide', 500);
  }
};

// Update fertilizer (admin only)
const updateFertilizer = async (req, res) => {
  try {
    const fertilizer = await Fertilizer.findById(req.params.id);
    if (!fertilizer) {
      return sendError(res, 'Fertilizer not found', 404);
    }

    const { nitrogen, phosphorus, potassium, organic, applicationType } = req.body;

    if (nitrogen) fertilizer.nitrogen = nitrogen;
    if (phosphorus) fertilizer.phosphorus = phosphorus;
    if (potassium) fertilizer.potassium = potassium;
    if (organic) fertilizer.organic = organic;
    if (applicationType) fertilizer.applicationType = applicationType;

    const updated = await fertilizer.save();
    await updated.populate('crop');
    sendSuccess(res, updated, 'Fertilizer updated successfully');
  } catch (error) {
    console.error('Update fertilizer error:', error);
    sendError(res, 'Failed to update fertilizer', 500);
  }
};

// Delete fertilizer (admin only)
const deleteFertilizer = async (req, res) => {
  try {
    const fertilizer = await Fertilizer.findByIdAndDelete(req.params.id);
    if (!fertilizer) {
      return sendError(res, 'Fertilizer not found', 404);
    }
    sendSuccess(res, null, 'Fertilizer deleted successfully');
  } catch (error) {
    console.error('Delete fertilizer error:', error);
    sendError(res, 'Failed to delete fertilizer', 500);
  }
};

module.exports = {
  getAllFertilizers,
  getFertilizerByCrop,
  getFertilizerById,
  createFertilizer,
  updateFertilizer,
  deleteFertilizer,
};
