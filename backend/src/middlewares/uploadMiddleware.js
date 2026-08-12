const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure root uploads directory exists
const uploadDir = path.join(__dirname, '..', '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const cleanFilename = file.originalname.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 20);
    const uniqueName = `${Date.now()}-${cleanFilename}${ext}`;
    cb(null, uniqueName);
  }
});

// File Filter: Accept images only
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp|gif|svg/;
  const extValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeValid = allowedTypes.test(file.mimetype);

  if (extValid && mimeValid) {
    return cb(null, true);
  }
  cb(new Error('Only image files (JPEG, PNG, WEBP, GIF, SVG) are allowed!'));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 15 * 1024 * 1024 } // 15MB max file size
});

module.exports = upload;
