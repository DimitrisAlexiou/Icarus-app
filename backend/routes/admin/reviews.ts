import express from 'express';
import {
	deleteSystemGeneralReviews,
	getSystemGeneralReviews,
} from '../../controllers/admin/review/generalReview';
import {
	deleteSystemInstructorReviews,
	getSystemInstructorReviews,
} from '../../controllers/admin/review/instructorReview';
import {
	deleteSystemTeachingReviews,
	getSystemTeachingReviews,
} from '../../controllers/admin/review/teachingReview';
import { authorize, checkUserRole } from '../../middleware/authMiddleware';
import { UserType } from '../../models/users/user';

export default (router: express.Router) => {
	// @desc    Get / Delete System Teaching Reviews
	// @route   GET/DELETE /api/admin/review/teaching
	// @access  Private
	router
		.route('/admin/review/teaching')
		.get(authorize, getSystemTeachingReviews)
		.delete(
			authorize,
			checkUserRole([UserType.admin]),
			deleteSystemTeachingReviews
		);

	// @desc    Get / Delete System Instructor Reviews
	// @route   GET/DELETE /api/admin/review/instructor
	// @access  Private ADMIN
	router
		.route('/admin/review/instructor')
		.get(authorize, getSystemInstructorReviews)
		.delete(
			authorize,
			checkUserRole([UserType.admin]),
			deleteSystemInstructorReviews
		);

	// @desc    Get / Delete System General Reviews
	// @route   GET/DELETE /api/admin/review/general
	// @access  Private ADMIN
	router
		.route('/admin/review/general')
		.get(authorize, getSystemGeneralReviews)
		.delete(
			authorize,
			checkUserRole([UserType.admin]),
			deleteSystemGeneralReviews
		);
};
