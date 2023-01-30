const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {
	getCourses,
	viewCourse,
	createCourse,
	activateCourse,
	updateCourse,
	deleteCourse,
	deleteCourses,
	getPrerequisites,
	defineCoursePrerequisites,
	deleteCoursePrerequisites,
} = require('../controllers/course');
const { validateCourse, validateSemester } = require('../middleware/validations');
const { authorize } = require('../middleware/authMiddleware');

// @desc    Get Courses
// @route   GET /api/course
// @access  Private
router.route('/').get(catchAsync(getCourses));
router.route('/prerequisites').get(catchAsync(getPrerequisites));

// @desc    Delete All Courses
// @route   DELETE /api/course
// @access  Private
router.route('/').delete(catchAsync(deleteCourses));
router.route('/prerequisites').delete(catchAsync(deleteCoursePrerequisites));

// @desc    Create Course
// @route   POST /api/course/new
// @access  Private
router.route('/new').post(validateCourse, catchAsync(createCourse));

// @desc    Activate Course
// @route   PUT /api/course/:id
// @access  Private
router.route('/:id').put(validateCourse, validateSemester, catchAsync(activateCourse));

// @desc    Get Course by ID
// @route   GET /api/course/:id
// @access  Private
router.route('/:id').get(catchAsync(viewCourse));

// @desc    Delete Course by ID
// @route   DELETE /api/course/:id
// @access  Private
router.route('/:id').delete(catchAsync(deleteCourse));

// @desc    Update Course by ID
// @route   PUT /api/course/:id/edit
// @access  Private
router.route('/:id/edit').put(validateCourse, catchAsync(updateCourse));

// router.route('/:id/prerequisites').post(catchAsync(defineCoursePrerequisites));

module.exports = router;
