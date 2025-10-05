module.exports = {
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://kritenshstp021_db_user:your_actual_password_here@cluster0.oqnxppm.mongodb.net/bookreview?retryWrites=true&w=majority',
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret_key_here_make_it_strong_and_secure',
  PORT: process.env.PORT || 5000
};