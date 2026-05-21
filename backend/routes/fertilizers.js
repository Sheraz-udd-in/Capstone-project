const express = require('express');
const {
  getAllFertilizers,
  getFertilizerByCrop,
  getFertilizerById,
  createFertilizer,
  updateFertilizer,
  deleteFertilizer,
} = require('../controllers/fertilizerController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const router = express.Router();

// Public routes
router.get('/', getAllFertilizers);
router.get('/:id', getFertilizerById);
router.get('/crop/:cropName', getFertilizerByCrop);

// Admin routes
router.post('/', auth, admin, createFertilizer);
router.patch('/:id', auth, admin, updateFertilizer);
router.delete('/:id', auth, admin, deleteFertilizer);

module.exports = router;
