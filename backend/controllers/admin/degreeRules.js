const asyncHandler = require('express-async-handler');
const DegreeRules = require('../../models/admin/degreeRules');

module.exports.defineDegreeRules = asyncHandler(async (req, res) => {
	const { cycles, cycleCourses, courses, practice } = req.body;
	if (!cycles || !cycleCourses || !courses || !practice) {
		return res.status(400).json('Please provide all the required fields!');
	}
	try {
		const degreeRules = await DegreeRules.find({});
		if (degreeRules) {
			return res.status(400).json('Seems like degree rules are already defined!');
		} else {
			try {
				const newDegreeRules = await DegreeRules.create({
					cycles,
					cycleCourses,
					courses,
					practice,
					status: 'new',
				});
				return res.status(201).json(newDegreeRules);
			} catch (error) {
				console.error('❌ Error while defining degree rules: ', error);
				return res.status(500).json(`${error.message}`);
			}
		}
	} catch (error) {
		console.error('❌ Error while checking if degree rules already defined: ', error);
		return res.status(500).json(`${error.message}`);
	}
});
