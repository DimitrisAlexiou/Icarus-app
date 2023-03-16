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

// @desc    Get User Notes
// @route   GET /api/note
// @access  Private
router.route('/').get(getUserNotes);

// @desc    Create User Note
// @route   POST /api/note
// @access  Private
router.route('/').post(validateNote, createUserNote);

// @desc    Delete all User Notes
// @route   DELETE /api/note
// @access  Private
router.route('/').delete(deleteUserNotes);

// @desc    Get User Note by ID
// @route   GET /api/note/:id
// @access  Private
router.route('/:id').get(viewUserNote);

// @desc    Update User Note by ID
// @route   PUT /api/note/:id
// @access  Private
router.route('/:id').put(validateNote, updateUserNote);

// @desc    Delete User Note by ID
// @route   DELETE /api/note/:id
// @access  Private
router.route('/:id').delete(deleteUserNote);

module.exports = router;
