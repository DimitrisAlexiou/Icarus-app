const asyncHandler = require('express-async-handler');
const GeneralReview = require('../../models/review/generalReview');

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

module.exports.deleteGeneralReviews = asyncHandler(async (req, res) => {
	try {
		await GeneralReview.deleteMany({});
		return res.status(200).json('All general reviews deleted!');
	} catch (error) {
		console.error('❌ Error while deleting all general reviews: ', error);
		return res.status(500).json(`${error.message}`);
	}
});
