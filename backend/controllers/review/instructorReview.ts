import mongoose, { startSession } from 'mongoose';
import { Response } from 'express';
import { AuthenticatedRequest } from '../../interfaces/AuthRequest';
import {
	getUserInstructorReviews,
	getInstructorReviewById,
	getUserSubmittedInstructorReview,
	createInstructorReview,
	updateInstructorReviewById,
	deleteInstructorReviewById,
	deleteUserInstructorReviews,
} from '../../models/review/instructorReview';
import { getCurrentSemester } from '../../models/admin/semester';
import { getReviewBySemester } from '../../models/admin/review';
import { tryCatch } from '../../utils/tryCatch';
import CustomError from '../../utils/CustomError';

export const createUserInstructorReview = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const {
			good_organization,
			clear_comprehensive_answers,
			student_participation,
			course_consistency,
			instructor_approachable,
			teaching,
		} = req.body;

		if (
			!good_organization ||
			!clear_comprehensive_answers ||
			!student_participation ||
			!course_consistency ||
			!instructor_approachable
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
				'The review duration period has ended. No more instructor reviews can be submitted.',
				406
			);

		const userId = req.user.id;
		const { teachingReviewId } = req.params;
		const existingInstructorReview = await getUserSubmittedInstructorReview(
			userId,
			teachingReviewId
		);

		if (existingInstructorReview)
			throw new CustomError(
				'Seems like an instructor review has already been submitted for this semester.',
				406
			);

		const instructorReview = await createInstructorReview({
			good_organization,
			clear_comprehensive_answers,
			student_participation,
			course_consistency,
			instructor_approachable,
			teaching: teaching,
			user: new mongoose.Types.ObjectId(userId),
		});

		return res
			.status(201)
			.json({ message: 'Instructor review submitted!', instructorReview });
	}
);

export const viewUserInstructorReview = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { id } = req.params;
		const instructorReview = await getInstructorReviewById(id);

		if (!instructorReview)
			throw new CustomError(
				'Seems like the instructor review that you are trying to view does not exist.',
				404
			);

		return res.status(200).json(instructorReview);
	}
);

export const updateUserInstructorReview = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const {
			good_organization,
			clear_comprehensive_answers,
			student_participation,
			course_consistency,
			instructor_approachable,
			teaching,
		} = req.body;

		if (
			!good_organization ||
			!clear_comprehensive_answers ||
			!student_participation ||
			!course_consistency ||
			!instructor_approachable
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
				'The review duration period has ended. No more instructor reviews can be submitted.',
				406
			);

		const { instructorReviewId } = req.params;
		const updatedInstructorReview = await updateInstructorReviewById(
			instructorReviewId,
			{
				...req.body,
			}
		);

		if (!updatedInstructorReview)
			throw new CustomError(
				'Seems like the instructor review that you are trying to update does not exist.',
				404
			);

		return res
			.status(200)
			.json({ message: 'Instructor review updated!', updatedInstructorReview });
	}
);

export const deleteUserInstructorReview = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { id } = req.params;
		const instructorReviewToDelete = await deleteInstructorReviewById(id);

		if (!instructorReviewToDelete)
			throw new CustomError(
				'Seems like the instructor review that you are trying to delete does not exist.',
				404
			);

		return res.status(200).json({
			message: 'Instructor review deleted.',
			instructorReview: instructorReviewToDelete._id,
		});
	}
);

export const getAllUserInstructorReviews = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const userId = req.user.id;
		const userInstructorReviews = await getUserInstructorReviews(userId);

		if (!userInstructorReviews.length)
			throw new CustomError(
				`Seems like you haven't submitted any instructor reviews yet.`,
				404
			);

		return res.status(200).json(userInstructorReviews);
	}
);

export const deleteAllUserInstructorReviews = async (
	req: AuthenticatedRequest,
	res: Response
): Promise<Response> => {
	const userId = req.user.id;
	const session = await startSession();

	try {
		session.startTransaction();

		await deleteUserInstructorReviews(userId, session);

		await session.commitTransaction();
	} catch (error) {
		await session.abortTransaction();
		console.error('❌ ', error);
		throw new CustomError('User instructor reviews did not deleted.', 500);
	} finally {
		session.endSession();
	}

	return res.status(200).json({ message: 'User instructor reviews deleted.' });
};
