const asyncHandler = require('express-async-handler');
const Semester = require('../../models/admin/semester');

module.exports.defineSemester = asyncHandler(async (req, res) => {
	const { type, grading, startDate, endDate } = req.body;

	if (!type || !grading || !startDate || !endDate) {
		return res.status(400).json({ message: 'Please provide the required fields!' });
	}

	try {
		const semesterExists = await Semester.findOne({ type: type });
		if (semesterExists) {
			return res
				.status(409)
				.json({ message: `Seems like the ${type} semester is already defined!` });
		} else {
			try {
				const semester = await Semester.create({
					type,
					grading,
					startDate,
					endDate,
					status: 'new',
				});
				return res.status(201).json(semester);
			} catch (error) {
				console.error('❌ Error while defining semester: ', error);
				return res.status(500).json({
					message: 'Something went wrong, unfortunately the semester did not defined!',
				});
			}
		}
	} catch (error) {
		console.error('❌ Error while checking if semester already defined: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later!' });
	}
});

module.exports.getSemester = asyncHandler(async (_, res) => {
	try {
		const currentDate = new Date();
		const semester = await Semester.findOne({
			startDate: { $lte: currentDate },
			endDate: { $gte: currentDate },
		});
		if (!semester) {
			return res
				.status(404)
				.json({ message: 'Seems like there is no defined semester for this period!' });
		} else {
			return res.status(200).json(semester);
		}
	} catch (error) {
		console.error('❌ Error while finding current semester: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later!' });
	}
});

module.exports.getSemesters = asyncHandler(async (_, res) => {
	try {
		const semesters = await Semester.find({});
		if (semesters.length === 0) {
			return res.status(404).json({ message: 'Seems like there are no defined semesters!' });
		} else {
			return res.status(200).json(semesters);
		}
	} catch (error) {
		console.error('❌ Error while finding existing semesters: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later!' });
	}
});

module.exports.updateSemester = asyncHandler(async (req, res) => {
	const { grading, startDate, endDate } = req.body;

	if (!grading || !startDate || !endDate) {
		return res.status(400).json({ message: 'Please provide the required fields!' });
	}

	try {
		const { id } = req.params;
		const semester = await Semester.findById(id);
		if (!semester) {
			return res
				.status(404)
				.json({ message: 'Seems like there is no defined semester for this period!' });
		} else {
			try {
				const updatedSemester = await Semester.findByIdAndUpdate(
					id,
					{
						...req.body,
					},
					{ new: true }
				);
				return res.status(200).json(updatedSemester);
			} catch (error) {
				console.error('❌ Error while updating current semester: ', error);
				return res.status(500).json({
					message: 'Something went wrong, unfortunately the semester did not updated!',
				});
			}
		}
	} catch (error) {
		console.error('❌ Error while finding current semester: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later!' });
	}
});

module.exports.deleteSemester = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params;
		await Semester.findByIdAndDelete(id);
		return res.status(200).json({ message: 'Current semester deleted!' });
	} catch (error) {
		console.error('❌ Error while deleting current semester: ', error);
		return res.status(500).json({
			message: 'Something went wrong, unfortuantely the current semester did not deleted!',
		});
	}
});

module.exports.deleteSemesters = asyncHandler(async (_, res) => {
	try {
		await Semester.deleteMany({});
		return res.status(200).json({ message: 'Defined semesters deleted!' });
	} catch (error) {
		console.error('❌ Error while deleting defined semesters: ', error);
		return res.status(500).json({
			message: 'Something went wrong, unfortunately defined semesters did not deleted!',
		});
	}
});
