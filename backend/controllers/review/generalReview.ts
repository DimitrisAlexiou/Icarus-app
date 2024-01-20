import mongoose, { startSession } from 'mongoose';
import { Response } from 'express';
import { AuthenticatedRequest } from '../../interfaces/AuthRequest';
import {
	getUserGeneralReviews,
	getGeneralReviewById,
	createGeneralReview,
	updateGeneralReviewById,
	deleteGeneralReviewById,
	getUserSubmittedGeneralReview,
	deleteUserGeneralReviews,
} from '../../models/review/generalReview';
import { getCurrentSemester } from '../../models/admin/semester';
import { getReviewBySemester } from '../../models/admin/review';
import { tryCatch } from '../../utils/tryCatch';
import CustomError from '../../utils/CustomError';

export const createUserGeneralReview = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { course_opinion, instructor_opinion, likes, dislikes, teaching } =
			req.body;

		if (!course_opinion || !instructor_opinion || !likes || !dislikes)
			throw new CustomError(
				'Please provide a rating for all required fields.',
				400
			);

		const currentDate = new Date();
		const semester = await getCurrentSemester(currentDate);

		if (!semester)
			throw new CustomError(
				`Seems like there is no defined semester for current period, so you can't submit a review.`,
				404
			);

		const semesterId = semester._id.toString();
		const reviewDuration = await getReviewBySemester(semesterId);

		if (!reviewDuration)
			throw new CustomError(
				`There is no review duration defined for the current semester.`,
				404
			);

		if (reviewDuration.startDate > currentDate)
			throw new CustomError(
				'The review duration period has not started yet. Please wait until the review period starts.',
				406
			);

		if (reviewDuration.endDate < currentDate)
			throw new CustomError(
				'The review duration period has ended. No more general reviews can be submitted.',
				406
			);

		const userId = req.user.id;
		const { teachingReviewId } = req.params;
		const existingGeneralReview = await getUserSubmittedGeneralReview(
			userId,
			teachingReviewId
		);

		if (existingGeneralReview)
			throw new CustomError(
				'Seems like a general review has already been submitted for this semester.',
				406
			);

		const generalReview = await createGeneralReview({
			course_opinion,
			instructor_opinion,
			likes,
			dislikes,
			teaching: teaching,
			user: new mongoose.Types.ObjectId(userId),
		});

		return res
			.status(201)
			.json({ message: 'Genaral review submitted!', generalReview });
	}
);

export const viewUserGeneralReview = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { id } = req.params;
		const generalReview = await getGeneralReviewById(id);

		if (!generalReview)
			throw new CustomError(
				'Seems like the general review that you are trying to view does not exist.',
				404
			);

		return res.status(200).json(generalReview);
	}
);

export const updateUserGeneralReview = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { course_opinion, instructor_opinion, likes, dislikes, teaching } =
			req.body;

		if (!course_opinion || !instructor_opinion || !likes || !dislikes)
			throw new CustomError(
				'Please provide a rating for all required fields.',
				400
			);

		const currentDate = new Date();
		const semester = await getCurrentSemester(currentDate);

		if (!semester)
			throw new CustomError(
				`Seems like there is no defined semester for current period, so you can't submit a review.`,
				404
			);

		const semesterId = semester._id.toString();
		const reviewDuration = await getReviewBySemester(semesterId);

		if (!reviewDuration)
			throw new CustomError(
				`There is no review duration defined for the current semester.`,
				404
			);

		if (reviewDuration.endDate < currentDate)
			throw new CustomError(
				'The review duration period has ended. No more general reviews can be submitted.',
				406
			);

		const { generalReviewId } = req.params;
		const updatedGeneralReview = await updateGeneralReviewById(
			generalReviewId,
			{
				...req.body,
			}
		);

		if (!updatedGeneralReview)
			throw new CustomError(
				'Seems like the general review that you are trying to update does not exist.',
				404
			);

		return res
			.status(200)
			.json({ message: 'General review updated!', updatedGeneralReview });
	}
);

export const deleteUserGeneralReview = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { id } = req.params;
		const generalReviewToDelete = await deleteGeneralReviewById(id);

		if (!generalReviewToDelete)
			throw new CustomError(
				'Seems like the general review that you are trying to delete does not exist.',
				404
			);

		return res.status(200).json({
			message: 'General review deleted.',
			generalReview: generalReviewToDelete._id,
		});
	}
);

export const getAllUserGeneralReviews = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const userId = req.user.id;
		const userGeneralReviews = await getUserGeneralReviews(userId);

		if (!userGeneralReviews.length)
			throw new CustomError(
				`Seems like you haven't submitted any general reviews yet.`,
				404
			);

		return res.status(200).json(userGeneralReviews);
	}
);

export const deleteAllUserGeneralReviews = async (
	req: AuthenticatedRequest,
	res: Response
): Promise<Response> => {
	const userId = req.user.id;
	const session = await startSession();

	try {
		session.startTransaction();

		await deleteUserGeneralReviews(userId, session);

		await session.commitTransaction();
	} catch (error) {
		await session.abortTransaction();
		console.error('❌ ', error);
		throw new CustomError('User general reviews did not deleted.', 500);
	} finally {
		session.endSession();
	}

	return res.status(200).json({ message: 'User general reviews deleted.' });
};
