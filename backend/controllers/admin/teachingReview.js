const asyncHandler = require('express-async-handler');
const TeachingReview = require('../../models/review/teachingReview');

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

module.exports.deleteTeachingReviews = asyncHandler(async (req, res) => {
	try {
		await TeachingReview.deleteMany({});
		return res.status(200).json('All teaching reviews deleted!');
	} catch (error) {
		console.error('❌ Error while deleting all teaching reviews: ', error);
		return res.status(500).json(`${error.message}`);
	}
});
