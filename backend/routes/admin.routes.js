const express = require('express');
const router = express.Router();
const {
	createUser,
	activateUser,
	deleteUser,
	getUsers,
	deleteUsers,
	getStudents,
	getInstructors,
} = require('../controllers/admin/user');
const {
	defineSemester,
	updateSemester,
	getSemesters,
	getSemester,
	deleteSemester,
	deleteSemesters,
} = require('../controllers/admin/semester');
const {
	defineAssessment,
	getAssessment,
	updateAssessment,
	deleteAssessment,
} = require('../controllers/admin/assessmentStatement');
const {
	defineReviewStatement,
	getReviewStatement,
	updateReviewStatement,
	deleteReviewStatement,
} = require('../controllers/admin/review');
const {
	defineCycles,
	getCycles,
	updateCycles,
	deleteCycles,
} = require('../controllers/admin/cycles');
const {
	defineDegreeRules,
	getDegreeRules,
	updateDegreeRules,
	deleteDegreeRules,
} = require('../controllers/admin/degreeRules');
const {
	validateSemester,
	validateAssessment,
	validateReview,
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

// @desc    Define / View Semester
// @route   POST/GET /api/admin/configuration/semester
// @access  Private
router
	.route('/semester')
	.post(authorize, validateSemester, defineSemester)
	.get(authorize, getSemester);

// @desc    Update / Delete Semester
// @route   PUT/DELETE /api/admin/configuration/semester/:id
// @access  Private
router
	.route('/semester/:id')
	.put(authorize, validateSemester, updateSemester)
	.delete(authorize, deleteSemester);

// @desc    View / Delete Semesters
// @route   GET/DELETE /api/admin/configuration/semester
// @access  Private
router.route('/semesters').get(authorize, getSemesters).delete(authorize, deleteSemesters);

// @desc    Define / View Assessment Statement Duration period
// @route   POST/GET /api/admin/configuration/assessment
// @access  Private
router
	.route('/assessment')
	.post(authorize, validateAssessment, defineAssessment)
	.get(authorize, getAssessment);

// @desc    Update / Delete Assessment Statement Duration period
// @route   PUT/DELETE /api/admin/configuration/assessment/:id
// @access  Private
router
	.route('/assessment/:id')
	.put(authorize, validateAssessment, updateAssessment)
	.delete(authorize, deleteAssessment);

// @desc    Define / View Review Statement period
// @route   POST/GET /api/admin/configuration/review
// @access  Private
router
	.route('/review')
	.post(authorize, validateReview, defineReviewStatement)
	.get(authorize, getReviewStatement);

// @desc    Update / Delete Review Statement period
// @route   PUT/DELETE /api/admin/configuration/degree_rules/:id
// @access  Private
router
	.route('/review/:id')
	.put(authorize, validateReview, updateReviewStatement)
	.delete(authorize, deleteReviewStatement);

// @desc    Define / View List of Cycles
// @route   POST/GET /api/admin/configuration/cycles
// @access  Private
router.route('/cycles').post(authorize, validateCycles, defineCycles).get(authorize, getCycles);

// @desc    Update / Delete List of Cycles
// @route   PUT/DELETE /api/admin/configuration/cycles
// @access  Private
router
	.route('/cycles')
	.put(authorize, validateCycles, updateCycles)
	.delete(authorize, deleteCycles);

// @desc    Define / View Degree Rules
// @route   POST/GET /api/admin/configuration/degree_rules
// @access  Private
router
	.route('/degree_rules')
	.post(authorize, validateDegreeRules, defineDegreeRules)
	.get(authorize, getDegreeRules);

// @desc    Update / Delete Degree Rules
// @route   PUT/DELETE /api/admin/configuration/degree_rules/:id
// @access  Private
router
	.route('/degree_rules/:id')
	.put(authorize, validateDegreeRules, updateDegreeRules)
	.delete(authorize, deleteDegreeRules);

// @desc    Create User / Get Users / Delete Users
// @route   POST/GET/DELETE /api/admin/users
// @access  Private
router
	.route('/users')
	.post(authorize, validateUser, createUser)
	.get(authorize, getUsers)
	.delete(authorize, deleteUsers);

// @desc    Delete User
// @route   DELETE /api/admin/users/:id
// @access  Private
router.route('/users/:id').delete(authorize, deleteUser);

// @desc    GET Students
// @route   GET /api/admin/users/students
// @access  Private
router.route('/users/students').get(authorize, getStudents);

// @desc    GET Instructors
// @route   GET /api/admin/users/instructors
// @access  Private
router.route('/users/instructors').get(authorize, getInstructors);

// @desc    Activate User
// @route   PUT /api/admin/users/activate/:id/
// @access  Private
router.route('/users/activate/:id').put(authorize, validateUser, activateUser);

// @desc    Get / Delete All Teaching Reviews
// @route   GET/DELETE /api/admin/review/teaching
// @access  Private ADMIN || INSTRUCTOR
router
	.route('/review/teaching')
	.get(authorize, getTeachingReviews)
	.delete(authorize, deleteTeachingReviews);

// @desc    Get / Delete All Instructor Reviews
// @route   GET/DELETE /api/admin/review/instructor
// @access  Private ADMIN
router
	.route('/review/instructor')
	.get(authorize, getInstructorReviews)
	.delete(authorize, deleteInstructorReviews);

// @desc    Get / Delete All General Reviews
// @route   GET/DELETE /api/admin/review/general
// @access  Private ADMIN
router
	.route('/review/general')
	.get(authorize, getGeneralReviews)
	.delete(authorize, deleteGeneralReviews);

module.exports = router;
