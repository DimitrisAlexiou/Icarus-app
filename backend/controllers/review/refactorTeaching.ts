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

interface AuthenticatedRequest extends Request {
	user?: UserProps;
}

export const getAllUserTeachingReviews = async (
	req: AuthenticatedRequest,
	res: Response
): Promise<Response> => {
	try {
		const userId = req.user.id;
		const userTeachingReviews = await getUserTeachingReviews(userId);
		if (!userTeachingReviews)
			return res.status(404).json({
				message: `Seems like there are no teaching reviews from user: ${req.user.username}.`,
			});

		return res.status(200).json(userTeachingReviews);
	} catch (error) {
		console.error('❌ Error while finding user teaching reviews: ', error);
		return res.status(500).json({
			message: 'Something went wrong, try again later.',
		});
	}
};

export const viewUserTeachingReview = async (
	req: AuthenticatedRequest,
	res: Response
): Promise<Response> => {
	try {
		const { id } = req.params;
		const teachingReview = await getTeachingReviewById(id);
		if (!teachingReview)
			return res.status(404).json({
				message: `Seems like there is no teaching review with this ID for user: ${req.user.username}.`,
			});

		return res.status(200).json(teachingReview);
	} catch (error) {
		console.error('❌ Error while finding user teaching review: ', error);
		return res.status(500).json({
			message: 'Something went wrong, try again later.',
		});
	}
};

// * WE ACCESS THE TEACHING REVIEW FORM BY SELECTING A TEACHING(COURSE) WHERE THE USER IS ENROLLED
// * THE PAGE RENDERS ALL THE TEACHINGS(COURSES) THAT THE USER IS ENROLLED IN, THEN BY SELECTING ONE OF THEM,
// * THE TEACHING REVIEW FORM IS RENDERED WITH THE TEACHINGID ALREADY PASSED, THE USER ID IS PASSED THROUGH REQ.USER

export const createUserTeachingReview = async (
	req: AuthenticatedRequest,
	res: Response
): Promise<Response> => {
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
		return res
			.status(400)
			.json({ message: 'Please provide a rating for all required fields.' });

	try {
		const userId = req.user.id;
		const currentDate = new Date();
		const semester = await getCurrentSemester(currentDate);
		if (!semester)
			return res.status(404).json({
				message: 'Seems like there is no defined semester for current period.',
			});

		try {
			const semesterId = semester._id.toString();
			const reviewDuration = await getReviewBySemester(semesterId);
			if (reviewDuration.endDate < currentDate)
				return res.status(406).json({
					message:
						'No more teaching reviews can be submitted. The review duration period has ended.',
				});

			try {
				const { teachingId } = req.params;
				const existingTeachingReview = await getUserSubmittedTeachingReview(
					userId,
					teachingId
				);
				if (existingTeachingReview)
					return res.status(406).json({
						message: `${req.user.username} has already submitted a teaching review for this course.`,
					});

				try {
					const teachingReview = await createTeachingReview({
						clear_course_objectives,
						course_material,
						course_comprehension,
						examination_method,
						course_difficulty,
						course_activities,
						user: req.user,
						teaching: teachingId,
						status: 'new',
					});

					return res.status(201).json(teachingReview);
				} catch (error) {
					console.error('❌ Error while creating user teaching review: ', error);
					return res.status(500).json({
						message:
							'Something went wrong, unfortunately teaching review did not created.',
					});
				}
			} catch (error) {
				console.error(
					'❌ Error while checking if user has already submitted a teaching review for this course: ',
					error
				);
				return res.status(500).json({ message: 'Something went wrong, try again later.' });
			}
		} catch (error) {
			console.error(
				'❌ Error while finding review statement configuration for this semester: ',
				error
			);
			return res.status(500).json({ message: 'Something went wrong, try again later.' });
		}
	} catch (error) {
		console.error('❌ Error while checking if semester has been defined: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later.' });
	}
};

export const updateUserTeachingReview = async (
	req: AuthenticatedRequest,
	res: Response
): Promise<Response> => {
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
		return res.status(400).json({ message: 'Please fill in all the required fields.' });

	try {
		const currentDate = new Date();
		const semester = await getCurrentSemester(currentDate);
		if (!semester)
			return res.status(404).json({
				message: 'Seems like there is no defined semester for current period.',
			});

		try {
			const semesterId = semester._id.toString();
			const reviewDuration = await getReviewBySemester(semesterId);
			if (reviewDuration.endDate < currentDate)
				return res.status(406).json({
					message:
						'No more teaching reviews can be submitted. The review duration period has ended.',
				});

			try {
				const { teachingReviewId } = req.params;
				const updatedTeachingReview = await updateTeachingReviewById(teachingReviewId, {
					...req.body,
				});

				return res.status(200).json(updatedTeachingReview);
			} catch (error) {
				console.error('❌ Error while updating user teaching review: ', error);
				return res.status(500).json({
					message: 'Something went wrong, unfortunately teaching review did not updated.',
				});
			}
		} catch (error) {
			console.error(
				'❌ Error while finding review statement configuration for this semester: ',
				error
			);
			return res.status(500).json({
				message: 'Something went wrong, try again later.',
			});
		}
	} catch (error) {
		console.error('❌ Error while checking if semester has been defined: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later.' });
	}
};

export const deleteUserTeachingReview = async (
	req: AuthenticatedRequest,
	res: Response
): Promise<Response> => {
	try {
		const { id } = req.params;
		await deleteTeachingReviewById(id);
		return res.status(200).json({ message: 'Teaching review deleted.' });
	} catch (error) {
		console.error('❌ Error while deleting teaching review: ', error);
		return res.status(500).json({
			message: 'Something went wrong, unfortunately teaching review did not deleted.',
		});
	}
};
