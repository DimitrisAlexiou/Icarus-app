const express = require('express');
const router = express.Router();
const catchAsync = require('../../utils/catchAsync');
const { createUserGeneralReview } = require('../../controllers/review/generalReview');
const { validateGeneralReview } = require('../../middleware/validations');
const { authorize } = require('../../middleware/authMiddleware');

// @desc    Create General Review
// @route   POST /api/review/general
// @access  Private USER || ADMIN
router.route('/').post(authorize, validateGeneralReview, catchAsync(createUserGeneralReview));
// .post(authorize, validateGeneralReview, catchAsync(createGeneralReview));

module.exports = router;
