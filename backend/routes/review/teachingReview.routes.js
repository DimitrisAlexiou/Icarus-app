const express = require('express');
const router = express.Router();
const { createUserTeachingReview } = require('../../controllers/review/teachingReview');
const { validateTeachingReview } = require('../../middleware/validations');
const { authorize } = require('../../middleware/authMiddleware');

// @desc    Create Teaching Review
// @route   POST /api/review/teaching
// @access  Private User
router.route('/').post(authorize, validateTeachingReview, createUserTeachingReview);

module.exports = router;
