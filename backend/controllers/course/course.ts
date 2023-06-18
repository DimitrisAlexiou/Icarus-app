import { Request, Response } from 'express';
import { startSession } from 'mongoose';
import {
	getCourses,
	getCourseById,
	getCourseByCourseId,
	createCourse,
	updateCourseById,
	deleteCourseById,
	deleteCourses,
} from '../../models/course/course';
import {
	createTeaching,
	deleteTeachingByCourseId,
	deleteTeachings,
} from '../../models/course/teaching';
import { tryCatch } from '../../utils/tryCatch';
import CustomError from '../../utils/CustomError';

export const viewCourses = tryCatch(async (_: Request, res: Response): Promise<Response> => {
	const courses = await getCourses();

	if (!courses)
		throw new CustomError('Seems like there are no courses registered in the system.', 404);

	return res.status(200).json(courses);
});

export const viewCourse = tryCatch(async (req: Request, res: Response): Promise<Response> => {
	const { id } = req.params;
	const course = await getCourseById(id);

	if (!course)
		throw new CustomError(
			'Seems like the course that you are trying to view does not exist.',
			404
		);

	if (!course.isObligatory)
		await course.populate({
			path: 'cycle.names',
			select: 'cycles.names.cycle',
			match: { cycle: { $exists: true, $ne: null } },
		});

	if (course.hasPrerequisites)
		await course.populate({
			path: 'prerequisites.prerequisite',
			select: 'title',
			match: { prerequisites: { $exists: true } },
		});

	return res.status(200).json(course);
});

export const newCourse = tryCatch(async (req: Request, res: Response): Promise<Response> => {
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

export const activateCourse = async (req: Request, res: Response): Promise<Response> => {
	const { id } = req.params;

	let activatedCourse;
	let teaching;

	const session = await startSession();

	try {
		session.startTransaction();

		activatedCourse = await updateCourseById(id, { isActive: true }, { session });

		if (!activatedCourse)
			throw new CustomError(
				'Seems like the course that you are trying to activate does not exist.',
				404
			);

		let labWeight, theoryWeight, theoryGrade, labGrade, theoryGradeThreshold, labGradeThreshold;

		if (activatedCourse.hasLab) {
			labWeight = 40;
			theoryWeight = 60;
			labGradeThreshold = 5;
		} else {
			labWeight = 0;
			theoryWeight = 100;
			labGradeThreshold = 0;
		}
		theoryGradeThreshold = 5;
		theoryGrade = 4;
		labGrade = 4;

		if (activatedCourse.isActive)
			teaching = await createTeaching(
				{
					labWeight,
					theoryWeight,
					theoryGrade,
					labGrade,
					theoryGradeThreshold,
					labGradeThreshold,
					course: activatedCourse._id,
					semester: activatedCourse.semester,
				},
				{ session }
			);

		await session.commitTransaction();
	} catch (error) {
		await session.abortTransaction();
		console.error('❌ ', error);
		throw new CustomError('Course did not activated.', 500);
	} finally {
		session.endSession();
	}

	return res.status(201).json({ message: 'Course activated!', activatedCourse, teaching });
};

export const deActivateCourse = async (req: Request, res: Response): Promise<Response> => {
	const { id } = req.params;

	let deActivatedCourse;

	const session = await startSession();

	try {
		session.startTransaction();

		deActivatedCourse = await updateCourseById(id, { isActive: false }, { session });

		if (!deActivatedCourse)
			throw new CustomError(
				'Seems like the course that you are trying to deactivate does not exist.',
				404
			);

		await deleteTeachingByCourseId(id, session);

		await session.commitTransaction();
	} catch (error) {
		await session.abortTransaction();
		console.error('❌ ', error);
		throw new CustomError('Course did not deactivated.', 500);
	} finally {
		session.endSession();
	}

	return res.status(200).json({ message: 'Course deactivated!' });
};

export const updateCourse = tryCatch(async (req: Request, res: Response): Promise<Response> => {
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

	if (
		!courseId ||
		!title ||
		!type ||
		!description ||
		!hasPrerequisites ||
		!prerequisites ||
		!semester ||
		!year ||
		!cycle ||
		!ects ||
		!hasLab ||
		!isObligatory ||
		!isActive
	)
		throw new CustomError('Please fill in all the required fields.', 400);
	console.log('Updating');
	const { id } = req.params;
	const updatedCourse = await updateCourseById(id, { ...req.body });

	if (!updatedCourse)
		throw new CustomError(
			'Seems like the course that you are trying to update does not exist.',
			404
		);

	return res.status(200).json(updatedCourse);
});

export const deleteCourse = async (req: Request, res: Response): Promise<Response> => {
	const { id } = req.params;
	const session = await startSession();

	try {
		session.startTransaction();

		const courseToDelete = await deleteCourseById(id, session);

		if (!courseToDelete)
			throw new CustomError(
				'Seems like the course that you are trying to delete does not exist.',
				404
			);

		await deleteTeachingByCourseId(id, session);

		await session.commitTransaction();
	} catch (error) {
		await session.abortTransaction();
		console.error('❌ ', error);
		throw new CustomError('Course did not deleted.', 500);
	} finally {
		session.endSession();
	}

	return res.status(200).json({ message: 'Course deleted.' });
};

export const deleteAllCourses = async (_: Request, res: Response): Promise<Response> => {
	const session = await startSession();

	try {
		session.startTransaction();

		await deleteCourses();
		await deleteTeachings();

		await session.commitTransaction();
	} catch (error) {
		await session.abortTransaction();
		console.error('❌ ', error);
		throw new CustomError('Courses did not deleted.', 500);
	} finally {
		session.endSession();
	}

	return res.status(200).json({ message: 'Courses existing in the system deleted.' });
};
