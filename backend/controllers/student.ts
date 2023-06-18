import { Request, Response } from 'express';
import { Course } from '../models/course/course';
import { CourseStatement } from '../models/course/courseStatement';
import { tryCatch } from '../utils/tryCatch';
import CustomError from '../utils/CustomError';

export const createCourseStatement = tryCatch(
	async (req: Request, res: Response): Promise<Response> => {
		// if (
		// ) {
		//  return res.status(400).json('Please fill in all the required fields!');
		// }

		const { userId } = req.params;
		const existingCourseStatement = await CourseStatement.findOne({ user: userId });

		if (existingCourseStatement)
			throw new CustomError(
				'Seems like a course statement for this user has been made.',
				400
			);

		const courseStatement = await CourseStatement.create({
			status: 'new',
		});

		return res.status(201).json(courseStatement);
	}
);
// View course statement

// Update course statement

// Finalize course statement

// Delete course Statement
