const asyncHandler = require('express-async-handler');
const Course = require('../models/course');
const CourseStatement = require('../models/courseStatement');

//? --------------------- * * STUDENT * * --------------------
// View course statement
// Make course statement
module.exports.createCourseStatement = asyncHandler(async (req, res) => {
	const {} = req.body;
	// if (
	// ) {
	//  return res.status(400).json('Please fill in all the required fields!');
	// }

	try {
		const courseStatement = await CourseStatement.findOne({ user: userId });
		if (courseStatement) {
			return res
				.status(400)
				.json('Seems like a course statement for this user has been made!');
		} else {
			const newCourseStatement = await CourseStatement.create({
				status: 'new',
			});
			return res.status(201).json(newCourseStatement);
		}
	} catch (error) {
		console.error('❌ Error while creating course statement: ', error);
		return res.status(500).json(`${error.message}`);
	}
});

// Update course statement

// Finalize course statement

// Delete course Statement
