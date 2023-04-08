const asyncHandler = require('express-async-handler');
const Note = require('../models/note');
const User = require('../models/users/user');

module.exports.createUserNote = asyncHandler(async (req, res) => {
	const { title, text, postDate, file, categories, importance } = req.body;

	if (!title || !text) {
		return res.status(400).json('Please fill in all the required fields!');
	}

	if (categories && typeof categories === 'string') {
		categories = categories.split(',');
	}

	try {
		const userId = req.user.id;
		const user = await User.findById(userId);

		if (!user) {
			return res.status(401).json('User not found!');
		} else {
			try {
				const existingNote = await Note.findOne({ title: title, owner: userId });
				if (existingNote) {
					return res
						.status(400)
						.json('Seems like a note with this title already exists!');
				} else {
					try {
						const note = await Note.create({
							title,
							text,
							postDate,
							file,
							categories,
							importance,
							owner: userId,
							status: 'new',
						});
						console.log(note);
						return res.status(201).json(note);
					} catch (error) {
						console.error('❌ Error while creating note: ', error);
						return res
							.status(500)
							.json({ message: 'Something went wrong, try again later!' });
					}
				}
			} catch (error) {
				console.error('❌ Error while checking if note already exists: ', error);
				return res.status(500).json({ message: 'Something went wrong, try again later!' });
			}
		}
	} catch (error) {
		console.error('❌ Error while finding user: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later!' });
	}
});

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
						.json(`Seems like there is no note with this ID for this user!`);
				} else {
					if (note.owner.toString() !== userId) {
						return res.status(401).json('You are not authorized to view this note!');
					}
					return res.status(200).json(note);
				}
			} catch (error) {
				console.error('❌ Error while finding user note: ', error);
				return res.status(500).json({ message: 'Something went wrong, try again later!' });
			}
		}
	} catch (error) {
		console.error('❌ Error while finding user: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later!' });
	}
});

module.exports.updateUserNote = asyncHandler(async (req, res) => {
	const { title, text } = req.body;

	if (!title || !text) {
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
						.json(`Seems like there is no note with this ID for this user!`);
				} else {
					if (note.owner.toString() !== userId) {
						return res.status(401).json('You are not authorized to view this note!');
					} else {
						try {
							const updatedNote = await Note.findByIdAndUpdate(id, req.body, {
								new: true,
							});
							return res.status(200).json(updatedNote);
						} catch (error) {
							console.error('❌ Error while updating user note: ', error);
							return res
								.status(500)
								.json({ message: 'Something went wrong, try again later!' });
						}
					}
				}
			} catch (error) {
				console.error('❌ Error while finding user note: ', error);
				return res.status(500).json({ message: 'Something went wrong, try again later!' });
			}
		}
	} catch (error) {
		console.error('❌ Error while finding user: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later!' });
	}
});

module.exports.getUserNotes = asyncHandler(async (req, res) => {
	try {
		const userId = req.user.id;
		const user = await User.findById(userId);

		if (!user) {
			return res.status(401).json('User not found!');
		} else {
			try {
				const userNotes = await Note.find({
					owner: userId,
				});
				if (userNotes.length === 0) {
					return res.status(404).json(`Seems like there are no notes for this user`);
				} else {
					return res.status(200).json(userNotes);
				}
			} catch (error) {
				console.error('❌ Error while finding user notes: ', error);
				return res.status(500).json({ message: 'Something went wrong, try again later!' });
			}
		}
	} catch (error) {
		console.error('❌ Error while finding user: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later!' });
	}
});

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
				return res.status(200).json('Note deleted!');
			} catch (error) {
				console.error('❌ Error while deleting user note: ', error);
				return res.status(500).json({ message: 'Something went wrong, try again later!' });
			}
		}
	} catch (error) {
		console.error('❌ Error while finding user: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later!' });
	}
});

module.exports.deleteUserNotes = asyncHandler(async (req, res) => {
	try {
		const userId = req.user.id;
		const user = await User.findById(userId);

		if (!user) {
			return res.status(401).json('User not found!');
		} else {
			try {
				await Note.deleteMany({ owner: userId });
				return res.status(200).json('All user notes deleted!');
			} catch (error) {
				console.error('❌ Error while deleting all user notes: ', error);
				return res.status(500).json({ message: 'Something went wrong, try again later!' });
			}
		}
	} catch (error) {
		console.error('❌ Error while finding user: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later!' });
	}
});
