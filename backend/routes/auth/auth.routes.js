const express = require('express');
const router = express.Router();
const passport = require('passport');

const users = require('../../controllers/auth/users');
const catchAsync = require('../../utils/catchAsync');

// Register
router.route('/register').post(catchAsync(users.register));

// Login
router.route('/login').post(
	passport.authenticate('local', {
		failureFlash: true,
		failureRedirect: '/login',
	}),
	users.login,
);

// Logout
router.get('/logout', users.logout);

module.exports = router;
