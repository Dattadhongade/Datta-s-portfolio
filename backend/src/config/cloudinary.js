const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

const isCloudinaryConfigured = () => {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
};

// Dedicated separate folder for Datta's Portfolio to avoid mixing with other projects
const CLOUDINARY_FOLDER = process.env.CLOUDINARY_FOLDER || 'datta_portfolio';

module.exports = {
  cloudinary,
  isCloudinaryConfigured,
  CLOUDINARY_FOLDER
};
