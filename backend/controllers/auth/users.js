const asyncHandler = require('express-async-handler');
const User = require('../../models/user');

module.exports.registerForm = (req, res) => {
	res.render('auth/register');
};

// @desc Register User
// @route /api/users/register
// @access Public
module.exports.register = asyncHandler(async (req, res) => {
	try {
		const { email, username, password } = req.body;
		const user = new User({ email, username });
		const registeredUser = await User.register(user, password);
		req.login(registeredUser, (err) => {
			if (err) return next(err);
			req.flash('success', 'Welcome to icarus!');
			res.redirect('/');
		});
	} catch (err) {
		req.flash('error', err.message);
		res.redirect('/register');
	}
});

module.exports.loginForm = (req, res) => {
	res.render('auth/login');
};

// @desc Login User
// @route /api/users/login
// @access Private
module.exports.login = asyncHandler(async (req, res) => {
	req.flash('success', 'Welcome back!');
	const redirectUrl = req.session.returnTo || '/';
	delete req.session.returnTo;
	res.redirect(redirectUrl);
});

module.exports.logout = (req, res) => {
	req.logout();
	req.flash('success', 'Logged out!');
	res.redirect('/');
};
