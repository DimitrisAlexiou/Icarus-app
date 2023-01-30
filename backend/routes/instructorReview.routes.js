const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {
	getInstructorReviews,
	createInstructorReview,
	deleteInstructorReviews,
} = require('../controllers/review');
const { validateInstructorReview } = require('../middleware/validations');
const { authorize } = require('../middleware/authMiddleware');

// @desc    Create Instructor Review
// @route   POST /api/review/instructor
// @access  Private USER || ADMIN
router.route('/').post(authorize, validateInstructorReview, catchAsync(createInstructorReview));

// @desc    Get All Instructor Reviews
// @route   GET /api/review/instructor/all
// @access  Private ADMIN || INSTRUCTOR
router.route('/all').get(authorize, catchAsync(getInstructorReviews));

// @desc    Delete All Instructor Reviews
// @route   DELETE /api/review/instructor/all/delete
// @access  Private ADMIN
router.route('/all/delete').delete(authorize, catchAsync(deleteInstructorReviews));

module.exports = router;
