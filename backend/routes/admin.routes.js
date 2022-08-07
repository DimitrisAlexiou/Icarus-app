const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {
	createSemester,
	createGradingDuration,
	createVaccineReassessmentDuration,
	createAssessmentDuration,
	createReviewDuration,
	createReviewStart,
	createCycles,
	createDegreeRules,
} = require('../controllers/admin');
const {
	validateSemester,
	validateGradingDuration,
	validateVaccineReassessmentDuration,
	validateAssessmentDuration,
	validateReviewDuration,
	validateReviewStart,
	validateCycles,
	validateDegreeRules,
} = require('../middleware/validations');
const { authenticate } = require('../middleware/authMiddleware');

// @desc Create Semester
// @route POST /api/semester/new
// @access private
router.route('/new').post(validateSemester, catchAsync(createSemester));

// @desc Create Grading Duration Window
// @route POST /api/grading_duration/new
// @access private
router
	.route('/new')
	.post(validateGradingDuration, catchAsync(createGradingDuration));

// @desc Create Vaccine/Reassessment Statement Duration Window
// @route POST /api/vaccine_reassessment_duration/new
// @access private
router
	.route('/new')
	.post(
		validateVaccineReassessmentDuration,
		catchAsync(createVaccineReassessmentDuration),
	);

// @desc Create Assessment Statement Duration Window
// @route POST /api/assessment_duration/new
// @access private
router
	.route('/new')
	.post(validateAssessmentDuration, catchAsync(createAssessmentDuration));

// @desc Create Review Duration Window
// @route POST /api/review_duration/new
// @access private
router
	.route('/new')
	.post(validateReviewDuration, catchAsync(createReviewDuration));

// @desc Create Review Starting Date
// @route POST /api/review_start/new
// @access private
router.route('/new').post(validateReviewStart, catchAsync(createReviewStart));

// @desc Create List of Cycles
// @route POST /api/cycles/new
// @access private
router.route('/new').post(validateCycles, catchAsync(createCycles));

// @desc Create Degree Rules
// @route POST /api/degree_rules/new
// @access private
router.route('/new').post(validateDegreeRules, catchAsync(createDegreeRules));

module.exports = router;
