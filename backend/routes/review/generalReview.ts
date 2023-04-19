import express from 'express';
import { createUserGeneralReview } from '../../controllers/review/generalReview';
import { validateGeneralReview } from '../../middleware/validations';
import { authorize, checkUserRole } from '../../middleware/authMiddleware';

export default (router: express.Router) => {
	// @desc    Create General Review
	// @route   POST /api/review/general
	// @access  Private USER || ADMIN
	router
		.route('/review/general')
		.post(
			authorize,
			checkUserRole(['Admin', 'Student']),
			validateGeneralReview,
			createUserGeneralReview
		);
};
