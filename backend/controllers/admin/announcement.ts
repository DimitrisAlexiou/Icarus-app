import { Response } from 'express';
import { AuthenticatedRequest } from '../../interfaces/AuthRequest';
import {
	getAnnouncements,
	deleteAnnouncements,
} from '../../models/announcement';
import { tryCatch } from '../../utils/tryCatch';
import CustomError from '../../utils/CustomError';

export const viewAnnouncements = tryCatch(
	async (_: AuthenticatedRequest, res: Response): Promise<Response> => {
		const announcements = await getAnnouncements();

		if (!announcements.length)
			throw new CustomError(
				'Seems like there are no announcements registered in the system.',
				404
			);

		return res.status(200).json(announcements);
	}
);

export const deleteSystemAnnouncements = tryCatch(
	async (_: AuthenticatedRequest, res: Response): Promise<Response> => {
		await deleteAnnouncements();
		return res
			.status(200)
			.json({ message: 'Announcements existing in the system deleted.' });
	}
);
