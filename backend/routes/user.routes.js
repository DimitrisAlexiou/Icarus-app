const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {
	getUsers,
	viewUser,
	createUser,
	updateUser,
	deleteUser,
	deleteUsers,
} = require('../controllers/user');
const {
	getUserTeachingReviews,
	viewUserTeachingReview,
	updateTeachingReview,
	deleteTeachingReview,
	getUserInstructorReviews,
	viewUserInstructorReview,
	updateInstructorReview,
	deleteInstructorReview,
	getUserGeneralReviews,
	viewUserGeneralReview,
	updateGeneralReview,
	deleteGeneralReview,
} = require('../controllers/review');
const {
	validateUser,
	validateTeachingReview,
	validateInstructorReview,
	validateGeneralReview,
} = require('../middleware/validations');
const { authenticate } = require('../middleware/authMiddleware');

// @desc    Get Users
// @route   GET /api/user
// @access  Private ADMIN
router.route('/').get(catchAsync(getUsers));

// @desc    Create User
// @route   POST /api/user
// @access  Private ADMIN
router.route('/').post(authenticate, validateUser, catchAsync(createUser));

// @desc    Delete All Users
// @route   DELETE /api/user
// @access  Private ADMIN
router.route('/').delete(authenticate, catchAsync(deleteUsers));

// @desc    Get User Teaching|Instructor|General Reviews
// @route   GET /api/user/activity/reviews
// @access  Private USER || ADMIN
router
	.route('/activity/reviews')
	.get(
		authenticate,
		catchAsync(
			getUserTeachingReviews,
			getUserInstructorReviews,
			getUserGeneralReviews,
		),
	);

// @desc    Get User Teaching|Instructor|General Review by ID
// @route   GET /api/user/activity/reviews/:id
// @access  Private USER || ADMIN
router
	.route('/activity/reviews/:id')
	.get(
		authenticate,
		catchAsync(
			viewUserTeachingReview,
			viewUserInstructorReview,
			viewUserGeneralReview,
		),
	);

// @desc    Update User Teaching|Instructor|General Review by ID
// @route   PUT /api/user/activity/reviews/:id
// @access  Private USER || ADMIN
router
	.route('activity/reviews/:id')
	.put(
		authenticate,
		validateTeachingReview,
		validateInstructorReview,
		validateGeneralReview,
		catchAsync(
			updateTeachingReview,
			updateInstructorReview,
			updateGeneralReview,
		),
	);

// @desc    Delete User Teaching|Instructor|General Review by ID
// @route   DELETE /api/user/activity/reviews/:id
// @access  Private USER || ADMIN
router
	.route('/activity/reviews/:id')
	.delete(
		authenticate,
		catchAsync(
			deleteTeachingReview,
			deleteInstructorReview,
			deleteGeneralReview,
		),
	);

// @desc    Get User by ID
// @route   GET /api/user/:id
// @access  Private ADMIN
router.route('/:id').get(authenticate, catchAsync(viewUser));

// @desc    Update User by ID
// @route   PUT /api/user/:id
// @access  Private ADMIN
router.route('/:id').put(authenticate, validateUser, catchAsync(updateUser));

// @desc    Delete User by ID
// @route   DELETE /api/user/:id
// @access  Private ADMIN
router.route('/:id').delete(authenticate, catchAsync(deleteUser));

module.exports = router;
