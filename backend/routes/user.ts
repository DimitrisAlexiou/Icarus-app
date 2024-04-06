import express from 'express';
import { updateProfile, viewPassedTeachings } from '../controllers/user';
import {
	getAllUserTeachingReviews,
	viewUserTeachingReview,
	updateUserTeachingReview,
	deleteUserTeachingReview,
	deleteAllUserTeachingReviews,
} from '../controllers/review/teachingReview';
import {
	getAllUserInstructorReviews,
	viewUserInstructorReview,
	updateUserInstructorReview,
	deleteUserInstructorReview,
	deleteAllUserInstructorReviews,
} from '../controllers/review/instructorReview';
import {
	getAllUserGeneralReviews,
	viewUserGeneralReview,
	updateUserGeneralReview,
	deleteUserGeneralReview,
	deleteAllUserGeneralReviews,
} from '../controllers/review/generalReview';
import {
	validateProfile,
	validateTeachingReview,
	validateInstructorReview,
	validateGeneralReview,
} from '../middleware/validations';
import {
	authorize,
	checkUserRole,
	isOwner,
} from '../middleware/authMiddleware';
import { UserType } from '../models/users/user';

export default (router: express.Router) => {
	// @desc    Get User Teaching Reviews
	// @route   GET /api/user/activity/reviews/teaching
	// @access  Private USER
	router
		.route('/user/activity/reviews/teaching')
		.get(authorize, isOwner, getAllUserTeachingReviews)
		.delete(authorize, isOwner, deleteAllUserTeachingReviews);

	// @desc    Get User Instructor Reviews
	// @route   GET /api/user/activity/reviews/instructor
	// @access  Private USER
	router
		.route('/user/activity/reviews/instructor')
		.get(authorize, isOwner, getAllUserInstructorReviews)
		.delete(authorize, isOwner, deleteAllUserInstructorReviews);

	// @desc    Get User General Reviews
	// @route   GET /api/user/activity/reviews/general
	// @access  Private USER
	router
		.route('/user/activity/reviews/general')
		.get(authorize, isOwner, getAllUserGeneralReviews)
		.delete(authorize, isOwner, deleteAllUserGeneralReviews);

	// @desc    Get / Delete / Update Teaching Review
	// @route   GET/DELETE/PUT /api/review/teaching/:id
	// @access  Private
	router
		.route('/user/activity/reviews/teaching/:id')
		.get(authorize, isOwner, viewUserTeachingReview)
		.put(
			authorize,
			isOwner,
			checkUserRole([UserType.admin, UserType.student]),
			validateTeachingReview,
			updateUserTeachingReview
		)
		.delete(
			authorize,
			isOwner,
			checkUserRole([UserType.admin, UserType.student]),
			deleteUserTeachingReview
		);

	// @desc    Get / Delete / Update Instructor Review
	// @route   GET/DELETE/PUT /api/review/instructor/:id
	// @access  Private
	router
		.route('/user/activity/reviews/instructor/:id')
		.get(authorize, isOwner, viewUserInstructorReview)
		.put(
			authorize,
			isOwner,
			checkUserRole([UserType.admin, UserType.student]),
			validateInstructorReview,
			updateUserInstructorReview
		)
		.delete(
			authorize,
			isOwner,
			checkUserRole([UserType.admin, UserType.student]),
			deleteUserInstructorReview
		);

	// @desc    Get / Delete / Update General Review
	// @route   GET/DELETE/PUT /api/review/general/:id
	// @access  Private
	router
		.route('/user/activity/reviews/general/:id')
		.get(authorize, isOwner, viewUserGeneralReview)
		.put(
			authorize,
			isOwner,
			checkUserRole([UserType.admin, UserType.student]),
			validateGeneralReview,
			updateUserGeneralReview
		)
		.delete(
			authorize,
			isOwner,
			checkUserRole([UserType.admin, UserType.student]),
			deleteUserGeneralReview
		);

	// @desc    Update User Profile
	// @route   PUT /api/user/profile/:id
	// @access  Private User
	router
		.route('/user/profile/:id')
		.put(authorize, isOwner, validateProfile, updateProfile);

	// @desc    Get Student User Passed Teachings
	// @route   GET /api/user/activity/passedTeachings
	// @access  Private User
	router
		.route('/user/activity/passedTeachings')
		.get(authorize, viewPassedTeachings);
};
