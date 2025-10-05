// API Configuration
const API_CONFIG = {
  // Local development
  development: {
    baseURL: 'http://localhost:5000/api',
    timeout: 10000
  },
  // Production (Render deployment)
  production: {
    baseURL: 'https://book-review-platform-av0h.onrender.com/api',
    timeout: 15000
  }
};

// Get current environment
const getEnvironment = () => {
  // Check if we're in development mode
  if (process.env.NODE_ENV === 'development' || 
      window.location.hostname === 'localhost' || 
      window.location.hostname === '127.0.0.1') {
    return 'development';
  }
  return 'production';
};

// Get API configuration based on environment
const getApiConfig = () => {
  const env = getEnvironment();
  return API_CONFIG[env];
};

// Create API URL helper
export const createApiUrl = (endpoint) => {
  const config = getApiConfig();
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${config.baseURL}/${cleanEndpoint}`;
};

// Export configuration
export const apiConfig = getApiConfig();
export const isDevelopment = getEnvironment() === 'development';
export const isProduction = getEnvironment() === 'production';

export default apiConfig;