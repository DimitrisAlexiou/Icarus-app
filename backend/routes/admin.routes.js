const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {
	defineSemester,
	viewCurrentSemester,
	defineVaccineReassessment,
	defineAssessmentDuration,
	defineReviewDuration,
	defineReviewStart,
	defineGradingDuration,
	defineCycles,
	defineDegreeRules,
} = require('../controllers/admin');
const {
	validateSemester,
	validateVaccineReassessment,
	validateAssessmentDuration,
	validateReviewDuration,
	validateReviewStart,
	validateGradingDuration,
	validateCycles,
	validateDegreeRules,
} = require('../middleware/validations');
const { authenticate } = require('../middleware/authMiddleware');

// @desc    Define Semester
// @route   POST /api/admin/configuration/semester
// @access  Private
router.route('/semester').post(validateSemester, catchAsync(defineSemester));

// @desc    View Semester
// @route   POST /api/admin/configuration/semester
// @access  Private
router.route('/semester').get(catchAsync(viewCurrentSemester));

// @desc    Define Vaccine/Reassessment Statement Duration Window
// @route   POST /api/admin/configuration/vaccine_reassessment_duration
// @access  Private
router
	.route('/vaccine_reassessment_duration')
	.post(validateVaccineReassessment, catchAsync(defineVaccineReassessment));

// @desc    Define Assessment Statement Duration Window
// @route   POST /api/admin/configuration/assessment_duration
// @access  Private
router
	.route('/assessment_duration')
	.post(validateAssessmentDuration, catchAsync(defineAssessmentDuration));

// @desc    Define Review Duration Window
// @route   POST /api/admin/configuration/review_duration
// @access  Private
router
	.route('/review_duration')
	.post(validateReviewDuration, catchAsync(defineReviewDuration));

// @desc    Define Review Starting Date
// @route   POST /api/admin/configuration/review_start
// @access  Private
router
	.route('/review_start')
	.post(validateReviewStart, catchAsync(defineReviewStart));

// @desc    Define Grading Duration Window
// @route   POST /api/admin/configuration/grading_duration
// @access  Private
router
	.route('/grading_duration')
	.post(validateGradingDuration, catchAsync(defineGradingDuration));

// @desc    Define List of Cycles
// @route   POST /api/admin/configuration/cycles
// @access  Private
router.route('/cycles').post(validateCycles, catchAsync(defineCycles));

// @desc    Define Degree Rules
// @route   POST /api/admin/configuration/degree_rules
// @access  Private
router
	.route('/degree_rules')
	.post(validateDegreeRules, catchAsync(defineDegreeRules));

module.exports = router;
