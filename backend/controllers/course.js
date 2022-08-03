const asyncHandler = require('express-async-handler');
const Course = require('../models/course');

//? --------------------- * * COURSES CRUD * * --------------------
// @desc    Get Courses
// @route   GET /api/course
// @access  Private
module.exports.getCourses = asyncHandler(async (req, res) => {
	try {
		const courses = await Course.find({});
		if (courses.length === 0) {
			return res.status(404).json('Seems like there are no courses!');
		} else {
			return res.status(200).json(courses);
		}
	} catch (error) {
		console.error('❌ Error while finding courses: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

// @desc    Get Course
// @route   GET /api/course/:id
// @access  Private
module.exports.viewCourse = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params;
		const course = await Course.findById(id);
		if (!course) {
			return res
				.status(404)
				.json('Seems like there is no course with this ID!');
		} else {
			return res.status(200).json(course);
		}
	} catch (error) {
		console.error('❌ Error while finding course: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

// @desc    Create new Course
// @route   POST /api/course/new
// @access  Private
module.exports.createCourse = asyncHandler(async (req, res) => {
	const {
		cid,
		title,
		type,
		description,
		semester,
		year,
		cycle,
		ects,
		hasLab,
		isObligatory,
		isActive,
	} = req.body;

	if (
		cid === undefined ||
		title === undefined ||
		type === undefined ||
		description === undefined ||
		semester === undefined ||
		year === undefined ||
		cycle === undefined ||
		ects === undefined ||
		hasLab === undefined ||
		isObligatory === undefined
	) {
		return res.status(400).json('Please fill in all the required fields!');
	}

	try {
		const course = await Course.findOne({ cid: cid });
		if (course) {
			return res
				.status(400)
				.json('Seems like a course with this ID already exists!');
		} else {
			const newCourse = await Course.create({
				cid,
				title,
				type,
				description,
				semester,
				year,
				isActive,
				hasLab,
				isObligatory,
				cycle,
				ects,
				status: 'new',
			});
			return res.status(201).json(newCourse);
		}
	} catch (error) {
		console.error('❌ Error while creating course: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

// @desc    Update Course
// @route   PUT /api/course/:id/edit
// @access  Private
module.exports.updateCourse = asyncHandler(async (req, res) => {
	const {
		cid,
		title,
		type,
		description,
		semester,
		year,
		isActive,
		hasLab,
		isObligatory,
		cycle,
		ects,
	} = req.body;

	if (
		cid === undefined ||
		title === undefined ||
		type === undefined ||
		description === undefined ||
		semester === undefined ||
		year === undefined ||
		isActive === undefined ||
		hasLab === undefined ||
		isObligatory === undefined ||
		cycle === undefined ||
		ects === undefined
	) {
		return res.status(400).json('Please fill in all the required fields!');
	}

	try {
		const { id } = req.params;
		const course = await Course.findById(id);

		if (!course) {
			return res
				.status(404)
				.json('Seems like there is no course with this ID!');
		} else {
			const updatedCourse = await Course.findByIdAndUpdate(
				id,
				{ ...req.body.course },
				{ new: true },
			);
			return res.status(200).json(updatedCourse);
		}
	} catch (error) {
		console.error('❌ Error while finding course: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

// @desc    Delete Course
// @route   DELETE /api/course/:id
// @access  Private
module.exports.deleteCourse = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params;
		await Course.findByIdAndDelete(id);
		return res.status(200).json('Course deleted successfully!');
	} catch (error) {
		console.error('❌ Error while deleting course: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

// @desc    Delete All Courses
// @route   DELETE /api/course
// @access  Private
module.exports.deleteCourses = asyncHandler(async (req, res) => {
	try {
		await Course.deleteMany({});
		return res.status(200).json('All courses deleted!');
	} catch (error) {
		console.error('❌ Error while deleting all courses: ', error);
		return res.status(500).json(`${error.message}`);
	}
});
