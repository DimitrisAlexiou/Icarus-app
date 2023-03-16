const express = require('express');
const router = express.Router();
const { viewProfile, updateProfile, deleteUser } = require('../controllers/user');
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
	.get(authorize, getUserTeachingReviews, getUserInstructorReviews, getUserGeneralReviews);

// @desc    Get / Update / Delete User Teaching|Instructor|General Review by ID
// @route   GET/PUT/DELETE /api/user/activity/reviews/:id
// @access  Private USER
router
	.route('/activity/reviews/:id')
	.get(authorize, viewUserTeachingReview, viewUserInstructorReview, viewUserGeneralReview)
	.put(
		authorize,
		validateTeachingReview,
		validateInstructorReview,
		validateGeneralReview,
		updateUserTeachingReview,
		updateUserInstructorReview,
		updateUserGeneralReview
	)
	.delete(
		authorize,
		deleteUserTeachingReview,
		deleteUserInstructorReview,
		deleteUserGeneralReview
	);

// @desc    Get / Update / Delete User by ID
// @route   GET/PUT/DELETE /api/user/profile
// @access  Private User
router
	.route('/profile')
	.get(authorize, viewProfile)
	.put(authorize, validateUser, updateProfile)
	.delete(authorize, deleteUser);

module.exports = router;
