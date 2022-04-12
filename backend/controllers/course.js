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
		console.error('❌ Error while finding courses', error);
		return res
			.status(500)
			.json('Something wrong happened while finding courses!');
	}
});

// View Course
module.exports.viewCourse = asyncHandler(async (req, res) => {
	try {
		const course = await Course.findById(req.params.id);
		if (!course) {
			return res
				.status(404)
				.json('Seems like there is no course with this ID!');
		} else {
			return res.status(200).json(course);
		}
	} catch (error) {
		console.error('❌ Error while finding course', error);
		return res
			.status(500)
			.json('Something wrong happened while finding this course!');
	}
});

// Create Course
module.exports.createCourse = asyncHandler(async (req, res) => {
	try {
		const course = new Course(req.body);
		const newCourse = await course.save();
		return res.status(201).json(newCourse);
	} catch (error) {
		console.error('❌ Error while creating course', error);
		return res
			.status(500)
			.json('Something wrong happened while creating this course!');
	}
});

// Update Course
// router.get(
// 	'/:id/edit',
// 	isLoggedIn,
// 	catchAsync(async (req, res) => {
// 		const course = await Course.findById(req.params.id);
// 		if (!course) {
// 			req.flash('error', 'Course not found!');
// 			return res.redirect('/courses/all');
// 		}
// 		res.render('courses/edit', { course });
// 	}),
// );
// router.post(
// 	'/:id',
// 	isLoggedIn,
// 	validateCourse,
// 	catchAsync(async (req, res) => {
// 		const { id } = req.params;
// 		const course = await Course.findByIdAndUpdate(id, { ...req.body.course });
// 		req.flash('success', 'Course updated successfully!');
// 		res.redirect(`/courses/${course._id}`);
// 	}),
// );

// // Delete Course
// router.delete(
// 	'/:id',
// 	isLoggedIn,
// 	catchAsync(async (req, res) => {
// 		const { id } = req.params;
// 		await Course.findByIdAndDelete(id);
// 		req.flash('success', 'Course deleted successfully!');
// 		res.redirect('/courses');
// 	}),
// );
