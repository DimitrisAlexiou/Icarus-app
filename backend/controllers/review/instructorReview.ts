import { Request, Response } from 'express';
import {
	getUserInstructorReviews,
	getInstructorReviewById,
	getUserSubmittedInstructorReview,
	createInstructorReview,
	updateInstructorReviewById,
	deleteInstructorReviewById,
} from '../../models/review/instructorReview';
import { User, getUserById } from '../../models/users/user';

interface User {
	id: string;
	username: string;
}

interface AuthenticatedRequest extends Request {
	user?: User;
}

export const getAllUserInstructorReviews = async (req: AuthenticatedRequest, res: Response) => {
	try {
		const userId = req.user.id;
		const user = await getUserById(userId);

		if (!user) {
			return res.status(401).json('User not found.');
		} else {
			try {
				const userInstructorReviews = await getUserInstructorReviews(userId);
				if (!userInstructorReviews)
					return res
						.status(404)
						.json(
							`Seems like there are no instructor reviews from user: ${req.user.username}.`
						);
				else return res.status(200).json(userInstructorReviews);
			} catch (error) {
				console.error('❌ Error while finding user teaching reviews: ', error);
				return res.status(500).json({
					message: 'Something went wrong, try again later.',
				});
			}
		}
	} catch (error) {
		console.error('❌ Error while finding user: ', error);
		return res.status(500).json({
			message: 'Something went wrong, try again later.',
		});
	}
};

export const viewUserInstructorReview = async (req: AuthenticatedRequest, res: Response) => {
	try {
		const userId = req.user.id;
		const user = await getUserById(userId);

		if (!user) {
			return res.status(401).json('User not found.');
		} else {
			try {
				const { id } = req.params;
				const instructorReview = await getInstructorReviewById(id);
				if (!instructorReview)
					return res
						.status(404)
						.json(
							`Seems like there is no instructor review with this ID for user: ${req.user.username}.`
						);
				else return res.status(200).json(instructorReview);
			} catch (error) {
				console.error('❌ Error while finding user instructor review: ', error);
				return res.status(500).json({
					message: 'Something went wrong, try again later.',
				});
			}
		}
	} catch (error) {
		console.error('❌ Error while finding user: ', error);
		return res.status(500).json({
			message: 'Something went wrong, try again later.',
		});
	}
};

export const createUserInstructorReview = async (req: AuthenticatedRequest, res: Response) => {
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
		return res.status(400).json('Please fill in all the required fields.');

	try {
		const userId = req.user.id;
		const user = await getUserById(userId);

		if (!user) {
			return res.status(401).json('User not found.');
		} else {
			try {
				const instructorReview = await getUserSubmittedInstructorReview(userId);
				if (instructorReview) {
					return res
						.status(406)
						.json(
							`${req.user.username} has already submitted an instructor review for this semester.`
						);
				} else {
					try {
						const newInstructorReview = await createInstructorReview({
							good_organization,
							clear_comprehensive_answers,
							student_participation,
							course_consistency,
							instructor_approachable,
							user: userId,
							status: 'new',
						});
						return res.status(201).json(newInstructorReview);
					} catch (error) {
						console.error('❌ Error while creating user instructor review: ', error);
						return res.status(500).json({
							message:
								'Something went wrong, unfortunately instructor review did not created.',
						});
					}
				}
			} catch (error) {
				console.error(
					'❌ Error while checking if user has already submitted an instructor review for this semester: ',
					error
				);
				return res.status(500).json({
					message: 'Something went wrong, try again later.',
				});
			}
		}
	} catch (error) {
		console.error('❌ Error while finding user: ', error);
		return res.status(500).json({
			message: 'Something went wrong, try again later.',
		});
	}
};

export const updateUserInstructorReview = async (req: AuthenticatedRequest, res: Response) => {
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
		return res.status(400).json('Please fill in all the required fields.');

	try {
		const userId = req.user.id;
		const user = await getUserById(userId);

		if (!user) {
			return res.status(401).json('User not found.');
		} else {
			try {
				const { id } = req.params;
				const updatedInstructorReview = await updateInstructorReviewById(id, {
					...req.body,
				});
				return res.status(200).json(updatedInstructorReview);
			} catch (error) {
				console.error('❌ Error while updating user instructor review: ', error);
				return res.status(500).json({
					message:
						'Something went wrong, unfortunately instructor review did not created.',
				});
			}
		}
	} catch (error) {
		console.error('❌ Error while finding user: ', error);
		return res.status(500).json({
			message: 'Something went wrong, try again later.',
		});
	}
};

export const deleteUserInstructorReview = async (req: AuthenticatedRequest, res: Response) => {
	try {
		const userId = req.user.id;
		const user = await getUserById(userId);

		if (!user) {
			return res.status(401).json('User not found.');
		} else {
			try {
				const { id } = req.params;
				await deleteInstructorReviewById(id);
				return res.status(200).json('Instructor review deleted.');
			} catch (error) {
				console.error('❌ Error while deleting user instructor review: ', error);
				return res.status(500).json({
					message:
						'Something went wrong, unfortunately instructor review did not deleted.',
				});
			}
		}
	} catch (error) {
		console.error('❌ Error while finding user: ', error);
		return res.status(500).json({
			message: 'Something went wrong, try again later.',
		});
	}
};
