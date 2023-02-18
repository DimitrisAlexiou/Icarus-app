const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../../models/users/user');
const { generateToken } = require('../../middleware/authMiddleware');

module.exports.login = asyncHandler(async (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return res.status(400).json({ message: 'Please fill in all the required fields!' });
	}

	try {
		const user = await User.findOne({ username: username });
		if (user && (await bcrypt.compare(password, user.password))) {
			if (user.lastLogin === null && user.isActive === false) {
				return res
					.status(400)
					.json({ message: 'Account is not yet active, it will be available soon.' });
			} else if (user.lastLogin !== null && user.isActive === false) {
				return res.status(400).json({
					message: 'Account is deactivated, please contact the admin.',
				});
			} else {
				user.lastLogin = new Date();
				user.loginFailedAttempts = 0;
				await user.save();
				return res.status(200).json({ user, token: generateToken(user._id) });
			}
		} else {
			if (user && user.lastLogin !== null && user.isActive === true) {
				user.loginFailedAttempts++;
				if (user.loginFailedAttempts >= 3) {
					user.isActive = false;
				}
				await user.save();
			} else if (user && user.lastLogin !== null && user.isActive === false) {
				return res.status(400).json({
					message: 'Account is deactivated, please contact the admin.',
				});
			}
			return res.status(401).json({ message: 'Invalid user credentials!' });
		}
	} catch (error) {
		console.error('❌ Error while finding existing user: ', error);
		return res.status(500).json({ message: `${error.message}` });
	}
});
