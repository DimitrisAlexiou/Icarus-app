const asyncHandler = require('express-async-handler');
const GeneralReview = require('../../models/review/generalReview');
const User = require('../../models/users/user');

//TODO FIX THE REQ.USER.ID FOR FINDING USER WITH USERID
//TODO FIXING REVIEWS ! ! !

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

module.exports.createUserGeneralReview = asyncHandler(async (req, res) => {
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
				return res.status(200).json('General review deleted!');
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
