import express from 'express';
// import { createUserTeachingReview } from '../../controllers/review/teachingReview';
import { validateTeachingReview } from '../../middleware/validations';
import { authorize, checkUserRole } from '../../middleware/authMiddleware';

export default (router: express.Router) => {
	// @desc    Create Teaching Review
	// @route   POST /api/review/teaching
	// @access  Private USER || ADMIN
	router.route('/review/teaching').post(
		authorize,
		checkUserRole(['Admin', 'Student']),
		validateTeachingReview
		// createUserTeachingReview
	);
};
