const express = require('express');
const {
  getAllQueries,
  getQueriesByStatus,
  getQueryById,
  getMyQueries,
  submitQuery,
  answerQuery,
  deleteQuery,
} = require('../controllers/queryController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const router = express.Router();

// Public route - submit query
router.post('/', submitQuery);

// Farmer routes
router.get('/my-queries', auth, getMyQueries);

// Admin routes
router.get('/', auth, admin, getAllQueries);
router.get('/status/:status', auth, admin, getQueriesByStatus);
router.get('/:id', auth, admin, getQueryById);
router.patch('/:id/answer', auth, admin, answerQuery);
router.delete('/:id', auth, admin, deleteQuery);

module.exports = router;
