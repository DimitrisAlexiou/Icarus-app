const asyncHandler = require('express-async-handler');
const ReviewDuration = require('../../models/admin/reviewDuration');
const Semester = require('../../models/admin/semester');

module.exports.defineReviewDuration = asyncHandler(async (req, res) => {
	const { startDate, endDate } = req.body;
	if (!startDate || !endDate) {
		return res.status(400).json('Please provide the required starting and ending dates!');
	}
	try {
		const reviewDuration = await ReviewDuration.findOne({
			startDate: startDate,
		});
		if (reviewDuration) {
			return res.status(400).json('Seems like review statement duration is already defined!');
		} else {
			try {
				const newReviewDuration = await ReviewDuration.create({
					startDate,
					endDate,
					status: 'new',
				});
				return res.status(201).json(newReviewDuration);
			} catch (error) {
				console.error('❌ Error while defining review statement duration: ', error);
				return res.status(500).json(`${error.message}`);
			}
		}
	} catch (error) {
		console.error(
			'❌ Error while checking if review statement duration already defined: ',
			error
		);
		return res.status(500).json(`${error.message}`);
	}
});

module.exports.viewReviewStatement = asyncHandler(async (_, res) => {
	try {
		const reviewStatement = await ReviewDuration.find({});
		if (reviewStatement.length === 0) {
			return res
				.status(404)
				.json('Seems like there is no review statement duration defined!');
		} else {
			return res.status(200).json(reviewStatement);
		}
	} catch (error) {
		console.error('❌ Error while finding review statement duration: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

module.exports.updateReviewStatement = asyncHandler(async (req, res) => {
	const { startDate, endDate } = req.body;
	if (!startDate || !endDate) {
		return res.status(400).json('Please provide the required starting and ending dates!');
	}
	try {
		const reviewStatement = await ReviewDuration.find({});
		if (!reviewStatement) {
			return res
				.status(404)
				.json('Seems like there is no review statement duration defined!');
		} else {
			try {
				const updatedSemester = await Semester.updateOne(
					{},
					{
						...req.body.reviewStatement,
					},
					{ new: true }
				);
				return res.status(200).json(updatedSemester);
			} catch (error) {
				console.error('❌ Error while updating current semester: ', error);
				return res.status(500).json(`${error.message}`);
			}
		}
	} catch (error) {
		console.error('❌ Error while finding review statement duration window: ', error);
		return res.status(500).json(`${error.message}`);
	}
});
