const asyncHandler = require('express-async-handler');
const Course = require('../models/course');

//? --------------------- * * COURSES CRUD * * --------------------
// View Courses
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

// View Course
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

// Create Course
module.exports.createCourse = asyncHandler(async (req, res) => {
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
		hasLab === undefined ||
		isObligatory === undefined ||
		cycle === undefined ||
		ects === undefined
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

// Update Course
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
		const course = await Course.findByIdAndUpdate(id, { ...req.body.course });
		if (!course) {
			return res
				.status(404)
				.json('Seems like there is no course with this ID!');
		} else {
			const updatedCourse = await course.save();
			return res.status(200).json(updatedCourse);
		}
	} catch (error) {
		console.error('❌ Error while finding course: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

// Delete Course by ID
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

// Delete All Courses
module.exports.deleteCourses = asyncHandler(async (req, res) => {
	try {
		await Course.deleteMany({});
		return res.status(200).json('All courses deleted!');
	} catch (error) {
		console.error('❌ Error while deleting all courses: ', error);
		return res.status(500).json(`${error.message}`);
	}
});
