const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

// @desc	Register User
// @route	/api/users/register
// @access	Public
module.exports.register = asyncHandler(async (req, res) => {
	try {
		const { name, surname, email, username, password } = req.body;

		if (!name || !surname || !email || !username || !password) {
			res.status(400);
			throw new Error('❌ Please include all fields');
		}

		const userExists = await User.findOne({ email });

		if (userExists) {
			res.status(400);
			throw new Error('❌ User already exists');
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const user = await User.create({
			name,
			surname,
			email,
			username,
			password: hashedPassword,
		});

		if (user) {
			res.status(201).json({
				_id: user._id,
				name: user.name,
				surname: user.surname,
				email: user.email,
				username: user.username,
				token: generateToken(user._id),
			});
		} else {
			res.status(400);
			throw new Error('❌ Something went wrong! Invalid user data.');
		}
	} catch (error) {
		console.error('❌ Error while registering user', error);
		return res.status(500).json('Something went wrong while registering user!');
	}
});

// @desc	Login User
// @route	/api/users/login
// @access	Private
module.exports.login = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		res.status(400);
		throw new Error('❌ Please include all fields');
	}

	const user = await User.findOne({ email });

	if (user && (await bcrypt.compare(password, user.password))) {
		res.status(200).json({
			_id: user._id,
			name: user.name,
			surname: user.surname,
			email: user.email,
			username: user.username,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error('❌ Invalid credentials');
	}
});

// @desc	Logout User
// @route	/api/users/logout
// @access	Private
module.exports.logout = (req, res) => {};
