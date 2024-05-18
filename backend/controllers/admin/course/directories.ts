import { Response } from 'express';
import { AuthenticatedRequest } from '../../../interfaces/AuthRequest';
import {
	getDirectories,
	deleteDirectories,
} from '../../../models/course/documents/directory';
import { tryCatch } from '../../../utils/tryCatch';
import CustomError from '../../../utils/CustomError';

export const viewSystemDirectories = tryCatch(
	async (_: AuthenticatedRequest, res: Response): Promise<Response> => {
		const directories = await getDirectories();

		if (!directories.length)
			throw new CustomError(
				'Seems like there are no course teaching directories in the system.',
				404
			);

		return res.status(200).json(directories);
	}
);

export const deleteSystemDirectories = tryCatch(
	async (_: AuthenticatedRequest, res: Response): Promise<Response> => {
		await deleteDirectories();
		return res
			.status(200)
			.json({ message: 'System course teaching directories deleted.' });
	}
);
