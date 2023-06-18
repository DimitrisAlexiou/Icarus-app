import { Request, Response } from 'express';
import {
	createReview,
	updateReviewById,
	getReview,
	getReviewBySemester,
	deleteReviewById,
	deleteReview,
} from '../../models/admin/review';
import { getCurrentSemester } from '../../models/admin/semester';
import { tryCatch } from '../../utils/tryCatch';
import CustomError from '../../utils/CustomError';

export const defineReviewStatement = tryCatch(
	async (req: Request, res: Response): Promise<Response> => {
		const { startDate, endDate, startAfter } = req.body;

		if (!startDate || !endDate || !startAfter)
			throw new CustomError('Please fill in all the required fields.', 400);

		const semester = await getCurrentSemester(new Date());
		if (!semester)
			throw new CustomError(
				'Seems like there is no defined semester for current period. Define a semester first in order to define review statement configuration.',
				404
			);

		const semesterId = semester._id.toString();
		const existingReview = await getReviewBySemester(semesterId);
		if (existingReview)
			throw new CustomError(
				'Seems like review statement configuration is already defined for this semester.',
				400
			);

		const review = await createReview({
			startDate,
			endDate,
			startAfter,
			semester: semester,
			status: 'new',
		});

		return res.status(201).json(review);
	}
);

export const getReviewStatement = tryCatch(async (_: Request, res: Response): Promise<Response> => {
	const semester = await getCurrentSemester(new Date());
	if (!semester)
		throw new CustomError(
			'Seems like there is no defined semester for current period. Define a semester first in order to define review statement configuration.',
			404
		);

	const semesterId = semester._id.toString();
	const review = await getReviewBySemester(semesterId);
	if (!review)
		throw new CustomError(
			'Seems like there is no review statement configuration defined for this semester.',
			404
		);

	return res.status(200).json(review);
});

export const getReviewStatements = tryCatch(
	async (_: Request, res: Response): Promise<Response> => {
		const reviews = await getReview();
		if (!reviews)
			throw new CustomError(
				'Seems like there are no review statement configurations defined.',
				404
			);

		return res.status(200).json(reviews);
	}
);

export const updateReviewStatement = tryCatch(
	async (req: Request, res: Response): Promise<Response> => {
		const { startDate, endDate, startAfter } = req.body;

		if (!startDate || !endDate || !startAfter)
			throw new CustomError('Please fill in all the required fields.', 400);

		const { id } = req.params;
		const updatedReview = await updateReviewById(id, { ...req.body });
		if (!updatedReview)
			throw new CustomError(
				'Seems like the review statement configuration that you are trying to update does not exist.',
				404
			);

		return res.status(200).json(updatedReview);
	}
);

export const deleteReviewStatement = tryCatch(
	async (req: Request, res: Response): Promise<Response> => {
		const { id } = req.params;
		const reviewStatementToDelete = await deleteReviewById(id);
		if (!reviewStatementToDelete)
			throw new CustomError(
				'Seems like the review statement configuration that you are trying to delete does not exist.',
				404
			);

		return res.status(200).json({ message: 'Review statement configuration deleted.' });
	}
);

export const deleteAllReviewStatements = tryCatch(
	async (_: Request, res: Response): Promise<Response> => {
		await deleteReview();
		return res
			.status(200)
			.json({ message: 'Defined review statement configurations deleted.' });
	}
);
