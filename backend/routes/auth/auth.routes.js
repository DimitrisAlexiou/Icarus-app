const express = require('express');
const router = express.Router();
const catchAsync = require('../../utils/catchAsync');
const { register } = require('../../controllers/auth/register');
const { login } = require('../../controllers/auth/login');
const { validateUser } = require('../../middleware/validations');

// @desc    Register User
// @route   POST /api/auth/register
// @access  Private
router.route('/register').post(validateUser, catchAsync(register));

// @desc    Login User
// @route   POST /api/auth/login
// @access  Private
router.route('/login').post(catchAsync(login));

module.exports = router;
