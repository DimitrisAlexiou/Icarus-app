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

// @desc    Create Semester
// @route   POST /api/admin/semester/new
// @access  Private
router.route('/new').post(validateSemester, catchAsync(createSemester));

// @desc    Create Grading Duration Window
// @route   POST /api/admin/grading_duration/new
// @access  Private
router
	.route('/new')
	.post(validateGradingDuration, catchAsync(createGradingDuration));

// @desc    Create Vaccine/Reassessment Statement Duration Window
// @route   POST /api/admin/vaccine_reassessment_duration/new
// @access  Private
router
	.route('/new')
	.post(
		validateVaccineReassessmentDuration,
		catchAsync(createVaccineReassessmentDuration),
	);

// @desc    Create Assessment Statement Duration Window
// @route   POST /api/admin/assessment_duration/new
// @access  Private
router
	.route('/new')
	.post(validateAssessmentDuration, catchAsync(createAssessmentDuration));

// @desc    Create Review Duration Window
// @route   POST /api/admin/review_duration/new
// @access  Private
router
	.route('/new')
	.post(validateReviewDuration, catchAsync(createReviewDuration));

// @desc    Create Review Starting Date
// @route   POST /api/admin/review_start/new
// @access  Private
router.route('/new').post(validateReviewStart, catchAsync(createReviewStart));

// @desc    Create List of Cycles
// @route   POST /api/admin/cycles/new
// @access  Private
router.route('/new').post(validateCycles, catchAsync(createCycles));

// @desc    Create Degree Rules
// @route   POST /api/admin/degree_rules/new
// @access  Private
router.route('/new').post(validateDegreeRules, catchAsync(createDegreeRules));

module.exports = router;
