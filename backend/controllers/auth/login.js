const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../../models/users/user');
const { generateToken } = require('../../middleware/authMiddleware');

// Login User
module.exports.loginUser = asyncHandler(async (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return res.status(400).json('Please fill in all the required fields!');
	}

	try {
		const user = User.findOne({ username: username });
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

// passport.use('login', new localStrategy(
//       {
//         usernameField: 'email',
//         passwordField: 'password'
//       },
//       async (email, password, done) => {
//         try {
//           const user = await User.findOne({ email });
//           if (!user) {
//             return done(null, false, { message: 'User not found' });
//           }
//           const validate = await bcrypt.compare(password, user.password);
//           if (!validate) {
//             return done(null, false, { message: 'Wrong Password' });
//           }
//           return done(null, user, { message: 'Logged in Successfully' });
//         } catch (error) {
//           return done(error);
//         }
//       }
//     )
//   );
