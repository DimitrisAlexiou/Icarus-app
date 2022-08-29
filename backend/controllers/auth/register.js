const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../../models/users/user');
const { generateToken } = require('../../middleware/authMiddleware');

// Register User
module.exports.registerUser = asyncHandler(async (req, res) => {
	const { name, surname, username, email, password, confirmPassword } =
		req.body;

	if (
		!name ||
		!surname ||
		!username ||
		!email ||
		!password ||
		!confirmPassword
	) {
		return res.status(400).json('Please fill in all the required fields!');
	}

	if (password !== confirmPassword) {
		return res.status(400).json('Provided passwords do not match!');
	}

	try {
		const userExists = await User.findOne({ email: email });
		if (userExists) {
			return res
				.status(400)
				.json('Seems like a user with this email already exists!');
		} else {
			try {
				const usernameTaken = await User.findOne({ username: username });
				if (usernameTaken) {
					return res.status(400).json('Seems like this username is taken!');
				} else {
					try {
						const salt = await bcrypt.genSalt(12);
						const hashedPassword = await bcrypt.hash(password, salt);
						const user = await User.create({
							name,
							surname,
							username,
							email,
							password: hashedPassword,
							status: 'new',
						});
						return res
							.status(201)
							.json({ user, token: generateToken(user._id) });
					} catch (error) {
						console.error('❌ Error while creating user: ', error);
						return res.status(500).json(`${error.message}`);
					}
				}
			} catch (error) {
				console.error('❌ Error while checking if username is taken: ', error);
				return res.status(500).json(`${error.message}`);
			}
		}
	} catch (error) {
		console.error('❌ Error while finding existing user: ', error);
		return res.status(500).json(`${error.message}`);
	}
});
