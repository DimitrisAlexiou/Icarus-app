const asyncHandler = require('express-async-handler');
const Assessment = require('../../models/admin/assessment');

module.exports.defineAssessment = asyncHandler(async (req, res) => {
	const { vaccineStartDate, vaccineEndDate, period } = req.body;

	if (!vaccineStartDate || !vaccineEndDate || !period) {
		return res.status(400).json({ message: 'Please provide the required fields!' });
	}

	try {
		const assessmentExists = await Assessment.findOne({
			vaccineStartDate: vaccineStartDate,
		});
		if (assessmentExists) {
			return res.status(400).json({
				message: 'Seems like assessment statement duration period is already defined!',
			});
		} else {
			try {
				const assessment = await Assessment.create({
					vaccineStartDate,
					vaccineEndDate,
					period,
					status: 'new',
				});
				return res.status(201).json(assessment);
			} catch (error) {
				console.error(
					'❌ Error while defining assessment statement duration period: ',
					error
				);
				return res.status(500).json({
					message:
						'Something went wrong, unfortunately the assessment statement duration period did not defined!',
				});
			}
		}
	} catch (error) {
		console.error(
			'❌ Error while checking if assessment statement duration period already defined: ',
			error
		);
		return res.status(500).json({ message: 'Something went wrong, try again later!' });
	}
});

module.exports.getAssessment = asyncHandler(async (req, res) => {
	try {
		const assessment = await Assessment.findOne({});
		if (assessment.length === 0) {
			return res.status(404).json({
				message: 'Seems like there is no assessment statement duration period defined!',
			});
		} else {
			return res.status(200).json(assessment);
		}
	} catch (error) {
		console.error('❌ Error while finding assessment statement duration period: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later!' });
	}
});

module.exports.updateAssessment = asyncHandler(async (req, res) => {
	const { period, startDate, endDate } = req.body;
	if (!period || !startDate || !endDate) {
		return res.status(400).json({ message: 'Please provide the required fields!' });
	}
	try {
		const assessment = await Assessment.findOne({});
		if (!assessment) {
			return res.status(404).json({
				message: 'Seems like there is no assessment statement duration period defined!',
			});
		} else {
			try {
				const updatedAssessment = await Assessment.updateOne(
					{
						...req.body,
					},
					{ new: true }
				);
				return res.status(200).json(updatedAssessment);
			} catch (error) {
				console.error(
					'❌ Error while updating assessment statement duration period: ',
					error
				);
				return res.status(500).json({
					message:
						'Something went wrong, unfortunately the assessment statement duration period did not updated!',
				});
			}
		}
	} catch (error) {
		console.error('❌ Error while finding assessment statement duration period: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later!' });
	}
});

module.exports.deleteAssessment = asyncHandler(async (_, res) => {
	try {
		await Assessment.deleteOne({});
		return res.status(200).json({ message: 'Assessment statement duration period deleted!' });
	} catch (error) {
		console.error('❌ Error while deleting assessment statement duration peirod: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later!' });
	}
});
