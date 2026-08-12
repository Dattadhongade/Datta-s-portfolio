const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { isDbConnected } = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_high_entropy_jwt_key_datta_2026';

/**
 * @desc    Admin Login
 * @route   POST /api/auth/login
 * @access  Public (Rate-limited)
 */
async function login(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required.'
      });
    }

    const cleanUsername = String(username).trim().toLowerCase();

    // 1. If MongoDB is connected, authenticate against MongoDB User collection
    if (isDbConnected()) {
      const user = await User.findOne({ username: cleanUsername });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials.'
        });
      }

      // Check if account is currently locked due to failed attempts
      if (user.isLocked) {
        const lockMinutesLeft = Math.ceil((user.lockUntil - Date.now()) / 60000);
        return res.status(429).json({
          success: false,
          message: `Account temporarily locked due to multiple failed login attempts. Please try again in ${lockMinutesLeft} minute(s).`
        });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        await user.incLoginAttempts();
        const attemptsLeft = 5 - (user.failedLoginAttempts + 1);
        
        let warningMsg = 'Invalid credentials.';
        if (attemptsLeft > 0 && attemptsLeft < 5) {
          warningMsg += ` Warning: ${attemptsLeft} attempt(s) remaining before security lockout.`;
        }

        return res.status(401).json({
          success: false,
          message: warningMsg
        });
      }

      // Password is valid - reset failed login attempts
      await user.resetLoginAttempts();

      // Issue signed JWT token
      const token = jwt.sign(
        { id: user._id, username: user.username, role: user.role },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      return res.json({
        success: true,
        message: 'Admin authentication successful.',
        token,
        user: {
          username: user.username,
          role: user.role
        }
      });
    } else {
      // 2. Fallback mode: Authenticate against environment variables if DB connection is offline
      require('dotenv').config();
      const envUsername = String(process.env.ADMIN_USERNAME || 'dattadhongade12@gmail.com').trim().toLowerCase();
      const envPassword = String(process.env.ADMIN_PASSWORD || 'Datta@$#2003!').trim();

      if (cleanUsername === envUsername && String(password).trim() === envPassword) {
        const token = jwt.sign(
          { id: 'offline_admin', username: cleanUsername, role: 'admin' },
          JWT_SECRET,
          { expiresIn: '7d' }
        );

        return res.json({
          success: true,
          message: 'Admin authentication successful (Offline Fallback Mode).',
          token,
          user: {
            username: cleanUsername,
            role: 'admin'
          }
        });
      }

      return res.status(401).json({
        success: false,
        message: 'Invalid credentials.'
      });
    }
  } catch (err) {
    console.error('Error during admin login:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error during authentication.'
    });
  }
}

/**
 * @desc    Get Current Admin Info
 * @route   GET /api/auth/me
 * @access  Protected
 */
async function getMe(req, res) {
  try {
    return res.json({
      success: true,
      user: req.user
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching session user info.'
    });
  }
}

/**
 * @desc    Change Admin Password
 * @route   POST /api/auth/change-password
 * @access  Protected
 */
async function changePassword(req, res) {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required.'
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 8 characters long.'
      });
    }

    if (isDbConnected() && req.user && req.user._id) {
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found.' });
      }

      const isMatch = await user.comparePassword(currentPassword);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Incorrect current password.' });
      }

      user.password = newPassword;
      await user.save();

      return res.json({
        success: true,
        message: 'Password updated successfully.'
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Password change is only supported when MongoDB is online.'
      });
    }
  } catch (err) {
    console.error('Error changing admin password:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to change password.'
    });
  }
}

module.exports = {
  login,
  getMe,
  changePassword
};
