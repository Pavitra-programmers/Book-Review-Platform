module.exports = {
  MONGODB_URI: process.env.MONGODB_URI || MONGO_DB,
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret_key_here_make_it_strong_and_secure',
  PORT: process.env.PORT || 5000
};
