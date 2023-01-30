const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../../models/users/user');
const { generateToken } = require('../../middleware/authMiddleware');

module.exports.login = asyncHandler(async (req, res) => {
	const { username, password } = req.body.user;

	if (!username || !password) {
		return res.status(400).json('Please fill in all the required fields!');
	}

	try {
		const user = await User.findOne({ username: username });
		if (user && (await bcrypt.compare(password, user.password))) {
			return res.status(200).json({ user, token: generateToken(user._id) });
		} else {
			return res.status(401).json('Invalid user credentials!');
		}
	} catch (error) {
		console.error('❌ Error while finding existing user: ', error);
		return res.status(500).json(`${error.message}`);
	}
});
