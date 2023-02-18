const express = require('express');
const router = express.Router();
const catchAsync = require('../../utils/catchAsync');
const { createUserTeachingReview } = require('../../controllers/review/teachingReview');
const { validateTeachingReview } = require('../../middleware/validations');
const { authorize } = require('../../middleware/authMiddleware');

// @desc    Create Teaching Review
// @route   POST /api/review/teaching
// @access  Private User
router.route('/').post(authorize, validateTeachingReview, catchAsync(createUserTeachingReview));

module.exports = router;
