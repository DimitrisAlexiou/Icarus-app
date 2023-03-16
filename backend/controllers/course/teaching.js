const asyncHandler = require('express-async-handler');
const Course = require('../models/course');
const Teaching = require('../models/teaching');

module.exports.createTeaching = asyncHandler(async (req, res) => {
	try {
	} catch (error) {
		console.error('❌ Error while : ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later!' });
	}
});

module.exports.viewTeaching = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params;
		const teaching = await Teaching.findById(id);

		if (!teaching) {
			return res.status(404).json('Seems like there is no course teaching with this ID!');
		} else {
			return res.status(200).json(teaching);
		}
	} catch (error) {
		console.error('❌ Error while finding course teaching: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later!' });
	}
});

module.exports.updateTeaching = asyncHandler(async (req, res) => {
	const {
		labWeight,
		theoryWeight,
		theoryGrade,
		labGrade,
		theoryGradeThreshold,
		labGradeThreshold,
		books,
	} = req.body;

	if (
		labWeight === undefined ||
		theoryWeight === undefined ||
		theoryGrade === undefined ||
		labGrade === undefined ||
		theoryGradeThreshold === undefined ||
		labGradeThreshold === undefined ||
		books === undefined
	) {
		return res.status(400).json('Please fill in all the required fields!');
	}

	try {
		const { id } = req.params;
		const teaching = await Teaching.findById(id);

		if (!teaching) {
			return res.status(404).json('Seems like there is no course teaching with this ID!');
		} else {
			const updatedTeaching = await Teaching.findByIdAndUpdate(
				id,
				{ ...req.body.teaching },
				{ new: true }
			);
			return res.status(200).json(updatedTeaching);
		}
	} catch (error) {
		console.error('❌ Error while finding course teaching: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later!' });
	}
});

module.exports.deleteTeaching = asyncHandler(async (req, res) => {
	const { courseId, teachingId } = req.params;
	try {
		await Course.findByIdAndUpdate(courseId, {
			$unset: { teaching: teachingId },
		});
		await Teaching.findByIdAndDelete(teachingId);
		return res.status(200).json('Course teaching deleted successfully!');
	} catch (error) {
		console.error('❌ Error while deleting course teaching: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later!' });
	}
});

module.exports.getTeachings = asyncHandler(async (_, res) => {
	try {
		const teachings = await Teaching.find({}).populate('course');
		if (teachings.length === 0) {
			return res.status(404).json('Seems like there are no teachings!');
		} else {
			return res.status(200).json(teachings);
		}
	} catch (error) {
		console.error('❌ Error while finding teachings: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later!' });
	}
});

module.exports.deleteTeachings = asyncHandler(async (_, res) => {
	try {
		await Teaching.deleteMany({});
		return res.status(200).json('All course teachings deleted!');
	} catch (error) {
		console.error('❌ Error while deleting all course teachings: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later!' });
	}
});
