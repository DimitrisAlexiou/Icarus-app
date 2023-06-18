import { Request, Response } from 'express';
import { getTeachingReviews, deleteTeachingReviews } from '../../models/review/teachingReview';
import { tryCatch } from '../../utils/tryCatch';
import CustomError from '../../utils/CustomError';

export const getAllTeachingReviews = tryCatch(
	async (_: Request, res: Response): Promise<Response> => {
		const teachingReviews = await getTeachingReviews();
		if (!teachingReviews.length)
			throw new CustomError(
				'Seems like there are no teaching reviews registered in the system.',
				404
			);

		return res.status(200).json(teachingReviews);
	}
);

export const deleteAllTeachingReviews = tryCatch(
	async (_: Request, res: Response): Promise<Response> => {
		await deleteTeachingReviews();
		return res
			.status(200)
			.json({ message: 'Teaching reviews existing in the system deleted.' });
	}
);
