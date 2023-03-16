const asyncHandler = require('express-async-handler');
const Review = require('../../models/admin/review');
const Semester = require('../../models/admin/semester');

module.exports.defineReviewStatement = asyncHandler(async (req, res) => {
	const { startDate, endDate, start } = req.body;

	if (!startDate || !endDate || !start) {
		return res.status(400).json({ message: 'Please provide the required fields!' });
	}

	try {
		const reviewExists = await Review.findOne({
			startDate: startDate,
		});
		if (reviewExists) {
			return res.status(400).json({
				message: 'Seems like review statement period is already defined!',
			});
		} else {
			try {
				const review = await Review.create({
					startDate,
					endDate,
					start,
					status: 'new',
				});
				return res.status(201).json(review);
			} catch (error) {
				console.error('❌ Error while defining review statement period: ', error);
				return res.status(500).json({
					message:
						'Something went wrong, unfortunately the review statement period did not defined!',
				});
			}
		}
	} catch (error) {
		console.error(
			'❌ Error while checking if review statement period already defined: ',
			error
		);
		return res.status(500).json({ message: 'Something went wrong, try again later!' });
	}
});

module.exports.getReviewStatement = asyncHandler(async (_, res) => {
	try {
		const reviewStatement = await Review.findOne({});
		if (reviewStatement.length === 0) {
			return res
				.status(404)
				.json({ message: 'Seems like there is no review statement period defined!' });
		} else {
			return res.status(200).json(reviewStatement);
		}
	} catch (error) {
		console.error('❌ Error while finding review statement period: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later!' });
	}
});

module.exports.updateReviewStatement = asyncHandler(async (req, res) => {
	const { startDate, endDate, start } = req.body;
	if (!startDate || !endDate || !start) {
		return res.status(400).json({
			message:
				'Please provide the required starting and ending dates  as long as the beginning of the review statement period!',
		});
	}
	try {
		const reviewExists = await Review.findOne({});
		if (!reviewExists) {
			return res
				.status(404)
				.json({ message: 'Seems like there is no review statement period defined!' });
		} else {
			try {
				const updatedReview = await Semester.updateOne(
					{
						...req.body,
					},
					{ new: true }
				);
				return res.status(200).json(updatedReview);
			} catch (error) {
				console.error('❌ Error while updating review statement period: ', error);
				return res.status(500).json({
					message:
						'Something went wrong, unfortunately the review statement period did not updated!',
				});
			}
		}
	} catch (error) {
		console.error('❌ Error while finding review statement period: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later!' });
	}
});

module.exports.deleteReviewStatement = asyncHandler(async (_, res) => {
	try {
		await Review.deleteOne({});
		return res.status(200).json({ message: 'Current review statement period deleted!' });
	} catch (error) {
		console.error('❌ Error while deleting defined review statement period: ', error);
		return res.status(500).json({
			message:
				'Something went wrong, unfortunately defined review statement did not deleted!',
		});
	}
});
