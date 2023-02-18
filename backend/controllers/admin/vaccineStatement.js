const asyncHandler = require('express-async-handler');
const VaccineReassessment = require('../../models/admin/vaccineReassessment');

module.exports.defineVaccineReassessment = asyncHandler(async (req, res) => {
	const { startDate, endDate } = req.body.vaccineReassessment;

	if (!startDate || !endDate) {
		return res.status(400).json('Please provide the required starting and ending dates!');
	}
	try {
		const vaccineReassessmentExists = await VaccineReassessment.find({});
		if (vaccineReassessmentExists) {
			return res
				.status(400)
				.json('Seems like vaccine/reassessment statement duration is already defined!');
		} else {
			try {
				const vaccineReassessment = await VaccineReassessment.create({
					startDate,
					endDate,
					status: 'new',
				});
				return res.status(201).json(vaccineReassessment);
			} catch (error) {
				console.error(
					'❌ Error while defining vaccine/reassessment statement duration: ',
					error
				);
				return res.status(500).json(`${error.message}`);
			}
		}
	} catch (error) {
		console.error(
			'❌ Error while checking if vaccine/reassessment statement duration already defined: ',
			error
		);
		return res.status(500).json(`${error.message}`);
	}
});

module.exports.viewVaccineReassessment = asyncHandler(async (req, res) => {
	try {
		const vaccineReassessment = await VaccineReassessment.find({});
		if (vaccineReassessment.length === 0) {
			return res
				.status(404)
				.json('Seems like there is no vaccine/reassessment statement duration defined!');
		} else {
			return res.status(200).json(vaccineReassessment);
		}
	} catch (error) {
		console.error('❌ Error while finding vaccine/reassessment statement duration: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

module.exports.updateVaccineReassessment = asyncHandler(async (req, res) => {
	const { startDate, endDate } = req.body;
	if (!startDate || !endDate) {
		return res.status(400).json('Please provide the required starting and ending dates!');
	}
	try {
		const vaccineReassessment = await VaccineReassessment.find({});
		if (!vaccineReassessment) {
			return res
				.status(404)
				.json('Seems like there is no vaccine/reassessment statement duration defined!');
		} else {
			try {
				const updatedVaccineReassessment = await VaccineReassessment.updateOne(
					{},
					{
						...req.body.vaccineReassessment,
					},
					{ new: true }
				);
				return res.status(200).json(updatedVaccineReassessment);
			} catch (error) {
				console.error(
					'❌ Error while updating vaccine/reassessment statement duration: ',
					error
				);
				return res.status(500).json(`${error.message}`);
			}
		}
	} catch (error) {
		console.error('❌ Error while finding vaccine/reassessment statement duration: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

module.exports.deleteVaccineReassessment = asyncHandler(async (_, res) => {
	try {
		await VaccineReassessment.deleteOne({});
		return res.status(200).json('Vaccine/Reassessment Statement duration deleted!');
	} catch (error) {
		console.error('❌ Error while deleting Vaccine/Reassessment Statement duration: ', error);
		return res.status(500).json(`${error.message}`);
	}
});
