const express = require('express');
const router = express.Router();
const { createUserTeachingReview } = require('../../controllers/review/teachingReview');
const { validateTeachingReview } = require('../../middleware/validations');
const { authorize, checkUserRole } = require('../../middleware/authMiddleware');

// @desc    Create Teaching Review
// @route   POST /api/review/teaching
// @access  Private USER || ADMIN
router
	.route('/')
	.post(
		authorize,
		checkUserRole(['Admin', 'Student']),
		validateTeachingReview,
		createUserTeachingReview
	);

module.exports = router;
