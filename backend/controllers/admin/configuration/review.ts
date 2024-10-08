import mongoose from 'mongoose';
import { Response } from 'express';
import { AuthenticatedRequest } from '../../../interfaces/AuthRequest';
import {
	createReview,
	updateReviewById,
	getReview,
	getReviewBySemester,
	deleteReviewById,
	deleteReview,
} from '../../../models/admin/review';
import { getCurrentSemester } from '../../../models/admin/semester';
import { tryCatch } from '../../../utils/tryCatch';
import CustomError from '../../../utils/CustomError';

export const defineReviewStatement = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { period, startAfter } = req.body;

		if (!period || !startAfter)
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
			period,
			startAfter,
			semester: new mongoose.Types.ObjectId(semesterId),
		});

		return res
			.status(201)
			.json({ message: 'Review configuration defined!', review });
	}
);

export const getReviewStatement = tryCatch(
	async (_: AuthenticatedRequest, res: Response): Promise<Response> => {
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
	}
);

export const getReviewStatements = tryCatch(
	async (_: AuthenticatedRequest, res: Response): Promise<Response> => {
		const reviews = await getReview();
		if (!reviews.length)
			throw new CustomError(
				'Seems like there are no review statement configurations defined.',
				404
			);

		return res.status(200).json(reviews);
	}
);

export const updateReviewStatement = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { period, startAfter } = req.body;

		if (!period || !startAfter)
			throw new CustomError('Please fill in all the required fields.', 400);

		const semester = await getCurrentSemester(new Date());
		if (!semester)
			throw new CustomError(
				'Seems like there is no defined semester for current period. Define a semester first in order to update review statement configuration.',
				404
			);

		const { id } = req.params;
		const updatedReview = await updateReviewById(id, { ...req.body });
		if (!updatedReview)
			throw new CustomError(
				'Seems like the review statement configuration that you are trying to update does not exist.',
				404
			);

		return res
			.status(200)
			.json({ message: 'Review configuration updated!', updatedReview });
	}
);

export const deleteReviewStatement = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { id } = req.params;
		const reviewStatementToDelete = await deleteReviewById(id);
		if (!reviewStatementToDelete)
			throw new CustomError(
				'Seems like the review statement configuration that you are trying to delete does not exist.',
				404
			);

		return res
			.status(200)
			.json({ message: 'Review statement configuration deleted.' });
	}
);

export const deleteSystemReviewStatements = tryCatch(
	async (_: AuthenticatedRequest, res: Response): Promise<Response> => {
		await deleteReview();
		return res
			.status(200)
			.json({ message: 'Defined review statement configurations deleted.' });
	}
);
