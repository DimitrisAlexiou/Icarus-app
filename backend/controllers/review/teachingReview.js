const asyncHandler = require('express-async-handler');
const TeachingReview = require('../../models/review/teachingReview');
const User = require('../../models/users/user');
const Semester = require('../../models/admin/semester');
const ReviewDuration = require('../../models/admin/reviewDuration');
const Course = require('../../models/course/course');

//TODO FIX THE REQ.USER.ID FOR FINDING USER WITH USERID
//TODO FIXING REVIEWS ! ! !

module.exports.getUserTeachingReviews = asyncHandler(async (req, res) => {
	try {
		const userId = req.user.id;
		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json('User not found!');
		} else {
			try {
				const userTeachingReviews = await TeachingReview.find({
					user: userId,
				});
				if (userTeachingReviews.length === 0) {
					return res
						.status(404)
						.json(
							`Seems like there are no teaching reviews from user: ${user.username}!`
						);
				} else {
					return res.status(200).json(userTeachingReviews);
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

module.exports.viewUserTeachingReview = asyncHandler(async (req, res) => {
	try {
		const userId = req.user.id;
		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json('User not found!');
		} else {
			const { teachingReviewId } = req.params;
			try {
				const teachingReview = await TeachingReview.findOne({
					id: teachingReviewId,
					user: userId,
				});
				if (!teachingReview) {
					return res
						.status(404)
						.json(
							`Seems like there is no teaching review with this ID for user: ${user.username}!`
						);
				} else {
					if (teachingReview.user.toString() !== userId) {
						return res
							.status(401)
							.json('You are not authorized to view this teaching review!');
					}
					return res.status(200).json(teachingReview);
				}
			} catch (error) {
				console.error('❌ Error while finding user teaching review: ', error);
				return res.status(500).json(`${error.message}`);
			}
		}
	} catch (error) {
		console.error('❌ Error while finding user: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

// ΨΑΧΝΕΙ ΝΑ ΒΡΕΙ ΤΟΝ ΧΡΗΣΤΗ
// ΣΤΟ TEACHING REVIEW ΠΗΓΑΙΝΟΥΜΕ ΔΙΑΛΕΓΟΝΤΑΣ ΕΝΑ COURSE στο ΟΠΟΙΟ Ο ΤΡΕΧΩΝ USER ΕΙΝΑΙ ENROLLED
module.exports.createUserTeachingReview = asyncHandler(async (req, res) => {
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
	) {
		return res.status(400).json('Please provide a rating for all fields!');
	}
	try {
		const userId = req.user.id;
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json('User not found!');
		} else {
			const { courseId } = req.params;
			try {
				const course = await Course.findById(courseId);
				if (!course) {
					return res.status(404).json('Course not found');
				} else {
					try {
						const semester = await Semester.find({});
						if (!semester) {
							return res.status(404).json('Semester is not defined!');
						} else {
							try {
								const reviewDuration = await ReviewDuration.find({});
								if (reviewDuration.endDate < new Date()) {
									return res
										.status(406)
										.json('The review duration period has ended!');
								} else {
									try {
										const teachingReview = await TeachingReview.findOne({
											user: userId,
											semester: semester,
										});
										if (teachingReview) {
											return res
												.status(406)
												.json(
													`${user.username} has already submitted a teaching review for this semester !`
												);
										} else {
											try {
												const newTeachingReview =
													await TeachingReview.create({
														clear_course_objectives,
														course_material,
														course_comprehension,
														examination_method,
														course_difficulty,
														course_activities,
														user: userId,
														teaching: teachingId,
														semester: semester,
														status: 'new',
													});
												return res.status(201).json(newTeachingReview);
											} catch (error) {
												console.error(
													'❌ Error while creating user teaching review: ',
													error
												);
												return res.status(500).json(`${error.message}`);
											}
										}
									} catch (error) {
										console.error(
											'❌ Error while checking if user has already submitted a teaching review for this semester: ',
											error
										);
										return res.status(500).json(`${error.message}`);
									}
								}
							} catch (error) {
								console.error(
									'❌ Error while finding review duration period: ',
									error
								);
								return res.status(500).json(`${error.message}`);
							}
						}
					} catch (error) {
						console.error(
							'❌ Error while checking if semester has been defined: ',
							error
						);
						return res.status(500).json(`${error.message}`);
					}
				}
			} catch (error) {
				console.error('❌ Error while finding course: ', error);
				return res.status(500).json(`${error.message}`);
			}
		}
	} catch (error) {
		console.error('❌ Error while finding user: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

module.exports.updateUserTeachingReview = asyncHandler(async (req, res) => {
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
	) {
		return res.status(400).json('Please fill in all the fields!');
	}

	try {
		const userId = req.user.id;
		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json('User not found!');
		} else {
			const { teachingReviewId } = req.params;
			try {
				const teachingReview = await TeachingReview.findOne({
					id: teachingReviewId,
					user: userId,
				});
				if (!teachingReview) {
					return res
						.status(404)
						.json(
							`Seems like there is no teaching review with this ID for user: ${user.username}!`
						);
				} else {
					if (teachingReview.user.toString() !== userId) {
						return res
							.status(401)
							.json('You are not authorized to update this teaching review!');
					} else {
						try {
							const reviewDuration = await ReviewDuration.find({});
							if (reviewDuration.endDate < new Date()) {
								return res
									.status(406)
									.json('The review duration period has ended!');
							} else {
								try {
									const updatedTeachingReview =
										await TeachingReview.findByIdAndUpdate(
											teachingReviewId,
											{
												...req.body.teachingReview,
											},
											{ new: true }
										);
									return res.status(200).json(updatedTeachingReview);
								} catch (error) {
									console.error(
										'❌ Error while updating user teaching review: ',
										error
									);
									return res.status(500).json(`${error.message}`);
								}
							}
						} catch (error) {
							console.error('❌ Error while finding review duration period: ', error);
							return res.status(500).json(`${error.message}`);
						}
					}
				}
			} catch (error) {
				console.error('❌ Error while finding user teaching review: ', error);
				return res.status(500).json(`${error.message}`);
			}
		}
	} catch (error) {
		console.error('❌ Error while finding user: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

module.exports.deleteUserTeachingReview = asyncHandler(async (req, res) => {
	try {
		const userId = req.user.id;
		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json('User not found!');
		} else {
			const { teachingReviewId } = req.params;
			try {
				await TeachingReview.findOneAndDelete({
					id: teachingReviewId,
					user: userId,
				});
				return res.status(200).json('Teaching review deleted successfully!');
			} catch (error) {
				console.error('❌ Error while deleting user teaching review: ', error);
				return res.status(500).json(`${error.message}`);
			}
		}
	} catch (error) {
		console.error('❌ Error while finding user: ', error);
		return res.status(500).json(`${error.message}`);
	}
});
