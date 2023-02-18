const express = require('express');
const router = express.Router();
const catchAsync = require('../../utils/catchAsync');
const { createUserInstructorReview } = require('../../controllers/review/instructorReview');
const { validateInstructorReview } = require('../../middleware/validations');
const { authorize } = require('../../middleware/authMiddleware');

// @desc    Create Instructor Review
// @route   POST /api/review/instructor
// @access  Private User
router.route('/').post(authorize, validateInstructorReview, catchAsync(createUserInstructorReview));

module.exports = router;
