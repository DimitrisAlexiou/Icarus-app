const asyncHandler = require('express-async-handler');
const DegreeRules = require('../../models/admin/degreeRules');

module.exports.defineDegreeRules = asyncHandler(async (req, res) => {
	const { cycles, cycleCourses, courses, practice } = req.body;

	if (!cycles || !cycleCourses || !courses || !practice) {
		return res.status(400).json({ message: 'Please provide all the required fields!' });
	}

	try {
		const degreeRulesExists = await DegreeRules.findOne({});
		if (degreeRulesExists) {
			return res
				.status(400)
				.json({ message: 'Seems like degree rules are already defined!' });
		} else {
			try {
				const degreeRules = await DegreeRules.create({
					cycles,
					cycleCourses,
					courses,
					practice,
					status: 'new',
				});
				return res.status(201).json(degreeRules);
			} catch (error) {
				console.error('❌ Error while defining degree rules: ', error);
				return res.status(500).json({
					message:
						'Something went wrong, unfortunately the degree rules did not defined!',
				});
			}
		}
	} catch (error) {
		console.error('❌ Error while checking if degree rules already defined: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later!' });
	}
});

module.exports.getDegreeRules = asyncHandler(async (_, res) => {
	try {
		const degreeRules = await DegreeRules.findOne({});
		if (degreeRules.length === 0) {
			return res
				.status(404)
				.json({ message: 'Seems like there are no defined degree rules!' });
		} else {
			return res.status(200).json(degreeRules);
		}
	} catch (error) {
		console.error('❌ Error while finding existing degree rules: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later!' });
	}
});

module.exports.updateDegreeRules = asyncHandler(async (req, res) => {
	const { cycles, cycleCourses, courses, practice } = req.body;

	if (!cycles || !cycleCourses || !courses || !practice) {
		return res.status(400).json({ message: 'Please provide all the required fields!' });
	}

	try {
		const { id } = req.params;
		const degreeRules = await DegreeRules.findById(id);
		if (!degreeRules) {
			return res
				.status(404)
				.json({ message: 'Seems like there are no defined degree rules!' });
		} else {
			try {
				const updatedDegreeRules = await DegreeRules.findByIdAndUpdate(
					id,
					{
						...req.body,
					},
					{ new: true }
				);
				return res.status(200).json(updatedDegreeRules);
			} catch (error) {
				console.error('❌ Error while updating current degree rules: ', error);
				return res.status(500).json({
					message:
						'Something went wrong, unfortunately the degree rules did not updated!',
				});
			}
		}
	} catch (error) {
		console.error('❌ Error while finding current degree rules: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later!' });
	}
});

module.exports.deleteDegreeRules = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params;
		await DegreeRules.findByIdAndDelete(id);
		return res.status(200).json({ message: 'Current degree rules deleted!' });
	} catch (error) {
		console.error('❌ Error while deleting current degree rules: ', error);
		return res.status(500).json({
			message:
				'Something went wrong, unfortuantely the current degree rules did not deleted!',
		});
	}
});
