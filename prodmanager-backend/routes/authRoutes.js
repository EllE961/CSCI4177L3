const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { 
  validateUserRegistration, 
  validateUserLogin 
} = require('../middleware/validationMiddleware');

// POST /api/auth/register
router.post('/register', validateUserRegistration, register);

// POST /api/auth/login
router.post('/login', validateUserLogin, login);

module.exports = router; 