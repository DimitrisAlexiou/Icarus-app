const express = require('express');
const router = express.Router();
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

// @desc    Get Courses / DELETE Courses
// @route   GET/DELETE /api/course
// @access  Private
router.route('/').get(authorize, getCourses).delete(authorize, deleteCourses);

// @desc    Create Course
// @route   POST /api/course/new
// @access  Private
router.route('/new').post(validateCourse, createCourse);

// @desc    Get Course by ID / Delete Course by ID / Activate Course
// @route   GET/DELETE/PUT /api/course/:id
// @access  Private
router
	.route('/:id')
	.get(authorize, viewCourse)
	.delete(authorize, deleteCourse)
	.put(authorize, validateCourse, validateSemester, activateCourse);

// @desc    Update Course by ID
// @route   PUT /api/course/:id/edit
// @access  Private
router.route('/:id/edit').put(validateCourse, updateCourse);

// router.route('/:id/prerequisites').post(defineCoursePrerequisites);
// router.route('/prerequisites').get(getPrerequisites);
// router.route('/prerequisites').delete(deleteCoursePrerequisites);

module.exports = router;
