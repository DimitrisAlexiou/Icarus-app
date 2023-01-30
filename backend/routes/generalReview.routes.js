const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {
	getGeneralReviews,
	createGeneralReview,
	deleteGeneralReviews,
} = require('../controllers/review');
const { validateGeneralReview } = require('../middleware/validations');
const { authorize } = require('../middleware/authMiddleware');

// @desc    Create General Review
// @route   POST /api/review/general
// @access  Private USER || ADMIN
router.route('/').post(validateGeneralReview, catchAsync(createGeneralReview));
// .post(authorize, validateGeneralReview, catchAsync(createGeneralReview));

// @desc    Get All General Reviews
// @route   GET /api/review/general/all
// @access  Private ADMIN || INSTRUCTOR
router.route('/all').get(authorize, catchAsync(getGeneralReviews));

// @desc    Delete All General Reviews
// @route   DELETE /api/review/general/all/delete
// @access  Private ADMIN
router.route('/all/delete').delete(authorize, catchAsync(deleteGeneralReviews));

module.exports = router;
