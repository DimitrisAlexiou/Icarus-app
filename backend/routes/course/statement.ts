import express from 'express';
import {
	createStudentStatement,
	viewStatement,
	updateStatement,
	deleteStatement,
	viewStudentStatements,
	deleteSystemStatements,
	viewSystemStatements,
	finalizeStatement,
	viewStatementsInGradingWindow,
	finalizePendingStatements,
} from '../../controllers/course/statement';
import { validateStatement } from '../../middleware/validations';
import {
	authorize,
	checkUserRole,
	isOwner,
} from '../../middleware/authMiddleware';
import { UserType } from '../../models/users/user';

export default (router: express.Router) => {
	// @desc    Get / Delete Statements
	// @route   GET/DELETE /api/statements
	// @access  Private
	router
		.route('/statements')
		.get(authorize, checkUserRole([UserType.admin]), viewSystemStatements)
		.delete(authorize, checkUserRole([UserType.admin]), deleteSystemStatements);

	// @desc    Get Statements In Grading Window
	// @route   GET /api/statements/grading
	// @access  Private
	router
		.route('/statements/grading')
		.get(
			authorize,
			checkUserRole([UserType.admin, UserType.instructor]),
			viewStatementsInGradingWindow
		);

	// @desc    Get / Create Statements
	// @route   GET/POST /api/statement
	// @access  Private
	router
		.route('/statement')
		.get(
			authorize,
			isOwner,
			checkUserRole([UserType.admin, UserType.student]),
			viewStudentStatements
		)
		.post(
			authorize,
			checkUserRole([UserType.admin, UserType.student]),
			validateStatement,
			createStudentStatement
		);

	// @desc    Get / Delete / Update Statement
	// @route   GET/DELETE/PUT /api/statement/:id
	// @access  Private
	router
		.route('/statement/:id')
		.get(
			authorize,
			isOwner,
			checkUserRole([UserType.admin, UserType.student, UserType.instructor]),
			viewStatement
		)
		.delete(
			authorize,
			isOwner,
			checkUserRole([UserType.admin, UserType.student]),
			deleteStatement
		)
		.put(
			authorize,
			isOwner,
			checkUserRole([UserType.admin, UserType.student]),
			validateStatement,
			updateStatement
		);

	// @desc    Finalize Statement
	// @route   PUT /api/statement/:id/finalize
	// @access  Private
	router
		.route('/statement/:statementId/finalize')
		.put(
			authorize,
			isOwner,
			checkUserRole([UserType.admin, UserType.student]),
			finalizeStatement
		);
};
