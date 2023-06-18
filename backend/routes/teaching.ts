import express from 'express';
import {
	deleteTeaching,
	viewTeaching,
	updateTeaching,
	viewTeachings,
	deleteAllTeachings,
} from '../controllers/course/teaching';
import { validateTeaching } from '../middleware/validations';
import { authorize, checkUserRole } from '../middleware/authMiddleware';
import { UserType } from '../models/users/user';

export default (router: express.Router) => {
	// @desc    Get / Delete Teachings
	// @route   GET/DELETE /api/course/teaching
	// @access  Private
	router
		.route('/course/teaching')
		.get(authorize, viewTeachings)
		.delete(authorize, checkUserRole([UserType.admin]), deleteAllTeachings);

	// @desc    Get / Delete / Update Teaching
	// @route   GET/DELETE/PUT /api/course/teaching/:id
	// @access  Private
	router
		.route('/course/teaching/:id')
		.get(authorize, viewTeaching)
		.delete(authorize, checkUserRole([UserType.admin, UserType.instructor]), deleteTeaching)
		.put(
			authorize,
			checkUserRole([UserType.admin, UserType.instructor]),
			validateTeaching,
			updateTeaching
		);
};
