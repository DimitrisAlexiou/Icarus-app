import express from 'express';
import {
	viewEvents,
	addEvent,
	deleteUserEvent,
	deleteUserEvents,
	updateEvent,
} from '../controllers/calendar';
import { validateCalendar } from '../middleware/validations';
import { authorize, isOwner } from '../middleware/authMiddleware';

export default (router: express.Router) => {
	// @desc    Get / Post / Delete Events
	// @route   GET/POST/DELETE /api/calendar
	// @access  Private
	router
		.route('/calendar')
		.get(authorize, isOwner, viewEvents)
		.post(authorize, validateCalendar, addEvent)
		.delete(authorize, isOwner, deleteUserEvents);

	// @desc    Update / Delete Event by ID
	// @route   PUT/DELETE /api/calendar/:id
	// @access  Private
	router
		.route('/calendar/:id')
		.put(authorize, isOwner, validateCalendar, updateEvent)
		.delete(authorize, isOwner, deleteUserEvent);
};
