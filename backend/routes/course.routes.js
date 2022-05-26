const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {
	getCourses,
	viewCourse,
	createCourse,
	updateCourse,
	deleteCourse,
	deleteCourses,
} = require('../controllers/course');
const { validateCourse } = require('../middleware/validations');
const { authenticate } = require('../middleware/authMiddleware');

// @desc Get Courses
// @route GET /api/course
// @access private
router.route('/').get(catchAsync(getCourses));

// @desc Delete All Courses
// @route DELETE /api/course
// @access private
router.route('/').delete(catchAsync(deleteCourses));

// @desc Create Course
// @route POST /api/course/new
// @access private
router.route('/new').post(validateCourse, catchAsync(createCourse));

// @desc Get Course by ID
// @route GET /api/course/:id
// @access private
router.route('/:id').get(catchAsync(viewCourse));

// @desc Update Course by ID
// @route PUT /api/course/:id
// @access private
router.route('/:id').put(validateCourse, catchAsync(updateCourse));

// @desc Delete Course by ID
// @route DELETE /api/course/:id
// @access private
router.route('/:id').delete(catchAsync(deleteCourse));

module.exports = router;
