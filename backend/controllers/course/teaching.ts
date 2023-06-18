import { Request, Response } from 'express';
import {
	getTeachings,
	getTeachingById,
	updateTeachingById,
	deleteTeachingById,
	deleteTeachings,
} from '../../models/course/teaching';
import { tryCatch } from '../../utils/tryCatch';
import CustomError from '../../utils/CustomError';

export const viewTeaching = tryCatch(async (req: Request, res: Response): Promise<Response> => {
	const { id } = req.params;
	const teaching = await getTeachingById(id);

	if (!teaching)
		throw new CustomError(
			'Seems like the course teaching that you are trying to view does not exist.',
			404
		);

	return res.status(200).json(teaching);
});

export const updateTeaching = tryCatch(async (req: Request, res: Response): Promise<Response> => {
	const {
		labWeight,
		theoryWeight,
		theoryGrade,
		labGrade,
		theoryGradeThreshold,
		labGradeThreshold,
		books,
	} = req.body;

	if (
		!labWeight ||
		!theoryWeight ||
		!theoryGrade ||
		!labGrade ||
		!theoryGradeThreshold ||
		!labGradeThreshold ||
		!books
	)
		throw new CustomError('Please fill in all the required fields.', 400);

	const { id } = req.params;
	const updatedTeaching = await updateTeachingById(id, { ...req.body });

	if (!updatedTeaching)
		throw new CustomError(
			'Seems like the course teaching that you are trying to update does not exist.',
			404
		);

	return res.status(200).json(updatedTeaching);
});

export const deleteTeaching = tryCatch(async (req: Request, res: Response): Promise<Response> => {
	const { id } = req.params;
	const teachingToDelete = await deleteTeachingById(id);

	if (!teachingToDelete)
		throw new CustomError(
			'Seems like the course teaching that you are trying to delete does not exist.',
			404
		);

	return res.status(200).json({ message: 'Course teaching deleted.' });
});

export const viewTeachings = tryCatch(async (_: Request, res: Response): Promise<Response> => {
	const teachings = await getTeachings();
	if (!teachings)
		throw new CustomError(
			'Seems like there are no active course teachings registered in the system.',
			404
		);

	return res.status(200).json(teachings);
});

export const deleteAllTeachings = tryCatch(async (_: Request, res: Response): Promise<Response> => {
	await deleteTeachings();

	return res.status(200).json({ message: 'Course teachings existing in the system deleted.' });
});
