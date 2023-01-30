const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../../models/users/user');
const { generateToken } = require('../../middleware/authMiddleware');

module.exports.register = asyncHandler(async (req, res) => {
	const { name, surname, username, email, password } = req.body.user;

	if (!name || !surname || !username || !email || !password) {
		return res.status(400).json('Please fill in all the required fields!');
	}

	try {
		const userExists = await User.findOne({ email: email });
		if (userExists) {
			return res.status(400).json('Seems like a user with this email already exists!');
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
						if (user) {
							return res.status(201).json({ user, token: generateToken(user._id) });
						} else {
							return res.status(400).json('Invalid user data');
						}
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
