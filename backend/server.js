const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const envConfig = require('./config/environment');

// Load environment variables
require('dotenv').config();

// Connect to database
connectDB();

const app = express();

// CORS configuration
const allowedOrigins = Array.isArray(envConfig.corsOrigin)
  ? envConfig.corsOrigin
  : [envConfig.corsOrigin];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow non-browser requests (no origin) and allowed origins
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204
};

// Middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/books', require('./routes/books'));
app.use('/api/reviews', require('./routes/reviews'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ message: 'Book Review API is running!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = envConfig.PORT;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${envConfig.NODE_ENV}`);
  console.log(`🔗 API URL: ${envConfig.apiUrl}`);
  console.log(`🎯 CORS Origin: ${envConfig.corsOrigin}`);
});