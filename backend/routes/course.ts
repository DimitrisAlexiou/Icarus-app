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
	enrollCourse,
	unenrollCourse,
	viewEnrolledCourses,
} from '../controllers/course/course';
import { viewTeachingByCourseId } from '../controllers/course/teaching';
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

	// @desc    Get Enrolled Courses
	// @route   GET /api/course/my-courses
	// @access  Private
	router
		.route('/course/my-courses/all')
		.get(authorize, checkUserRole([UserType.admin, UserType.student]), viewEnrolledCourses);

	// @desc    Get / Delete / Update Course
	// @route   GET/DELETE/PUT /api/course/:id
	// @access  Private
	router
		.route('/course/:id')
		.get(authorize, viewCourse)
		.delete(authorize, checkUserRole([UserType.admin]), deleteCourse)
		.put(authorize, checkUserRole([UserType.admin]), validateCourse, updateCourse);

	// @desc    Enroll Course
	// @route   PUT /api/course/my-courses/:id/enroll
	// @access  Private
	router
		.route('/course/my-courses/:id/enroll')
		.put(authorize, checkUserRole([UserType.admin, UserType.student]), enrollCourse);

	// @desc    Unenroll Course
	// @route   PUT /api/course/my-courses/:id/unenroll
	// @access  Private
	router
		.route('/course/my-courses/:id/unenroll')
		.put(authorize, checkUserRole([UserType.admin, UserType.student]), unenrollCourse);

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

	// @desc    Get Course Teaching
	// @route   GET /api/course/:id/teaching
	// @access  Private
	router
		.route('/course/:id/teaching')
		.get(
			authorize,
			checkUserRole([UserType.admin, UserType.instructor]),
			viewTeachingByCourseId
		);
};
