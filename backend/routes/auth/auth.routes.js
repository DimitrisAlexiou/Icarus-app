const express = require('express');
const router = express.Router();
const { register } = require('../../controllers/auth/register');
const { login } = require('../../controllers/auth/login');
const { forgotPassword } = require('../../controllers/auth/forgotPassword');
const { resetPassword } = require('../../controllers/auth/resetPassword');
const { resetPasswordLimiter } = require('../../middleware/authMiddleware');
const { validateUser } = require('../../middleware/validations');

// @desc    Register User
// @route   POST /api/auth/register
// @access  Public
router.route('/register').post(validateUser, register);

// @desc    Login User
// @route   POST /api/auth/login
// @access  Public
router.route('/login').post(login);

// @desc    Forgot User Password
// @route   POST /api/auth/forgot-password
// @access  Private
// router.route('/forgot-password').post(resetPasswordLimiter, forgotPassword);

// @desc    Change User Password
// @route   POST /api/user/profile/reset-password
// @access  Private
router.route('/reset-password').post(resetPasswordLimiter, resetPassword);

module.exports = router;
