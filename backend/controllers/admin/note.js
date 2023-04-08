const asyncHandler = require('express-async-handler');
const Note = require('../models/note');
const User = require('../models/users/user');

module.exports.getNotes = asyncHandler(async (_, res) => {
	try {
		const notes = await Note.find({});
		if (notes.length === 0) {
			return res.status(404).json('Seems like there are no notes!');
		} else {
			return res.status(200).json(notes);
		}
	} catch (error) {
		console.error('❌ Error while finding notes: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later!' });
	}
});

module.exports.deleteNotes = asyncHandler(async (_, res) => {
	try {
		await Note.deleteMany({});
		return res.status(200).json('All notes deleted!');
	} catch (error) {
		console.error('❌ Error while deleting all notes: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later!' });
	}
});
