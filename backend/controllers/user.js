const asyncHandler = require('express-async-handler');
const User = require('../models/user');

// View Users
module.exports.getUsers = asyncHandler(async (req, res) => {
	try {
		const users = await User.find({});
		if (users.length === 0) {
			return res.status(404).json('Seems like there are no users!');
		} else {
			return res.status(200).json(users);
		}
	} catch (error) {
		console.error('❌ Error while finding users', error);
		return res
			.status(500)
			.json('Something wrong happened while finding users!');
	}
});

// View User
module.exports.viewUser = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);
		if (!user) {
			return res.status(404).json('Seems like there is no user with this ID!');
		} else {
			return res.status(200).json(user);
		}
	} catch (error) {
		console.error('❌ Error while finding user', error);
		return res
			.status(500)
			.json('Something wrong happened while finding this user!');
	}
});

// Create User
module.exports.createUser = asyncHandler(async (req, res) => {
	try {
		const user = new User(req.body);
		const newUser = await user.save();
		return res.status(201).json(newUser);
	} catch (error) {
		console.error('❌ Error while creating user', error);
		return res
			.status(500)
			.json('Something wrong happened while creating this user!');
	}
});

// Update User
module.exports.updateUser = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findByIdAndUpdate(id, { ...req.body.user });
		if (!user) {
			return res.status(404).json('Seems like there is no user with this ID!');
		} else {
			const updatedUser = await user.save();
			return res.status(200).json(updatedUser);
		}
	} catch (error) {
		console.error('❌ Error while finding user', error);
		return res
			.status(500)
			.json('Something wrong happened while finding this user!');
	}
});

// Delete User by ID
module.exports.deleteUser = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params;
		await User.findByIdAndDelete(id);
		return res.status(200).json('User deleted successfully!');
	} catch (error) {
		console.error('❌ Error while deleting user', error);
		return res
			.status(500)
			.json('Something wrong happened while deleting user!');
	}
});

// Delete All Users
module.exports.deleteUsers = asyncHandler(async (req, res) => {
	try {
		await User.deleteMany({});
		return res.status(200).json('All users deleted!');
	} catch (error) {
		console.error('❌ Error while deleting all users', error);
		return res
			.status(500)
			.json('Something wrong happened while deleting all users!');
	}
});
