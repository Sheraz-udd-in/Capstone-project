const Query = require('../models/Query');
const User = require('../models/User');
const { sendSuccess, sendError } = require('../utils/response');
const { sendQueryNotificationEmail } = require('../utils/emailService');

// Get all queries (admin only)
const getAllQueries = async (req, res) => {
  try {
    const queries = await Query.find()
      .populate('answeredBy', 'name email')
      .sort({ createdAt: -1 });

    sendSuccess(res, queries, 'Queries retrieved successfully');
  } catch (error) {
    console.error('Get all queries error:', error);
    sendError(res, 'Failed to retrieve queries', 500);
  }
};

// Get queries by status
const getQueriesByStatus = async (req, res) => {
  try {
    const { status } = req.params;

    const validStatuses = ['pending', 'answered'];
    if (!validStatuses.includes(status)) {
      return sendError(res, 'Invalid status. Must be pending or answered', 400);
    }

    const queries = await Query.find({ status })
      .populate('answeredBy', 'name email')
      .sort({ createdAt: -1 });

    sendSuccess(res, queries, `${status} queries retrieved successfully`);
  } catch (error) {
    console.error('Get queries by status error:', error);
    sendError(res, 'Failed to retrieve queries', 500);
  }
};

// Get single query
const getQueryById = async (req, res) => {
  try {
    const query = await Query.findById(req.params.id)
      .populate('answeredBy', 'name email');

    if (!query) {
      return sendError(res, 'Query not found', 404);
    }

    sendSuccess(res, query, 'Query retrieved successfully');
  } catch (error) {
    console.error('Get query by ID error:', error);
    sendError(res, 'Failed to retrieve query', 500);
  }
};

// Get queries for logged-in farmer
const getMyQueries = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return sendError(res, 'User not found', 404);
    }

    const queries = await Query.find({ farmerEmail: user.email }).sort({ createdAt: -1 });
    sendSuccess(res, queries, 'My queries retrieved successfully');
  } catch (error) {
    console.error('Get my queries error:', error);
    sendError(res, 'Failed to retrieve my queries', 500);
  }
};

// Submit new query (farmer)
const submitQuery = async (req, res) => {
  try {
    const { farmerName, farmerEmail, district, query, category } = req.body;

    if (!farmerName || !farmerEmail || !district || !query) {
      return sendError(res, 'All required fields must be provided', 400);
    }

    const newQuery = new Query({
      farmerName,
      farmerEmail,
      district,
      query,
      category: category || 'Other',
    });

    const savedQuery = await newQuery.save();
    
    // Send email notification to admin asynchronously (doesn't block the response)
    sendQueryNotificationEmail({
      farmerName,
      farmerEmail,
      district,
      query,
      category: category || 'Other'
    });
    
    sendSuccess(res, savedQuery, 'Query submitted successfully', 201);
  } catch (error) {
    console.error('Submit query error:', error);
    sendError(res, 'Failed to submit query', 500);
  }
};

// Answer query (admin only)
const answerQuery = async (req, res) => {
  try {
    const { answer } = req.body;

    if (!answer) {
      return sendError(res, 'Answer is required', 400);
    }

    const query = await Query.findById(req.params.id);
    if (!query) {
      return sendError(res, 'Query not found', 404);
    }

    query.status = 'answered';
    query.answer = answer;
    query.answeredBy = req.userId;
    query.answeredAt = new Date();

    const updated = await query.save();
    await updated.populate('answeredBy', 'name email');

    sendSuccess(res, updated, 'Query answered successfully');
  } catch (error) {
    console.error('Answer query error:', error);
    sendError(res, 'Failed to answer query', 500);
  }
};

// Delete query (admin only)
const deleteQuery = async (req, res) => {
  try {
    const query = await Query.findByIdAndDelete(req.params.id);
    if (!query) {
      return sendError(res, 'Query not found', 404);
    }
    sendSuccess(res, null, 'Query deleted successfully');
  } catch (error) {
    console.error('Delete query error:', error);
    sendError(res, 'Failed to delete query', 500);
  }
};

module.exports = {
  getAllQueries,
  getQueriesByStatus,
  getQueryById,
  getMyQueries,
  submitQuery,
  answerQuery,
  deleteQuery,
};
