const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/users/user');
const ExpressError = require('../utils/expressError');

module.exports.generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
		expiresIn: process.env.JWT_EXPIRES,
	});
};

module.exports.authorize = asyncHandler(async (req, res, next) => {
	let token;

	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		try {
			// Get the token from the header
			token = req.headers.authorization.split(' ')[1];
			// Verify the token
			const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
			// Get user from token
			req.user = await User.findById(decoded.id).select('-password');

			next();
		} catch (error) {
			console.error('❌ Error while authorizing user ---> ', error);
			res.status(401);
			throw new ExpressError('❌ Not authorized!', 401);
		}
	}

	if (!token) {
		res.status(401);
		throw new ExpressError('❌ Authorization token missing!', 401);
	}
});
