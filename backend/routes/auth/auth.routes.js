const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { register, login } = require('../controllers/auth');
const { validateUser } = require('../middleware/validations');
const { authenticate } = require('../middleware/authMiddleware');

// @desc    Register User
// @route   GET /api/register
// @access  Private
router.route('/').get(catchAsync(register));

// @desc    Login User
// @route   POST /api/login
// @access  Private
router.route('/').post(catchAsync(login));

module.exports = router;
