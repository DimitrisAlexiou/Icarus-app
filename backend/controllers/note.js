const asyncHandler = require('express-async-handler');
const Note = require('../models/note');
const User = require('../models/users/user');

//TODO FIX THE REQ.USER.ID FOR FINDING USER WITH USER ID

//? --------------------- * * NOTES CRUD * * --------------------
// View all Notes (ADMIN)
module.exports.getNotes = asyncHandler(async (req, res) => {
	try {
		const notes = await Note.find({});
		if (notes.length === 0) {
			return res.status(404).json('Seems like there are no notes!');
		} else {
			return res.status(200).json(notes);
		}
	} catch (error) {
		console.error('❌ Error while finding notes: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

// View all User Notes
module.exports.getUserNotes = asyncHandler(async (req, res) => {
	try {
		const userId = req.user.id;
		const user = await User.findById(userId);

		if (!user) {
			return res.status(401).json('User not found!');
		} else {
			try {
				const userNotes = await Note.find({
					user: userId,
				});
				if (userNotes.length === 0) {
					return res
						.status(404)
						.json(
							`Seems like there are no notes from user: ${req.user.username}!`,
						);
				} else {
					return res.status(200).json(userNotes);
				}
			} catch (error) {
				console.error('❌ Error while finding user notes: ', error);
				return res.status(500).json(`${error.message}`);
			}
		}
	} catch (error) {
		console.error('❌ Error while finding user: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

// View User Note by ID
module.exports.viewUserNote = asyncHandler(async (req, res) => {
	try {
		const userId = req.user.id;
		const user = await User.findById(userId);

		if (!user) {
			return res.status(401).json('User not found!');
		} else {
			const { id } = req.params;
			try {
				const note = await Note.findById(id);
				if (!note) {
					return res
						.status(404)
						.json(
							`Seems like there is no note with this ID for user: ${req.user.username}!`,
						);
				} else {
					if (note.user.toString() !== userId) {
						return res
							.status(401)
							.json('You are not authorized to view this note!');
					}
					return res.status(200).json(note);
				}
			} catch (error) {
				console.error('❌ Error while finding user note: ', error);
				return res.status(500).json(`${error.message}`);
			}
		}
	} catch (error) {
		console.error('❌ Error while finding user: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

// Create User Note
module.exports.createUserNote = asyncHandler(async (req, res) => {
	const { title, text } = req.body;

	if (title === undefined || text === undefined) {
		return res.status(400).json('Please fill in all the required fields!');
	}

	try {
		const userId = req.user.id;
		const user = await User.findById(userId);

		if (!user) {
			return res.status(401).json('User not found!');
		} else {
			try {
				const note = await Note.findOne({ title: title, user: userId });
				if (note) {
					return res
						.status(400)
						.json('Seems like a note with this title already exists!');
				} else {
					try {
						const newNote = await Note.create({
							title,
							text,
							user: userId,
							status: 'new',
						});
						return res.status(201).json(newNote);
					} catch (error) {
						console.error('❌ Error while creating note: ', error);
						return res.status(500).json(`${error.message}`);
					}
				}
			} catch (error) {
				console.error(
					'❌ Error while checking if note already exists: ',
					error,
				);
				return res.status(500).json(`${error.message}`);
			}
		}
	} catch (error) {
		console.error('❌ Error while finding user: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

// Update User Note
module.exports.updateUserNote = asyncHandler(async (req, res) => {
	const { title, text } = req.body;

	if (title === undefined || text === undefined) {
		return res.status(400).json('Please fill in all the required fields!');
	}

	try {
		const userId = req.user.id;
		const user = await User.findById(userId);

		if (!user) {
			return res.status(401).json('User not found!');
		} else {
			const { id } = req.params;
			try {
				const note = await Note.findById(id);
				if (!note) {
					return res
						.status(404)
						.json(
							`Seems like there is no note with this ID for user: ${req.user.username}!`,
						);
				} else {
					if (note.user.toString() !== userId) {
						return res
							.status(401)
							.json('You are not authorized to view this note!');
					} else {
						try {
							const updatedNote = await Note.findByIdAndUpdate(
								id,
								{ ...req.body.note },
								{ user: userId },
								{ new: true },
							);
							return res.status(200).json(updatedNote);
						} catch (error) {
							console.error('❌ Error while updating user note: ', error);
							return res.status(500).json(`${error.message}`);
						}
					}
				}
			} catch (error) {
				console.error('❌ Error while finding user note: ', error);
				return res.status(500).json(`${error.message}`);
			}
		}
	} catch (error) {
		console.error('❌ Error while finding user: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

// Delete User Note by ID
module.exports.deleteUserNote = asyncHandler(async (req, res) => {
	try {
		const userId = req.user.id;
		const user = await User.findById(userId);

		if (!user) {
			return res.status(401).json('User not found!');
		} else {
			const { id } = req.params;
			try {
				await Note.findByIdAndDelete(id);
				return res.status(200).json('Note deleted successfully!');
			} catch (error) {
				console.error('❌ Error while deleting user note: ', error);
				return res.status(500).json(`${error.message}`);
			}
		}
	} catch (error) {
		console.error('❌ Error while finding user: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

// Delete all User Notes
module.exports.deleteUserNotes = asyncHandler(async (req, res) => {
	try {
		const userId = req.user.id;
		const user = await User.findById(userId);

		if (!user) {
			return res.status(401).json('User not found!');
		} else {
			try {
				await Note.deleteMany({ user: userId });
				return res.status(200).json('All user notes deleted!');
			} catch (error) {
				console.error('❌ Error while deleting all user notes: ', error);
				return res.status(500).json(`${error.message}`);
			}
		}
	} catch (error) {
		console.error('❌ Error while finding user: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

// Delete all Notes (ADMIN)
module.exports.deleteNotes = asyncHandler(async (req, res) => {
	try {
		await Note.deleteMany({});
		return res.status(200).json('All notes deleted!');
	} catch (error) {
		console.error('❌ Error while deleting all notes: ', error);
		return res.status(500).json(`${error.message}`);
	}
});
