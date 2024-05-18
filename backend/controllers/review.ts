import mongoose, { startSession } from 'mongoose';
import { Response } from 'express';
import { AuthenticatedRequest } from '../interfaces/AuthRequest';
import {
	TeachingReview,
	TeachingReviewProps,
} from '../models/review/teachingReview';
import {
	InstructorReview,
	InstructorReviewProps,
} from '../models/review/instructorReview';
import {
	GeneralReview,
	GeneralReviewProps,
} from '../models/review/generalReview';
import {
	createReview,
	updateReviewById,
	getReviewById,
	getUserSubmittedReview,
	deleteReviewById,
	getUserReviews,
	deleteUserReviews,
	anonymizeReview,
	ReviewType,
} from '../models/review/review';
import { checkReviewAvailability } from '../utils/reviewsAvailability';
import { tryCatch } from '../utils/tryCatch';
import { encryptUserId } from '../utils/anonymizeReview';
import { ReviewProps } from '../types/ReviewProps';
import CustomError from '../utils/CustomError';

export const createUserReview = <T extends ReviewProps>(
	ReviewModel: mongoose.Model<T>,
	reviewType: string
) =>
	tryCatch(
		async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
			const userId = req.user.id;
			const reviewData = req.body;

			if (
				!Object.values(reviewData).every(
					(value) => value !== undefined && value !== null
				)
			) {
				throw new CustomError(
					'Please provide a rating for all required fields.',
					400
				);
			}

			await checkReviewAvailability();
			console.log(reviewData.teaching);

			const existingReview = await getUserSubmittedReview(
				ReviewModel,
				userId,
				reviewData.teaching
			);

			if (existingReview)
				throw new CustomError(
					`Seems like a ${reviewType} review has already been submitted for this teaching.`,
					406
				);

			const newReview = await createReview(ReviewModel, {
				...reviewData,
				user: new mongoose.Types.ObjectId(userId),
			});

			const review = await ReviewModel.populate(newReview, {
				path: 'teaching',
				populate: {
					path: 'course',
					select: 'title',
				},
			});

			return res.status(201).json({
				message: `${reviewType} review submitted!`,
				review,
			});
		}
	);

// DONE
export const viewUserReview = <T extends ReviewProps>(
	ReviewModel: mongoose.Model<T>,
	reviewType: string
) =>
	tryCatch(
		async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
			const { id } = req.params;
			let review = await getReviewById(ReviewModel, id);

			if (!review)
				throw new CustomError(
					`Seems like the ${reviewType} review that you are trying to view does not exist.`,
					404
				);

			review = anonymizeReview(review, encryptUserId);

			return res.status(200).json(review);
		}
	);

// DONE
export const updateUserReview = <T extends ReviewProps>(
	ReviewModel: mongoose.Model<T>,
	reviewType: string
) =>
	tryCatch(
		async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
			const { reviewId } = req.params;
			const reviewData = req.body;

			if (
				!Object.values(reviewData).every(
					(value) => value !== undefined && value !== null
				)
			)
				throw new CustomError(
					'Please provide a rating for all required fields.',
					400
				);

			await checkReviewAvailability();

			const updatedReview = await updateReviewById(
				ReviewModel,
				reviewId,
				reviewData
			);

			if (!updatedReview)
				throw new CustomError(
					`Seems like the ${reviewType} review that you are trying to update does not exist.`,
					404
				);

			return res
				.status(200)
				.json({ message: `${reviewType} review updated!`, updatedReview });
		}
	);

export const deleteUserReview = <T extends ReviewProps>(
	ReviewModel: mongoose.Model<T>,
	reviewType: string
) =>
	tryCatch(
		async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
			const { id } = req.params;
			const reviewToDelete = await deleteReviewById(ReviewModel, id);

			if (!reviewToDelete)
				throw new CustomError(
					`Seems like the ${reviewType} review that you are trying to delete does not exist.`,
					404
				);

			return res.status(200).json({
				message: `${reviewType} review deleted.`,
				review: reviewToDelete._id,
			});
		}
	);

export const getAllUserReviews = <T extends ReviewProps>(
	ReviewModel: mongoose.Model<T>,
	reviewType: string
) =>
	tryCatch(
		async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
			const userId = req.user.id;
			const userReviews = await getUserReviews(ReviewModel, userId);

			if (!userReviews.length)
				throw new CustomError(
					`Seems like you haven't submitted any ${reviewType} reviews yet.`,
					404
				);

			return res.status(200).json(userReviews);
		}
	);

export const deleteAllUserReviews =
	<T extends ReviewProps>(ReviewModel: mongoose.Model<T>, reviewType: string) =>
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const userId = req.user.id;
		const session = await startSession();

		try {
			session.startTransaction();

			await deleteUserReviews(ReviewModel, userId, session);

			await session.commitTransaction();
		} catch (error) {
			await session.abortTransaction();
			console.error('❌ ', error);
			throw new CustomError(
				`User ${reviewType} reviews were not deleted.`,
				500
			);
		} finally {
			session.endSession();
		}

		return res
			.status(200)
			.json({ message: `User ${reviewType} reviews deleted.` });
	};

export const createUserTeachingReview = createUserReview<TeachingReviewProps>(
	TeachingReview,
	ReviewType.Teaching
);
export const viewUserTeachingReview = viewUserReview<TeachingReviewProps>(
	TeachingReview,
	ReviewType.Teaching
);
export const updateUserTeachingReview = updateUserReview<TeachingReviewProps>(
	TeachingReview,
	ReviewType.Teaching
);
export const deleteUserTeachingReview = deleteUserReview<TeachingReviewProps>(
	TeachingReview,
	ReviewType.Teaching
);
export const getAllUserTeachingReviews = getAllUserReviews<TeachingReviewProps>(
	TeachingReview,
	ReviewType.Teaching
);
export const deleteAllUserTeachingReviews =
	deleteAllUserReviews<TeachingReviewProps>(
		TeachingReview,
		ReviewType.Teaching
	);

export const createUserGeneralReview = createUserReview<GeneralReviewProps>(
	GeneralReview,
	ReviewType.General
);
export const viewUserGeneralReview = viewUserReview<GeneralReviewProps>(
	GeneralReview,
	ReviewType.General
);
export const updateUserGeneralReview = updateUserReview<GeneralReviewProps>(
	GeneralReview,
	ReviewType.General
);
export const deleteUserGeneralReview = deleteUserReview<GeneralReviewProps>(
	GeneralReview,
	ReviewType.General
);
export const getAllUserGeneralReviews = getAllUserReviews<GeneralReviewProps>(
	GeneralReview,
	ReviewType.General
);
export const deleteAllUserGeneralReviews =
	deleteAllUserReviews<GeneralReviewProps>(GeneralReview, ReviewType.General);

export const createUserInstructorReview =
	createUserReview<InstructorReviewProps>(
		InstructorReview,
		ReviewType.Instructor
	);
export const viewUserInstructorReview = viewUserReview<InstructorReviewProps>(
	InstructorReview,
	ReviewType.Instructor
);
export const updateUserInstructorReview =
	updateUserReview<InstructorReviewProps>(
		InstructorReview,
		ReviewType.Instructor
	);
export const deleteUserInstructorReview =
	deleteUserReview<InstructorReviewProps>(
		InstructorReview,
		ReviewType.Instructor
	);
export const getAllUserInstructorReviews =
	getAllUserReviews<InstructorReviewProps>(
		InstructorReview,
		ReviewType.Instructor
	);
export const deleteAllUserInstructorReviews =
	deleteAllUserReviews<InstructorReviewProps>(
		InstructorReview,
		ReviewType.Instructor
	);
