const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {
	createUser,
	getUsers,
	deleteUsers,
	deleteUser,
	activateUser,
} = require('../controllers/admin/user');
const {
	defineSemester,
	getSemesters,
	getSemester,
	deleteSemester,
	deleteSemesters,
} = require('../controllers/admin/semester');
const { defineVaccineReassessment } = require('../controllers/admin/vaccineStatement');
const { defineAssessmentDuration } = require('../controllers/admin/assessmentStatement');
const { defineReviewDuration } = require('../controllers/admin/reviewDuration');
const { defineReviewStart } = require('../controllers/admin/reviewStart');
const { defineGradingDuration } = require('../controllers/admin/gradingDuration');
const { defineCycles, viewCycles } = require('../controllers/admin/cycles');
const { defineDegreeRules } = require('../controllers/admin/degreeRules');
const {
	validateSemester,
	validateVaccineReassessment,
	validateAssessmentDuration,
	validateReviewDuration,
	validateReviewStart,
	validateGradingDuration,
	validateCycles,
	validateDegreeRules,
	validateUser,
} = require('../middleware/validations');
const {
	getTeachingReviews,
	deleteTeachingReviews,
} = require('../controllers/admin/teachingReview');
const {
	getInstructorReviews,
	deleteInstructorReviews,
} = require('../controllers/admin/instructorReview');
const { getGeneralReviews, deleteGeneralReviews } = require('../controllers/admin/generalReview');
const { authorize } = require('../middleware/authMiddleware');

// @desc    Define / View / Delete Semester
// @route   POST/GET/DELETE /api/admin/configuration/semester
// @access  Private
router
	.route('/semester')
	.post(validateSemester, catchAsync(defineSemester))
	.get(catchAsync(getSemester))
	.delete(catchAsync(deleteSemester));

// @desc    View / Delete Semesters
// @route   GET/DELETE /api/admin/configuration/semester
// @access  Private
router.route('/semesters').get(catchAsync(getSemesters)).delete(catchAsync(deleteSemesters));

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
router.route('/review_duration').post(validateReviewDuration, catchAsync(defineReviewDuration));

// @desc    Define Review Starting Date
// @route   POST /api/admin/configuration/review_start
// @access  Private
router.route('/review_start').post(validateReviewStart, catchAsync(defineReviewStart));

// @desc    Define Grading Duration Window
// @route   POST /api/admin/configuration/grading_duration
// @access  Private
router.route('/grading_duration').post(validateGradingDuration, catchAsync(defineGradingDuration));

// @desc    Define / View List of Cycles
// @route   POST/GET /api/admin/configuration/cycles
// @access  Private
router.route('/cycles').post(validateCycles, catchAsync(defineCycles)).get(catchAsync(viewCycles));

// @desc    Define Degree Rules
// @route   POST /api/admin/configuration/degree_rules
// @access  Private
router.route('/degree_rules').post(validateDegreeRules, catchAsync(defineDegreeRules));

// @desc    Create User / Get Users / Delete Users
// @route   POST/GET/DELETE /api/admin/users
// @access  Private
router
	.route('/users')
	.post(authorize, validateUser, catchAsync(createUser))
	.get(catchAsync(getUsers))
	.delete(authorize, catchAsync(deleteUsers));

// @desc    Delete User
// @route   DELETE /api/admin/users/:id
// @access  Private
router.route('/users/:id').delete(authorize, catchAsync(deleteUser));

// @desc    Activate User
// @route   PUT /api/admin/users/activate/:id/
// @access  Private
router.route('/users/activate/:id').put(authorize, validateUser, catchAsync(activateUser));

// @desc    Get / Delete All Teaching Reviews
// @route   GET/DELETE /api/admin/review/teaching
// @access  Private ADMIN || INSTRUCTOR
router
	.route('/review/teaching')
	.get(authorize, catchAsync(getTeachingReviews))
	.delete(authorize, catchAsync(deleteTeachingReviews));

// @desc    Get / Delete All Instructor Reviews
// @route   GET/DELETE /api/admin/review/instructor
// @access  Private ADMIN
router
	.route('/review/instructor')
	.get(authorize, catchAsync(getInstructorReviews))
	.delete(authorize, catchAsync(deleteInstructorReviews));

// @desc    Get / Delete All General Reviews
// @route   GET/DELETE /api/admin/review/general
// @access  Private ADMIN
router
	.route('/review/general')
	.get(authorize, catchAsync(getGeneralReviews))
	.delete(authorize, catchAsync(deleteGeneralReviews));

module.exports = router;
