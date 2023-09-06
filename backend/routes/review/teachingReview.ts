import express from 'express';
import { createUserTeachingReview } from '../../controllers/review/teachingReview';
import { validateTeachingReview } from '../../middleware/validations';
import { authorize, checkUserRole } from '../../middleware/authMiddleware';
import { UserType } from '../../models/users/user';

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
};
