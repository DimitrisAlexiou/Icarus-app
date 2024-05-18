import { Response } from 'express';
import { AuthenticatedRequest } from '../../interfaces/AuthRequest';
import { deleteAllEvents, getAllEvents } from '../../models/event';
import { tryCatch } from '../../utils/tryCatch';
import CustomError from '../../utils/CustomError';

export const getAllUsersEvents = tryCatch(
	async (_: AuthenticatedRequest, res: Response): Promise<Response> => {
		const events = await getAllEvents();
		if (!events.length)
			throw new CustomError(
				'Seems like there are no events registered in the system.',
				404
			);

		return res.status(200).json(events);
	}
);

export const deleteAllUsersEvents = tryCatch(
	async (_: AuthenticatedRequest, res: Response): Promise<Response> => {
		await deleteAllEvents();
		return res
			.status(200)
			.json({ message: 'Events existing in the system deleted.' });
	}
);
