import { Request, Response } from 'express';
import {
	getInstructorReviews,
	deleteInstructorReviews,
} from '../../models/review/instructorReview';
import { tryCatch } from '../../utils/tryCatch';
import CustomError from '../../utils/CustomError';

export const getAllInstructorReviews = tryCatch(async (_: Request, res: Response) => {
	const instructorReviews = await getInstructorReviews();
	if (!instructorReviews)
		throw new CustomError(
			'Seems like there are no instructor reviews registered in the system.',
			404
		);

	return res.status(200).json(instructorReviews);
});

export const deleteAllInstructorReviews = tryCatch(async (_: Request, res: Response) => {
	await deleteInstructorReviews();
	return res.status(200).json({ message: 'Instructor reviews existing in the system deleted.' });
});
