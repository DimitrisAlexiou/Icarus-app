import { Request, Response } from 'express';
import { getGeneralReviews, deleteGeneralReviews } from '../../models/review/generalReview';
import { tryCatch } from '../../utils/tryCatch';
import CustomError from '../../utils/CustomError';

export const getAllGeneralReviews = tryCatch(async (_: Request, res: Response) => {
	const generalReviews = await getGeneralReviews();
	if (!generalReviews)
		throw new CustomError(
			'Seems like there are no general reviews registered in the system.',
			404
		);

	return res.status(200).json(generalReviews);
});

export const deleteAllGeneralReviews = tryCatch(async (_: Request, res: Response) => {
	await deleteGeneralReviews();
	return res.status(200).json({ message: 'General reviews existing in the system deleted.' });
});
