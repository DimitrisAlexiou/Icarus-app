import { Request, Response } from 'express';
import {
	getCurrentSemester,
	getSemesters,
	createSemester,
	updateSemesterById,
	deleteSemesterById,
	deleteSemesters,
	SemesterType,
	getSemesterByTypeAndAcademicYear,
	getSemesterById,
} from '../../models/admin/semester';
import { getActiveTeachingsBySemesterId } from '../../models/course/teaching';
import { tryCatch } from '../../utils/tryCatch';
import CustomError from '../../utils/CustomError';

export const defineSemester = tryCatch(async (req: Request, res: Response): Promise<Response> => {
	const { type, academicYear, grading } = req.body;

	if (!type || !academicYear)
		throw new CustomError('Please provide a semester type and the academic year.', 400);

	if (type !== SemesterType.Any && !grading)
		throw new CustomError('Please provide the grading period.', 400);

	const existingSemester = await getSemesterByTypeAndAcademicYear(type, academicYear);

	if (existingSemester)
		throw new CustomError(
			`A ${type} semester for the academic year ${academicYear} is already defined.`,
			400
		);

	let startDate: Date | null = null;
	let endDate: Date | null = null;

	if (type === SemesterType.Winter) {
		const [startYear, endYear] = academicYear.split('-');
		startDate = new Date(`${startYear}-10-01`);
		endDate = new Date(`${endYear}-01-31`);
	} else if (type === SemesterType.Spring) {
		const [, endYear] = academicYear.split('-');
		startDate = new Date(`${endYear}-02-01`);
		endDate = new Date(`${endYear}-05-31`);
	}

	const semester = await createSemester({
		type,
		academicYear,
		grading: type === SemesterType.Any ? null : grading,
		startDate: type === SemesterType.Any ? null : startDate,
		endDate: type === SemesterType.Any ? null : endDate,
		status: 'new',
	});

	return res.status(201).json({ message: 'Semester defined!', semester });
});

export const viewSemester = tryCatch(async (_: Request, res: Response): Promise<Response> => {
	const semester = await getCurrentSemester(new Date());
	if (!semester)
		throw new CustomError('Seems like there is no defined semester for this period.', 404);

	return res.status(200).json(semester);
});

export const viewSemesters = tryCatch(async (_: Request, res: Response): Promise<Response> => {
	const semesters = await getSemesters();
	if (!semesters) throw new CustomError('Seems like there are no defined semesters.', 404);

	return res.status(200).json(semesters);
});

export const updateSemester = tryCatch(async (req: Request, res: Response): Promise<Response> => {
	const { grading, academicYear } = req.body;

	if (!grading || !academicYear)
		throw new CustomError('Please provide all the required fields.', 400);

	const { id } = req.params;
	const updatedSemester = await updateSemesterById(id, {
		...req.body,
	});
	if (!updatedSemester)
		throw new CustomError(
			'Seems like the semester that you are trying to update does not exist.',
			404
		);

	return res.status(200).json({ message: 'Semester configuration updated!', updatedSemester });
});

export const deleteSemester = tryCatch(async (req: Request, res: Response): Promise<Response> => {
	const { id } = req.params;

	const semester = await getSemesterById(id);
	if (!semester)
		throw new CustomError(
			'Seems like the semester that you are trying to delete does not exist.',
			404
		);

	const activeTeachings = await getActiveTeachingsBySemesterId(id);

	if (activeTeachings.length)
		throw new CustomError(
			'Seems like the semester has active teachings and can not be deleted.',
			400
		);

	const semesterToDelete = await deleteSemesterById(id);
	if (!semesterToDelete)
		throw new CustomError(
			'Seems like something went wrong and the semester did not deleted.',
			404
		);

	return res
		.status(200)
		.json({ message: 'Defined semester deleted.', semester: semesterToDelete._id });
});

export const deleteSystemSemesters = tryCatch(
	async (_: Request, res: Response): Promise<Response> => {
		await deleteSemesters();
		return res.status(200).json({ message: 'Defined semesters deleted.' });
	}
);
