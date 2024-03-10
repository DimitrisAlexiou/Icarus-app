import express from 'express';
import {
	activateUser,
	addUser,
	deActivateUser,
	deleteSystemUsers,
	deleteUser,
	getSystemInstructors,
	getSystemStudents,
	getSystemUsers,
	updateUser,
} from '../../controllers/admin/user';
import { authorize, checkUserRole } from '../../middleware/authMiddleware';
import { validateUser } from '../../middleware/validations';
import { UserType } from '../../models/users/user';

export default (router: express.Router) => {
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
};
