import express from 'express';
import { validateAnnouncement } from '../middleware/validations';
import {
	authorize,
	checkUserRole,
	isOwner,
} from '../middleware/authMiddleware';
import { UserType } from '../models/users/user';
import {
	createTeachingAnnouncement,
	deleteAllInstructorAnnouncements,
	deleteAllTeachingAnnouncements,
	deleteTeachingAnnouncement,
	updateAnnouncement,
	viewAnnouncement,
	viewInstructorAnnouncements,
	viewTeachingAnnouncements,
} from '../controllers/announcement';

export default (router: express.Router) => {
	// @desc    Post Teaching Announcement
	// @route   POST /api/announcement
	// @access  Private
	router
		.route('/announcement')
		.post(
			authorize,
			checkUserRole([UserType.admin, UserType.instructor]),
			validateAnnouncement,
			createTeachingAnnouncement
		);

	// @desc    Get / Delete Instructor Announcements
	// @route   POST /api/announcement/instructor
	// @access  Private
	router
		.route('/announcement/instructor')
		.get(
			authorize,
			isOwner,
			checkUserRole([UserType.admin, UserType.instructor]),
			viewInstructorAnnouncements
		)
		.delete(
			authorize,
			isOwner,
			checkUserRole([UserType.admin, UserType.instructor]),
			deleteAllInstructorAnnouncements
		);

	// @desc    Get / Delete Teaching Announcements
	// @route   GET/DELETE /api/announcement/teaching/:teachingId
	// @access  Private
	router
		.route('/announcement/teaching/:teachingId')
		.get(authorize, viewTeachingAnnouncements)
		.delete(
			authorize,
			checkUserRole([UserType.admin]),
			deleteAllTeachingAnnouncements
		);

	// @desc    Get / Update / Delete Teaching Announcement by ID
	// @route   GET/PUT/DELETE /api/announcement/:id
	// @access  Private
	router
		.route('/announcement/:id')
		.get(authorize, viewAnnouncement)
		.put(
			authorize,
			isOwner,
			checkUserRole([UserType.admin, UserType.instructor]),
			validateAnnouncement,
			updateAnnouncement
		)
		.delete(
			authorize,
			isOwner,
			checkUserRole([UserType.admin, UserType.instructor]),
			deleteTeachingAnnouncement
		);
};
