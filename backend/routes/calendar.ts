import express from 'express';
import { viewEvents, addEvent, deleteUserEvent, deleteUserEvents } from '../controllers/calendar';
import { validateCalendar } from '../middleware/validations';
import { authorize, isOwner } from '../middleware/authMiddleware';

export default (router: express.Router) => {
	// @desc    Get Events / Post / Delete Event
	// @route   GET/POST/DELETE /api/calendar
	// @access  Private
	router
		.route('/calendar')
		.get(authorize, isOwner, viewEvents)
		.post(authorize, validateCalendar, addEvent);
	// .delete(authorize, deleteEvent);

	router.route('/calendar/:id').delete(authorize, isOwner, deleteUserEvent);

	// @desc    Delete Events
	// @route   DELETE /api/calendar/delete
	// @access  Private
	router.route('/calendar/delete').delete(authorize, isOwner, deleteUserEvents);
};
