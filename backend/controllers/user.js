const asyncHandler = require('express-async-handler');
const User = require('../models/users/user');
const Student = require('../models/users/student');
const Instructor = require('../models/users/instructor');

module.exports.viewUser = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id)
			.populate({
				path: 'student',
				model: Student,
			})
			.populate({
				path: 'instructor',
				model: Instructor,
			});
		if (!user) {
			return res.status(404).json({ message: 'Seems like there is no user with this ID!' });
		} else {
			return res.status(200).json(user);
		}
	} catch (error) {
		console.error('❌ Error while finding user', error);
		return res.status(500).json({ message: `${error.message}` });
	}
});

module.exports.updateUser = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findByIdAndUpdate(id, { ...req.body });
		if (!user) {
			return res.status(404).json({ message: 'Seems like there is no user with this ID!' });
		} else {
			const updatedUser = await user.save();
			return res.status(200).json(updatedUser);
		}
	} catch (error) {
		console.error('❌ Error while finding user', error);
		return res.status(500).json({ message: `${error.message}` });
	}
});

module.exports.deleteUser = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params;
		await User.findByIdAndDelete(id);
		return res.status(200).json({ message: 'User deleted successfully!' });
	} catch (error) {
		console.error('❌ Error while deleting user', error);
		return res.status(500).json({ message: `${error.message}` });
	}
});
