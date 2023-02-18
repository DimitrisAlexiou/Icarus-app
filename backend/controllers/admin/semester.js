const asyncHandler = require('express-async-handler');
const Semester = require('../../models/admin/semester');

module.exports.defineSemester = asyncHandler(async (req, res) => {
	const { type, startDate, endDate } = req.body.semester;

	if (!type || !startDate || !endDate) {
		return res.status(400).json('Please provide the required fields!');
	}

	try {
		const semesterExists = await Semester.findOne({ type: type });
		if (semesterExists) {
			return res.status(409).json(`Seems like the ${type} semester is already defined!`);
		} else {
			try {
				const semester = await Semester.create({
					type,
					startDate,
					endDate,
					status: 'new',
				});
				return res.status(201).json(semester);
			} catch (error) {
				console.error('❌ Error while defining semester: ', error);
				return res.status(500).json(`${error.message}`);
			}
		}
	} catch (error) {
		console.error('❌ Error while checking if semester already defined: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

module.exports.getSemester = asyncHandler(async (req, res) => {
	try {
		// const currentDate = new Date();
		// if (currentDate >= new Date(startDate) && currentDate <= new Date(endDate)) {
		// 	return res.status(200).json({ type: 'winter' });
		// } else if (
		// 	currentDate >= new Date(springStartDate) &&
		// 	currentDate <= new Date(springEndDate)
		// ) {
		// 	return res.status(200).json({ type: 'spring' });
		// } else {
		// 	return res.status(200).json({ type: 'any' });
		// }

		const semester = await Semester.findOne({ startDate: new Date() });
		if (!semester) {
			return res.status(404).json('Seems like there is no such defined semester!');
		} else {
			return res.status(200).json(semester);
		}
	} catch (error) {
		console.error('❌ Error while finding defined semester: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

module.exports.getSemesters = asyncHandler(async (_, res) => {
	try {
		const semesters = await Semester.find({});
		if (semesters.length === 0) {
			return res.status(404).json('Seems like there is no defined semester!');
		} else {
			return res.status(200).json(semesters);
		}
	} catch (error) {
		console.error('❌ Error while finding existing semesters: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

module.exports.updateCurrentSemester = asyncHandler(async (req, res) => {
	const { startDate, endDate } = req.body;
	if (!startDate || !endDate) {
		return res.status(400).json('Please provide the required starting and ending dates!');
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
					{ new: true }
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

module.exports.deleteSemester = asyncHandler(async (_, res) => {
	try {
		await Semester.deleteOne({});
		return res.status(200).json('Defined semester deleted!');
	} catch (error) {
		console.error('❌ Error while deleting defined semester: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

module.exports.deleteSemesters = asyncHandler(async (_, res) => {
	try {
		await Semester.deleteMany({});
		return res.status(200).json('Defined semesters deleted!');
	} catch (error) {
		console.error('❌ Error while deleting defined semesters: ', error);
		return res.status(500).json(`${error.message}`);
	}
});
