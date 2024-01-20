import mongoose, { startSession } from 'mongoose';
import { Response } from 'express';
import { AuthenticatedRequest } from '../../interfaces/AuthRequest';
import {
	createTeachingReview,
	getTeachingReviewById,
	getUserSubmittedTeachingReview,
	updateTeachingReviewById,
	deleteTeachingReviewById,
	getUserTeachingReviews,
	deleteUserTeachingReviews,
} from '../../models/review/teachingReview';
import { getCurrentSemester } from '../../models/admin/semester';
import { getReviewBySemester } from '../../models/admin/review';
import { tryCatch } from '../../utils/tryCatch';
import CustomError from '../../utils/CustomError';

export const createUserTeachingReview = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const {
			clear_course_objectives,
			course_material,
			course_comprehension,
			examination_method,
			course_difficulty,
			course_activities,
			teaching,
		} = req.body;

		if (
			!clear_course_objectives ||
			!course_material ||
			!course_comprehension ||
			!examination_method ||
			!course_difficulty ||
			!course_activities
		)
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
				'The review duration period has ended. No more teaching reviews can be submitted.',
				406
			);

		const userId = req.user.id;
		const { teachingId } = req.params;
		const existingTeachingReview = await getUserSubmittedTeachingReview(
			userId,
			teachingId
		);

		if (existingTeachingReview)
			throw new CustomError(
				'Seems like a teaching review has already been submitted for this semester.',
				406
			);

		const teachingReview = await createTeachingReview({
			clear_course_objectives,
			course_material,
			course_comprehension,
			examination_method,
			course_difficulty,
			course_activities,
			teaching: teaching,
			user: new mongoose.Types.ObjectId(userId),
		});

		return res
			.status(201)
			.json({ message: 'Teaching review submitted!', teachingReview });
	}
);

export const viewUserTeachingReview = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { id } = req.params;
		const teachingReview = await getTeachingReviewById(id);

		if (!teachingReview)
			throw new CustomError(
				'Seems like the teaching review that you are trying to view does not exist.',
				404
			);

		return res.status(200).json(teachingReview);
	}
);

export const updateUserTeachingReview = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const {
			clear_course_objectives,
			course_material,
			course_comprehension,
			examination_method,
			course_difficulty,
			course_activities,
			teaching,
		} = req.body;

		if (
			!clear_course_objectives ||
			!course_material ||
			!course_comprehension ||
			!examination_method ||
			!course_difficulty ||
			!course_activities
		)
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
				'The review duration period has ended. No more teaching reviews can be submitted.',
				406
			);

		const { teachingReviewId } = req.params;
		const updatedTeachingReview = await updateTeachingReviewById(
			teachingReviewId,
			{
				...req.body,
			}
		);

		if (!updatedTeachingReview)
			throw new CustomError(
				'Seems like the teaching review that you are trying to update does not exist.',
				404
			);

		return res
			.status(200)
			.json({ message: 'Teaching review updated!', updatedTeachingReview });
	}
);

export const deleteUserTeachingReview = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { id } = req.params;
		const teachingReviewToDelete = await deleteTeachingReviewById(id);

		if (!teachingReviewToDelete)
			throw new CustomError(
				'Seems like the teaching review that you are trying to delete does not exist.',
				404
			);

		return res.status(200).json({
			message: 'Teaching review deleted.',
			teachingReview: teachingReviewToDelete._id,
		});
	}
);

export const getAllUserTeachingReviews = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const userId = req.user.id;
		const userTeachingReviews = await getUserTeachingReviews(userId);

		if (!userTeachingReviews.length)
			throw new CustomError(
				`Seems like you haven't submitted any teaching reviews yet.`,
				404
			);

		return res.status(200).json(userTeachingReviews);
	}
);

export const deleteAllUserTeachingReviews = async (
	req: AuthenticatedRequest,
	res: Response
): Promise<Response> => {
	const userId = req.user.id;
	const session = await startSession();

	try {
		session.startTransaction();

		await deleteUserTeachingReviews(userId, session);

		await session.commitTransaction();
	} catch (error) {
		await session.abortTransaction();
		console.error('❌ ', error);
		throw new CustomError('User teaching reviews did not deleted.', 500);
	} finally {
		session.endSession();
	}

	return res.status(200).json({ message: 'User teaching reviews deleted.' });
};
