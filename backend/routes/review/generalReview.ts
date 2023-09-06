import express from 'express';
import { createUserGeneralReview } from '../../controllers/review/generalReview';
import { validateGeneralReview } from '../../middleware/validations';
import { authorize, checkUserRole } from '../../middleware/authMiddleware';
import { UserType } from '../../models/users/user';

export default (router: express.Router) => {
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
};
