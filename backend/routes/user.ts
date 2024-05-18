import express from 'express';
import { updateProfile, viewPassedTeachings } from '../controllers/user';
import {
	getAllUserTeachingReviews,
	viewUserTeachingReview,
	updateUserTeachingReview,
	deleteUserTeachingReview,
	deleteAllUserTeachingReviews,
	viewUserInstructorReview,
	viewUserGeneralReview,
	getAllUserInstructorReviews,
	getAllUserGeneralReviews,
	deleteAllUserInstructorReviews,
	deleteAllUserGeneralReviews,
	deleteUserInstructorReview,
	deleteUserGeneralReview,
	updateUserInstructorReview,
	updateUserGeneralReview,
} from '../controllers/review';
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
