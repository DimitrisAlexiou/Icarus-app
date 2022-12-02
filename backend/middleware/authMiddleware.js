const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/users/user');
// const ExpressError = require('../utils/expressError');

// JWT Token generation
module.exports.generateToken = asyncHandler(async (id, req, res, next) => {
	return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
		expiresIn: process.env.JWT_EXPIRES,
	});
});

// Authentication function
module.exports.authenticate = asyncHandler(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			// Get the token from the header
			token = req.headers.authorization.split(' ')[1];
			// Verify the token
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			// Get user from token
			req.user = await User.findById(decoded.id).select('-password');

			next();
		} catch (error) {
			console.error('❌ Error while authenticating user ----->', error);
			res.status(401);
			throw new Error('❌ Not authorized!');
			// throw new ExpressError('❌ Not authorized!', 401);

		}
	}

	if (!token) {
		res.status(401);
		throw new Error('❌ Authorization token missing!');
		// throw new ExpressError('❌ Authorization token missing!', 401);

	}
});
