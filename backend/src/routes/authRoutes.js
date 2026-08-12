const express = require('express');
const rateLimit = require('express-rate-limit');
const { login, getMe, changePassword } = require('../controller/authController');
const { protectAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

// Strict Rate Limiting for Admin Login to prevent brute-force attacks
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login attempts per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many failed login attempts from this IP address. Please wait 15 minutes before trying again.'
  }
});

// Admin Auth Routes
router.post('/login', loginLimiter, login);
router.get('/me', protectAdmin, getMe);
router.post('/change-password', protectAdmin, changePassword);

module.exports = router;
