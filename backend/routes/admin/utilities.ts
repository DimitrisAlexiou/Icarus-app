import express from 'express';
import {
	deleteAllUsersNotes,
	getAllUsersNotes,
} from '../../controllers/admin/note';
import {
	deleteAllUsersEvents,
	getAllUsersEvents,
} from '../../controllers/admin/events';
import {
	deleteSystemAnnouncements,
	viewAnnouncements,
} from '../../controllers/admin/announcement';
import { authorize, checkUserRole } from '../../middleware/authMiddleware';
import { UserType } from '../../models/users/user';

export default (router: express.Router) => {
	// @desc    Get / Delete Notes
	// @route   GET/DELETE /api/admin/notes
	// @access  Private
	router
		.route('/admin/notes')
		.get(authorize, getAllUsersNotes)
		.delete(authorize, deleteAllUsersNotes);

	// @desc    Get / Delete Events
	// @route   GET/DELETE /api/admin/events
	// @access  Private
	router
		.route('/admin/events')
		.get(authorize, getAllUsersEvents)
		.delete(authorize, deleteAllUsersEvents);

	// @desc    Get / Delete Announcements
	// @route   GET/DELETE /api/admin/announcement
	// @access  Private
	router
		.route('/admin/announcement')
		.get(authorize, checkUserRole([UserType.admin]), viewAnnouncements)
		.delete(
			authorize,
			checkUserRole([UserType.admin]),
			deleteSystemAnnouncements
		);
};
