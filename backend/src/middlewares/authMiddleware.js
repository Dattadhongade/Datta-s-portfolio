const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_high_entropy_jwt_key_datta_2026';

/**
 * Middleware to protect admin routes.
 * Verifies JWT token supplied in Authorization header.
 */
async function protectAdmin(req, res, next) {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.admin_token) {
    token = req.cookies.admin_token;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access Denied: Authentication token required.'
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // Fetch user from DB if connected, or verify decoded payload
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user && process.env.NODE_ENV === 'production') {
      return res.status(401).json({
        success: false,
        message: 'Invalid authorization session: User account no longer exists.'
      });
    }

    req.user = user || { id: decoded.id, username: decoded.username, role: decoded.role };
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Authentication failed: Invalid or expired token.'
    });
  }
}

module.exports = { protectAdmin };
