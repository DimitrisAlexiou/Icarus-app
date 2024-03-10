import { Response } from 'express';
import { AuthenticatedRequest } from '../../../interfaces/AuthRequest';
import { tryCatch } from '../../../utils/tryCatch';
import { getGrades, deleteGrades } from '../../../models/course/grade/grade';
import CustomError from '../../../utils/CustomError';

export const viewSystemGrades = tryCatch(
	async (_: AuthenticatedRequest, res: Response): Promise<Response> => {
		const grades = await getGrades();
		if (!grades.length)
			throw new CustomError(
				'Seems like there are no grades defined in the system.',
				404
			);

		return res.status(200).json(grades);
	}
);

export const deleteSystemGrades = tryCatch(
	async (_: AuthenticatedRequest, res: Response): Promise<Response> => {
		await deleteGrades();
		return res.status(200).json({
			message: 'Defined system grades deleted.',
		});
	}
);
