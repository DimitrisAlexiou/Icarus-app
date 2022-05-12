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
router.route('/').get(authenticate, catchAsync(getCourses));

// @desc Create Course
// @route POST /api/course
// @access private
router.route('/').post(authenticate, validateCourse, catchAsync(createCourse));

// @desc Delete All Courses
// @route DELETE /api/course
// @access private
router.route('/').delete(authenticate, catchAsync(deleteCourses));

// @desc Get Course by ID
// @route GET /api/course/:id
// @access private
router.route('/:id').get(authenticate, catchAsync(viewCourse));

// @desc Update Course by ID
// @route PUT /api/course/:id
// @access private
router
	.route('/:id')
	.put(authenticate, validateCourse, catchAsync(updateCourse));

// @desc Delete Course by ID
// @route DELETE /api/course/:id
// @access private
router.route('/:id').delete(authenticate, catchAsync(deleteCourse));

module.exports = router;
