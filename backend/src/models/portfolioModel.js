const fs = require('fs');
const path = require('path');
const { isDbConnected } = require('../config/db');
const PortfolioState = require('./PortfolioState');
const ContactInquiry = require('./ContactInquiry');

const dataDir = path.join(__dirname, '..', '..', 'data');
const dataFilePath = path.join(dataDir, 'portfolio_data.json');

async function seedDatabaseIfEmpty() {
  if (isDbConnected()) {
    try {
      const existingState = await PortfolioState.findOne({ id: 1 });
      if (!existingState && fs.existsSync(dataFilePath)) {
        const fileData = fs.readFileSync(dataFilePath, 'utf8');
        await PortfolioState.create({
          id: 1,
          state_data: fileData
        });
        console.log('🍃 Portfolio JSON data seeded into MongoDB successfully.');
      }
    } catch (err) {
      console.error('Error seeding portfolio data to MongoDB:', err);
    }
  }
}

async function getPortfolioData() {
  if (isDbConnected()) {
    try {
      const stateDoc = await PortfolioState.findOne({ id: 1 });
      if (stateDoc && stateDoc.state_data) {
        return JSON.parse(stateDoc.state_data);
      }
    } catch (err) {
      console.error('Error fetching portfolio data from MongoDB, falling back to file:', err);
    }
  }

  // File fallback
  try {
    if (fs.existsSync(dataFilePath)) {
      return JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    }
  } catch (e) {
    console.error('Error reading JSON fallback file:', e);
  }
  return {};
}

async function savePortfolioData(data) {
  // 1. Always save to local JSON file as backup
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (e) {
    console.error('Error writing to JSON file:', e);
  }

  // 2. If MongoDB connected, sync to PortfolioState document
  if (isDbConnected()) {
    try {
      const jsonStr = JSON.stringify(data);
      await PortfolioState.findOneAndUpdate(
        { id: 1 },
        { state_data: jsonStr },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    } catch (err) {
      console.error('Error saving portfolio data to MongoDB:', err);
    }
  }
  return true;
}

async function saveContactMessage(msg) {
  if (isDbConnected()) {
    try {
      await ContactInquiry.findOneAndUpdate(
        { id: msg.id },
        {
          id: msg.id,
          firstName: msg.firstName || '',
          lastName: msg.lastName || '',
          mobileNumber: msg.mobileNumber || '',
          email: msg.email || '',
          subject: msg.subject || '',
          description: msg.description || '',
          unread: msg.unread !== undefined ? msg.unread : true
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    } catch (err) {
      console.error('Error saving contact message to MongoDB:', err);
    }
  }
}

module.exports = {
  seedDatabaseIfEmpty,
  getPortfolioData,
  savePortfolioData,
  saveContactMessage,
  isDbConnected
};
