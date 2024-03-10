import express from 'express';
import { authorize, checkUserRole } from '../../middleware/authMiddleware';
import { UserType } from '../../models/users/user';
import { viewSystemCourses } from '../../controllers/course/course';
import { viewSystemTeachings } from '../../controllers/course/teaching';
import {
	deleteSystemGrades,
	viewSystemGrades,
} from '../../controllers/admin/course/grade';

export default (router: express.Router) => {
	// @desc    Get System Courses
	// @route   GET /api/admin/course
	// @access  Private
	router
		.route('/admin/course')
		.get(authorize, checkUserRole([UserType.admin]), viewSystemCourses);

	// @desc    Get System Teachings
	// @route   GET /api/admin/teaching
	// @access  Private
	router
		.route('/admin/teaching')
		.get(authorize, checkUserRole([UserType.admin]), viewSystemTeachings);

	// @desc    Get / Delete System Teaching Grades
	// @route   GET/DELETE /api/grade
	// @access  Private
	router
		.route('/admin/grade')
		.get(authorize, checkUserRole([UserType.admin]), viewSystemGrades)
		.delete(authorize, checkUserRole([UserType.admin]), deleteSystemGrades);
};
