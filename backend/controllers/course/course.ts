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
import { tryCatch } from '../../utils/tryCatch';
import CustomError from '../../utils/CustomError';

export const viewCourses = tryCatch(async (_: Request, res: Response) => {
	const courses = await getCourses();

	if (!courses)
		throw new CustomError('Seems like there are no courses registered in the system.', 404);

	return res.status(200).json(courses);
});

export const viewCourse = tryCatch(async (req: Request, res: Response) => {
	const { id } = req.params;
	const course = await getCourseById(id).populate({
		path: 'semester',
	});

	if (!course.isObligatory)
		await course.populate({
			path: 'cycle.names',
			select: 'cycle',
			match: { cycle: { $exists: true, $ne: null } },
		});

	if (course.hasPrerequisites)
		await course.populate({
			path: 'prerequisites.prerequisite',
			select: 'title',
			match: { prerequisites: { $exists: true } },
		});

	if (!course)
		throw new CustomError(
			'Seems like the course that you are trying to view does not exist.',
			404
		);

	return res.status(200).json(course);
});

export const newCourse = tryCatch(async (req: Request, res: Response) => {
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
		throw new CustomError('Please fill in all the required fields.', 400);

	const existingCourse = await getCourseByCourseId(courseId);
	if (existingCourse)
		throw new CustomError('Seems like a course with this ID already exists.', 409);

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
});

export const activateCourse = tryCatch(async (req: Request, res: Response) => {
	const { id } = req.params;
	const activatedCourse = await updateCourseById(id, { ...req.body });

	if (!activatedCourse)
		throw new CustomError(
			'Seems like the course that you are trying to activate does not exist.',
			404
		);

	const teaching = await createTeaching({
		course: activatedCourse,
		status: 'new',
	});

	return res.status(201).json(teaching);
});

export const updateCourse = tryCatch(async (req: Request, res: Response) => {
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
		throw new CustomError('Please fill in all the required fields.', 400);

	const { id } = req.params;
	const updatedCourse = await updateCourseById(id, { ...req.body });

	if (!updatedCourse)
		throw new CustomError(
			'Seems like the course that you are trying to update does not exist.',
			404
		);

	return res.status(200).json(updatedCourse);
});

export const deleteCourse = tryCatch(async (req: Request, res: Response) => {
	const { id } = req.params;
	const courseToDelete = await deleteCourseById(id);

	if (!courseToDelete)
		throw new CustomError(
			'Seems like the course that you are trying to delete does not exist.',
			404
		);

	return res.status(200).json({ message: 'Course deleted.' });
});

export const deleteAllCourses = tryCatch(async (_: Request, res: Response) => {
	await deleteCourses();

	return res.json({ message: 'Courses existing in the system deleted.' });
});
