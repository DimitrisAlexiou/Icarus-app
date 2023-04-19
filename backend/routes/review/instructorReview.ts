import express from 'express';
import { createUserInstructorReview } from '../../controllers/review/instructorReview';
import { validateInstructorReview } from '../../middleware/validations';
import { authorize, checkUserRole } from '../../middleware/authMiddleware';

export default (router: express.Router) => {
	// @desc    Create Instructor Review
	// @route   POST /api/review/instructor
	// @access  Private USER || ADMIN
	router
		.route('/review/instructor')
		.post(
			authorize,
			checkUserRole(['Admin', 'Student']),
			validateInstructorReview,
			createUserInstructorReview
		);
};
