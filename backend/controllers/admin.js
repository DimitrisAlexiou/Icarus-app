const asyncHandler = require('express-async-handler');
const Semester = require('../models/admin/semester');
const VaccineReassessment = require('../models/admin/vaccineReassessment');
const AssessmentDuration = require('../models/admin/assessmentDuration');
const ReviewDuration = require('../models/admin/reviewDuration');
const ReviewStart = require('../models/admin/reviewStart');
const GradingDuration = require('../models/admin/gradingDuration');
const Cycles = require('../models/admin/cycles');
const DegreeRules = require('../models/admin/degreeRules');
const { dateFormat } = require('../utils/dateFormat');

//? --------------------- * * ADMIN SYSTEM CONFIGURATION CRUD * * --------------------
// Define new Semester
module.exports.defineSemester = asyncHandler(async (req, res) => {
	const { type, startDate, endDate } = req.body;
	if (!type || !startDate || !endDate) {
		return res.status(400).json('Please provide the required fields!');
	}
	try {
		const semester = await Semester.findOne({ startDate: startDate });
		if (semester) {
			return res
				.status(400)
				.json('Seems like this semester is already defined!');
		} else {
			try {
				const newSemester = await Semester.create({
					type,
					startDate,
					endDate,
					status: 'new',
				});
				return res.status(201).json(newSemester);
			} catch (error) {
				console.error('❌ Error while defining semester: ', error);
				return res.status(500).json(`${error.message}`);
			}
		}
	} catch (error) {
		console.error(
			'❌ Error while checking if semester already defined: ',
			error,
		);
		return res.status(500).json(`${error.message}`);
	}
});

// View current Semester
module.exports.viewCurrentSemester = asyncHandler(async (req, res) => {
	try {
		const semesters = await Semester.find({});
		if (semesters.length === 0) {
			return res.status(404).json('Seems like there is no defined semester!');
		} else {
			return res.status(200).json(semesters);

			// if (semesters[0].startDate > dateFormat(new Date()))
			// 	return res.status(200).json(semesters);
		}
	} catch (error) {
		console.error('❌ Error while finding current semester: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

// Update current Semester
module.exports.updateCurrentSemester = asyncHandler(async (req, res) => {
	const { startDate, endDate } = req.body;
	if (!startDate || !endDate) {
		return res
			.status(400)
			.json('Please provide the required starting and ending dates!');
	}
	try {
		const semester = await Semester.find({});
		if (!semester) {
			return res.status(404).json('Seems like there is no defined semester!');
		} else {
			try {
				const updatedSemester = await Semester.updateOne(
					{},
					{
						...req.body.semester,
					},
					{ new: true },
				);
				return res.status(200).json(updatedSemester);
			} catch (error) {
				console.error('❌ Error while updating current semester: ', error);
				return res.status(500).json(`${error.message}`);
			}
		}
	} catch (error) {
		console.error('❌ Error while finding current semester: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

// Delete current Semester
module.exports.deleteCurrentSemester = asyncHandler(async (req, res) => {
	try {
		await Semester.deleteOne({});
		return res.status(200).json('Current semester deleted!');
	} catch (error) {
		console.error('❌ Error while deleting current semester: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

// Define Vaccine/Reassessment Statement duration window
module.exports.defineVaccineReassessment = asyncHandler(async (req, res) => {
	const { startDate, endDate } = req.body;
	if (!startDate || !endDate) {
		return res
			.status(400)
			.json('Please provide the required starting and ending dates!');
	}
	try {
		const vaccineReassessment = await VaccineReassessment.findOne({
			startDate: startDate,
		});
		if (vaccineReassessment) {
			return res
				.status(400)
				.json(
					'Seems like vaccine/reassessment statement duration is already defined!',
				);
		} else {
			try {
				const newVaccineReassessment = await VaccineReassessment.create({
					startDate,
					endDate,
					status: 'new',
				});
				return res.status(201).json(newVaccineReassessment);
			} catch (error) {
				console.error(
					'❌ Error while defining vaccine/reassessment statement duration: ',
					error,
				);
				return res.status(500).json(`${error.message}`);
			}
		}
	} catch (error) {
		console.error(
			'❌ Error while checking if vaccine/reassessment statement duration already defined: ',
			error,
		);
		return res.status(500).json(`${error.message}`);
	}
});

// View Vaccine/Reassessment Statement duration window
module.exports.viewVaccineReassessment = asyncHandler(async (req, res) => {
	try {
		const vaccineReassessment = await VaccineReassessment.find({});
		if (vaccineReassessment.length === 0) {
			return res
				.status(404)
				.json(
					'Seems like there is no vaccine/reassessment statement duration defined!',
				);
		} else {
			return res.status(200).json(vaccineReassessment);
		}
	} catch (error) {
		console.error(
			'❌ Error while finding vaccine/reassessment statement duration: ',
			error,
		);
		return res.status(500).json(`${error.message}`);
	}
});

// Update Vaccine/Reassessment Statement duration window
module.exports.updateVaccineReassessment = asyncHandler(async (req, res) => {
	const { startDate, endDate } = req.body;
	if (!startDate || !endDate) {
		return res
			.status(400)
			.json('Please provide the required starting and ending dates!');
	}
	try {
		const vaccineReassessment = await VaccineReassessment.find({});
		if (!vaccineReassessment) {
			return res
				.status(404)
				.json(
					'Seems like there is no vaccine/reassessment statement duration defined!',
				);
		} else {
			try {
				const updatedVaccineReassessment = await VaccineReassessment.updateOne(
					{},
					{
						...req.body.vaccineReassessment,
					},
					{ new: true },
				);
				return res.status(200).json(updatedVaccineReassessment);
			} catch (error) {
				console.error(
					'❌ Error while updating vaccine/reassessment statement duration: ',
					error,
				);
				return res.status(500).json(`${error.message}`);
			}
		}
	} catch (error) {
		console.error(
			'❌ Error while finding vaccine/reassessment statement duration: ',
			error,
		);
		return res.status(500).json(`${error.message}`);
	}
});

// Delete Vaccine/Reassessment Statement duration window
module.exports.deleteVaccineReassessment = asyncHandler(async (req, res) => {
	try {
		await VaccineReassessment.deleteOne({});
		return res
			.status(200)
			.json('Vaccine/Reassessment Statement duration deleted!');
	} catch (error) {
		console.error(
			'❌ Error while deleting Vaccine/Reassessment Statement duration: ',
			error,
		);
		return res.status(500).json(`${error.message}`);
	}
});

// Define Assessment Statement duration window
module.exports.defineAssessmentDuration = asyncHandler(async (req, res) => {
	const { startDate, endDate } = req.body;
	if (!startDate || !endDate) {
		return res
			.status(400)
			.json('Please provide the required starting and ending dates!');
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
				console.error(
					'❌ Error while defining assessment statement duration: ',
					error,
				);
				return res.status(500).json(`${error.message}`);
			}
		}
	} catch (error) {
		console.error(
			'❌ Error while checking if assessment statement duration already defined: ',
			error,
		);
		return res.status(500).json(`${error.message}`);
	}
});

// Define Review Statement duration window
module.exports.defineReviewDuration = asyncHandler(async (req, res) => {
	const { startDate, endDate } = req.body;
	if (!startDate || !endDate) {
		return res
			.status(400)
			.json('Please provide the required starting and ending dates!');
	}
	try {
		const reviewDuration = await ReviewDuration.findOne({
			startDate: startDate,
		});
		if (reviewDuration) {
			return res
				.status(400)
				.json('Seems like review statement duration is already defined!');
		} else {
			try {
				const newReviewDuration = await ReviewDuration.create({
					startDate,
					endDate,
					status: 'new',
				});
				return res.status(201).json(newReviewDuration);
			} catch (error) {
				console.error(
					'❌ Error while defining review statement duration: ',
					error,
				);
				return res.status(500).json(`${error.message}`);
			}
		}
	} catch (error) {
		console.error(
			'❌ Error while checking if review statement duration already defined: ',
			error,
		);
		return res.status(500).json(`${error.message}`);
	}
});

// View Review Statement duration window
module.exports.viewReviewStatement = asyncHandler(async (req, res) => {
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

// Update Review Statement duration window
module.exports.updateReviewStatement = asyncHandler(async (req, res) => {
	const { startDate, endDate } = req.body;
	if (!startDate || !endDate) {
		return res
			.status(400)
			.json('Please provide the required starting and ending dates!');
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
					{ new: true },
				);
				return res.status(200).json(updatedSemester);
			} catch (error) {
				console.error('❌ Error while updating current semester: ', error);
				return res.status(500).json(`${error.message}`);
			}
		}
	} catch (error) {
		console.error(
			'❌ Error while finding review statement duration window: ',
			error,
		);
		return res.status(500).json(`${error.message}`);
	}
});

// Define Review Start date
module.exports.defineReviewStart = asyncHandler(async (req, res) => {
	const { init } = req.body;
	if (!init) {
		return res.status(400).json('Please provide the required initial time!');
	}
	try {
		const reviewStart = await ReviewStart.findOne({ init: init });
		if (reviewStart) {
			return res
				.status(400)
				.json('Seems like review initial time is already defined!');
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
		console.error(
			'❌ Error while checking if review initial time already defined: ',
			error,
		);
		return res.status(500).json(`${error.message}`);
	}
});

// Define Grading duration window
module.exports.defineGradingDuration = asyncHandler(async (req, res) => {
	const { duration } = req.body;
	if (!duration) {
		return res
			.status(400)
			.json('Please provide the required grading duration period!');
	}
	try {
		const gradingDuration = await GradingDuration.findOne({
			duration: duration,
		});
		if (gradingDuration) {
			return res
				.status(400)
				.json('Seems like grading duration period is already defined!');
		} else {
			try {
				const newGradingDuration = await GradingDuration.create({
					duration,
					status: 'new',
				});
				return res.status(201).json(newGradingDuration);
			} catch (error) {
				console.error(
					'❌ Error while defining grading duration period: ',
					error,
				);
				return res.status(500).json(`${error.message}`);
			}
		}
	} catch (error) {
		console.error(
			'❌ Error while checking if grading duration period already defined: ',
			error,
		);
		return res.status(500).json(`${error.message}`);
	}
});

//TODO Define Cycles
module.exports.defineCycles = asyncHandler(async (req, res) => {
	// const { number, cycle } = req.body;
	// if (!number || !cycle) {
	//      return res.status(400).json('Please provide the required fields to define cycles!');
	//  }
	const { cycle } = req.body;
	if (!cycle) {
		return res
			.status(400)
			.json('Please provide the required fields to define cycles!');
	}
	try {
		const cycles = await Cycles.findOne({ cycle: cycle });
		if (cycles) {
			return res.status(400).json('Seems like cycles are already defined!');
		} else {
			try {
				const newCycles = await Cycles.create({
					cycle,
					status: 'new',
				});
				return res.status(201).json(newCycles);
			} catch (error) {
				console.error('❌ Error while defining cycles: ', error);
				return res.status(500).json(`${error.message}`);
			}
		}
	} catch (error) {
		console.error('❌ Error while checking if cycles already defined: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

// Define Degree Rules
module.exports.defineDegreeRules = asyncHandler(async (req, res) => {
	const { cycles, cycleCourses, courses, practice } = req.body;
	if (!cycles || !cycleCourses || !courses || !practice) {
		return res.status(400).json('Please provide all the required fields!');
	}
	try {
		const degreeRules = await DegreeRules.find({});
		if (degreeRules) {
			return res
				.status(400)
				.json('Seems like degree rules are already defined!');
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
		console.error(
			'❌ Error while checking if degree rules already defined: ',
			error,
		);
		return res.status(500).json(`${error.message}`);
	}
});
