const express = require('express');
const router = express.Router();
const {
	createCourse,
	updateCourse,
	viewCourse,
	deleteCourse,
	activateCourse,
	getCourses,
	deleteCourses,
} = require('../controllers/course/course');
const { validateCourse } = require('../middleware/validations');
const { authorize } = require('../middleware/authMiddleware');

// @desc    Get / Delete Courses
// @route   GET/DELETE /api/course
// @access  Private
router.route('/').get(authorize, getCourses).delete(authorize, deleteCourses);

// @desc    Create Course
// @route   POST /api/course/new
// @access  Private
router.route('/new').post(validateCourse, createCourse);

// @desc    Get / Delete / Update Course
// @route   GET/DELETE/PUT /api/course/:id
// @access  Private
router
	.route('/:id')
	.get(authorize, viewCourse)
	.delete(authorize, deleteCourse)
	.put(authorize, validateCourse, updateCourse);

// @desc    Activate Course
// @route   PUT /api/course/:id/activate
// @access  Private
router.route('/:id/activate').put(authorize, validateCourse, activateCourse);

module.exports = router;
