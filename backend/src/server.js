require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const { initDatabase } = require('./config/db');

// Import Modular Routes
const authRoutes = require('./routes/authRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const projectsRoutes = require('./routes/projectsRoutes');
const skillsRoutes = require('./routes/skillsRoutes');
const experienceRoutes = require('./routes/experienceRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Security & Standard Middleware
app.use(cors({ origin: '*' }));
app.use(
  helmet({
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
    frameguard: false
  })
);
app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Clean NoSQL Injection protection helper
function sanitizeNoSQL(obj) {
  if (obj && typeof obj === 'object') {
    for (const key in obj) {
      if (/^\$/.test(key)) {
        delete obj[key];
      } else {
        sanitizeNoSQL(obj[key]);
      }
    }
  }
}

// Sanitize user inputs against MongoDB Operator Injection
app.use((req, res, next) => {
  if (req.body) sanitizeNoSQL(req.body);
  if (req.params) sanitizeNoSQL(req.params);
  next();
});

// Static uploads serving with iframe and CORS headers for inline PDF viewing
app.use(
  '/uploads',
  (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.removeHeader('X-Frame-Options');
    next();
  },
  express.static(uploadDir)
);

// Mount API Routes
app.use('/api/auth', authRoutes);
app.use('/api', portfolioRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api', contactRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled API Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// Initialize database and start server
initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Secure Portfolio Backend Server is live at http://localhost:${PORT}`);
  });
});
