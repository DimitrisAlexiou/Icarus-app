import express from 'express';
import {
	addUser,
	activateUser,
	deleteUser,
	getSystemUsers,
	deleteSystemUsers,
	getSystemStudents,
	getSystemInstructors,
	deActivateUser,
	updateUser,
} from '../controllers/admin/user';
import {
	defineSemester,
	updateSemester,
	viewSemesters,
	viewSemester,
	deleteSemester,
	deleteSystemSemesters,
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
	defineCycle,
	updateCycle,
	viewCycle,
	viewCycles,
	deleteCycle,
	deleteSystemCycles,
} from '../controllers/admin/cycle';
import {
	defineDegreeRules,
	viewDegreeRules,
	updateDegreeRules,
	deleteSystemDegreeRules,
} from '../controllers/admin/degreeRules';
import {
	validateSemester,
	validateAssessment,
	validateReview,
	validateDegreeRules,
	validateUser,
} from '../middleware/validations';
import {
	getSystemTeachingReviews,
	deleteSystemTeachingReviews,
} from '../controllers/admin/teachingReview';
import {
	getSystemInstructorReviews,
	deleteSystemInstructorReviews,
} from '../controllers/admin/instructorReview';
import {
	getSystemGeneralReviews,
	deleteSystemGeneralReviews,
} from '../controllers/admin/generalReview';
import { deleteAllUsersNotes, getAllUsersNotes } from '../controllers/admin/note';
import { authorize, checkUserRole } from '../middleware/authMiddleware';
import { UserType } from '../models/users/user';

export default (router: express.Router) => {
	// @desc    Define / View Semester
	// @route   POST/GET /api/admin/configuration/semester
	// @access  Private
	router
		.route('/admin/configuration/semester')
		.post(authorize, checkUserRole([UserType.admin]), validateSemester, defineSemester)
		.get(authorize, viewSemester);

	// @desc    Update / Delete Semester
	// @route   PUT/DELETE /api/admin/configuration/semester/:id
	// @access  Private
	router
		.route('/admin/configuration/semester/:id')
		.put(authorize, checkUserRole([UserType.admin]), validateSemester, updateSemester)
		.delete(authorize, checkUserRole([UserType.admin]), deleteSemester);

	// @desc    View / Delete Semesters
	// @route   GET/DELETE /admin/configuration/semesters
	// @access  Private
	router
		.route('/admin/configuration/semesters')
		.get(authorize, viewSemesters)
		.delete(authorize, checkUserRole([UserType.admin]), deleteSystemSemesters);

	// @desc    Define / View Assessment Statement Duration period
	// @route   POST/GET /api/admin/configuration/assessment
	// @access  Private
	router
		.route('/admin/configuration/assessment')
		.post(authorize, checkUserRole([UserType.admin]), validateAssessment, defineAssessment)
		.get(authorize, checkUserRole([UserType.admin]), viewAssessment);

	// @desc    Update / Delete Assessment Statement Duration period
	// @route   PUT/DELETE /api/admin/configuration/assessment/:id
	// @access  Private
	router
		.route('/admin/configuration/assessment/:id')
		.put(authorize, checkUserRole([UserType.admin]), validateAssessment, updateAssessment)
		.delete(authorize, checkUserRole([UserType.admin]), deleteAssessment);

	// @desc    Define / View Review Statement period
	// @route   POST/GET /api/admin/configuration/review
	// @access  Private
	router
		.route('/admin/configuration/review')
		.post(authorize, checkUserRole([UserType.admin]), validateReview, defineReviewStatement)
		.get(authorize, checkUserRole([UserType.admin, UserType.student]), getReviewStatement);

	// @desc    Update / Delete Review Statement period
	// @route   PUT/DELETE /api/admin/configuration/review/:id
	// @access  Private
	router
		.route('/admin/configuration/review/:id')
		.put(authorize, checkUserRole([UserType.admin]), validateReview, updateReviewStatement)
		.delete(authorize, checkUserRole([UserType.admin]), deleteReviewStatement);

	// @desc    Define / View / Delete List of Cycles
	// @route   POST/GET/DELETE /api/admin/configuration/cycles
	// @access  Private
	router
		.route('/admin/configuration/cycles')
		.get(authorize, viewCycles)
		.post(authorize, checkUserRole([UserType.admin]), defineCycle)
		.delete(authorize, checkUserRole([UserType.admin]), deleteSystemCycles);

	// @desc    View / Update / Delete List of Cycles
	// @route   GET/PUT/DELETE /api/admin/configuration/cycles/:id
	// @access  Private
	router
		.route('/admin/configuration/cycles/:id')
		.get(authorize, viewCycle)
		.put(authorize, checkUserRole([UserType.admin]), updateCycle)
		.delete(authorize, checkUserRole([UserType.admin]), deleteCycle);

	// @desc    Define / View Degree Rules
	// @route   POST/GET /api/admin/configuration/degree_rules
	// @access  Private
	router
		.route('/admin/configuration/degree_rules')
		.post(authorize, checkUserRole([UserType.admin]), validateDegreeRules, defineDegreeRules)
		.get(authorize, checkUserRole([UserType.admin]), viewDegreeRules);

	// @desc    Update / Delete Degree Rules
	// @route   PUT/DELETE /api/admin/configuration/degree_rules/:id
	// @access  Private
	router
		.route('/admin/configuration/degree_rules/:id')
		.put(authorize, checkUserRole([UserType.admin]), validateDegreeRules, updateDegreeRules)
		.delete(authorize, checkUserRole([UserType.admin]), deleteSystemDegreeRules);

	// @desc    Create User / Get Users / Delete Users
	// @route   POST/GET/DELETE /api/admin/users
	// @access  Private
	router
		.route('/admin/users')
		.post(authorize, checkUserRole([UserType.admin]), validateUser, addUser)
		.get(authorize, checkUserRole([UserType.admin]), getSystemUsers)
		.delete(authorize, checkUserRole([UserType.admin]), deleteSystemUsers);

	// @desc    Delete User / Update User
	// @route   DELETE/UPDATE /api/admin/users/:id
	// @access  Private
	router
		.route('/admin/users/:id')
		.delete(authorize, checkUserRole([UserType.admin]), deleteUser)
		.put(authorize, checkUserRole([UserType.admin]), updateUser);

	// @desc    GET Students
	// @route   GET /api/admin/users/students
	// @access  Private
	router
		.route('/admin/users/students')
		.get(authorize, checkUserRole([UserType.admin]), getSystemStudents);

	// @desc    GET Instructors
	// @route   GET /api/admin/users/instructors
	// @access  Private
	router
		.route('/admin/users/instructors')
		.get(authorize, checkUserRole([UserType.admin]), getSystemInstructors);

	// @desc    Activate User
	// @route   PUT /api/admin/users/:id/activate
	// @access  Private
	router
		.route('/admin/users/:id/activate')
		.patch(authorize, checkUserRole([UserType.admin]), activateUser);

	// @desc    Deactivate User
	// @route   PUT /api/admin/users/:id/deactivate
	// @access  Private
	router
		.route('/admin/users/:id/deactivate')
		.patch(authorize, checkUserRole([UserType.admin]), deActivateUser);

	// @desc    Get / Delete System Teaching Reviews
	// @route   GET/DELETE /api/admin/review/teaching
	// @access  Private
	router
		.route('/admin/review/teaching')
		.get(authorize, getSystemTeachingReviews)
		.delete(authorize, checkUserRole([UserType.admin]), deleteSystemTeachingReviews);

	// @desc    Get / Delete System Instructor Reviews
	// @route   GET/DELETE /api/admin/review/instructor
	// @access  Private ADMIN
	router
		.route('/admin/review/instructor')
		.get(authorize, getSystemInstructorReviews)
		.delete(authorize, checkUserRole([UserType.admin]), deleteSystemInstructorReviews);

	// @desc    Get / Delete System General Reviews
	// @route   GET/DELETE /api/admin/review/general
	// @access  Private ADMIN
	router
		.route('/admin/review/general')
		.get(authorize, getSystemGeneralReviews)
		.delete(authorize, checkUserRole([UserType.admin]), deleteSystemGeneralReviews);

	// @desc    Get / Delete Notes
	// @route   GET/DELETE /api/admin/notes
	// @access  Private
	router
		.route('/admin/notes')
		.get(authorize, getAllUsersNotes)
		.delete(authorize, deleteAllUsersNotes);
};
