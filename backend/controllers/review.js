const asyncHandler = require('express-async-handler');
const TeachingReview = require('../models/review/teachingReview');
const InstructorReview = require('../models/review/instructorReview');
const GeneralReview = require('../models/review/generalReview');
const User = require('../models/users/user');
const Semester = require('../models/admin/semester');
const ReviewDuration = require('../models/admin/reviewDuration');
const Course = require('../models/course/course');

//TODO FIX THE REQ.USER.ID FOR FINDING USER WITH USERID
//TODO FIXING REVIEWS ! ! !

//? --------------------- * * TEACHING REVIEWS CRUD * * --------------------
// View all Teaching Reviews (ADMIN)
module.exports.getTeachingReviews = asyncHandler(async (req, res) => {
	try {
		const teachingReviews = await TeachingReview.find({});
		if (teachingReviews.length === 0) {
			return res.status(404).json('Seems like there are no teaching reviews!');
		} else {
			return res.status(200).json(teachingReviews);
		}
	} catch (error) {
		console.error('❌ Error while finding teaching reviews: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

// View all User Teaching Reviews
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

// View User Teaching Review by ID
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

// Create User Teaching Review
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

// Update User Teaching Review
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

// Delete User Teaching Review by ID
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

// Delete all Teaching Reviews (ADMIN)
module.exports.deleteTeachingReviews = asyncHandler(async (req, res) => {
	try {
		await TeachingReview.deleteMany({});
		return res.status(200).json('All teaching reviews deleted!');
	} catch (error) {
		console.error('❌ Error while deleting all teaching reviews: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

//TODO NEEDS FIXING ! ! !
//? --------------------- * * INSTRUCTOR REVIEWS CRUD * * --------------------
// View all Instructor Reviews (ADMIN)
module.exports.getInstructorReviews = asyncHandler(async (req, res) => {
	try {
		const instructorReviews = await InstructorReview.find({});
		if (instructorReviews.length === 0) {
			return res.status(404).json('Seems like there are no instructor reviews!');
		} else {
			return res.status(200).json(instructorReviews);
		}
	} catch (error) {
		console.error('❌ Error while finding instructor reviews: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

// View all User Instructor Reviews
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

// View User Instructor Review by ID
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

// Create User Instructor Review
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

// Update User Instructor Review
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

// Delete User Instructor Review by ID
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

// Delete All Instructor Reviews (ADMIN)
module.exports.deleteInstructorReviews = asyncHandler(async (req, res) => {
	try {
		await InstructorReview.deleteMany({});
		return res.status(200).json('All instructor reviews deleted!');
	} catch (error) {
		console.error('❌ Error while deleting all instructor reviews: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

//? --------------------- * * GENERAL REVIEWS CRUD * * --------------------
// View all General Reviews (ADMIN)
module.exports.getGeneralReviews = asyncHandler(async (req, res) => {
	try {
		const generalReviews = await GeneralReview.find({});
		if (generalReviews.length === 0) {
			return res.status(404).json('Seems like there are no general reviews!');
		} else {
			return res.status(200).json(generalReviews);
		}
	} catch (error) {
		console.error('❌ Error while finding general reviews: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

// View all User General Reviews
module.exports.getUserGeneralReviews = asyncHandler(async (req, res) => {
	try {
		const userId = req.user.id;
		const user = await User.findById(userId);

		if (!user) {
			return res.status(401).json('User not found!');
		} else {
			try {
				const userGeneralReviews = await GeneralReview.find({
					user: userId,
				});
				if (userGeneralReviews.length === 0) {
					return res
						.status(404)
						.json(
							`Seems like there are no general reviews from user: ${req.user.username}!`
						);
				} else {
					return res.status(200).json(userGeneralReviews);
				}
			} catch (error) {
				console.error('❌ Error while finding user general reviews: ', error);
				return res.status(500).json(`${error.message}`);
			}
		}
	} catch (error) {
		console.error('❌ Error while finding user: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

// View User General Review by ID
module.exports.viewUserGeneralReview = asyncHandler(async (req, res) => {
	try {
		const userId = req.user.id;
		const user = await User.findById(userId);

		if (!user) {
			return res.status(401).json('User not found!');
		} else {
			const { id } = req.params;
			try {
				const generalReview = await GeneralReview.findById(id);
				if (!generalReview) {
					return res
						.status(404)
						.json(
							`Seems like there is no general review with this ID for user: ${req.user.username}!`
						);
				} else {
					if (generalReview.user.toString() !== userId) {
						return res
							.status(401)
							.json('You are not authorized to view this general review!');
					}
					return res.status(200).json(generalReview);
				}
			} catch (error) {
				console.error('❌ Error while finding user general review: ', error);
				return res.status(500).json(`${error.message}`);
			}
		}
	} catch (error) {
		console.error('❌ Error while finding user: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

// Create User General Review
// module.exports.createUserGeneralReview = asyncHandler(async (req, res) => {
// 	const { course_opinion, instructor_opinion, likes, dislikes } = req.body;

// 	if (!course_opinion || !instructor_opinion || !likes || !dislikes) {
// 		return res.status(400).json('Please fill in all the fields!');
// 	}

// 	try {
// 		const userId = req.user.id;
// 		const user = await User.findById(userId);

// 		if (!user) {
// 			return res.status(401).json('User not found!');
// 		} else {
// 			try {
// 				const generalReview = await GeneralReview.findOne({ user: userId });
// 				if (generalReview) {
// 					return res
// 						.status(406)
// 						.json(
// 							`${req.user.username} has already submitted a general review for this semester !`,
// 						);
// 				} else {
// 					try {
// 						const newGeneralReview = await GeneralReview.create({
// 							course_opinion,
// 							instructor_opinion,
// 							likes,
// 							dislikes,
// 							user: userId,
// 							status: 'new',
// 						});

// 						return res.status(201).json(newGeneralReview);
// 					} catch (error) {
// 						console.error(
// 							'❌ Error while creating user general review: ',
// 							error,
// 						);
// 						return res.status(500).json(`${error.message}`);
// 					}
// 				}
// 			} catch (error) {
// 				console.error(
// 					'❌ Error while checking if user has already submitted a general review for this semester: ',
// 					error,
// 				);
// 				return res.status(500).json(`${error.message}`);
// 			}
// 		}
// 	} catch (error) {
// 		console.error('❌ Error while finding user: ', error);
// 		return res.status(500).json(`${error.message}`);
// 	}
// });

module.exports.createGeneralReview = asyncHandler(async (req, res) => {
	const { course_opinion, instructor_opinion, likes, dislikes } = req.body;

	if (!course_opinion || !instructor_opinion || !likes || !dislikes) {
		return res.status(400).json('Please fill in all the fields!');
	}

	try {
		const newGeneralReview = await GeneralReview.create({
			course_opinion,
			instructor_opinion,
			likes,
			dislikes,
			status: 'new',
		});

		return res.status(201).json(newGeneralReview);
	} catch (error) {
		console.error('❌ Error while creating general review: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

// Update User General Review
module.exports.updateUserGeneralReview = asyncHandler(async (req, res) => {
	const { course_opinion, instructor_opinion, likes, dislikes } = req.body;

	if (!course_opinion || !instructor_opinion || !likes || !dislikes) {
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
				const generalReview = await GeneralReview.findById(id);
				if (!generalReview) {
					return res
						.status(404)
						.json(
							`Seems like there is no general review with this ID for user: ${req.user.username}!`
						);
				} else {
					if (generalReview.user.toString() !== userId) {
						return res
							.status(401)
							.json('You are not authorized to view this general review!');
					} else {
						try {
							const updatedGeneralReview = await GeneralReview.findByIdAndUpdate(
								id,
								{
									...req.body.generalReview,
								},
								{ user: userId },
								{ new: true }
							);
							return res.status(200).json(updatedGeneralReview);
						} catch (error) {
							console.error('❌ Error while updating user general review: ', error);
							return res.status(500).json(`${error.message}`);
						}
					}
				}
			} catch (error) {
				console.error('❌ Error while finding user general review: ', error);
				return res.status(500).json(`${error.message}`);
			}
		}
	} catch (error) {
		console.error('❌ Error while finding user: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

// Delete User General Review by ID
module.exports.deleteUserGeneralReview = asyncHandler(async (req, res) => {
	try {
		const userId = req.user.id;
		const user = await User.findById(userId);

		if (!user) {
			return res.status(401).json('User not found!');
		} else {
			const { id } = req.params;
			try {
				await GeneralReview.findByIdAndDelete(id);
				return res.status(200).json('General review deleted successfully!');
			} catch (error) {
				console.error('❌ Error while deleting user general review: ', error);
				return res.status(500).json(`${error.message}`);
			}
		}
	} catch (error) {
		console.error('❌ Error while finding user: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

// Delete All General Reviews (ADMIN)
module.exports.deleteGeneralReviews = asyncHandler(async (req, res) => {
	try {
		await GeneralReview.deleteMany({});
		return res.status(200).json('All general reviews deleted!');
	} catch (error) {
		console.error('❌ Error while deleting all general reviews: ', error);
		return res.status(500).json(`${error.message}`);
	}
});
