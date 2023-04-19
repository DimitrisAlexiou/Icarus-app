import { Request, Response } from 'express';
import {
	getUserGeneralReviews,
	getGeneralReviewById,
	createGeneralReview,
	updateGeneralReviewById,
	deleteGeneralReviewById,
	getUserSubmittedGeneralReview,
} from '../../models/review/generalReview';
import { User, getUserById } from '../../models/users/user';

interface User {
	id: string;
	username: string;
}

interface AuthenticatedRequest extends Request {
	user?: User;
}

export const getAllUserGeneralReviews = async (req: AuthenticatedRequest, res: Response) => {
	try {
		const userId = req.user.id;
		const user = await getUserById(userId);

		if (!user) {
			return res.status(401).json('User not found.');
		} else {
			try {
				const userGeneralReviews = await getUserGeneralReviews(userId);
				if (!userGeneralReviews)
					return res
						.status(404)
						.json(
							`Seems like there are no general reviews from user: ${req.user.username}.`
						);
				else return res.status(200).json(userGeneralReviews);
			} catch (error) {
				console.error('❌ Error while finding user general reviews: ', error);
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

export const viewUserGeneralReview = async (req: AuthenticatedRequest, res: Response) => {
	try {
		const userId = req.user.id;
		const user = await getUserById(userId);

		if (!user) {
			return res.status(401).json('User not found.');
		} else {
			try {
				const { id } = req.params;
				const generalReview = await getGeneralReviewById(id);
				if (!generalReview)
					return res
						.status(404)
						.json(
							`Seems like there is no general review with this ID for user: ${req.user.username}.`
						);
				// if (generalReview.user.toString() !== userId) {
				// 	return res
				// 		.status(401)
				// 		.json('You are not authorized to view this general review!');
				// }
				else return res.status(200).json(generalReview);
			} catch (error) {
				console.error('❌ Error while finding user general review: ', error);
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

export const createUserGeneralReview = async (req: AuthenticatedRequest, res: Response) => {
	const { course_opinion, instructor_opinion, likes, dislikes } = req.body;

	if (!course_opinion || !instructor_opinion || !likes || !dislikes)
		return res.status(400).json('Please fill in all the required fields.');

	try {
		const userId = req.user.id;
		const user = await getUserById(userId);

		if (!user) {
			return res.status(401).json('User not found.');
		} else {
			try {
				const instructorReview = await getUserSubmittedGeneralReview(userId);
				if (instructorReview) {
					return res
						.status(406)
						.json(
							`${req.user.username} has already submitted an instructor review for this semester.`
						);
				} else {
					try {
						const newGeneralReview = await createGeneralReview({
							course_opinion,
							instructor_opinion,
							likes,
							dislikes,
							user: userId,
							status: 'new',
						});

						return res.status(201).json(newGeneralReview);
					} catch (error) {
						console.error('❌ Error while creating general review: ', error);
						return res.status(500).json({
							message:
								'Something went wrong, unfortunately general review did not created.',
						});
					}
				}
			} catch (error) {
				console.error(
					'❌ Error while checking if user has already submitted a general review for this semester: ',
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

export const updateUserGeneralReview = async (req: AuthenticatedRequest, res: Response) => {
	const { course_opinion, instructor_opinion, likes, dislikes } = req.body;

	if (!course_opinion || !instructor_opinion || !likes || !dislikes)
		return res.status(400).json('Please fill in all the required fields.');

	try {
		const userId = req.user.id;
		const user = await getUserById(userId);

		if (!user) {
			return res.status(401).json('User not found.');
		} else {
			try {
				const { id } = req.params;
				const updatedGeneralReview = await updateGeneralReviewById(id, { ...req.body });
				return res.status(200).json(updatedGeneralReview);
			} catch (error) {
				console.error('❌ Error while updating user general review: ', error);
				return res.status(500).json({
					message: 'Something went wrong, unfortunately general review did not updated.',
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

export const deleteUserGeneralReview = async (req: AuthenticatedRequest, res: Response) => {
	try {
		const userId = req.user.id;
		const user = await getUserById(userId);

		if (!user) {
			return res.status(401).json('User not found.');
		} else {
			try {
				const { id } = req.params;
				await deleteGeneralReviewById(id);
				return res.status(200).json('General review deleted.');
			} catch (error) {
				console.error('❌ Error while deleting user general review: ', error);
				return res.status(500).json({
					message: 'Something went wrong, unfortunately general review did not deleted.',
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
