import { Request, Response } from 'express';
import { Course } from '../models/course/course';
import { CourseStatement } from '../models/course/courseStatement';

export const createCourseStatement = async (req: Request, res: Response) => {
	const { userId } = req.params;
	// if (
	// ) {
	//  return res.status(400).json('Please fill in all the required fields!');
	// }

	try {
		const courseStatement = await CourseStatement.findOne({ user: userId });
		if (courseStatement) {
			return res
				.status(400)
				.json('Seems like a course statement for this user has been made.');
		} else {
			const newCourseStatement = await CourseStatement.create({
				status: 'new',
			});
			return res.status(201).json(newCourseStatement);
		}
	} catch (error) {
		console.error('❌ Error while creating course statement: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later.' });
	}
};
// View course statement

// Update course statement

// Finalize course statement

// Delete course Statement
