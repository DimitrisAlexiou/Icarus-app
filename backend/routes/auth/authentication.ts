import express from 'express';
import { register } from '../../controllers/auth/register';
import { login } from '../../controllers/auth/login';
// import { forgotPassword } from '../../controllers/auth/forgotPassword';
import { resetPassword } from '../../controllers/auth/resetPassword';
import { resetPasswordLimiter } from '../../middleware/authMiddleware';
import { validateUser } from '../../middleware/validations';

export default (router: express.Router) => {
	// @desc    Register User
	// @route   POST /api/auth/register
	// @access  Public
	router.route('/auth/register').post(validateUser, register);

	// @desc    Login User
	// @route   POST /api/auth/login
	// @access  Public
	router.route('/auth/login').post(login);

	// @desc    Forgot User Password
	// @route   POST /api/auth/forgot-password
	// @access  Private
	// router.route('/auth/forgot-password').post(resetPasswordLimiter, forgotPassword);

	// @desc    Change User Password
	// @route   POST /api/user/profile/reset-password
	// @access  Private
	router.route('/user/profile/reset-password').post(resetPasswordLimiter, resetPassword);
};
