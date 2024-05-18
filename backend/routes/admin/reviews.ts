import express from 'express';
import {
	deleteSystemTeachingReviews,
	getSystemTeachingReviews,
	deleteSystemGeneralReviews,
	getSystemGeneralReviews,
	deleteSystemInstructorReviews,
	getSystemInstructorReviews,
	getSystemTeachingReviewsTotalNumber,
	getSystemInstructorReviewsTotalNumber,
	getSystemGeneralReviewsTotalNumber,
} from '../../controllers/admin/review';
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

	// @desc    Get System Teaching Reviews Total Number
	// @route   GET /api/admin/review/teaching/total
	// @access  Private
	router
		.route('/admin/review/teaching/total')
		.get(authorize, getSystemTeachingReviewsTotalNumber);

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

	// @desc    Get System Instructor Reviews Total Number
	// @route   GET /api/admin/review/instructor/total
	// @access  Private
	router
		.route('/admin/review/instructor/total')
		.get(authorize, getSystemInstructorReviewsTotalNumber);

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

	// @desc    Get System General Reviews Total Number
	// @route   GET /api/admin/review/general/total
	// @access  Private
	router
		.route('/admin/review/general/total')
		.get(authorize, getSystemGeneralReviewsTotalNumber);
};
