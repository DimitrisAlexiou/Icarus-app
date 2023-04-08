const asyncHandler = require('express-async-handler');
const Course = require('../../models/course/course');
const Teaching = require('../../models/course/teaching');
const Cycles = require('../../models/admin/cycles');
const User = require('../../models/users/user');

module.exports.getCourses = asyncHandler(async (_, res) => {
	try {
		const courses = await Course.find({});
		if (courses.length === 0) {
			return res.status(404).json({ message: 'Seems like there are no courses!' });
		} else {
			return res.status(200).json(courses);
		}
	} catch (error) {
		console.error('❌ Error while finding courses: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later!' });
	}
});

module.exports.viewCourse = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params;
		const course = await Course.findById(id).populate({
			path: 'semester',
		});
		if (!course.isObligatory) {
			await course.populate({
				path: 'cycle.names',
				select: 'cycle',
				match: { cycle: { $exists: true, $ne: null } },
			});
		}
		if (course.hasPrerequisites) {
			await course.populate({
				path: 'prerequisites.prerequisite',
				select: 'title',
				match: { prerequisites: { $exists: true } },
			});
		}
		if (!course) {
			return res.status(404).json({ message: 'Seems like there is no course with this ID!' });
		} else {
			return res.status(200).json(course);
		}
	} catch (error) {
		console.error('❌ Error while finding course: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later!' });
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
		const existingCourse = await Course.findOne({ courseId: courseId });
		if (existingCourse) {
			return res
				.status(409)
				.json({ message: 'Seems like a course with this ID already exists!' });
		} else {
			const course = await Course.create({
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

			return res.status(201).json(course);
		}
	} catch (error) {
		console.error('❌ Error while finding course: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later!' });
	}
});

module.exports.activateCourse = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params;
		const course = await Course.findById(id);

		if (!course) {
			return res.status(404).json({ message: 'Seems like there is no course with this ID!' });
		} else {
			try {
				await Course.findByIdAndUpdate(id, { ...req.body }, { new: true });
				try {
					const teaching = await Teaching.create({
						course: course,
						status: 'new',
					});
					return res.status(201).json(teaching);
				} catch (error) {
					console.error('❌ Error while creating course teaching: ', error);
					return res.status(500).json({
						message:
							'Something went wrong, unfortunately the course teaching did not created!',
					});
				}
			} catch (error) {
				console.error('❌ Error while activating course: ', error);
				return res.status(500).json({
					message: 'Something went wrong, unfortunately the course did not activated!',
				});
			}
		}
	} catch (error) {
		console.error('❌ Error while finding course: ', error);
		return res.status(500).json({
			message: 'Something went wrong, try again later!',
		});
	}
});

module.exports.updateCourse = asyncHandler(async (req, res) => {
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
	} = req.body;

	if (
		!courseId ||
		!title ||
		!type ||
		!isObligatory ||
		!hasPrerequisites ||
		!hasLab ||
		!description ||
		!semester ||
		!ects ||
		!year ||
		!cycle ||
		!prerequisites
	) {
		return res.status(400).json({ message: 'Please fill in all the required fields!' });
	}

	try {
		const { id } = req.params;
		const existingCourse = await Course.findById(id);

		if (!existingCourse) {
			return res.status(404).json({ message: 'Seems like there is no course with this ID!' });
		} else {
			try {
				const updatedCourse = await Course.findByIdAndUpdate(
					id,
					{ ...req.body },
					{ new: true }
				);
				return res.status(200).json(updatedCourse);
			} catch (error) {
				console.error('❌ Error while updating course: ', error);
				return res.status(500).json({
					message: 'Something went wrong, unfortunately the course did not updated!',
				});
			}
		}
	} catch (error) {
		console.error('❌ Error while finding course: ', error);
		return res.status(500).json({
			message: 'Something went wrong, try again later!',
		});
	}
});

module.exports.deleteCourse = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params;
		await Course.findByIdAndDelete(id);
		return res.status(200).json({ message: 'Course deleted!' });
	} catch (error) {
		console.error('❌ Error while deleting course: ', error);
		return res.status(500).json({
			message: 'Something went wrong, unfortunately the course did not deleted!',
		});
	}
});

module.exports.deleteCourses = asyncHandler(async (_, res) => {
	try {
		await Course.deleteMany({});
		return res.status(200).json({ message: 'All courses deleted!' });
	} catch (error) {
		console.error('❌ Error while deleting all courses: ', error);
		return res.status(500).json({
			message: 'Something went wrong, unfortunately the courses did not deleted!',
		});
	}
});
