const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware - CORS
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like curl)
    if (!origin) return callback(null, true);
    
    // Allow vercel frontend and localhost
    if (origin.includes('capstone-frontend-roan.vercel.app') || 
        origin.includes('localhost') || 
        origin.includes('127.0.0.1')) {
      return callback(null, true);
    }
    
    return callback(null, false); // Don't throw error, just block
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging for debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
// Root route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Smart Yield Backend Running"
  });
});
// Health route
app.get("/health", (req, res) => {
  res.json({
    status: "ok"
  });
});

// MongoDB Connection
const connectDB = require('./config/db');
connectDB();

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/crops', require('./routes/crops'));
app.use('/api/fertilizers', require('./routes/fertilizers'));
app.use('/api/queries', require('./routes/queries'));
app.use('/api/weather', require('./routes/weather'));
app.use('/api/users', require('./routes/users'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date() });
});

// Duplicate root endpoint removed to avoid conflict

// 404 handler - catches any unmatched routes
app.use((req, res, next) => {
  res.status(404).json({ 
    success: false,
    message: 'Route not found',
    path: req.path,
    method: req.method
  });
});

// Error handling middleware
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});