const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {
	getCourses,
	getCourse,
	createCourse,
} = require('../controllers/course');
const { validateCourse } = require('../middleware/validations');

//? --------------------- * * COURSE ROUTES * * --------------------
// @desc Get Courses
// @route GET /api/course
// @access private
router.route('/').get(catchAsync(getCourses));

// @desc Create Course
// @route POST /api/course
// @access private
router.route('/').post(catchAsync(createCourse));

// @desc Get Course by ID
// @route GET /api/course/:id
// @access private
router.route('/:id').get(catchAsync(getCourse));

module.exports = router;
