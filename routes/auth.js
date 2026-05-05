const express = require('express');
const router = express.Router();
const { register, login, getProfile, logout } = require('../controllers/authController');
const auth = require('../middleware/auth');

// Register a new user
router.post('/register', register);

// Login user
router.post('/login', login);

// Get user profile (protected)
router.get('/profile', auth, getProfile);

// Logout user
router.post('/logout', logout);

module.exports = router;
