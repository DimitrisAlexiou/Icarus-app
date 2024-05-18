import express from 'express';
import {
	viewUserEvents,
	addEvent,
	deleteUserEvent,
	deleteUserEvents,
	updateEvent,
} from '../controllers/event';
import { validateEvent } from '../middleware/validations';
import { authorize, isOwner } from '../middleware/authMiddleware';

export default (router: express.Router) => {
	// @desc    Get / Post / Delete Events
	// @route   GET/POST/DELETE /api/event
	// @access  Private
	router
		.route('/event')
		.get(authorize, isOwner, viewUserEvents)
		.post(authorize, validateEvent, addEvent)
		.delete(authorize, isOwner, deleteUserEvents);

	// @desc    Delete Event by Title
	// @route   DELETE /api/event/delete
	// @access  Private
	router.route('/event/delete').delete(authorize, isOwner, deleteUserEvent);

	// @desc    Update / Delete Event by ID
	// @route   PUT/DELETE /api/event/:id
	// @access  Private
	router
		.route('/event/:id')
		.put(authorize, isOwner, validateEvent, updateEvent);
};
