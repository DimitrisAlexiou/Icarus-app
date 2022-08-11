const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {
	getInstructorReviews,
	createInstructorReview,
	deleteInstructorReviews,
} = require('../controllers/review');
const { validateInstructorReview } = require('../middleware/validations');
const { authenticate } = require('../middleware/authMiddleware');

// @desc    Create Instructor Review
// @route   POST /api/review/instructor
// @access  Private USER || ADMIN
router
	.route('/')
	.post(
		authenticate,
		validateInstructorReview,
		catchAsync(createInstructorReview),
	);

// @desc    Get All Instructor Reviews
// @route   GET /api/review/instructor/all
// @access  Private ADMIN || INSTRUCTOR
router.route('/all').get(authenticate, catchAsync(getInstructorReviews));

// @desc    Delete All Instructor Reviews
// @route   DELETE /api/review/instructor/all/delete
// @access  Private ADMIN
router
	.route('/all/delete')
	.delete(authenticate, catchAsync(deleteInstructorReviews));

module.exports = router;
