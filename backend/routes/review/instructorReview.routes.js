const express = require('express');
const router = express.Router();
const { createUserInstructorReview } = require('../../controllers/review/instructorReview');
const { validateInstructorReview } = require('../../middleware/validations');
const { authorize, checkUserRole } = require('../../middleware/authMiddleware');

// @desc    Create Instructor Review
// @route   POST /api/review/instructor
// @access  Private USER || ADMIN
router
	.route('/')
	.post(
		authorize,
		checkUserRole(['Admin', 'Student']),
		validateInstructorReview,
		createUserInstructorReview
	);

module.exports = router;
