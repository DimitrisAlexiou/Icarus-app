import { Request, Response } from 'express';
import {
	getUserInstructorReviews,
	getInstructorReviewById,
	getUserSubmittedInstructorReview,
	createInstructorReview,
	updateInstructorReviewById,
	deleteInstructorReviewById,
} from '../../models/review/instructorReview';
import { getCurrentSemester } from '../../models/admin/semester';
import { getReviewBySemester } from '../../models/admin/review';
import { UserProps } from '../../models/users/user';
import { tryCatch } from '../../utils/tryCatch';
import CustomError from '../../utils/CustomError';

interface AuthenticatedRequest extends Request {
	user?: UserProps;
}

export const getAllUserInstructorReviews = tryCatch(
	async (req: AuthenticatedRequest, res: Response) => {
		const userId = req.user.id;
		const userInstructorReviews = await getUserInstructorReviews(userId);

		if (!userInstructorReviews)
			throw new CustomError(
				`Seems like there are no instructor reviews registered from user: ${req.user.username}.`,
				404
			);

		return res.status(200).json(userInstructorReviews);
	}
);

export const viewUserInstructorReview = tryCatch(
	async (req: AuthenticatedRequest, res: Response) => {
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

//TODO
export const createUserInstructorReview = tryCatch(
	async (req: AuthenticatedRequest, res: Response) => {
		const {
			good_organization,
			clear_comprehensive_answers,
			student_participation,
			course_consistency,
			instructor_approachable,
		} = req.body;

		if (
			!good_organization ||
			!clear_comprehensive_answers ||
			!student_participation ||
			!course_consistency ||
			!instructor_approachable
		)
			throw new CustomError('Please fill in all the required fields.', 400);

		const currentDate = new Date();
		const semester = await getCurrentSemester(currentDate);

		if (!semester)
			throw new CustomError(
				'Seems like there is no defined semester for current period. ',
				404
			);

		const semesterId = semester._id.toString();
		const reviewDuration = await getReviewBySemester(semesterId);

		if (reviewDuration.endDate < currentDate)
			throw new CustomError(
				'The review duration period has ended. No more teaching reviews can be submitted.',
				406
			);

		const userId = req.user.id;
		const existingInstructorReview = await getUserSubmittedInstructorReview(userId);

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
			user: userId,
			status: 'new',
		});

		return res.status(201).json(instructorReview);
	}
);

export const updateUserInstructorReview = tryCatch(
	async (req: AuthenticatedRequest, res: Response) => {
		const {
			good_organization,
			clear_comprehensive_answers,
			student_participation,
			course_consistency,
			instructor_approachable,
		} = req.body;

		if (
			!good_organization ||
			!clear_comprehensive_answers ||
			!student_participation ||
			!course_consistency ||
			!instructor_approachable
		)
			throw new CustomError('Please fill in all the required fields.', 400);

		const currentDate = new Date();
		const semester = await getCurrentSemester(currentDate);

		if (!semester)
			throw new CustomError(
				'Seems like there is no defined semester for current period. ',
				404
			);

		const semesterId = semester._id.toString();
		const reviewDuration = await getReviewBySemester(semesterId);

		if (reviewDuration.endDate < currentDate)
			throw new CustomError(
				'The review duration period has ended. No more instructor reviews can be submitted.',
				406
			);

		const { id } = req.params;
		const updatedInstructorReview = await updateInstructorReviewById(id, {
			...req.body,
		});

		if (!updatedInstructorReview)
			throw new CustomError(
				'Seems like the instructor review that you are trying to update does not exist.',
				404
			);

		return res.status(200).json(updatedInstructorReview);
	}
);

export const deleteUserInstructorReview = tryCatch(
	async (req: AuthenticatedRequest, res: Response) => {
		const { id } = req.params;
		const instructorReviewToDelete = await deleteInstructorReviewById(id);

		if (!instructorReviewToDelete)
			throw new CustomError(
				'Seems like the instructor review that you are trying to delete does not exist.',
				404
			);

		return res.status(200).json({ message: 'Instructor review deleted.' });
	}
);
