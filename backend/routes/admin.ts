import express from 'express';
import {
	createUser,
	activateUser,
	deleteUser,
	getAllUsers,
	deleteAllUsers,
	getAllStudents,
	getAllInstructors,
} from '../controllers/admin/user';
import {
	defineSemester,
	updateSemester,
	viewSemesters,
	viewSemester,
	deleteSemester,
	deleteAllSemesters,
} from '../controllers/admin/semester';
import {
	defineAssessment,
	viewAssessment,
	updateAssessment,
	deleteAssessment,
} from '../controllers/admin/assessmentStatement';
import {
	defineReviewStatement,
	getReviewStatement,
	updateReviewStatement,
	deleteReviewStatement,
} from '../controllers/admin/review';
import {
	defineCycles,
	viewCycles,
	updateCycles,
	deleteAllCycles,
} from '../controllers/admin/cycles';
import {
	defineDegreeRules,
	viewDegreeRules,
	updateDegreeRules,
	deleteAllDegreeRules,
} from '../controllers/admin/degreeRules';
import {
	validateSemester,
	validateAssessment,
	validateReview,
	validateCycles,
	validateDegreeRules,
	validateUser,
} from '../middleware/validations';
import {
	getAllTeachingReviews,
	deleteAllTeachingReviews,
} from '../controllers/admin/teachingReview';
import {
	getAllInstructorReviews,
	deleteAllInstructorReviews,
} from '../controllers/admin/instructorReview';
import { getAllGeneralReviews, deleteAllGeneralReviews } from '../controllers/admin/generalReview';
import { authorize, checkUserRole } from '../middleware/authMiddleware';

export default (router: express.Router) => {
	// @desc    Define / View Semester
	// @route   POST/GET /api/admin/configuration/semester
	// @access  Private
	router
		.route('/admin/configuration/semester')
		.post(authorize, checkUserRole(['Admin']), validateSemester, defineSemester)
		.get(authorize, checkUserRole(['Admin']), viewSemester);

	// @desc    Update / Delete Semester
	// @route   PUT/DELETE /api/admin/configuration/semester/:id
	// @access  Private
	router
		.route('/admin/configuration/semester/:id')
		.put(authorize, checkUserRole(['Admin']), validateSemester, updateSemester)
		.delete(authorize, checkUserRole(['Admin']), deleteSemester);

	// @desc    View / Delete Semesters
	// @route   GET/DELETE /api/admin/semester
	// @access  Private
	router
		.route('/admin/configuration/semesters')
		.get(authorize, viewSemesters)
		.delete(authorize, checkUserRole(['Admin']), deleteAllSemesters);

	// @desc    Define / View Assessment Statement Duration period
	// @route   POST/GET /api/admin/configuration/assessment
	// @access  Private
	router
		.route('/admin/configuration/assessment')
		.post(authorize, checkUserRole(['Admin']), validateAssessment, defineAssessment)
		.get(authorize, checkUserRole(['Admin']), viewAssessment);

	// @desc    Update / Delete Assessment Statement Duration period
	// @route   PUT/DELETE /api/admin/configuration/assessment/:id
	// @access  Private
	router
		.route('/admin/configuration/assessment/:id')
		.put(authorize, checkUserRole(['Admin']), validateAssessment, updateAssessment)
		.delete(authorize, checkUserRole(['Admin']), deleteAssessment);

	// @desc    Define / View Review Statement period
	// @route   POST/GET /api/admin/configuration/review
	// @access  Private
	router
		.route('/admin/configuration/review')
		.post(authorize, checkUserRole(['Admin']), validateReview, defineReviewStatement)
		.get(authorize, checkUserRole(['Admin']), getReviewStatement);

	// @desc    Update / Delete Review Statement period
	// @route   PUT/DELETE /api/admin/configuration/degree_rules/:id
	// @access  Private
	router
		.route('/admin/configuration/review/:id')
		.put(authorize, checkUserRole(['Admin']), validateReview, updateReviewStatement)
		.delete(authorize, checkUserRole(['Admin']), deleteReviewStatement);

	// @desc    Define / View List of Cycles
	// @route   POST/GET /api/admin/configuration/cycles
	// @access  Private
	router
		.route('/admin/configuration/cycles')
		.post(authorize, checkUserRole(['Admin']), validateCycles, defineCycles)
		.get(authorize, viewCycles);

	// @desc    Update / Delete List of Cycles
	// @route   PUT/DELETE /api/admin/configuration/cycles
	// @access  Private
	router
		.route('/admin/configuration/cycles')
		.put(authorize, checkUserRole(['Admin']), validateCycles, updateCycles)
		.delete(authorize, checkUserRole(['Admin']), deleteAllCycles);

	// @desc    Define / View Degree Rules
	// @route   POST/GET /api/admin/configuration/degree_rules
	// @access  Private
	router
		.route('/admin/configuration/degree_rules')
		.post(authorize, checkUserRole(['Admin']), validateDegreeRules, defineDegreeRules)
		.get(authorize, checkUserRole(['Admin']), viewDegreeRules);

	// @desc    Update / Delete Degree Rules
	// @route   PUT/DELETE /api/admin/configuration/degree_rules/:id
	// @access  Private
	router
		.route('/admin/configuration/degree_rules/:id')
		.put(authorize, checkUserRole(['Admin']), validateDegreeRules, updateDegreeRules)
		.delete(authorize, checkUserRole(['Admin']), deleteAllDegreeRules);

	// @desc    Create User / Get Users / Delete Users
	// @route   POST/GET/DELETE /api/admin/users
	// @access  Private
	router
		.route('/admin/users')
		.post(authorize, checkUserRole(['Admin']), validateUser, createUser)
		.get(authorize, checkUserRole(['Admin']), getAllUsers)
		.delete(authorize, checkUserRole(['Admin']), deleteAllUsers);

	// @desc    Delete User
	// @route   DELETE /api/admin/users/:id
	// @access  Private
	router.route('/admin/users/:id').delete(authorize, checkUserRole(['Admin']), deleteUser);

	// @desc    GET Students
	// @route   GET /api/admin/users/students
	// @access  Private
	router.route('/admin/users/students').get(authorize, checkUserRole(['Admin']), getAllStudents);

	// @desc    GET Instructors
	// @route   GET /api/admin/users/instructors
	// @access  Private
	router
		.route('/admin/users/instructors')
		.get(authorize, checkUserRole(['Admin']), getAllInstructors);

	// @desc    Activate User
	// @route   PUT /api/admin/users/activate/:id/
	// @access  Private
	router
		.route('/admin/users/activate/:id')
		.put(authorize, checkUserRole(['Admin']), validateUser, activateUser);

	// @desc    Get / Delete All Teaching Reviews
	// @route   GET/DELETE /api/admin/review/teaching
	// @access  Private ADMIN || INSTRUCTOR
	router
		.route('/admin/review/teaching')
		.get(authorize, checkUserRole(['Admin']), getAllTeachingReviews)
		.delete(authorize, checkUserRole(['Admin']), deleteAllTeachingReviews);

	// @desc    Get / Delete All Instructor Reviews
	// @route   GET/DELETE /api/admin/review/instructor
	// @access  Private ADMIN
	router
		.route('/admin/review/instructor')
		.get(authorize, checkUserRole(['Admin']), getAllInstructorReviews)
		.delete(authorize, checkUserRole(['Admin']), deleteAllInstructorReviews);

	// @desc    Get / Delete All General Reviews
	// @route   GET/DELETE /api/admin/review/general
	// @access  Private ADMIN
	router
		.route('/admin/review/general')
		.get(authorize, checkUserRole(['Admin']), getAllGeneralReviews)
		.delete(authorize, checkUserRole(['Admin']), deleteAllGeneralReviews);
};
