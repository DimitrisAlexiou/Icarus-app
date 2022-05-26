const asyncHandler = require('express-async-handler');
const TeachingReview = require('../models/teachingReview');
const InstructorReview = require('../models/instructorReview');
const GeneralReview = require('../models/generalReview');

//? --------------------- * * Teaching Reviews CRUD * * --------------------
// View All Teaching Reviews
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

// View All User Teaching Reviews
module.exports.getUserTeachingReviews = asyncHandler(async (req, res) => {
	try {
		// Get user using the id in the JWT
		const userId = req.user.id;
		const user = await User.findById(userId);

		if (!user) {
			return res.status(401).json('User not found!');
		} else {
			const userTeachingReviews = await TeachingReview.find({
				user: userId,
			});
			if (userTeachingReviews.length === 0) {
				return res
					.status(404)
					.json(
						`Seems like there are no teaching reviews from user: ${req.user.username}!`,
					);
			} else {
				return res.status(200).json(userTeachingReviews);
			}
		}
	} catch (error) {
		console.error('❌ Error while finding user teaching reviews: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

// View User Teaching Review by ID
module.exports.viewUserTeachingReview = asyncHandler(async (req, res) => {
	try {
		const userId = req.user.id;
		const user = await User.findById(userId);

		if (!user) {
			return res.status(401).json('User not found!');
		} else {
			const { id } = req.params;
			const teachingReview = await TeachingReview.findById(id);
			if (!teachingReview) {
				return res
					.status(404)
					.json(
						`Seems like there is no teaching review with this ID for user: ${req.user.username}!`,
					);
			} else {
				if (teachingReview.user.toString() !== userId) {
					return res
						.status(401)
						.json('You are not authorized to view this teaching review!');
				}
				return res.status(200).json(teachingReview);
			}
		}
	} catch (error) {
		console.error('❌ Error while finding teaching review: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

// Create User Teaching Review
module.exports.createTeachingReview = asyncHandler(async (req, res) => {
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

	// Get user using the id in the JWT
	const userId = req.user.id;
	const user = await User.findById(userId);

	if (!user) {
		return res.status(401).json('User not found!');
	} else {
		try {
			const teachingReview = await TeachingReview.create({
				clear_course_objectives,
				course_material,
				course_comprehension,
				examination_method,
				course_difficulty,
				course_activities,
				user: userId,
				status: 'new',
			});
			return res.status(201).json(teachingReview);
		} catch (error) {
			console.error('❌ Error while creating teaching review: ', error);
			return res.status(500).json(`${error.message}`);
		}
	}
});

// Update User Teaching Review
module.exports.updateTeachingReview = asyncHandler(async (req, res) => {
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
			return res.status(401).json('User not found!');
		} else {
			const { id } = req.params;
			const teachingReview = await TeachingReview.findById(id);
			if (!teachingReview) {
				return res
					.status(404)
					.json(
						`Seems like there is no teaching review with this ID for user: ${req.user.username}!`,
					);
			} else {
				if (teachingReview.user.toString() !== userId) {
					return res
						.status(401)
						.json('You are not authorized to view this teaching review!');
				} else {
					const updatedTeachingReview = await TeachingReview.findByIdAndUpdate(
						id,
						{
							...req.body.teachingReview,
						},
						{ new: true },
					);
					return res.status(200).json(updatedTeachingReview);
				}
			}
		}
	} catch (error) {
		console.error('❌ Error while finding teaching review: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

// Delete User Teaching Review by ID
module.exports.deleteTeachingReview = asyncHandler(async (req, res) => {
	try {
		const userId = req.user.id;
		const user = await User.findById(userId);

		if (!user) {
			return res.status(401).json('User not found!');
		} else {
			const { id } = req.params;
			const teachingReview = await TeachingReview.findById(id);
			if (!teachingReview) {
				return res
					.status(404)
					.json(
						`Seems like there is no teaching review with this ID for user: ${req.user.username}!`,
					);
			} else {
				if (teachingReview.user.toString() !== userId) {
					return res
						.status(401)
						.json('You are not authorized to view this teaching review!');
				} else {
					await teachingReview.remove();
					return res.status(200).json('Teaching review deleted successfully!');
				}
			}
		}
	} catch (error) {
		console.error('❌ Error while deleting teaching review: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

// Delete All Teaching Reviews
module.exports.deleteTeachingReviews = asyncHandler(async (req, res) => {
	try {
		await TeachingReview.deleteMany({});
		return res.status(200).json('All teaching reviews deleted!');
	} catch (error) {
		console.error('❌ Error while deleting all teaching reviews: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

//? --------------------- * * Instructor Reviews CRUD * * --------------------
// View All Instructor Reviews
module.exports.getInstructorReviews = asyncHandler(async (req, res) => {
	try {
		const instructorReviews = await InstructorReview.find({});
		if (instructorReviews.length === 0) {
			return res
				.status(404)
				.json('Seems like there are no instructor reviews!');
		} else {
			return res.status(200).json(instructorReviews);
		}
	} catch (error) {
		console.error('❌ Error while finding instructor reviews: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

// View All User Instructor Reviews
module.exports.getUserInstructorReviews = asyncHandler(async (req, res) => {
	try {
		// Get user using the id in the JWT
		const userId = req.user.id;
		const user = await User.findById(userId);

		if (!user) {
			return res.status(401).json('User not found!');
		} else {
			const userInstructorReviews = await InstructorReview.find({
				user: userId,
			});
			if (userInstructorReviews.length === 0) {
				return res
					.status(404)
					.json(
						`Seems like there are no instructor reviews from user: ${req.user.username}!`,
					);
			} else {
				return res.status(200).json(userInstructorReviews);
			}
		}
	} catch (error) {
		console.error('❌ Error while finding user instructor reviews: ', error);
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
			const instructorReview = await InstructorReview.findById(id);
			if (!instructorReview) {
				return res
					.status(404)
					.json(
						`Seems like there is no instructor review with this ID for user: ${req.user.username}!`,
					);
			} else {
				if (instructorReview.user.toString() !== userId) {
					return res
						.status(401)
						.json('You are not authorized to view this instructor review!');
				}
				return res.status(200).json(instructorReview);
			}
		}
	} catch (error) {
		console.error('❌ Error while finding instructor review: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

// Create User Instructor Review
module.exports.createInstructorReview = asyncHandler(async (req, res) => {
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

	// Get user using the id in the JWT
	const userId = req.user.id;
	const user = await User.findById(userId);

	if (!user) {
		return res.status(401).json('User not found!');
	} else {
		try {
			const instructorReview = await InstructorReview.create({
				good_organization,
				clear_comprehensive_answers,
				student_participation,
				course_consistency,
				instructor_approachable,
				user: userId,
				status: 'new',
			});
			return res.status(201).json(instructorReview);
		} catch (error) {
			console.error('❌ Error while creating instructor review: ', error);
			return res.status(500).json(`${error.message}`);
		}
	}
});

// Update User Instructor Review
module.exports.updateInstructorReview = asyncHandler(async (req, res) => {
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
			const instructorReview = await InstructorReview.findById(id);
			if (!instructorReview) {
				return res
					.status(404)
					.json(
						`Seems like there is no instructor review with this ID for user: ${req.user.username}!`,
					);
			} else {
				if (instructorReview.user.toString() !== userId) {
					return res
						.status(401)
						.json('You are not authorized to view this instructor review!');
				} else {
					const updatedInstructorReview =
						await InstructorReview.findByIdAndUpdate(
							id,
							{
								...req.body.instructorReview,
							},
							{ new: true },
						);
					return res.status(200).json(updatedInstructorReview);
				}
			}
		}
	} catch (error) {
		console.error('❌ Error while finding instructor review: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

// Delete User Instructor Review by ID
module.exports.deleteInstructorReview = asyncHandler(async (req, res) => {
	try {
		const userId = req.user.id;
		const user = await User.findById(userId);

		if (!user) {
			return res.status(401).json('User not found!');
		} else {
			const { id } = req.params;
			const instructorReview = await InstructorReview.findById(id);
			if (!instructorReview) {
				return res
					.status(404)
					.json(
						`Seems like there is no instructor review with this ID for user: ${req.user.username}!`,
					);
			} else {
				if (instructorReview.user.toString() !== userId) {
					return res
						.status(401)
						.json('You are not authorized to view this instructor review!');
				} else {
					await InstructorReview.remove();
					return res
						.status(200)
						.json('Instructor review deleted successfully!');
				}
			}
		}
	} catch (error) {
		console.error('❌ Error while deleting instructor review: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

// Delete All Instructor Reviews
module.exports.deleteInstructorReviews = asyncHandler(async (req, res) => {
	try {
		await InstructorReview.deleteMany({});
		return res.status(200).json('All instructor reviews deleted!');
	} catch (error) {
		console.error('❌ Error while deleting all instructor reviews: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

//? --------------------- * * General Reviews CRUD * * --------------------
// View All General Reviews
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

// View All User General Review
module.exports.viewGeneralReview = asyncHandler(async (req, res) => {
	try {
		// Get user using the id in the JWT
		const userId = req.user.id;
		const user = await User.findById(userId);

		if (!user) {
			return res.status(401).json('User not found!');
		} else {
			const userGeneralReviews = await GeneralReview.find({
				user: userId,
			});
			if (userGeneralReviews.length === 0) {
				return res
					.status(404)
					.json(
						`Seems like there are no general reviews from user: ${req.user.username}!`,
					);
			} else {
				return res.status(200).json(userGeneralReviews);
			}
		}
	} catch (error) {
		console.error('❌ Error while finding user general reviews: ', error);
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
			const generalReview = await GeneralReview.findById(id);
			if (!generalReview) {
				return res
					.status(404)
					.json(
						`Seems like there is no general review with this ID for user: ${req.user.username}!`,
					);
			} else {
				if (generalReview.user.toString() !== userId) {
					return res
						.status(401)
						.json('You are not authorized to view this general review!');
				}
				return res.status(200).json(generalReview);
			}
		}
	} catch (error) {
		console.error('❌ Error while finding general review: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

// Create User General Review
module.exports.createGeneralReview = asyncHandler(async (req, res) => {
	const { course_opinion, instructor_opinion, likes, dislikes } = req.body;

	if (!course_opinion || !instructor_opinion || !likes || !dislikes) {
		return res.status(400).json('Please fill in all the fields!');
	}

	// Get user using the id in the JWT
	const userId = req.user.id;
	const user = await User.findById(userId);

	if (!user) {
		return res.status(401).json('User not found!');
	} else {
		try {
			const generalReview = await GeneralReview.create({
				course_opinion,
				instructor_opinion,
				likes,
				dislikes,
				user: userId,
				status: 'new',
			});
			return res.status(201).json(generalReview);
		} catch (error) {
			console.error('❌ Error while creating general review: ', error);
			return res.status(500).json(`${error.message}`);
		}
	}
});

// Update User General Review
module.exports.updateGeneralReview = asyncHandler(async (req, res) => {
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
			const generalReview = await GeneralReview.findById(id);
			if (!generalReview) {
				return res
					.status(404)
					.json(
						`Seems like there is no general review with this ID for user: ${req.user.username}!`,
					);
			} else {
				if (generalReview.user.toString() !== userId) {
					return res
						.status(401)
						.json('You are not authorized to view this general review!');
				} else {
					const updatedGeneralReview = await GeneralReview.findByIdAndUpdate(
						id,
						{
							...req.body.generalReview,
						},
						{ new: true },
					);
					return res.status(200).json(updatedGeneralReview);
				}
			}
		}
	} catch (error) {
		console.error('❌ Error while finding general review: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

// Delete User General Review by ID
module.exports.deleteGeneralReview = asyncHandler(async (req, res) => {
	try {
		const userId = req.user.id;
		const user = await User.findById(userId);

		if (!user) {
			return res.status(401).json('User not found!');
		} else {
			const { id } = req.params;
			const generalReview = await GeneralReview.findById(id);
			if (!generalReview) {
				return res
					.status(404)
					.json(
						`Seems like there is no general review with this ID for user: ${req.user.username}!`,
					);
			} else {
				if (generalReview.user.toString() !== userId) {
					return res
						.status(401)
						.json('You are not authorized to view this general review!');
				} else {
					await GeneralReview.remove();
					return res.status(200).json('General review deleted successfully!');
				}
			}
		}
	} catch (error) {
		console.error('❌ Error while deleting general review: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

// Delete All General Reviews
module.exports.deleteGeneralReviews = asyncHandler(async (req, res) => {
	try {
		await GeneralReview.deleteMany({});
		return res.status(200).json('All general reviews deleted!');
	} catch (error) {
		console.error('❌ Error while deleting all general reviews: ', error);
		return res.status(500).json(`${error.message}`);
	}
});
