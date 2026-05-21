const express = require('express');
const {
  getWeatherByDistrict,
  getWeatherByLocation,
  getAllWeather,
  upsertWeather,
  deleteWeather,
} = require('../controllers/weatherController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const router = express.Router();

// Public routes
router.get('/district/:district', getWeatherByDistrict);
router.get('/location/:state/:district', getWeatherByLocation);
router.get('/', getAllWeather);

// Admin routes
router.post('/', auth, admin, upsertWeather);
router.delete('/:id', auth, admin, deleteWeather);

module.exports = router;
