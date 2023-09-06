import express from 'express';
import { createUserInstructorReview } from '../../controllers/review/instructorReview';
import { validateInstructorReview } from '../../middleware/validations';
import { authorize, checkUserRole } from '../../middleware/authMiddleware';
import { UserType } from '../../models/users/user';

export default (router: express.Router) => {
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
};
