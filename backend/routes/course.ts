import express from 'express';
import {
	newCourse,
	updateCourse,
	viewCourse,
	deleteCourse,
	activateCourse,
	viewCourses,
	deleteAllCourses,
} from '../controllers/course/course';
import { validateCourse } from '../middleware/validations';
import { authorize, checkUserRole } from '../middleware/authMiddleware';

export default (router: express.Router) => {
	// @desc    Get / Delete Courses
	// @route   GET/DELETE /api/course
	// @access  Private
	router
		.route('/course')
		.get(authorize, viewCourses)
		.delete(authorize, checkUserRole(['Admin']), deleteAllCourses);

	// @desc    Create Course
	// @route   POST /api/course/new
	// @access  Private
	router
		.route('/course/new')
		.post(authorize, checkUserRole(['Admin']), validateCourse, newCourse);

	// @desc    Get / Delete / Update Course
	// @route   GET/DELETE/PUT /api/course/:id
	// @access  Private
	router
		.route('/course/:id')
		.get(authorize, viewCourse)
		.delete(authorize, checkUserRole(['Admin']), deleteCourse)
		.put(authorize, checkUserRole(['Admin', 'Instructor']), validateCourse, updateCourse);

	// @desc    Activate Course
	// @route   PUT /api/course/:id/activate
	// @access  Private
	router
		.route('/course/:id/activate')
		.put(authorize, checkUserRole(['Admin']), validateCourse, activateCourse);
};
