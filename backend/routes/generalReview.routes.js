const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {
	getGeneralReviews,
	createGeneralReview,
	deleteGeneralReviews,
} = require('../controllers/review');
const { validateGeneralReview } = require('../middleware/validations');
const { authenticate } = require('../middleware/authMiddleware');

// @desc Create General Review
// @route POST /api/review/general
// @access private USER || ADMIN
router
	.route('/')
	.post(authenticate, validateGeneralReview, catchAsync(createGeneralReview));

// @desc Get All General Reviews
// @route GET /api/review/general/all
// @access private ADMIN || INSTRUCTOR
router.route('/all').get(authenticate, catchAsync(getGeneralReviews));

// @desc Delete All General Reviews
// @route DELETE /api/review/general/all/delete
// @access private ADMIN
router
	.route('/all/delete')
	.delete(authenticate, catchAsync(deleteGeneralReviews));

module.exports = router;
