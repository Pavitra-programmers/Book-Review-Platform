const config = require('./config');

// Environment configuration
const environment = {
  development: {
    apiUrl: 'http://localhost:5000',
    frontendUrl: 'http://localhost:3000',
    corsOrigin: 'http://localhost:3000'
  },
  production: {
    apiUrl: 'https://book-review-platform-behq.onrender.com',
    frontendUrl: 'https://your-frontend-domain.com', // Update this when you deploy frontend
    // Allow localhost during development and your deployed frontend domain
    corsOrigin: ['http://localhost:3000', 'https://your-frontend-domain.com']
  }
};

const currentEnv = config.NODE_ENV || 'development';
const envConfig = environment[currentEnv] || environment.development;

module.exports = {
  ...config,
  ...envConfig,
  isDevelopment: currentEnv === 'development',
  isProduction: currentEnv === 'production'
};