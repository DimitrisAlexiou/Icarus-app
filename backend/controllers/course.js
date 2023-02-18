const asyncHandler = require('express-async-handler');
const Cycles = require('../models/admin/cycles');
const Course = require('../models/course/course');
const Prerequisites = require('../models/course/prerequisites');
const Teaching = require('../models/course/teaching');
const User = require('../models/users/user');

module.exports.getCourses = asyncHandler(async (_, res) => {
	try {
		const courses = await Course.find({})
			.populate({ path: 'semester' })
			.populate({ path: 'cycle' });
		if (courses.length === 0) {
			return res.status(404).json({ message: 'Seems like there are no courses!' });
		} else {
			return res.status(200).json(courses);
		}
	} catch (error) {
		console.error('❌ Error while finding courses: ', error);
		return res.status(500).json({ message: `${error.message}` });
	}
});

module.exports.getPrerequisites = asyncHandler(async (_, res) => {
	try {
		const prerequisites = await Prerequisites.find({}).populate({
			path: 'course',
		});
		if (prerequisites.length === 0) {
			return res.status(404).json({ message: 'Seems like there are no prerequisites!' });
		} else {
			return res.status(200).json(prerequisites);
		}
	} catch (error) {
		console.error('❌ Error while finding prerequisites: ', error);
		return res.status(500).json({ message: `${error.message}` });
	}
});

module.exports.viewCourse = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params;
		const course = await Course.findById(id)
			.populate({
				path: 'semester',
			})
			.populate({
				path: 'cycle',
			})
			.populate({
				path: 'prerequisites',
				populate: {
					path: 'course',
				},
			});
		if (!course) {
			return res.status(404).json({ message: 'Seems like there is no course with this ID!' });
		} else {
			return res.status(200).json(course);
		}
	} catch (error) {
		console.error('❌ Error while finding course: ', error);
		return res.status(500).json({ message: `${error.message}` });
	}
});

module.exports.createCourse = asyncHandler(async (req, res) => {
	const {
		courseId,
		title,
		type,
		isObligatory,
		hasPrerequisites,
		hasLab,
		description,
		semester,
		ects,
		year,
		cycle,
		prerequisites,
		isActive,
	} = req.body;

	if (!courseId || !title || !type || !semester || !ects || !year) {
		return res.status(400).json({ message: 'Please fill in all the required fields!' });
	}

	try {
		const course = await Course.findOne({ courseId: courseId });
		if (course) {
			return res
				.status(409)
				.json({ message: 'Seems like a course with this ID already exists!' });
		} else {
			const newCourse = await Course.create({
				courseId,
				title,
				type,
				isObligatory,
				hasPrerequisites,
				hasLab,
				description,
				semester,
				ects,
				year,
				cycle,
				prerequisites,
				isActive,
				status: 'new',
			});

			return res.status(201).json(newCourse);
		}
	} catch (error) {
		console.error('❌ Error while finding course: ', error);
		return res.status(500).json({ message: `${error.message}` });
	}
});

module.exports.defineCoursePrerequisites = asyncHandler(async (req, res) => {
	const { prerequisiteType, prerequisite } = req.body;

	if (!prerequisiteType || !prerequisite) {
		return res.status(400).json({ message: 'Please fill in all the required fields!' });
	}

	try {
		const { id } = req.params;
		const course = await Course.findById(id);
		if (!course) {
			return res.status(404).json({ message: 'Seems like there is no course with this ID!' });
		} else {
			try {
				const coursePrerequisite = await Prerequisites.create({
					prerequisiteType,
					prerequisite,
					course: course,
					status: 'new',
				});
				// await course.prerequisites.push(coursePrerequisite);
				// await course.save();
				return res.status(200).json(coursePrerequisite);
			} catch (error) {
				console.error('❌ Error while defining course prerequisites: ', error);
				return res.status(500).json({ message: `${error.message}` });
			}
		}
	} catch (error) {
		console.error('❌ Error while finding course: ', error);
		return res.status(500).json({ message: `${error.message}` });
	}
});

// Activate Course and create Course Teaching
module.exports.activateCourse = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params;
		const course = await Course.findById(id);

		if (!course) {
			return res.status(404).json({ message: 'Seems like there is no course with this ID!' });
		} else {
			try {
				await Course.findByIdAndUpdate(id, { ...req.body.course }, { new: true });
				try {
					const teaching = await Teaching.create({
						course: course,
						status: 'new',
					});
					return res.status(201).json(teaching);
				} catch (error) {
					console.error('❌ Error while creating course teaching: ', error);
					return res.status(500).json({ message: `${error.message}` });
				}
			} catch (error) {
				console.error('❌ Error while activating course: ', error);
				return res.status(500).json({ message: `${error.message}` });
			}
		}
	} catch (error) {
		console.error('❌ Error while finding course: ', error);
		return res.status(500).json({ message: `${error.message}` });
	}
});

module.exports.updateCourse = asyncHandler(async (req, res) => {
	const {
		courseId,
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
		!courseId ||
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
		return res.status(400).json({ message: 'Please fill in all the required fields!' });
	}

	try {
		const { id } = req.params;
		const course = await Course.findById(id);

		if (!course) {
			return res.status(404).json({ message: 'Seems like there is no course with this ID!' });
		} else {
			const updatedCourse = await Course.findByIdAndUpdate(
				id,
				{ ...req.body.course },
				{ new: true }
			);
			return res.status(200).json(updatedCourse);
		}
	} catch (error) {
		console.error('❌ Error while finding course: ', error);
		return res.status(500).json({ message: `${error.message}` });
	}
});

module.exports.deleteCourse = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params;
		await Course.findByIdAndDelete(id);
		return res.status(200).json({ message: 'Course deleted successfully!' });
	} catch (error) {
		console.error('❌ Error while deleting course: ', error);
		return res.status(500).json({ message: `${error.message}` });
	}
});

module.exports.deleteCourses = asyncHandler(async (_, res) => {
	try {
		await Course.deleteMany({});
		return res.status(200).json({ message: 'All courses deleted!' });
	} catch (error) {
		console.error('❌ Error while deleting all courses: ', error);
		return res.status(500).json({ message: `${error.message}` });
	}
});

module.exports.deleteCoursePrerequisites = asyncHandler(async (_, res) => {
	try {
		await Prerequisites.deleteMany({});
		return res.status(200).json({ message: 'All course prerequisites deleted!' });
	} catch (error) {
		console.error('❌ Error while deleting all course prerequisites: ', error);
		return res.status(500).json({ message: `${error.message}` });
	}
});
