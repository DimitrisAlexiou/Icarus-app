const asyncHandler = require('express-async-handler');
const ReviewStart = require('../../models/admin/reviewStart');

module.exports.defineReviewStart = asyncHandler(async (req, res) => {
	const { init } = req.body;
	if (!init) {
		return res.status(400).json('Please provide the required initial time!');
	}
	try {
		const reviewStart = await ReviewStart.findOne({ init: init });
		if (reviewStart) {
			return res.status(400).json('Seems like review initial time is already defined!');
		} else {
			try {
				const newReviewStart = await ReviewStart.create({
					init,
					status: 'new',
				});
				return res.status(201).json(newReviewStart);
			} catch (error) {
				console.error('❌ Error while defining review initial time: ', error);
				return res.status(500).json(`${error.message}`);
			}
		}
	} catch (error) {
		console.error('❌ Error while checking if review initial time already defined: ', error);
		return res.status(500).json(`${error.message}`);
	}
});
