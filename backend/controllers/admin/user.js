const asyncHandler = require('express-async-handler');
const User = require('../../models/users/user');
const Student = require('../../models/users/student');
const Instructor = require('../../models/users/instructor');

module.exports.getUsers = asyncHandler(async (_, res) => {
	try {
		const users = await User.find({})
			.populate({
				path: 'student',
				model: Student,
			})
			.populate({
				path: 'instructor',
				model: Instructor,
			});
		if (users.length === 0) {
			return res.status(404).json({ message: 'Seems like there are no users!' });
		} else {
			return res.status(200).json(users);
		}
	} catch (error) {
		console.error('❌ Error while finding users', error);
		return res.status(500).json({
			message: 'Something went wrong, try again later!',
		});
	}
});

module.exports.deleteUsers = asyncHandler(async (_, res) => {
	try {
		await User.deleteMany({});
		return res.status(200).json({ message: 'All users deleted!' });
	} catch (error) {
		console.error('❌ Error while deleting all users', error);
		return res.status(500).json({
			message: 'Something went wrong, try again later!',
		});
	}
});

module.exports.deleteUser = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params;
		await User.findByIdAndDelete(id);
		return res.status(200).json({ message: 'User deleted!' });
	} catch (error) {
		console.error('❌ Error while deleting user', error);
		return res.status(500).json({
			message: 'Something went wrong, try again later!',
		});
	}
});

module.exports.activateUser = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);
		if (user) {
			user.isActive = true;
			user.loginFailedAttempts = 0;
			await user.save();
			return res.status(200).json({ message: 'User account activated!' });
		} else {
			return res.status(400).json({ message: 'User not found!' });
		}
	} catch (error) {
		console.error('❌ Error while activating user', error);
		return res.status(500).json({
			message: 'Something went wrong, try again later!',
		});
	}
});

module.exports.createUser = asyncHandler(async (req, res) => {
	try {
		const user = new User(req.body);
		const newUser = await user.save();
		return res.status(201).json(newUser);
	} catch (error) {
		console.error('❌ Error while creating user', error);
		return res.status(500).json({
			message: 'Something went wrong, try again later!',
		});
	}
});

module.exports.getStudents = asyncHandler(async (_, res) => {
	try {
		const students = await Student.find({});
		if (students.length === 0) {
			return res.status(404).json({ message: 'Seems like there are no students!' });
		} else {
			return res.status(200).json(students);
		}
	} catch (error) {
		console.error('❌ Error while finding students', error);
		return res.status(500).json({
			message: 'Something went wrong, try again later!',
		});
	}
});

module.exports.getInstructors = asyncHandler(async (_, res) => {
	try {
		const instructors = await Instructor.find({});
		if (instructors.length === 0) {
			return res.status(404).json({ message: 'Seems like there are no instructors!' });
		} else {
			return res.status(200).json(instructors);
		}
	} catch (error) {
		console.error('❌ Error while finding instructors', error);
		return res.status(500).json({
			message: 'Something went wrong, try again later!',
		});
	}
});
