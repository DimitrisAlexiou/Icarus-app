const asyncHandler = require('express-async-handler');
const {
	Semester,
	GradingDuration,
	VaccineReassessmentDuration,
	AssessmentDuration,
	ReviewDuration,
	ReviewStartDate,
	Cycles,
	DegreeRules,
} = require('../models');

//? --------------------- * * ADMIN CRUD * * --------------------

//TODO Create new Semester
module.exports.createSemester = asyncHandler(async (req, res) => {
	const { sid } = req.body;

	if (sid === undefined) {
		return res.status(400).json('Please fill in all the required fields!');
	}
	try {
		const semester = await Semester.findOne({ sid: sid });

		if (semester) {
			return res
				.status(400)
				.json('Seems like this semester is already defined!');
		} else {
			const newSemester = await Semester.create({
				cid,
				status: 'new',
			});
			return res.status(201).json(newSemester);
		}
	} catch (error) {
		console.error('❌ Error while creating semester: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

//TODO Create Grading duration window
module.exports.createGradingDuration = asyncHandler(async (req, res) => {
	const { sid } = req.body;

	if (sid === undefined) {
		return res.status(400).json('Please fill in all the required fields!');
	}
	try {
		const gradingDuration = await GradingDuration.findOne({ sid: sid });
		if (gradingDuration) {
			return res
				.status(400)
				.json('Seems like grading duration is already defined!');
		} else {
			const newGradingDuration = await GradingDuration.create({
				cid,
				status: 'new',
			});
			return res.status(201).json(newGradingDuration);
		}
	} catch (error) {
		console.error('❌ Error while creating grading duration: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

//TODO Create Vaccine/Reassessment Statement duration window
module.exports.createVaccineReassessmentDuration = asyncHandler(
	async (req, res) => {
		const { sid } = req.body;

		if (sid === undefined) {
			return res.status(400).json('Please fill in all the required fields!');
		}
		try {
			const vaccineReassessmentDuration =
				await VaccineReassessmentDuration.findOne({ sid: sid });
			if (vaccineReassessmentDuration) {
				return res
					.status(400)
					.json('Seems like grading duration is already defined!');
			} else {
				const newVaccineReassessmentDuration =
					await VaccineReassessmentDuration.create({
						cid,
						status: 'new',
					});
				return res.status(201).json(newVaccineReassessmentDuration);
			}
		} catch (error) {
			console.error(
				'❌ Error while creating vaccine/reassessment duration: ',
				error,
			);
			return res.status(500).json(`${error.message}`);
		}
	},
);

//TODO Create Assessment Statement duration window
module.exports.createAssessmentDuration = asyncHandler(async (req, res) => {
	const { sid } = req.body;

	if (sid === undefined) {
		return res.status(400).json('Please fill in all the required fields!');
	}
	try {
		const assessmentDuration = await AssessmentDuration.findOne({ sid: sid });
		if (assessmentDuration) {
			return res
				.status(400)
				.json('Seems like assessment duration is already defined!');
		} else {
			const newAssessmentDuration = await AssessmentDuration.create({
				cid,
				status: 'new',
			});
			return res.status(201).json(newAssessmentDuration);
		}
	} catch (error) {
		console.error('❌ Error while creating assessment duration: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

//TODO Create Review Statement duration window
module.exports.createReviewDuration = asyncHandler(async (req, res) => {
	const { sid } = req.body;

	if (sid === undefined) {
		return res.status(400).json('Please fill in all the required fields!');
	}
	try {
		const reviewDuration = await ReviewDuration.findOne({ sid: sid });
		if (reviewDuration) {
			return res
				.status(400)
				.json('Seems like review duration is already defined!');
		} else {
			const newReviewDuration = await ReviewDuration.create({
				cid,
				status: 'new',
			});
			return res.status(201).json(newReviewDuration);
		}
	} catch (error) {
		console.error('❌ Error while creating review duration: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

//TODO Create Review Start date
module.exports.createReviewStart = asyncHandler(async (req, res) => {
	const { sid } = req.body;

	if (sid === undefined) {
		return res.status(400).json('Please fill in all the required fields!');
	}
	try {
		const reviewStartDate = await ReviewStartDate.findOne({ sid: sid });
		if (reviewStartDate) {
			return res
				.status(400)
				.json('Seems like review starting date is already defined!');
		} else {
			const newReviewStartDate = await ReviewStartDate.create({
				cid,
				status: 'new',
			});
			return res.status(201).json(newReviewStartDate);
		}
	} catch (error) {
		console.error('❌ Error while creating review starting date: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

//TODO Create Cycles
module.exports.createCycles = asyncHandler(async (req, res) => {
	const { sid } = req.body;

	if (sid === undefined) {
		return res.status(400).json('Please fill in all the required fields!');
	}
	try {
		const cycles = await Cycles.findOne({ sid: sid });
		if (cycles) {
			return res.status(400).json('Seems like cycles are already defined!');
		} else {
			const newCycles = await Cycles.create({
				cid,
				status: 'new',
			});
			return res.status(201).json(newCycles);
		}
	} catch (error) {
		console.error('❌ Error while creating cycles: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

//TODO Create Degree Rules
module.exports.createDegreeRules = asyncHandler(async (req, res) => {
	const { sid } = req.body;

	if (sid === undefined) {
		return res.status(400).json('Please fill in all the required fields!');
	}
	try {
		const degreeRules = await DegreeRules.findOne({ sid: sid });
		if (degreeRules) {
			return res
				.status(400)
				.json('Seems like degree rules are already defined!');
		} else {
			const newDegreeRules = await DegreeRules.create({
				cid,
				status: 'new',
			});
			return res.status(201).json(newDegreeRules);
		}
	} catch (error) {
		console.error('❌ Error while creating degree rules: ', error);
		return res.status(500).json(`${error.message}`);
	}
});
