import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../../interfaces/AuthRequest';
import mongoose, { startSession } from 'mongoose';
import {
	getCourses,
	getCourseById,
	getCourseByCourseId,
	createCourse,
	updateCourseById,
	deleteCourseById,
	deleteCourses,
	getTotalCourses,
	CourseType,
	getSystemCourses,
	Course,
} from '../../models/course/course';
import {
	createTeaching,
	deleteTeachingByCourseId,
	deleteTeachings,
	getTeachingByCourseId,
	getTeachingById,
	updateTeachingById,
} from '../../models/course/teaching';
import { getStudentByUserId } from '../../models/users/student';
import {
	getCurrentSemester,
	getSemesterByTypeAndAcademicYear,
} from '../../models/admin/semester';
import { tryCatch } from '../../utils/tryCatch';
import { getCurrentAcademicYear } from '../../utils/academicYears';
import CustomError from '../../utils/CustomError';

export const viewCourses = tryCatch(
	async (req: Request, res: Response): Promise<Response> => {
		const { page, isObligatory, search, masterId } = req.query;

		const coursesPerPage = 10;
		let courseType = CourseType.Undergraduate;
		if (masterId) courseType = CourseType.Master;

		const courses = await getCourses(
			Number(page),
			coursesPerPage,
			courseType,
			String(isObligatory),
			String(search),
			String(masterId)
		);

		if (!courses.length)
			throw new CustomError(
				'Seems like there are no courses registered in the system.',
				404
			);

		const totalCourses = await getTotalCourses(
			courseType,
			courseType === CourseType.Master ? 'true' : String(isObligatory)
		);

		const numOfPages = Math.ceil(totalCourses / coursesPerPage);

		return res.status(200).json({ courses, totalCourses, numOfPages });
	}
);

export const viewSystemCourses = tryCatch(
	async (req: Request, res: Response): Promise<Response> => {
		const { coursesPerPage } = req.query;

		const courses = await getSystemCourses(Number(coursesPerPage));

		if (!courses.length)
			throw new CustomError(
				'Seems like there are no courses registered in the system.',
				404
			);

		const totalCourses = await getTotalCourses();

		return res.status(200).json({ courses, totalCourses });
	}
);

export const viewCourse = tryCatch(
	async (req: Request, res: Response): Promise<Response> => {
		const { id } = req.params;
		const course = await getCourseById(id);

		if (!course)
			throw new CustomError(
				'Seems like the course that you are trying to view does not exist.',
				404
			);

		return res.status(200).json(course);
	}
);

export const newCourse = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
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
			master,
			prerequisites,
			isActive,
		} = req.body;

		if (!courseId || !title || !type || !semester || !ects || !year)
			throw new CustomError('Please fill in all the required fields.', 400);

		const existingCourse = await getCourseByCourseId(courseId);
		if (existingCourse)
			throw new CustomError(
				'Seems like a course with this ID already exists.',
				409
			);

		const createdCourse = await createCourse({
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
			master,
			prerequisites,
			isActive,
		});

		const course = await Course.populate(createdCourse, [
			{
				path: 'prerequisites.prerequisite',
				select: 'title',
			},
			{ path: 'cycle' },
			{ path: 'master' },
		]);

		return res.status(201).json({ message: 'Course created!', course });
	}
);

export const enrollCourse = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { id } = req.params;
		const userId = req.user.id;

		const student = await getStudentByUserId(userId);
		if (!student) throw new CustomError('Student not found.', 404);

		const teaching = await getTeachingById(id);
		if (!teaching)
			throw new CustomError(
				'Seems like the course that you are trying to enroll is not active.',
				404
			);

		const currentSemester = await getCurrentSemester(new Date());
		if (teaching.semester._id.toString() !== currentSemester._id.toString())
			throw new CustomError(
				'Course semester does not match the current semester.',
				400
			);

		if (
			student.enrolledCourses.includes(
				new mongoose.Types.ObjectId(teaching._id)
			)
		)
			throw new CustomError('Student is already enrolled in this course.', 400);

		student.enrolledCourses.push(new mongoose.Types.ObjectId(teaching._id));

		(await student.save()).populate({
			path: 'enrolledCourses',
			model: 'Teaching',
			populate: {
				path: 'course',
				model: 'Course',
			},
		});

		return res.status(201).json({ message: 'Enrolled to Course!', student });
	}
);

export const disenrollCourse = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { id } = req.params;
		const userId = req.user.id;

		const student = await getStudentByUserId(userId).populate(
			'enrolledCourses'
		);
		if (!student) throw new CustomError('Student not found.', 404);

		const isEnrolled = student.enrolledCourses.some((teaching) =>
			teaching._id.equals(id)
		);
		if (!isEnrolled)
			throw new CustomError('Student is not enrolled in this course.', 400);

		student.enrolledCourses = student.enrolledCourses.filter(
			(teaching) => !teaching._id.equals(id)
		);

		(await student.save()).populate({
			path: 'enrolledCourses',
			model: 'Teaching',
			populate: {
				path: 'course',
				model: 'Course',
			},
		});

		return res
			.status(200)
			.json({ message: 'Disenrolled from course.', student });
	}
);

export const viewEnrolledCourses = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const userId = req.user.id;

		const student = await getStudentByUserId(userId).populate({
			path: 'enrolledCourses',
			model: 'Teaching',
			populate: {
				path: 'course',
				model: 'Course',
			},
		});

		if (!student) throw new CustomError('Student not found.', 404);

		return res.status(200).json(student.enrolledCourses);
	}
);

export const activateCourse = async (
	req: AuthenticatedRequest,
	res: Response
): Promise<Response> => {
	const { id } = req.params;

	let activatedCourse;
	let teaching;

	const session = await startSession();

	try {
		session.startTransaction();

		activatedCourse = await updateCourseById(
			id,
			{ isActive: true },
			{ session }
		);

		if (!activatedCourse)
			throw new CustomError(
				'Seems like the course that you are trying to activate does not exist.',
				404
			);

		let labWeight,
			theoryWeight,
			theoryGradeRetentionYears,
			labGradeRetentionYears,
			theoryGradeThreshold,
			labGradeThreshold;

		if (activatedCourse.hasLab) {
			labWeight = 40;
			theoryWeight = 60;
			labGradeThreshold = 5;
			labGradeRetentionYears = 4;
		}

		const academicYear = getCurrentAcademicYear(new Date());
		const currentSemester = await getSemesterByTypeAndAcademicYear(
			activatedCourse.semester,
			academicYear
		);

		teaching = await getTeachingByCourseId(id);

		if (teaching && !teaching.isDeleted) {
			const teachingSemester = teaching.semester._id.toString();

			if (teachingSemester === currentSemester._id.toString())
				teaching = await updateTeachingById(teaching._id.toString(), {
					...teaching.toObject(),
					isDeleted: false,
				});
		} else {
			teaching = await createTeaching(
				{
					labWeight,
					theoryWeight,
					theoryGradeRetentionYears,
					labGradeRetentionYears,
					theoryGradeThreshold,
					labGradeThreshold,
					course: new mongoose.Types.ObjectId(activatedCourse._id),
					semester: new mongoose.Types.ObjectId(currentSemester._id),
					directories: [],
					isDeleted: false,
				},
				{ session }
			);
		}

		await session.commitTransaction();
	} catch (error) {
		await session.abortTransaction();
		console.error('❌ ', error);
		throw new CustomError('Course did not activated.', 500);
	} finally {
		session.endSession();
	}

	return res
		.status(201)
		.json({ message: 'Course activated!', activatedCourse, teaching });
};

export const deActivateCourse = async (
	req: AuthenticatedRequest,
	res: Response
): Promise<Response> => {
	const { id } = req.params;

	let deactivatedCourse;

	const session = await startSession();

	try {
		session.startTransaction();

		deactivatedCourse = await updateCourseById(
			id,
			{ isActive: false },
			{ session }
		);

		if (!deactivatedCourse)
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

	return res
		.status(200)
		.json({ message: 'Course deactivated.', deactivatedCourse });
};

export const updateCourse = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		// const {
		// 	courseId,
		// 	title,
		// 	type,
		// 	isObligatory,
		// 	hasPrerequisites,
		// 	hasLab,
		// 	semester,
		// 	ects,
		// 	year,
		// 	cycle,
		// 	prerequisites,
		// 	isActive,
		// } = req.body;

		// if (
		// 	!courseId ||
		// 	!title ||
		// 	!type ||
		// 	!hasPrerequisites ||
		// 	!prerequisites ||
		// 	!semester ||
		// 	!year ||
		// 	!cycle ||
		// 	!ects ||
		// 	!hasLab ||
		// 	!isObligatory ||
		// 	!isActive
		// )
		// 	throw new CustomError('Please fill in all the required fields.', 400);

		const { id } = req.params;
		const updatedCourse = await updateCourseById(id, { ...req.body });

		if (!updatedCourse)
			throw new CustomError(
				'Seems like the course that you are trying to update does not exist.',
				404
			);

		return res.status(200).json({ message: 'Course updated!', updatedCourse });
	}
);

export const deleteCourse = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { id } = req.params;

		const teaching = await getTeachingByCourseId(id);

		if (teaching)
			throw new CustomError(
				'This course can not be deleted because it has an active teaching.',
				400
			);

		//TODO check if the course to be deleted is a prerequisite for another course
		// const courses = await getCourses();
		// const course = courses.find((c) => c._id.toString() === id);

		// if (!course)
		// 	throw new CustomError(
		// 		'Seems like the course that you are trying to delete does not exist.',
		// 		404
		// 	);

		// const courseId = course._id.toString();

		// const coursesWithThisAsPrerequisite = courses.filter((c) => {
		// 	const prerequisites = c.prerequisites.map((p) =>
		// 		p.prerequisite.toString()
		// 	);
		// 	return prerequisites.includes(courseId) && c._id.toString() !== courseId;
		// });

		// if (coursesWithThisAsPrerequisite.length > 0) {
		// 	const coursesWithPrerequisitesTitles = coursesWithThisAsPrerequisite.map(
		// 		(c) => c.title
		// 	);

		// 	throw new CustomError(
		// 		`This course cannot be deleted because it is a prerequisite for the following courses: ${coursesWithPrerequisitesTitles}`,
		// 		400
		// 	);
		// }

		const courseToDelete = await deleteCourseById(id);

		if (!courseToDelete)
			throw new CustomError(
				'Seems like the course that you are trying to delete does not exist.',
				404
			);

		return res
			.status(200)
			.json({ message: 'Course deleted.', course: courseToDelete._id });
	}
);

export const deleteSystemCourses = async (
	_: AuthenticatedRequest,
	res: Response
): Promise<Response> => {
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

	return res
		.status(200)
		.json({ message: 'Courses existing in the system deleted.' });
};
