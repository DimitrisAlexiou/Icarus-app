import mongoose, { startSession } from 'mongoose';
import { Response } from 'express';
import { AuthenticatedRequest } from '../interfaces/AuthRequest';
import {
	createEvent,
	getEventByEventId,
	getUserEvents,
	deleteEvent,
	deleteEvents,
	updateEventById,
} from '../models/calendar';
import { tryCatch } from '../utils/tryCatch';
import CustomError from '../utils/CustomError';

export const addEvent = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { eventId, title, startDate, endDate, allDay } = req.body;

		if (!title || !startDate || !endDate || !allDay)
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
			startDate,
			endDate,
			allDay,
			owner: new mongoose.Types.ObjectId(userId),
		});
		console.log(event);

		return res.status(201).json({ message: 'Event added!', event });
	}
);

export const updateEvent = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { title, startDate, endDate, allDay } = req.body;

		if (!title)
			throw new CustomError('Please fill in all the required fields.', 400);

		const { id } = req.params;
		const updatedEvent = await updateEventById(id, {
			...req.body,
			owner: req.user.id,
		});

		if (!updatedEvent)
			throw new CustomError(
				'Seems like the event that you are trying to update does not exist.',
				404
			);

		return res.status(200).json({ message: 'Event updated!', updatedEvent });
	}
);

export const viewUserEvents = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const userId = req.user.id;
		const userEvents = await getUserEvents(userId);

		if (!userEvents.length)
			throw new CustomError('Seems like there are no events.', 404);

		return res.status(200).json(userEvents);
	}
);

export const deleteUserEvent = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { id } = req.params;
		const eventToDelete = await deleteEvent(id);

		if (!eventToDelete)
			throw new CustomError(
				'Seems like the event that you are trying to delete does not exist.',
				404
			);

		return res
			.status(200)
			.json({ message: 'Event deleted.', event: eventToDelete._id });
	}
);

export const deleteUserEvents = async (
	req: AuthenticatedRequest,
	res: Response
): Promise<Response> => {
	const userId = req.user.id;
	const session = await startSession();

	try {
		session.startTransaction();

		await deleteEvents(userId, session);

		await session.commitTransaction();
	} catch (error) {
		await session.abortTransaction();
		console.error('❌ ', error);
		throw new CustomError('User events did not deleted.', 500);
	} finally {
		session.endSession();
	}

	return res
		.status(200)
		.json({ message: 'User events existing in the system deleted.' });
};
