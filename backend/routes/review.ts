import express from 'express';
import {
	createUserGeneralReview,
	createUserInstructorReview,
	createUserTeachingReview,
	deleteUserGeneralReview,
	deleteUserInstructorReview,
	deleteUserTeachingReview,
	updateUserGeneralReview,
	updateUserInstructorReview,
	updateUserTeachingReview,
	viewUserGeneralReview,
	viewUserInstructorReview,
	viewUserTeachingReview,
} from '../controllers/review';
import {
	validateGeneralReview,
	validateInstructorReview,
	validateTeachingReview,
} from '../middleware/validations';
import {
	authorize,
	checkUserRole,
	isOwner,
} from '../middleware/authMiddleware';
import { UserType } from '../models/users/user';

export default (router: express.Router) => {
	// @desc    Create Teaching Review
	// @route   POST /api/review/teaching
	// @access  Private
	router
		.route('/review/teaching')
		.post(
			authorize,
			checkUserRole([UserType.admin, UserType.student]),
			validateTeachingReview,
			createUserTeachingReview
		);

	// @desc    Get / Delete / Update Teaching Review
	// @route   GET/DELETE/PUT /api/review/teaching/:id
	// @access  Private
	router
		.route('/review/teaching/:id')
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

	// @desc    Create Instructor Review
	// @route   POST /api/review/instructor
	// @access  Private
	router
		.route('/review/instructor')
		.post(
			authorize,
			checkUserRole([UserType.admin, UserType.student]),
			validateInstructorReview,
			createUserInstructorReview
		);

	// @desc    Get / Delete / Update Instructor Review
	// @route   GET/DELETE/PUT /api/review/instructor/:id
	// @access  Private
	router
		.route('/review/instructor/:id')
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

	// @desc    Create General Review
	// @route   POST /api/review/general
	// @access  Private
	router
		.route('/review/general')
		.post(
			authorize,
			checkUserRole([UserType.admin, UserType.student]),
			validateGeneralReview,
			createUserGeneralReview
		);

	// @desc    Get / Delete / Update General Review
	// @route   GET/DELETE/PUT /api/review/general/:id
	// @access  Private
	router
		.route('/review/general/:id')
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
};
