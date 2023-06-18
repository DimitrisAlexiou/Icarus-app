import express from 'express';
import { viewProfile, updateProfile } from '../controllers/user';
import {
	getAllUserTeachingReviews,
	viewUserTeachingReview,
	// updateUserTeachingReview,
	deleteUserTeachingReview,
} from '../controllers/review/teachingReview';
import {
	getAllUserInstructorReviews,
	viewUserInstructorReview,
	updateUserInstructorReview,
	deleteUserInstructorReview,
} from '../controllers/review/instructorReview';
import {
	getAllUserGeneralReviews,
	viewUserGeneralReview,
	updateUserGeneralReview,
	deleteUserGeneralReview,
} from '../controllers/review/generalReview';
import {
	validateProfile,
	validateTeachingReview,
	validateInstructorReview,
	validateGeneralReview,
} from '../middleware/validations';
import { authorize, isOwner } from '../middleware/authMiddleware';

export default (router: express.Router) => {
	// @desc    Get User Teaching|Instructor|General Reviews
	// @route   GET /api/user/activity/reviews
	// @access  Private USER
	router
		.route('/user/activity/reviews')
		.get(
			authorize,
			isOwner,
			getAllUserTeachingReviews,
			getAllUserInstructorReviews,
			getAllUserGeneralReviews
		);

	// @desc    Get / Update / Delete User Teaching|Instructor|General Review by ID
	// @route   GET/PUT/DELETE /api/user/activity/reviews/:id
	// @access  Private USER
	router
		.route('/user/activity/reviews/:id')
		.get(
			authorize,
			isOwner,
			viewUserTeachingReview,
			viewUserInstructorReview,
			viewUserGeneralReview
		)
		.put(
			authorize,
			isOwner,
			validateTeachingReview,
			validateInstructorReview,
			validateGeneralReview,
			// updateUserTeachingReview,
			updateUserInstructorReview,
			updateUserGeneralReview
		)
		.delete(
			authorize,
			isOwner,
			deleteUserTeachingReview,
			deleteUserInstructorReview,
			deleteUserGeneralReview
		);

	// @desc    Get / Update / Delete User Profile
	// @route   GET/PUT/DELETE /api/user/profile
	// @access  Private User
	router
		.route('/user/profile')
		.get(authorize, isOwner, viewProfile)
		.put(authorize, isOwner, validateProfile, updateProfile);
};
