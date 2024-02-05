import { Response } from 'express';
import { AuthenticatedRequest } from '../../interfaces/AuthRequest';
import {
	getTeachingReviews,
	deleteTeachingReviews,
	getTotalTeachingReviews,
} from '../../models/review/teachingReview';
import { tryCatch } from '../../utils/tryCatch';
import CustomError from '../../utils/CustomError';

export const getSystemTeachingReviews = tryCatch(
	async (_: AuthenticatedRequest, res: Response): Promise<Response> => {
		const teachingReviews = await getTeachingReviews();
		if (!teachingReviews.length)
			throw new CustomError(
				'Seems like there are no teaching reviews registered in the system.',
				404
			);

		const totalTeachingReviews = await getTotalTeachingReviews();

		return res.status(200).json({ teachingReviews, totalTeachingReviews });
	}
);

export const deleteSystemTeachingReviews = tryCatch(
	async (_: AuthenticatedRequest, res: Response): Promise<Response> => {
		await deleteTeachingReviews();
		return res
			.status(200)
			.json({ message: 'Teaching reviews existing in the system deleted.' });
	}
);
