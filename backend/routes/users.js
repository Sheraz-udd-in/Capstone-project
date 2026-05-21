const express = require('express');
const {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  getFarmersCount,
} = require('../controllers/userController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const router = express.Router();

// Protected routes
router.get('/:id', auth, getUserProfile);
router.patch('/:id', auth, updateUserProfile);

// Admin routes
router.get('/', auth, admin, getAllUsers);
router.get('/stats/farmers', auth, admin, getFarmersCount);

module.exports = router;
