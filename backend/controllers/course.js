const asyncHandler = require('express-async-handler');
const Course = require('../models/course');
const Teaching = require('../models/course/teaching');

//? --------------------- * * COURSES CRUD * * --------------------
// View all Courses
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

// View Course by ID
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

// Create new Course
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
		!cid ||
		!title ||
		!type ||
		!description ||
		!semester ||
		!year ||
		!cycle ||
		!ects ||
		!hasLab ||
		!isObligatory
	) {
		return res.status(400).json('Please fill in all the required fields!');
	}

	try {
		const course = await Course.findOne({ cid: cid });
		if (course) {
			return res
				.status(409)
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

// Activate Course and create Course Teaching
module.exports.activateCourse = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params;
		const course = await Course.findById(id);

		if (!course) {
			return res
				.status(404)
				.json('Seems like there is no course with this ID!');
		} else {
			try {
				await Course.findByIdAndUpdate(
					id,
					{ ...req.body.course },
					{ new: true },
				);
				try {
					await Teaching.create({
						course: course,
						status: 'new',
					});
					return res.status(201).json(course);
				} catch (error) {
					console.error('❌ Error while creating course teaching: ', error);
					return res.status(500).json(`${error.message}`);
				}
			} catch (error) {
				console.error('❌ Error while activating course: ', error);
				return res.status(500).json(`${error.message}`);
			}
		}
	} catch (error) {
		console.error('❌ Error while finding course: ', error);
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
		!cid ||
		!title ||
		!type ||
		!description ||
		!semester ||
		!year ||
		!isActive ||
		!hasLab ||
		!isObligatory ||
		!cycle ||
		!ects
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

// Delete all Courses
module.exports.deleteCourses = asyncHandler(async (req, res) => {
	try {
		await Course.deleteMany({});
		return res.status(200).json('All courses deleted!');
	} catch (error) {
		console.error('❌ Error while deleting all courses: ', error);
		return res.status(500).json(`${error.message}`);
	}
});
