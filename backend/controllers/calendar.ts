import { Request, Response } from 'express';
import {
	createEvent,
	getEventByEventId,
	getEvents,
	deleteEvent,
	deleteEvents,
} from '../models/calendar';
import { UserProps } from '../models/users/user';
import { tryCatch } from '../utils/tryCatch';
import CustomError from '../utils/CustomError';

interface AuthenticatedRequest extends Request {
	user?: UserProps;
}

export const addEvent = tryCatch(async (req: AuthenticatedRequest, res: Response) => {
	const { eventId, title, start, end, allDay } = req.body;

	if (!title || !start || !end || !allDay)
		throw new CustomError('Please fill in all the required fields.', 400);

	const userId = req.user.id;
	const existingEvent = await getEventByEventId(eventId);

	if (existingEvent)
		throw new CustomError(
			'Seems like an event with this title already exists for that day.',
			400
		);

	const event = await createEvent({
		eventId,
		title,
		start,
		end,
		allDay,
		owner: userId,
		status: 'new',
	});
	console.log(event);

	return res.status(201).json(event);
});

export const viewEvents = tryCatch(async (req: AuthenticatedRequest, res: Response) => {
	const userId = req.user.id;
	const userEvents = await getEvents(userId);

	if (!userEvents) throw new CustomError('Seems like there are no events.', 404);

	return res.status(200).json(userEvents);
});

export const deleteUserEvent = tryCatch(async (req: AuthenticatedRequest, res: Response) => {
	const { id } = req.params;
	const eventToDelete = await deleteEvent(id);

	if (!eventToDelete)
		throw new CustomError(
			'Seems like the event that you are trying to delete does not exist.',
			404
		);

	return res.status(200).json({ message: 'Event deleted.' });
});

export const deleteUserEvents = tryCatch(async (req: AuthenticatedRequest, res: Response) => {
	const userId = req.user.id;

	await deleteEvents(userId);

	return res.status(200).json({ message: 'User events existing in the system deleted.' });
});
