const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { viewUser, updateUser, deleteUser } = require('../controllers/user');
const {
	getUserTeachingReviews,
	viewUserTeachingReview,
	updateUserTeachingReview,
	deleteUserTeachingReview,
} = require('../controllers/review/teachingReview');
const {
	getUserInstructorReviews,
	viewUserInstructorReview,
	updateUserInstructorReview,
	deleteUserInstructorReview,
} = require('../controllers/review/instructorReview');
const {
	getUserGeneralReviews,
	viewUserGeneralReview,
	updateUserGeneralReview,
	deleteUserGeneralReview,
} = require('../controllers/review/generalReview');
const {
	validateUser,
	validateTeachingReview,
	validateInstructorReview,
	validateGeneralReview,
} = require('../middleware/validations');
const { authorize } = require('../middleware/authMiddleware');

// @desc    Get User Teaching|Instructor|General Reviews
// @route   GET /api/user/activity/reviews
// @access  Private USER
router
	.route('/activity/reviews')
	.get(
		authorize,
		catchAsync(getUserTeachingReviews, getUserInstructorReviews, getUserGeneralReviews)
	);

// @desc    Get / Update / Delete User Teaching|Instructor|General Review by ID
// @route   GET/PUT/DELETE /api/user/activity/reviews/:id
// @access  Private USER
router
	.route('/activity/reviews/:id')
	.get(
		authorize,
		catchAsync(viewUserTeachingReview, viewUserInstructorReview, viewUserGeneralReview)
	)
	.put(
		authorize,
		validateTeachingReview,
		validateInstructorReview,
		validateGeneralReview,
		catchAsync(updateUserTeachingReview, updateUserInstructorReview, updateUserGeneralReview)
	)
	.delete(
		authorize,
		catchAsync(deleteUserTeachingReview, deleteUserInstructorReview, deleteUserGeneralReview)
	);

// @desc    Get / Update / Delete User by ID
// @route   GET/PUT/DELETE /api/user/:id
// @access  Private User
router
	.route('/:id')
	.get(catchAsync(viewUser))
	.put(authorize, validateUser, catchAsync(updateUser))
	.delete(catchAsync(deleteUser));

module.exports = router;
