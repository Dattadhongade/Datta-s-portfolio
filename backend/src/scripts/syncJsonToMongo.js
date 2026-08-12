/**
 * Sync portfolio_data.json directly into MongoDB PortfolioState.
 * Run: node src/scripts/syncJsonToMongo.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../../data/portfolio_data.json');

async function sync() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 15000,
    family: 4
  });
  console.log('Connected!');

  const PortfolioState = require('../models/PortfolioState');
  const rawData = fs.readFileSync(dataFilePath, 'utf8');
  const parsed = JSON.parse(rawData);

  // Verify data has required fields
  console.log('Projects count:', parsed.projects?.length ?? 0);
  console.log('Skills categories:', Object.keys(parsed.skills || {}).length);

  await PortfolioState.findOneAndUpdate(
    { id: 1 },
    { state_data: rawData },
    { upsert: true, new: true }
  );

  console.log('✅ Successfully synced portfolio_data.json → MongoDB PortfolioState!');
  await mongoose.disconnect();
  process.exit(0);
}

sync().catch(err => {
  console.error('❌ Sync failed:', err.message);
  process.exit(1);
});
