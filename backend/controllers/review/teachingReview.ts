import { Request, Response } from 'express';
import {
	getUserSubmittedTeachingReview,
	getUserTeachingReviews,
	getTeachingReviewById,
	createTeachingReview,
	updateTeachingReviewById,
	deleteTeachingReviewById,
} from '../../models/review/teachingReview';
import { UserProps } from '../../models/users/user';
import { getCurrentSemester } from '../../models/admin/semester';
import { getReviewBySemester } from '../../models/admin/review';
import { tryCatch } from '../../utils/tryCatch';
import CustomError from '../../utils/CustomError';

interface AuthenticatedRequest extends Request {
	user?: UserProps;
}

export const getAllUserTeachingReviews = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const userId = req.user.id;
		const userTeachingReviews = await getUserTeachingReviews(userId);

		if (!userTeachingReviews)
			throw new CustomError(
				`Seems like you haven't submitted any teaching reviews yet.`,
				404
			);

		return res.status(200).json(userTeachingReviews);
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

// * WE ACCESS THE TEACHING REVIEW FORM BY SELECTING A TEACHING(COURSE) WHERE THE USER IS ENROLLED
// * THE PAGE RENDERS ALL THE TEACHINGS(COURSES) THAT THE USER IS ENROLLED IN, THEN BY SELECTING ONE OF THEM,
// * THE TEACHING REVIEW FORM IS RENDERED WITH THE TEACHINGID ALREADY PASSED, THE USER ID IS PASSED THROUGH REQ.USER
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
			throw new CustomError('Please provide a rating for all required fields.', 400);

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
				'The review duration period has ended. No more teaching reviews can be submitted.',
				406
			);

		const userId = req.user.id;
		// const { teachingId } = req.params;
		const existingTeachingReview = await getUserSubmittedTeachingReview(userId, teaching);

		if (existingTeachingReview)
			throw new CustomError(
				'Seems like a teaching review has been already submitted for this semester.',
				406
			);

		const teachingReview = await createTeachingReview({
			clear_course_objectives,
			course_material,
			course_comprehension,
			examination_method,
			course_difficulty,
			course_activities,
			user: req.user,
			teaching: teaching,
			status: 'new',
		});

		return res.status(201).json(teachingReview);
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
		} = req.body;

		if (
			!clear_course_objectives ||
			!course_material ||
			!course_comprehension ||
			!examination_method ||
			!course_difficulty ||
			!course_activities
		)
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
				'The review duration period has ended. No more teaching reviews can be submitted.',
				406
			);

		const { id } = req.params;
		const updatedTeachingReview = await updateTeachingReviewById(id, {
			...req.body,
		});

		if (!updatedTeachingReview)
			throw new CustomError(
				'Seems like the teaching review that you are trying to update does not exist.',
				404
			);

		return res.status(200).json(updatedTeachingReview);
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

		return res.status(200).json({ message: 'Teaching review deleted.' });
	}
);
