const multer = require('multer');
const path = require('path');

// Memory storage allows direct stream upload to Cloudinary or disk fallback
const storage = multer.memoryStorage();

// File Filter: Accept images and PDF documents
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp|gif|svg|pdf/;
  const extValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeValid = /jpeg|jpg|png|webp|gif|svg|pdf/.test(file.mimetype) || file.mimetype === 'application/pdf';

  if (extValid && mimeValid) {
    return cb(null, true);
  }
  cb(new Error('Only images (JPEG, PNG, WEBP, GIF, SVG) and PDF documents are allowed!'));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 25 * 1024 * 1024 } // 25MB max file size
});

module.exports = upload;

