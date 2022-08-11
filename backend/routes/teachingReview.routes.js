const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {
	getTeachingReviews,
	createTeachingReview,
	deleteTeachingReviews,
} = require('../controllers/review');
const { validateTeachingReview } = require('../middleware/validations');
const { authenticate } = require('../middleware/authMiddleware');

// @desc    Create Teaching Review
// @route   POST /api/review/teaching
// @access  Private USER || ADMIN
router
	.route('/')
	.post(authenticate, validateTeachingReview, catchAsync(createTeachingReview));

// @desc    Get All Teaching Reviews
// @route   GET /api/review/teaching/all
// @access  Private ADMIN || INSTRUCTOR
router.route('/all').get(authenticate, catchAsync(getTeachingReviews));

// @desc    Delete All Teaching Reviews
// @route   DELETE /api/review/teaching/all/delete
// @access  Private ADMIN
router
	.route('/all/delete')
	.delete(authenticate, catchAsync(deleteTeachingReviews));

module.exports = router;
