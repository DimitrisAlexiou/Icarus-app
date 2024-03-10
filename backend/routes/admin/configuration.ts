import express from 'express';
import {
	defineSemester,
	deleteSemester,
	deleteSystemSemesters,
	updateSemester,
	viewPreviousSemester,
	viewSemester,
	viewSemesters,
} from '../../controllers/admin/configuration/semester';
import {
	defineAssessment,
	deleteAssessment,
	updateAssessment,
	viewAssessment,
} from '../../controllers/admin/configuration/assessmentStatement';
import {
	defineReviewStatement,
	deleteReviewStatement,
	getReviewStatement,
	updateReviewStatement,
} from '../../controllers/admin/configuration/review';
import {
	defineCycle,
	deleteCycle,
	deleteSystemCycles,
	updateCycle,
	viewCycle,
	viewCycles,
} from '../../controllers/admin/configuration/cycle';
import {
	defineDegreeRules,
	deleteSystemDegreeRules,
	updateDegreeRules,
	viewDegreeRules,
} from '../../controllers/admin/configuration/degreeRules';
import {
	defineMasterProgram,
	deleteMasterProgram,
	deleteSystemMasterPrograms,
	updateMasterProgram,
	viewMasterProgram,
	viewMasterPrograms,
} from '../../controllers/admin/configuration/master';
import { authorize, checkUserRole } from '../../middleware/authMiddleware';
import {
	validateAssessment,
	validateDegreeRules,
	validateMasterProgram,
	validateReview,
	validateSemester,
} from '../../middleware/validations';
import { UserType } from '../../models/users/user';

export default (router: express.Router) => {
	// @desc    Define / View Semester
	// @route   POST/GET /api/admin/configuration/semester
	// @access  Private
	router
		.route('/admin/configuration/semester')
		.post(
			authorize,
			checkUserRole([UserType.admin]),
			validateSemester,
			defineSemester
		)
		.get(viewSemester);

	// @desc    View Previous Semester
	// @route   GET /api/admin/configuration/semester/previous
	// @access  Private
	router
		.route('/admin/configuration/semester/previous')
		.get(viewPreviousSemester);

	// @desc    Update / Delete Semester
	// @route   PUT/DELETE /api/admin/configuration/semester/:id
	// @access  Private
	router
		.route('/admin/configuration/semester/:id')
		.put(
			authorize,
			checkUserRole([UserType.admin]),
			validateSemester,
			updateSemester
		)
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
		.post(
			authorize,
			checkUserRole([UserType.admin]),
			validateAssessment,
			defineAssessment
		)
		.get(authorize, viewAssessment);

	// @desc    Update / Delete Assessment Statement Duration period
	// @route   PUT/DELETE /api/admin/configuration/assessment/:id
	// @access  Private
	router
		.route('/admin/configuration/assessment/:id')
		.put(
			authorize,
			checkUserRole([UserType.admin]),
			validateAssessment,
			updateAssessment
		)
		.delete(authorize, checkUserRole([UserType.admin]), deleteAssessment);

	// @desc    Define / View Review Statement period
	// @route   POST/GET /api/admin/configuration/review
	// @access  Private
	router
		.route('/admin/configuration/review')
		.post(
			authorize,
			checkUserRole([UserType.admin]),
			validateReview,
			defineReviewStatement
		)
		.get(
			authorize,
			checkUserRole([UserType.admin, UserType.student]),
			getReviewStatement
		);

	// @desc    Update / Delete Review Statement period
	// @route   PUT/DELETE /api/admin/configuration/review/:id
	// @access  Private
	router
		.route('/admin/configuration/review/:id')
		.put(
			authorize,
			checkUserRole([UserType.admin]),
			validateReview,
			updateReviewStatement
		)
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
		.post(
			authorize,
			checkUserRole([UserType.admin]),
			validateDegreeRules,
			defineDegreeRules
		)
		.get(authorize, checkUserRole([UserType.admin]), viewDegreeRules);

	// @desc    Update / Delete Degree Rules
	// @route   PUT/DELETE /api/admin/configuration/degree_rules/:id
	// @access  Private
	router
		.route('/admin/configuration/degree_rules/:id')
		.put(
			authorize,
			checkUserRole([UserType.admin]),
			validateDegreeRules,
			updateDegreeRules
		)
		.delete(
			authorize,
			checkUserRole([UserType.admin]),
			deleteSystemDegreeRules
		);

	// @desc    Define / View / Delete Master Programs
	// @route   POST/GET/DELETE /api/admin/configuration/master
	// @access  Private
	router
		.route('/admin/configuration/master')
		.get(viewMasterPrograms)
		.post(
			authorize,
			checkUserRole([UserType.admin]),
			validateMasterProgram,
			defineMasterProgram
		)
		.delete(
			authorize,
			checkUserRole([UserType.admin]),
			deleteSystemMasterPrograms
		);

	// @desc    View / Update / Delete
	// @route   GET/PUT/DELETE /api/admin/configuration/master/:id
	// @access  Private
	router
		.route('/admin/configuration/master/:id')
		.get(viewMasterProgram)
		.put(
			authorize,
			checkUserRole([UserType.admin]),
			validateMasterProgram,
			updateMasterProgram
		)
		.delete(authorize, checkUserRole([UserType.admin]), deleteMasterProgram);
};
