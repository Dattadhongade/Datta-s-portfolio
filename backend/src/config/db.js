require('dotenv').config();
const mongoose = require('mongoose');

let isDbConnected = false;

/**
 * Initialize MongoDB database connection via Mongoose.
 */
async function initDatabase() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio_db';

  try {
    mongoose.set('strictQuery', true);

    const mongoOptions = {
      serverSelectionTimeoutMS: 10000,
      family: 4 // IPv4 resolution for Windows TLS compatibility with MongoDB Atlas
    };

    if (mongoUri.includes('mongodb+srv://')) {
      mongoOptions.tls = true;
    }

    await mongoose.connect(mongoUri, mongoOptions);
    isDbConnected = true;

    console.log('MongoDB Connected Successfully');

    // Auto-seed Admin account if not present
    const User = require('../models/User');
    await User.seedDefaultAdmin();

    // Auto-seed initial portfolio state if database is empty
    const { seedDatabaseIfEmpty } = require('../models/portfolioModel');
    await seedDatabaseIfEmpty();

    return true;
  } catch (err) {
    isDbConnected = false;
    console.warn(`MongoDB Connection Notice: ${err.message}`);
    console.log('Operating in Persistent File Datastore Mode (backend/data/portfolio_data.json)');
    return false;
  }
}

// Connection State Events
mongoose.connection.on('disconnected', () => {
  if (isDbConnected) {
    console.warn('MongoDB Disconnected. Switching to persistent file fallback mode.');
    isDbConnected = false;
  }
});

mongoose.connection.on('reconnected', () => {
  console.log('MongoDB Reconnected successfully.');
  isDbConnected = true;
});

module.exports = {
  initDatabase,
  isDbConnected: () => isDbConnected && mongoose.connection.readyState === 1
};
