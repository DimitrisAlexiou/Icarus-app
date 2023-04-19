import { Request, Response } from 'express';
import {
	getCourses,
	getCourseById,
	getCourseByCourseId,
	createCourse,
	updateCourseById,
	deleteCourseById,
	deleteCourses,
} from '../../models/course/course';
import { createTeaching } from '../../models/course/teaching';
import { Cycles } from '../../models/admin/cycles';
import { User } from '../../models/users/user';

export const viewCourses = async (_: Request, res: Response) => {
	try {
		const courses = await getCourses();
		if (!courses) return res.status(404).json({ message: 'Seems like there are no courses.' });
		else return res.status(200).json(courses);
	} catch (error) {
		console.error('❌ Error while finding courses: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later.' });
	}
};

export const viewCourse = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const course = await getCourseById(id).populate({
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
		if (!course)
			return res.status(404).json({ message: 'Seems like there is no course with this ID.' });
		else return res.status(200).json(course);
	} catch (error) {
		console.error('❌ Error while finding course: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later.' });
	}
};

export const newCourse = async (req: Request, res: Response) => {
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

	if (!courseId || !title || !type || !semester || !ects || !year)
		return res.status(400).json({ message: 'Please fill in all the required fields.' });

	try {
		const existingCourse = await getCourseByCourseId(courseId);
		if (existingCourse) {
			return res
				.status(409)
				.json({ message: 'Seems like a course with this ID already exists.' });
		} else {
			const course = await createCourse({
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
		return res
			.status(500)
			.json({ message: 'Something went wrong, unfortunately the course did not created.' });
	}
};

export const activateCourse = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const activatedCourse = await updateCourseById(id, { ...req.body });
		if (!activatedCourse) {
			return res.status(404).json({ message: 'Seems like there is no course with this ID.' });
		} else {
			try {
				const teaching = await createTeaching({
					course: activatedCourse,
					status: 'new',
				});
				return res.status(201).json(teaching);
			} catch (error) {
				console.error('❌ Error while creating course teaching: ', error);
				return res.status(500).json({
					message:
						'Something went wrong, unfortunately the course teaching did not created.',
				});
			}
		}
	} catch (error) {
		console.error('❌ Error while activating course: ', error);
		return res.status(500).json({
			message: 'Something went wrong, unfortunately the course did not activated.',
		});
	}
};

export const updateCourse = async (req: Request, res: Response) => {
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
	)
		return res.status(400).json({ message: 'Please fill in all the required fields.' });

	try {
		const { id } = req.params;
		const updatedCourse = await updateCourseById(id, { ...req.body });
		if (!updatedCourse)
			return res.status(404).json({ message: 'Seems like there is no course with this ID.' });
		else return res.status(200).json(updatedCourse);
	} catch (error) {
		console.error('❌ Error while updating course: ', error);
		return res.status(500).json({
			message: 'Something went wrong, unfortunately the course did not updated.',
		});
	}
};

export const deleteCourse = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		await deleteCourseById(id);
		return res.status(200).json({ message: 'Course deleted.' });
	} catch (error) {
		console.error('❌ Error while deleting course: ', error);
		return res.status(500).json({
			message: 'Something went wrong, unfortunately the course did not deleted.',
		});
	}
};

export const deleteAllCourses = async (_: Request, res: Response) => {
	try {
		await deleteCourses();
		return res.json({ message: 'All courses deleted.' });
	} catch (error) {
		console.error('❌ Error while deleting all courses: ', error);
		return res.status(500).json({
			message: 'Something went wrong, unfortunately the courses did not deleted.',
		});
	}
};
