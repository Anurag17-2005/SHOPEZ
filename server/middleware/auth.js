const jwt = require('jsonwebtoken');

// Authentication middleware
const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        message: 'No token provided, authorization denied',
        error: 'UNAUTHORIZED'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        message: 'Token has expired',
        error: 'TOKEN_EXPIRED'
      });
    }
    res.status(401).json({ 
      message: 'Token is not valid',
      error: 'INVALID_TOKEN'
    });
  }
};

// Admin authorization middleware
const adminAuth = (req, res, next) => {
  if (req.user.usertype !== 'ADMIN') {
    return res.status(403).json({ 
      message: 'Access denied. Admin privileges required.',
      error: 'FORBIDDEN'
    });
  }
  next();
};

module.exports = { auth, adminAuth };
