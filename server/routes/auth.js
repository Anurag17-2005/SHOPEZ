const express = require('express');
const { auth } = require('../middleware/auth');
const { registerValidation, loginValidation } = require('../middleware/validation');
const authController = require('../controllers/authController');

const router = express.Router();

// Register
router.post('/register', registerValidation, authController.register);

// Login
router.post('/login', loginValidation, authController.login);

// Get current user
router.get('/me', auth, authController.getCurrentUser);

module.exports = router;
