import { Request, Response } from 'express';
import {
	getSemesterByType,
	getCurrentSemester,
	getSemesters,
	createSemester,
	updateSemesterById,
	deleteSemesterById,
	deleteSemesters,
	SemesterType,
} from '../../models/admin/semester';
import { tryCatch } from '../../utils/tryCatch';
import CustomError from '../../utils/CustomError';

export const defineSemester = tryCatch(async (req: Request, res: Response): Promise<Response> => {
	const { type, grading, startDate, endDate } = req.body;

	if (!type) throw new CustomError('Please provide a semester type.', 400);

	if (type !== SemesterType.Any && (!startDate || !endDate || !grading))
		throw new CustomError('Please fill in all the required fields.', 400);

	const existingSemester = await getSemesterByType(type);
	if (existingSemester)
		throw new CustomError(`Seems like the ${type} semester is already defined.`, 409);

	const semester = await createSemester({
		type,
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
	const { grading, startDate, endDate } = req.body;

	if (!grading || !startDate || !endDate)
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
	const semesterToDelete = await deleteSemesterById(id);
	if (!semesterToDelete)
		throw new CustomError(
			'Seems like the semester that you are trying to delete does not exist.',
			404
		);

	return res
		.status(200)
		.json({ message: 'Defined semester deleted.', semester: semesterToDelete._id });
});

export const deleteAllSemesters = tryCatch(async (_: Request, res: Response): Promise<Response> => {
	await deleteSemesters();
	return res.status(200).json({ message: 'Defined semesters deleted.' });
});
