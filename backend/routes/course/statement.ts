import express from 'express';
import {
	createStudentStatement,
	viewStatement,
	updateStatement,
	deleteStatement,
	viewStudentStatements,
	deleteSystemStatements,
	viewStatements,
} from '../../controllers/course/statement';
import { validateStatement } from '../../middleware/validations';
import { authorize, checkUserRole, isOwner } from '../../middleware/authMiddleware';
import { UserType } from '../../models/users/user';

export default (router: express.Router) => {
	// @desc    Get / Delete Statements
	// @route   GET/DELETE /api/statements
	// @access  Private
	router
		.route('/statements')
		.get(authorize, checkUserRole([UserType.admin]), viewStatements)
		.delete(authorize, checkUserRole([UserType.admin]), deleteSystemStatements);

	// @desc    Get / Create Statements
	// @route   GET/POST/DELETE /api/statement
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
		.get(authorize, isOwner, checkUserRole([UserType.admin, UserType.student]), viewStatement)
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
};
