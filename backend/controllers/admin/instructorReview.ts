import { Response } from 'express';
import { AuthenticatedRequest } from '../../interfaces/AuthRequest';
import {
	getInstructorReviews,
	deleteInstructorReviews,
	getTotalInstructorReviews,
} from '../../models/review/instructorReview';
import { tryCatch } from '../../utils/tryCatch';
import CustomError from '../../utils/CustomError';

export const getSystemInstructorReviews = tryCatch(
	async (_: AuthenticatedRequest, res: Response): Promise<Response> => {
		const instructorReviews = await getInstructorReviews();
		if (!instructorReviews.length)
			throw new CustomError(
				'Seems like there are no instructor reviews registered in the system.',
				404
			);

		const totalInstructorReviews = await getTotalInstructorReviews();

		return res.status(200).json({ instructorReviews, totalInstructorReviews });
	}
);

export const deleteSystemInstructorReviews = tryCatch(
	async (_: AuthenticatedRequest, res: Response): Promise<Response> => {
		await deleteInstructorReviews();
		return res
			.status(200)
			.json({ message: 'Instructor reviews existing in the system deleted.' });
	}
);
