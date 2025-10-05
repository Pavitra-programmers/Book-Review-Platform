const config = require('./config');

// Environment configuration
const environment = {
  development: {
    apiUrl: 'http://localhost:5000',
    frontendUrl: 'http://localhost:3000',
    corsOrigin: 'http://localhost:3000'
  },
  production: {
    apiUrl: 'https://book-review-platform-av0h.onrender.com',
    frontendUrl: 'https://your-frontend-domain.com', // Update this when you deploy frontend
    corsOrigin: 'https://your-frontend-domain.com' // Update this when you deploy frontend
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