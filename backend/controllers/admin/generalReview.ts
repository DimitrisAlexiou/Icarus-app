import { Request, Response } from 'express';
import { getGeneralReviews, deleteGeneralReviews } from '../../models/review/generalReview';
import { tryCatch } from '../../utils/tryCatch';
import CustomError from '../../utils/CustomError';

export const getSystemGeneralReviews = tryCatch(
	async (_: Request, res: Response): Promise<Response> => {
		const generalReviews = await getGeneralReviews();
		if (!generalReviews.length)
			throw new CustomError(
				'Seems like there are no general reviews registered in the system.',
				404
			);

		return res.status(200).json(generalReviews);
	}
);

export const deleteSystemGeneralReviews = tryCatch(
	async (_: Request, res: Response): Promise<Response> => {
		await deleteGeneralReviews();
		return res.status(200).json({ message: 'General reviews existing in the system deleted.' });
	}
);
