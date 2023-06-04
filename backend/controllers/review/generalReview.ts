import { Request, Response } from 'express';
import {
	getUserGeneralReviews,
	getGeneralReviewById,
	createGeneralReview,
	updateGeneralReviewById,
	deleteGeneralReviewById,
	getUserSubmittedGeneralReview,
} from '../../models/review/generalReview';
import { UserProps } from '../../models/users/user';
import { getCurrentSemester } from '../../models/admin/semester';
import { getReviewBySemester } from '../../models/admin/review';
import { tryCatch } from '../../utils/tryCatch';
import CustomError from '../../utils/CustomError';

interface AuthenticatedRequest extends Request {
	user?: UserProps;
}

export const getAllUserGeneralReviews = tryCatch(
	async (req: AuthenticatedRequest, res: Response) => {
		const userId = req.user.id;
		const userGeneralReviews = await getUserGeneralReviews(userId);

		if (!userGeneralReviews)
			throw new CustomError(
				`Seems like there are no general reviews registered from user: ${req.user.username}.`,
				404
			);

		return res.status(200).json(userGeneralReviews);
	}
);

export const viewUserGeneralReview = tryCatch(async (req: AuthenticatedRequest, res: Response) => {
	const { id } = req.params;
	const generalReview = await getGeneralReviewById(id);

	if (!generalReview)
		throw new CustomError(
			'Seems like the general review that you are trying to view does not exist.',
			404
		);

	return res.status(200).json(generalReview);
});

export const createUserGeneralReview = tryCatch(
	async (req: AuthenticatedRequest, res: Response) => {
		const { course_opinion, instructor_opinion, likes, dislikes } = req.body;

		if (!course_opinion || !instructor_opinion || !likes || !dislikes)
			throw new CustomError('Please fill in all the required fields.', 400);

		const currentDate = new Date();
		const semester = await getCurrentSemester(currentDate);

		if (!semester)
			throw new CustomError(
				'Seems like there is no defined semester for current period.',
				404
			);

		const semesterId = semester._id.toString();
		const reviewDuration = await getReviewBySemester(semesterId);

		if (reviewDuration.endDate < currentDate)
			throw new CustomError(
				'The review duration period has ended. No more general reviews can be submitted.',
				406
			);

		const userId = req.user.id;
		const existingGeneralReview = await getUserSubmittedGeneralReview(userId);

		if (existingGeneralReview)
			throw new CustomError(
				'Seems like a general review has been already submitted for this semester.',
				406
			);

		const generalReview = await createGeneralReview({
			course_opinion,
			instructor_opinion,
			likes,
			dislikes,
			user: userId,
			status: 'new',
		});

		return res.status(201).json(generalReview);
	}
);

export const updateUserGeneralReview = tryCatch(
	async (req: AuthenticatedRequest, res: Response) => {
		const { course_opinion, instructor_opinion, likes, dislikes } = req.body;

		if (!course_opinion || !instructor_opinion || !likes || !dislikes)
			throw new CustomError('Please fill in all the required fields.', 400);

		const currentDate = new Date();
		const semester = await getCurrentSemester(currentDate);

		if (!semester)
			throw new CustomError(
				'Seems like there is no defined semester for current period.',
				404
			);

		const semesterId = semester._id.toString();
		const reviewDuration = await getReviewBySemester(semesterId);

		if (reviewDuration.endDate < currentDate)
			throw new CustomError(
				'The review duration period has ended. No more general reviews can be submitted.',
				406
			);

		const { id } = req.params;
		const updatedGeneralReview = await updateGeneralReviewById(id, { ...req.body });

		if (!updatedGeneralReview)
			throw new CustomError(
				'Seems like the general review that you are trying to update does not exist.',
				404
			);

		return res.status(200).json(updatedGeneralReview);
	}
);

export const deleteUserGeneralReview = tryCatch(
	async (req: AuthenticatedRequest, res: Response) => {
		const { id } = req.params;
		const generalReviewToDelete = await deleteGeneralReviewById(id);

		if (!generalReviewToDelete)
			throw new CustomError(
				'Seems like the general review that you are trying to delete does not exist.',
				404
			);

		return res.status(200).json({ message: 'General review deleted.' });
	}
);
