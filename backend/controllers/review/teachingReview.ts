import { Request, Response } from 'express';
import {
	TeachingReview,
	getUserTeachingReviews,
	getTeachingReviewById,
	createTeachingReview,
	deleteTeachingReviewById,
} from '../../models/review/teachingReview';
import { User, getUserById } from '../../models/users/user';
import { Semester } from '../../models/admin/semester';
import { Review } from '../../models/admin/review';
import { Course } from '../../models/course/course';

interface User {
	id: string;
	username: string;
}

interface TeachingReview {
	teachingId: string;
}

interface Review {
	endDate: Date;
}

interface AuthenticatedRequest extends Request {
	user?: User;
}

export const getAllUserTeachingReviews = async (req: AuthenticatedRequest, res: Response) => {
	try {
		const userId = req.user.id;
		const user = await getUserById(userId);

		if (!user) {
			return res.status(404).json('User not found.');
		} else {
			try {
				const userTeachingReviews = await getUserTeachingReviews(userId);
				if (!userTeachingReviews)
					return res
						.status(404)
						.json(
							`Seems like there are no teaching reviews from user: ${user.username}.`
						);
				else return res.status(200).json(userTeachingReviews);
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

export const viewUserTeachingReview = async (req: AuthenticatedRequest, res: Response) => {
	try {
		const userId = req.user.id;
		const user = await getUserById(userId);

		if (!user) {
			return res.status(404).json('User not found.');
		} else {
			try {
				const { id } = req.params;
				const teachingReview = await getTeachingReviewById(id);
				if (!teachingReview)
					return res
						.status(404)
						.json(
							`Seems like there is no teaching review with this ID for user: ${user.username}.`
						);
				else return res.status(200).json(teachingReview);
			} catch (error) {
				console.error('❌ Error while finding user teaching review: ', error);
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

// ΣΤΟ TEACHING REVIEW ΠΗΓΑΙΝΟΥΜΕ ΔΙΑΛΕΓΟΝΤΑΣ ΕΝΑ COURSE στο ΟΠΟΙΟ Ο ΤΡΕΧΩΝ USER ΕΙΝΑΙ ENROLLED
// export const createUserTeachingReview = async (req: AuthenticatedRequest, res: Response) => {
// 	const {
// 		clear_course_objectives,
// 		course_material,
// 		course_comprehension,
// 		examination_method,
// 		course_difficulty,
// 		course_activities,
// 	} = req.body;

// 	if (
// 		!clear_course_objectives ||
// 		!course_material ||
// 		!course_comprehension ||
// 		!examination_method ||
// 		!course_difficulty ||
// 		!course_activities
// 	)
// 		return res.status(400).json('Please provide a rating for all required fields.');

// 	try {
// 		const userId = req.user.id;
// 		const user = await getUserById(userId);
// 		if (!user) {
// 			return res.status(404).json('User not found.');
// 		} else {
// 			try {
// 				const semester = await Semester.find({});
// 				if (!semester) {
// 					return res.status(404).json('Semester is not defined.');
// 				} else {
// 					try {
// 						const reviewDuration = await Review.find();
// 						if (reviewDuration.endDate < new Date()) {
// 							return res.status(406).json('The review duration period has ended.');
// 						} else {
// 							try {
// 								const teachingReview = await TeachingReview.findOne({
// 									user: userId,
// 									semester: semester,
// 								});
// 								if (teachingReview) {
// 									return res
// 										.status(406)
// 										.json(
// 											`${user.username} has already submitted a teaching review for this semester.`
// 										);
// 								} else {
// 									try {
// 										const newTeachingReview = await createTeachingReview({
// 											clear_course_objectives,
// 											course_material,
// 											course_comprehension,
// 											examination_method,
// 											course_difficulty,
// 											course_activities,
// 											user: userId,
// 											// teaching: teachingId,
// 											semester: semester,
// 											status: 'new',
// 										});
// 										return res.status(201).json(newTeachingReview);
// 									} catch (error) {
// 										console.error(
// 											'❌ Error while creating user teaching review: ',
// 											error
// 										);
// 										return res.status(500).json({
// 											message:
// 												'Something went wrong, unfortunately teaching review did not created.',
// 										});
// 									}
// 								}
// 							} catch (error) {
// 								console.error(
// 									'❌ Error while checking if user has already submitted a teaching review for this semester: ',
// 									error
// 								);
// 								return res
// 									.status(500)
// 									.json({ message: 'Something went wrong, try again later.' });
// 							}
// 						}
// 					} catch (error) {
// 						console.error('❌ Error while finding review duration period: ', error);
// 						return res
// 							.status(500)
// 							.json({ message: 'Something went wrong, try again later.' });
// 					}
// 				}
// 			} catch (error) {
// 				console.error('❌ Error while checking if semester has been defined: ', error);
// 				return res.status(500).json({ message: 'Something went wrong, try again later.' });
// 			}
// 		}
// 	} catch (error) {
// 		console.error('❌ Error while finding user: ', error);
// 		return res.status(500).json({ message: 'Something went wrong, try again later.' });
// 	}
// };

// export const updateUserTeachingReview = async (req: AuthenticatedRequest, res: Response) => {
// 	const {
// 		clear_course_objectives,
// 		course_material,
// 		course_comprehension,
// 		examination_method,
// 		course_difficulty,
// 		course_activities,
// 	} = req.body;

// 	if (
// 		!clear_course_objectives ||
// 		!course_material ||
// 		!course_comprehension ||
// 		!examination_method ||
// 		!course_difficulty ||
// 		!course_activities
// 	)
// 		return res.status(400).json('Please fill in all the required fields.');

// 	try {
// 		const userId = req.user.id;
// 		const user = await getUserById(userId);

// 		if (!user) {
// 			return res.status(404).json('User not found.');
// 		} else {
// 			try {
// 				const { teachingReviewId } = req.params;
// 				const teachingReview = await TeachingReview.findOne({
// 					id: teachingReviewId,
// 					user: userId,
// 				});
// 				if (!teachingReview) {
// 					return res
// 						.status(404)
// 						.json(
// 							`Seems like there is no teaching review with this ID for user: ${user.username}!`
// 						);
// 				} else {
// 					if (teachingReview.user.toString() !== userId) {
// 						return res
// 							.status(401)
// 							.json('You are not authorized to update this teaching review!');
// 					} else {
// 						try {
// 							const reviewDuration = await Review.find();
// 							if (reviewDuration.endDate < new Date()) {
// 								return res
// 									.status(406)
// 									.json('The review duration period has ended!');
// 							} else {
// 								try {
// 									const updatedTeachingReview =
// 										await TeachingReview.findByIdAndUpdate(
// 											teachingReviewId,
// 											{
// 												...req.body,
// 											},
// 											{ new: true }
// 										);
// 									return res.status(200).json(updatedTeachingReview);
// 								} catch (error) {
// 									console.error(
// 										'❌ Error while updating user teaching review: ',
// 										error
// 									);
// 									return res.status(500).json({
// 										message: 'Something went wrong, try again later!',
// 									});
// 								}
// 							}
// 						} catch (error) {
// 							console.error('❌ Error while finding review duration period: ', error);
// 							return res.status(500).json({
// 								message: 'Something went wrong, try again later!',
// 							});
// 						}
// 					}
// 				}
// 			} catch (error) {
// 				console.error('❌ Error while finding user teaching review: ', error);
// 				return res.status(500).json({
// 					message: 'Something went wrong, try again later!',
// 				});
// 			}
// 		}
// 	} catch (error) {
// 		console.error('❌ Error while finding user: ', error);
// 		return res.status(500).json({
// 			message: 'Something went wrong, try again later!',
// 		});
// 	}
// };

export const deleteUserTeachingReview = async (req: AuthenticatedRequest, res: Response) => {
	try {
		const userId = req.user.id;
		const user = await getUserById(userId);

		if (!user) {
			return res.status(404).json('User not found.');
		} else {
			try {
				const { id } = req.params;
				await deleteTeachingReviewById(id);
				return res.status(200).json('Teaching review deleted.');
			} catch (error) {
				console.error('❌ Error while deleting user teaching review: ', error);
				return res.status(500).json({
					message: 'Something went wrong, unfortunately teaching review did not deleted.',
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
