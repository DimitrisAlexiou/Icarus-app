import mongoose from 'mongoose';
import { Response } from 'express';
import { AuthenticatedRequest } from '../../interfaces/AuthRequest';
import {
	TeachingReview,
	TeachingReviewProps,
} from '../../models/review/teachingReview';
import {
	InstructorReview,
	InstructorReviewProps,
} from '../../models/review/instructorReview';
import {
	GeneralReview,
	GeneralReviewProps,
} from '../../models/review/generalReview';
import {
	ReviewType,
	anonymizeReview,
	deleteReviews,
	getReviews,
	getTotalReviews,
} from '../../models/review/review';
import { tryCatch } from '../../utils/tryCatch';
import { encryptUserId } from '../../utils/anonymizeReview';
import { AnonymizedReviewProps, ReviewProps } from '../../types/ReviewProps';
import CustomError from '../../utils/CustomError';

export const getSystemReviews = <T extends ReviewProps>(
	ReviewModel: mongoose.Model<T>,
	reviewType: string
) =>
	tryCatch(
		async (_: AuthenticatedRequest, res: Response): Promise<Response> => {
			let reviews = await getReviews(ReviewModel);
			if (!reviews.length)
				throw new CustomError(
					`Seems like there are no ${reviewType} reviews registered in the system.`,
					404
				);

			reviews = reviews.map((review) =>
				anonymizeReview(review as AnonymizedReviewProps, encryptUserId)
			);

			const totalReviews = await getTotalReviews(ReviewModel);

			return res.status(200).json({ reviews, totalReviews });
		}
	);

export const getSystemReviewsTotalNumber = <T extends ReviewProps>(
	ReviewModel: mongoose.Model<T>
) =>
	tryCatch(
		async (_: AuthenticatedRequest, res: Response): Promise<Response> => {
			const totalReviews = await getTotalReviews(ReviewModel);

			return res.status(200).json(totalReviews);
		}
	);

export const deleteSystemReviews = <T extends ReviewProps>(
	ReviewModel: mongoose.Model<T>,
	reviewType: string
) =>
	tryCatch(
		async (_: AuthenticatedRequest, res: Response): Promise<Response> => {
			await deleteReviews(ReviewModel);
			return res.status(200).json({
				reviewType: `${reviewType} reviews existing in the system deleted.`,
			});
		}
	);

export const getSystemTeachingReviews = getSystemReviews<TeachingReviewProps>(
	TeachingReview,
	ReviewType.Teaching
);

export const getSystemTeachingReviewsTotalNumber =
	getSystemReviewsTotalNumber<TeachingReviewProps>(TeachingReview);

export const deleteSystemTeachingReviews =
	deleteSystemReviews<TeachingReviewProps>(TeachingReview, ReviewType.Teaching);

export const getSystemGeneralReviews = getSystemReviews<GeneralReviewProps>(
	GeneralReview,
	ReviewType.General
);

export const getSystemGeneralReviewsTotalNumber =
	getSystemReviewsTotalNumber<GeneralReviewProps>(GeneralReview);

export const deleteSystemGeneralReviews =
	deleteSystemReviews<GeneralReviewProps>(GeneralReview, ReviewType.General);

export const getSystemInstructorReviews =
	getSystemReviews<InstructorReviewProps>(
		InstructorReview,
		ReviewType.Instructor
	);

export const getSystemInstructorReviewsTotalNumber =
	getSystemReviewsTotalNumber<InstructorReviewProps>(InstructorReview);

export const deleteSystemInstructorReviews =
	deleteSystemReviews<InstructorReviewProps>(
		InstructorReview,
		ReviewType.Instructor
	);
