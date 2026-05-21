const Weather = require('../models/Weather');
const { sendSuccess, sendError } = require('../utils/response');

// Get weather by district
const getWeatherByDistrict = async (req, res) => {
  try {
    const { district } = req.params;

    const weather = await Weather.findOne({
      district: new RegExp(district, 'i'),
    });

    if (!weather) {
      return sendError(res, 'Weather data not found for this district', 404);
    }

    sendSuccess(res, weather, 'Weather retrieved successfully');
  } catch (error) {
    console.error('Get weather by district error:', error);
    sendError(res, 'Failed to retrieve weather data', 500);
  }
};

// Get weather by state and district
const getWeatherByLocation = async (req, res) => {
  try {
    const { state, district } = req.params;

    const weather = await Weather.findOne({
      state: new RegExp(state, 'i'),
      district: new RegExp(district, 'i'),
    });

    if (!weather) {
      return sendError(res, 'Weather data not found for this location', 404);
    }

    sendSuccess(res, weather, 'Weather retrieved successfully');
  } catch (error) {
    console.error('Get weather by location error:', error);
    sendError(res, 'Failed to retrieve weather data', 500);
  }
};

// Get all weather data
const getAllWeather = async (req, res) => {
  try {
    const weather = await Weather.find();
    sendSuccess(res, weather, 'All weather data retrieved successfully');
  } catch (error) {
    console.error('Get all weather error:', error);
    sendError(res, 'Failed to retrieve weather data', 500);
  }
};

// Create or update weather data
const upsertWeather = async (req, res) => {
  try {
    const { district, state, temperature, humidity, rainfall, condition, forecast } = req.body;

    if (!district || !state || temperature === undefined || humidity === undefined) {
      return sendError(res, 'Required fields: district, state, temperature, humidity', 400);
    }

    const existing = await Weather.findOne({
      district: new RegExp(district, 'i'),
      state: new RegExp(state, 'i'),
    });

    if (existing) {
      existing.temperature = temperature;
      existing.humidity = humidity;
      existing.rainfall = rainfall || 0;
      existing.condition = condition || 'Unknown';
      if (forecast) existing.forecast = forecast;
      existing.updatedAt = new Date();

      const updated = await existing.save();
      return sendSuccess(res, updated, 'Weather updated successfully');
    }

    const weather = new Weather({
      district,
      state,
      temperature,
      humidity,
      rainfall: rainfall || 0,
      condition: condition || 'Unknown',
      forecast: forecast || [],
    });

    const saved = await weather.save();
    sendSuccess(res, saved, 'Weather created successfully', 201);
  } catch (error) {
    console.error('Upsert weather error:', error);
    sendError(res, 'Failed to save weather data', 500);
  }
};

// Delete weather data
const deleteWeather = async (req, res) => {
  try {
    const weather = await Weather.findByIdAndDelete(req.params.id);
    if (!weather) {
      return sendError(res, 'Weather record not found', 404);
    }
    sendSuccess(res, null, 'Weather data deleted successfully');
  } catch (error) {
    console.error('Delete weather error:', error);
    sendError(res, 'Failed to delete weather data', 500);
  }
};

module.exports = {
  getWeatherByDistrict,
  getWeatherByLocation,
  getAllWeather,
  upsertWeather,
  deleteWeather,
};
