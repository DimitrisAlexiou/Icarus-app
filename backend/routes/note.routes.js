const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
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
router.route('/').get(catchAsync(getUserNotes));

// @desc    Create User Note
// @route   POST /api/note
// @access  Private
router.route('/').post(validateNote, catchAsync(createUserNote));

// @desc    Delete all User Notes
// @route   DELETE /api/note
// @access  Private
router.route('/').delete(catchAsync(deleteUserNotes));

// @desc    Get User Note by ID
// @route   GET /api/note/:id
// @access  Private
router.route('/:id').get(catchAsync(viewUserNote));

// @desc    Update User Note by ID
// @route   PUT /api/note/:id
// @access  Private
router.route('/:id').put(validateNote, catchAsync(updateUserNote));

// @desc    Delete User Note by ID
// @route   DELETE /api/note/:id
// @access  Private
router.route('/:id').delete(catchAsync(deleteUserNote));

module.exports = router;
