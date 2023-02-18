const asyncHandler = require('express-async-handler');
const GradingDuration = require('../../models/admin/gradingDuration');

module.exports.defineGradingDuration = asyncHandler(async (req, res) => {
	const { duration } = req.body;
	if (!duration) {
		return res.status(400).json('Please provide the required grading duration period!');
	}
	try {
		const gradingDuration = await GradingDuration.findOne({
			duration: duration,
		});
		if (gradingDuration) {
			return res.status(400).json('Seems like grading duration period is already defined!');
		} else {
			try {
				const newGradingDuration = await GradingDuration.create({
					duration,
					status: 'new',
				});
				return res.status(201).json(newGradingDuration);
			} catch (error) {
				console.error('❌ Error while defining grading duration period: ', error);
				return res.status(500).json(`${error.message}`);
			}
		}
	} catch (error) {
		console.error(
			'❌ Error while checking if grading duration period already defined: ',
			error
		);
		return res.status(500).json(`${error.message}`);
	}
});
