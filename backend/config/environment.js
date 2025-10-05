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
    frontendUrl: 'https://bookreviewassign.gt.tc',
    // Allow localhost during development and your deployed frontend domain
    corsOrigin: ['http://localhost:3000', 'https://bookreviewassign.gt.tc']
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