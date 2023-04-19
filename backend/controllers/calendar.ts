import { Request, Response } from 'express';
import {
	createEvent,
	getEventByEventId,
	getEvents,
	deleteEvent,
	deleteEvents,
} from '../models/calendar';
import { User, getUserById } from '../models/users/user';

interface User {
	id: string;
}

interface AuthenticatedRequest extends Request {
	user?: User;
}

export const addEvent = async (req: AuthenticatedRequest, res: Response) => {
	const { eventId, title, start, end, allDay } = req.body;

	if (!title || !start || !end || !allDay)
		return res.status(400).json('Please fill in all the required fields.');

	try {
		const userId = req.user.id;
		const user = await getUserById(userId);

		if (!user) {
			return res.status(401).json('User not found.');
		} else {
			try {
				const existingEvent = await getEventByEventId(eventId);
				if (existingEvent) {
					return res
						.status(400)
						.json('Seems like an event with this title already exists for the day.');
				} else {
					try {
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
					} catch (error) {
						console.error('❌ Error while creating event: ', error);
						return res.status(500).json({
							message: 'Something went wrong, unfortunately event did not created.',
						});
					}
				}
			} catch (error) {
				console.error('❌ Error while checking if event already exists: ', error);
				return res.status(500).json({ message: 'Something went wrong, try again later.' });
			}
		}
	} catch (error) {
		console.error('❌ Error while finding user: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later.' });
	}
};

export const viewEvents = async (req: AuthenticatedRequest, res: Response) => {
	try {
		const userId = req.user.id;
		const user = await getUserById(userId);

		if (!user) {
			return res.status(401).json('User not found.');
		} else {
			try {
				const userEvents = await getEvents(userId);
				if (!userEvents) return res.status(404).json(`Seems like there are no events.`);
				else return res.status(200).json(userEvents);
			} catch (error) {
				console.error('❌ Error while finding user events: ', error);
				return res.status(500).json({ message: 'Something went wrong, try again later.' });
			}
		}
	} catch (error) {
		console.error('❌ Error while finding user: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later.' });
	}
};

export const deleteUserEvent = async (req: AuthenticatedRequest, res: Response) => {
	try {
		const userId = req.user.id;
		const user = await getUserById(userId);

		if (!user) {
			return res.status(401).json('User not found.');
		} else {
			try {
				const { id } = req.params;
				await deleteEvent(id);
				return res.status(200).json('Event deleted.');
			} catch (error) {
				console.error('❌ Error while deleting user event: ', error);
				return res.status(500).json({
					message: 'Something went wrong, unfortunately event did not deleted.',
				});
			}
		}
	} catch (error) {
		console.error('❌ Error while finding user: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later.' });
	}
};

export const deleteUserEvents = async (req: AuthenticatedRequest, res: Response) => {
	try {
		const userId = req.user.id;
		const user = await getUserById(userId);

		if (!user) {
			return res.status(401).json('User not found.');
		} else {
			try {
				await deleteEvents(userId);
				return res.status(200).json('All user events deleted.');
			} catch (error) {
				console.error('❌ Error while deleting all user events: ', error);
				return res.status(500).json({
					message: 'Something went wrong, unfortunately events did not deleted.',
				});
			}
		}
	} catch (error) {
		console.error('❌ Error while finding user: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later.' });
	}
};
