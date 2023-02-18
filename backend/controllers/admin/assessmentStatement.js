const asyncHandler = require('express-async-handler');
const AssessmentDuration = require('../../models/admin/assessmentDuration');

module.exports.defineAssessmentDuration = asyncHandler(async (req, res) => {
	const { startDate, endDate } = req.body;
	if (!startDate || !endDate) {
		return res.status(400).json('Please provide the required starting and ending dates!');
	}
	try {
		const assessmentDuration = await AssessmentDuration.findOne({
			startDate: startDate,
		});
		if (assessmentDuration) {
			return res
				.status(400)
				.json('Seems like assessment statement duration is already defined!');
		} else {
			try {
				const newAssessmentDuration = await AssessmentDuration.create({
					startDate,
					endDate,
					status: 'new',
				});
				return res.status(201).json(newAssessmentDuration);
			} catch (error) {
				console.error('❌ Error while defining assessment statement duration: ', error);
				return res.status(500).json(`${error.message}`);
			}
		}
	} catch (error) {
		console.error(
			'❌ Error while checking if assessment statement duration already defined: ',
			error
		);
		return res.status(500).json(`${error.message}`);
	}
});
