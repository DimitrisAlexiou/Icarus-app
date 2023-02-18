const asyncHandler = require('express-async-handler');
const InstructorReview = require('../../models/review/instructorReview');
const User = require('../../models/users/user');

module.exports.getUserInstructorReviews = asyncHandler(async (req, res) => {
	try {
		const userId = req.user.id;
		const user = await User.findById(userId);

		if (!user) {
			return res.status(401).json('User not found!');
		} else {
			try {
				const userInstructorReviews = await InstructorReview.find({
					user: userId,
				});
				if (userInstructorReviews.length === 0) {
					return res
						.status(404)
						.json(
							`Seems like there are no instructor reviews from user: ${req.user.username}!`
						);
				} else {
					return res.status(200).json(userInstructorReviews);
				}
			} catch (error) {
				console.error('❌ Error while finding user teaching reviews: ', error);
				return res.status(500).json(`${error.message}`);
			}
		}
	} catch (error) {
		console.error('❌ Error while finding user: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

module.exports.viewUserInstructorReview = asyncHandler(async (req, res) => {
	try {
		const userId = req.user.id;
		const user = await User.findById(userId);

		if (!user) {
			return res.status(401).json('User not found!');
		} else {
			const { id } = req.params;
			try {
				const instructorReview = await InstructorReview.findById(id);
				if (!instructorReview) {
					return res
						.status(404)
						.json(
							`Seems like there is no instructor review with this ID for user: ${req.user.username}!`
						);
				} else {
					if (instructorReview.user.toString() !== userId) {
						return res
							.status(401)
							.json('You are not authorized to view this instructor review!');
					}
					return res.status(200).json(instructorReview);
				}
			} catch (error) {
				console.error('❌ Error while finding user instructor review: ', error);
				return res.status(500).json(`${error.message}`);
			}
		}
	} catch (error) {
		console.error('❌ Error while finding user: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

module.exports.createUserInstructorReview = asyncHandler(async (req, res) => {
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
	) {
		return res.status(400).json('Please fill in all the fields!');
	}

	try {
		const userId = req.user.id;
		const user = await User.findById(userId);

		if (!user) {
			return res.status(401).json('User not found!');
		} else {
			try {
				const instructorReview = await InstructorReview.findOne({
					user: userId,
				});
				if (instructorReview) {
					return res
						.status(406)
						.json(
							`${req.user.username} has already submitted an instructor review for this semester !`
						);
				} else {
					try {
						const newInstructorReview = await InstructorReview.create({
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
						return res.status(500).json(`${error.message}`);
					}
				}
			} catch (error) {
				console.error(
					'❌ Error while checking if user has already submitted an instructor review for this semester: ',
					error
				);
				return res.status(500).json(`${error.message}`);
			}
		}
	} catch (error) {
		console.error('❌ Error while finding user: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

module.exports.updateUserInstructorReview = asyncHandler(async (req, res) => {
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
	) {
		return res.status(400).json('Please fill in all the fields!');
	}

	try {
		const userId = req.user.id;
		const user = await User.findById(userId);

		if (!user) {
			return res.status(401).json('User not found!');
		} else {
			const { id } = req.params;
			try {
				const instructorReview = await InstructorReview.findById(id);
				if (!instructorReview) {
					return res
						.status(404)
						.json(
							`Seems like there is no instructor review with this ID for user: ${req.user.username}!`
						);
				} else {
					if (instructorReview.user.toString() !== userId) {
						return res
							.status(401)
							.json('You are not authorized to view this instructor review!');
					} else {
						try {
							const updatedInstructorReview =
								await InstructorReview.findByIdAndUpdate(
									id,
									{
										...req.body.instructorReview,
									},
									{ user: userId },
									{ new: true }
								);
							return res.status(200).json(updatedInstructorReview);
						} catch (error) {
							console.error(
								'❌ Error while updating user instructor review: ',
								error
							);
							return res.status(500).json(`${error.message}`);
						}
					}
				}
			} catch (error) {
				console.error('❌ Error while finding user instructor review: ', error);
				return res.status(500).json(`${error.message}`);
			}
		}
	} catch (error) {
		console.error('❌ Error while finding user: ', error);

		return res.status(500).json(`${error.message}`);
	}
});

module.exports.deleteUserInstructorReview = asyncHandler(async (req, res) => {
	try {
		const userId = req.user.id;
		const user = await User.findById(userId);

		if (!user) {
			return res.status(401).json('User not found!');
		} else {
			const { id } = req.params;
			try {
				await InstructorReview.findByIdAndDelete(id);
				return res.status(200).json('Instructor review deleted successfully!');
			} catch (error) {
				console.error('❌ Error while deleting user instructor review: ', error);
				return res.status(500).json(`${error.message}`);
			}
		}
	} catch (error) {
		console.error('❌ Error while finding user: ', error);
		return res.status(500).json(`${error.message}`);
	}
});
