import express from 'express';
import { register } from '../../controllers/auth/register';
import { login } from '../../controllers/auth/login';
// import { forgotPassword } from '../../controllers/auth/forgotPassword';
import { changePassword } from '../../controllers/auth/changePassword';
import { authorize, isOwner, resetPasswordLimiter } from '../../middleware/authMiddleware';
import { validateUser } from '../../middleware/validations';
import { revokeToken } from '../../controllers/auth/authToken';
import { viewProfile } from '../../controllers/user';
// import { refreshToken } from '../../controllers/auth/authToken';

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

	// @desc     Get User Profile / Change User Password
	// @route   GET/POST /api/user/profile
	// @access  Private
	router
		.route('/user/profile')
		.get(authorize, isOwner, viewProfile)
		.put(authorize, isOwner, resetPasswordLimiter, changePassword);

	// @desc    Route to revoke a token
	// @route   POST /api/auth/revoke-token
	// @access  Private
	router.route('/auth/revoke-token').post(revokeToken);

	// @desc    Route to refresh the access token
	// @route   POST /api/auth/refresh-token
	// @access  Private
	// router.route('/auth/refresh-token').post(refreshToken);
};
