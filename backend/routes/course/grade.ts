import express from 'express';
import { UserType } from '../../models/users/user';
import { authorize, checkUserRole } from '../../middleware/authMiddleware';
import { validateGrade } from '../../middleware/validations';
import {
	addTeachingGrade,
	deleteGrade,
	finalizeGrade,
	finalizeGrades,
	updateGrade,
	viewGrade,
	viewTeachingGrades,
} from '../../controllers/course/grade';

export default (router: express.Router) => {
	// @desc    Add Teaching Grade
	// @route   POST /api/grade
	// @access  Private
	router
		.route('/grade')
		.post(
			authorize,
			checkUserRole([UserType.admin, UserType.instructor]),
			validateGrade,
			addTeachingGrade
		);

	// @desc    Get Statement Teachings Grades
	// @route   POST /api/grade/:statementId
	// @access  Private
	router
		.route('/grade/:statementId')
		.get(
			authorize,
			checkUserRole([UserType.admin, UserType.instructor]),
			viewTeachingGrades
		);

	// @desc    Get / Delete / Update Teaching Grade
	// @route   GET/DELETE/PUT /api/grade/:id
	// @access  Private
	router
		.route('/grade/:id')
		.get(
			authorize,
			checkUserRole([UserType.admin, UserType.instructor]),
			viewGrade
		)
		.delete(
			authorize,
			checkUserRole([UserType.admin, UserType.instructor]),
			deleteGrade
		)
		.put(
			authorize,
			checkUserRole([UserType.admin, UserType.instructor]),
			validateGrade,
			updateGrade
		);

	// @desc    Finalize Grade
	// @route   PUT /api/grade/:gradeId/finalize
	// @access  Private
	router
		.route('/grade/:gradeId/finalize')
		.put(
			authorize,
			checkUserRole([UserType.admin, UserType.instructor]),
			finalizeGrade
		);

	// @desc    Finalize Teaching Grades
	// @route   PUT /api/grade/:statementId/finalize/all
	// @access  Private
	router
		.route('/grade/:statementId/finalize/all')
		.put(
			authorize,
			checkUserRole([UserType.admin, UserType.instructor]),
			finalizeGrades
		);
};
