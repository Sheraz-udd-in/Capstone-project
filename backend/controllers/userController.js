const User = require('../models/User');
const { sendSuccess, sendError } = require('../utils/response');

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return sendError(res, 'User not found', 404);
    }
    sendSuccess(res, user, 'User profile retrieved successfully');
  } catch (error) {
    console.error('Get user profile error:', error);
    sendError(res, 'Failed to retrieve user profile', 500);
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return sendError(res, 'User not found', 404);
    }

    const { name, state, district, soilType } = req.body;

    if (name) user.name = name;
    if (state) user.state = state;
    if (district) user.district = district;
    if (soilType) user.soilType = soilType;

    user.updatedAt = new Date();
    const updated = await user.save();

    sendSuccess(res, {
      _id: updated._id,
      name: updated.name,
      email: updated.email,
      state: updated.state,
      district: updated.district,
      soilType: updated.soilType,
      role: updated.role,
    }, 'User profile updated successfully');
  } catch (error) {
    console.error('Update user profile error:', error);
    sendError(res, 'Failed to update user profile', 500);
  }
};

// Get all users (admin only)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    sendSuccess(res, users, 'All users retrieved successfully');
  } catch (error) {
    console.error('Get all users error:', error);
    sendError(res, 'Failed to retrieve users', 500);
  }
};

// Get farmers count (admin)
const getFarmersCount = async (req, res) => {
  try {
    const count = await User.countDocuments({ role: 'farmer' });
    sendSuccess(res, { count }, 'Farmers count retrieved successfully');
  } catch (error) {
    console.error('Get farmers count error:', error);
    sendError(res, 'Failed to retrieve farmers count', 500);
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  getFarmersCount,
};
