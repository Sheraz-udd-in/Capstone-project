const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { sendSuccess, sendError } = require('../utils/response');
const { validateEmail, validatePassword } = require('../utils/validators');

// Register User (Signup)
const register = async (req, res) => {
  try {
    const { name, email, password, state, district, role } = req.body;

    // Validation
    if (!name || !email || !password || !state || !district) {
      return sendError(res, 'All fields are required', 400);
    }

    if (!validateEmail(email)) {
      return sendError(res, 'Invalid email format', 400);
    }

    if (!validatePassword(password)) {
      return sendError(res, 'Password must be at least 6 characters', 400);
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendError(res, 'Email already registered', 400);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      state,
      district,
      role: role || 'farmer',
    });

    const savedUser = await user.save();

    // Generate token
    const token = jwt.sign(
      { userId: savedUser._id, role: savedUser.role },
      process.env.JWT_SECRET || 'your_secret_key',
      { expiresIn: '7d' }
    );

    sendSuccess(res, {
      user: {
        _id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        state: savedUser.state,
        district: savedUser.district,
        soilType: savedUser.soilType,
        role: savedUser.role,
      },
      token,
    }, 'Registration successful', 201);
  } catch (error) {
    console.error('Registration error:', error);
    sendError(res, 'Registration failed', 500);
  }
};

// Login User
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(res, 'Email and password are required', 400);
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return sendError(res, 'Invalid email or password', 401);
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return sendError(res, 'Invalid email or password', 401);
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'your_secret_key',
      { expiresIn: '7d' }
    );

    sendSuccess(res, {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        state: user.state,
        district: user.district,
        soilType: user.soilType,
        role: user.role,
      },
      token,
    }, 'Login successful');
  } catch (error) {
    console.error('Login error:', error);
    sendError(res, 'Login failed', 500);
  }
};

// Get current user profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return sendError(res, 'User not found', 404);
    }

    sendSuccess(res, user, 'Profile retrieved successfully');
  } catch (error) {
    console.error('Get profile error:', error);
    sendError(res, 'Failed to retrieve profile', 500);
  }
};

// Admin login (same as regular login but checks for admin role)
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(res, 'Email and password are required', 400);
    }

    const user = await User.findOne({ email, role: 'admin' });
    if (!user) {
      return sendError(res, 'Admin account not found', 401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return sendError(res, 'Invalid email or password', 401);
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'your_secret_key',
      { expiresIn: '7d' }
    );

    sendSuccess(res, {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    }, 'Admin login successful');
  } catch (error) {
    console.error('Admin login error:', error);
    sendError(res, 'Admin login failed', 500);
  }
};

module.exports = {
  register,
  login,
  getProfile,
  adminLogin,
};
