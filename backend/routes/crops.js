const express = require('express');
const {
  getAllCrops,
  getRecommendations,
  getCropById,
  createCrop,
  updateCrop,
  deleteCrop,
} = require('../controllers/cropController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const router = express.Router();

// Public routes
router.get('/', getAllCrops);
router.get('/recommend', getRecommendations);
router.get('/:id', getCropById);

// Admin routes
router.post('/', auth, admin, createCrop);
router.patch('/:id', auth, admin, updateCrop);
router.delete('/:id', auth, admin, deleteCrop);

module.exports = router;
