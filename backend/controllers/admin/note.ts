import { Response } from 'express';
import { AuthenticatedRequest } from '../../interfaces/AuthRequest';
import { getAllNotes, deleteAllNotes } from '../../models/note';
import { tryCatch } from '../../utils/tryCatch';
import CustomError from '../../utils/CustomError';

export const getAllUsersNotes = tryCatch(
	async (_: AuthenticatedRequest, res: Response): Promise<Response> => {
		const notes = await getAllNotes();
		if (!notes.length)
			throw new CustomError(
				'Seems like there are no notes registered in the system.',
				404
			);

		return res.status(200).json(notes);
	}
);

export const deleteAllUsersNotes = tryCatch(
	async (_: AuthenticatedRequest, res: Response): Promise<Response> => {
		await deleteAllNotes();
		return res
			.status(200)
			.json({ message: 'Notes existing in the system deleted.' });
	}
);
