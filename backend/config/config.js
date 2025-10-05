module.exports = {
  MONGODB_URI: process.env.MONGODB_URI || MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET || JWT_SECRET,
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development'
};
