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
const { authorize, checkUserRole } = require('../middleware/authMiddleware');

// @desc    Get / Delete Courses
// @route   GET/DELETE /api/course
// @access  Private
router
	.route('/')
	.get(authorize, getCourses)
	.delete(authorize, checkUserRole(['Admin']), deleteCourses);

// @desc    Create Course
// @route   POST /api/course/new
// @access  Private
router.route('/new').post(authorize, checkUserRole(['Admin']), validateCourse, createCourse);

// @desc    Get / Delete / Update Course
// @route   GET/DELETE/PUT /api/course/:id
// @access  Private
router
	.route('/:id')
	.get(authorize, checkUserRole(['Admin', 'Instructor', 'Student']), viewCourse)
	.delete(authorize, checkUserRole(['Admin']), deleteCourse)
	.put(authorize, checkUserRole(['Admin', 'Instructor']), validateCourse, updateCourse);

// @desc    Activate Course
// @route   PUT /api/course/:id/activate
// @access  Private
router
	.route('/:id/activate')
	.put(authorize, checkUserRole(['Admin']), validateCourse, activateCourse);

module.exports = router;
