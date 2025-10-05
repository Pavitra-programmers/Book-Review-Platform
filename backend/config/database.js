const mongoose = require('mongoose');
const config = require('./config');

const connectDB = async () => {
  try {
    const mongoURI = config.MONGODB_URI;
    
    if (!mongoURI || mongoURI.includes('YOUR_ACTUAL_PASSWORD')) {
      console.error('MongoDB URI not properly configured. Please set MONGODB_URI environment variable with your actual password.');
      console.log('For local development, create a .env file with:');
      console.log('MONGODB_URI=url');
      process.exit(1);
    }
    
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
  } catch (error) {
    console.error('Database connection error:', error.message);
    if (error.message.includes('authentication failed')) {
      console.log('Authentication failed. Please check:');
      console.log('1. Your MongoDB username and password are correct');
      console.log('2. Your IP address is whitelisted in MongoDB Atlas');
      console.log('3. Your database user has the correct permissions');
    }
    process.exit(1);
  }
};

module.exports = connectDB;
