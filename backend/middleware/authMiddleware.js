const asyncHandler = require('express-async-handler');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const User = require('../models/users/user');
const ExpressError = require('../utils/expressError');

module.exports.generateToken = (id) => {
	return jwt.sign(
		{ id },
		process.env.JWT_SECRET_KEY,
		{
			expiresIn: 7200,
			// expiresIn: process.env.JWT_EXPIRES,
		},
		{ algorithm: 'HS512' }
	);
};

// module.exports.authorize = asyncHandler(async (req, res, next) => {
// 	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
// 		try {
// 			const token = req.headers.authorization.split(' ')[1];
// 			const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY, { algorithm: 'HS512' });
// 			req.user = await User.findById(decoded.id).select('-password');

// 			next();
// 		} catch (error) {
// 			if (error instanceof jwt.TokenExpiredError) {
// 				console.error('❌ TokenExpiredError ---> '.red.bold, error);
// 				return res.status(401).json({ message: 'Token has expired. Please log in again.' });
// 			}
// 			console.error('❌ Error while authorizing user ---> '.red.bold, error);
// 			res.status(401).json({ message: 'Unauthorized access. Please log in first.' });
// 			throw new ExpressError('❌ Not authorized!', 401);
// 		}
// 	} else {
// 		res.status(401);
// 		throw new ExpressError('❌ Authorization token missing!', 401);
// 	}
// });

module.exports.authorize = asyncHandler(async (req, res, next) => {
	let token;

	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		try {
			token = req.headers.authorization.split(' ')[1];
			const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY, { algorithm: 'HS512' });
			req.user = await User.findById(decoded.id).select('-password');

			if (!req.user) {
				res.status(401).json({ message: 'Unauthorized access. Please log in first.' });
				throw new ExpressError('❌ Not authorized!', 401);
			}

			next();
		} catch (error) {
			if (error instanceof jwt.TokenExpiredError) {
				console.error('❌ TokenExpiredError: '.red.bold, error);
				return res.status(401).json({ message: 'Token has expired. Please log in again.' });
			}
			console.error('❌ Error while authorizing user: '.red.bold, error);
			res.status(401).json({ message: 'Unauthorized access. Please log in first.' });
			throw new ExpressError('❌ Not authorized!', 401);
		}
	}

	if (!token) {
		res.status(401).json({ message: 'Token is missing. Please log in first.' });
		throw new ExpressError('❌ Not authorized!', 401);
	}
});

// Limit requests to 5 per hour
module.exports.resetPasswordLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour
	max: 5,
	message: 'Too many password reset attempts, please try again later.',
});

module.exports.checkUserRole = (allowedRoles) => {
	return (req, res, next) => {
		// check if user is authenticated
		if (!req.user) {
			return res.status(401).json({ message: 'Unauthorized! Please login first.' });
		}
		// check if user has any of the allowed roles
		if (!allowedRoles.includes(req.user.type)) {
			return res.status(403).json({ message: 'Forbidden' });
		}

		// user has one of the allowed roles, call next middleware function
		next();
	};
};
