const express = require('express');
const router = express.Router();
const {
	getUserNotes,
	viewUserNote,
	createUserNote,
	updateUserNote,
	deleteUserNote,
	deleteUserNotes,
} = require('../controllers/note');
const { validateNote } = require('../middleware/validations');
const { authorize } = require('../middleware/authMiddleware');
const { upload } = require('../utils/upload');

// @desc    Get / Post / Delete User Notes
// @route   GET/POST/DELETE /api/note
// @access  Private
router
	.route('/')
	.get(authorize, getUserNotes)
	.post(authorize, upload.single('file'), validateNote, createUserNote)
	.delete(authorize, deleteUserNotes);

// @desc    Get / Update / Delete User Note by ID
// @route   GET/PUT/DELETE /api/note/:id
// @access  Private
router
	.route('/:id')
	.get(authorize, viewUserNote)
	.put(authorize, upload.single('file'), validateNote, updateUserNote)
	.delete(authorize, deleteUserNote);

router.route('/:id/importance').put(authorize, validateNote, updateUserNote);

module.exports = router;
