import express from 'express';
import {
	newCourse,
	updateCourse,
	viewCourse,
	deleteCourse,
	activateCourse,
	viewCourses,
	deleteAllCourses,
	deActivateCourse,
} from '../controllers/course/course';
import { validateCourse, validateCourseActivation } from '../middleware/validations';
import { authorize, checkUserRole } from '../middleware/authMiddleware';
import { UserType } from '../models/users/user';

export default (router: express.Router) => {
	// @desc    Get / Delete Courses
	// @route   GET/DELETE /api/course
	// @access  Private
	router
		.route('/course')
		.get(authorize, viewCourses)
		.delete(authorize, checkUserRole([UserType.admin]), deleteAllCourses);

	// @desc    Create Course
	// @route   POST /api/course/new
	// @access  Private
	router
		.route('/course/new')
		.post(authorize, checkUserRole([UserType.admin]), validateCourse, newCourse);

	// @desc    Get / Delete / Update Course
	// @route   GET/DELETE/PUT /api/course/:id
	// @access  Private
	router
		.route('/course/:id')
		.get(authorize, viewCourse)
		.delete(authorize, checkUserRole([UserType.admin]), deleteCourse)
		.put(authorize, checkUserRole([UserType.admin]), validateCourse, updateCourse);

	// @desc    Activate Course
	// @route   PUT /api/course/:id/activate
	// @access  Private
	router
		.route('/course/:id/activate')
		.put(authorize, checkUserRole([UserType.admin]), activateCourse);

	// @desc    Deactivate Course
	// @route   PUT /api/course/:id/deactivate
	// @access  Private
	router
		.route('/course/:id/deactivate')
		.put(authorize, checkUserRole([UserType.admin]), deActivateCourse);
};
