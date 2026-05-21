const express = require('express');
const { register, login, getProfile, adminLogin } = require('../controllers/authController');
const auth = require('../middleware/auth');
const router = express.Router();

// Test route - verify auth router is mounted
router.get('/', (req, res) => {
  res.json({ success: true, message: 'Auth routes are working', routes: ['POST /register', 'POST /login', 'POST /admin-login', 'GET /profile'] });
});

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/admin-login', adminLogin);

// Protected routes
router.get('/profile', auth, getProfile);

module.exports = router;
