import { Response } from 'express';
import { AuthenticatedRequest } from '../../interfaces/AuthRequest';
import {
	getGeneralReviews,
	deleteGeneralReviews,
	getTotalGeneralReviews,
} from '../../models/review/generalReview';
import { tryCatch } from '../../utils/tryCatch';
import CustomError from '../../utils/CustomError';

export const getSystemGeneralReviews = tryCatch(
	async (_: AuthenticatedRequest, res: Response): Promise<Response> => {
		const generalReviews = await getGeneralReviews();
		if (!generalReviews.length)
			throw new CustomError(
				'Seems like there are no general reviews registered in the system.',
				404
			);

		const totalGeneralReviews = await getTotalGeneralReviews();

		return res.status(200).json({ generalReviews, totalGeneralReviews });
	}
);

export const deleteSystemGeneralReviews = tryCatch(
	async (_: AuthenticatedRequest, res: Response): Promise<Response> => {
		await deleteGeneralReviews();
		return res
			.status(200)
			.json({ message: 'General reviews existing in the system deleted.' });
	}
);
