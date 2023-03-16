const asyncHandler = require('express-async-handler');
const InstructorReview = require('../../models/review/instructorReview');

module.exports.getInstructorReviews = asyncHandler(async (req, res) => {
	try {
		const instructorReviews = await InstructorReview.find({});
		if (instructorReviews.length === 0) {
			return res.status(404).json({ message: 'Seems like there are no instructor reviews!' });
		} else {
			return res.status(200).json(instructorReviews);
		}
	} catch (error) {
		console.error('❌ Error while finding instructor reviews: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later!' });
	}
});

module.exports.deleteInstructorReviews = asyncHandler(async (req, res) => {
	try {
		await InstructorReview.deleteMany({});
		return res.status(200).json({ message: 'All instructor reviews deleted!' });
	} catch (error) {
		console.error('❌ Error while deleting all instructor reviews: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later!' });
	}
});
