import { Request, Response } from 'express';
import {
	getTeachings,
	getTeachingById,
	updateTeachingById,
	deleteTeachingById,
	deleteTeachings,
	unassignTheoryInstructors,
	unassignLabInstructors,
	assignTheoryInstructors,
	assignLabInstructors,
	getTeachingByCourseId,
} from '../../models/course/teaching';
import { getCourseByTeachingId } from '../../models/course/course';
import { tryCatch } from '../../utils/tryCatch';
import CustomError from '../../utils/CustomError';
import mongoose from 'mongoose';

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

export const viewTeachingByCourseId = tryCatch(
	async (req: Request, res: Response): Promise<Response> => {
		const { id } = req.params;
		const teaching = await getTeachingByCourseId(id);

		if (!teaching)
			throw new CustomError(
				'Seems like the course teaching that you are trying to view does not exist.',
				404
			);

		return res.status(200).json(teaching);
	}
);

export const updateTeaching = tryCatch(async (req: Request, res: Response): Promise<Response> => {
	const {
		labWeight,
		theoryWeight,
		theoryGradeRetentionYears,
		labGradeRetentionYears,
		theoryGradeThreshold,
		labGradeThreshold,
		books,
	} = req.body;

	if (
		!theoryGradeRetentionYears ||
		!labGradeRetentionYears ||
		!theoryGradeThreshold ||
		!labGradeThreshold ||
		!books
	)
		throw new CustomError('Please fill in all the required fields.', 400);

	let updatedTeaching;
	const { id } = req.params;

	const course = await getCourseByTeachingId(id);
	if (!course)
		throw new CustomError(
			'Seems like the course that you are trying to retrieve for teaching update does not exist.',
			404
		);

	if (course.hasLab) {
		if (!labWeight || !theoryWeight)
			throw new CustomError('Please provide the required weight fields.', 400);

		updatedTeaching = await updateTeachingById(id, { ...req.body });
		if (!updatedTeaching)
			throw new CustomError(
				'Seems like the course teaching that you are trying to update does not exist.',
				404
			);
	}

	updatedTeaching = await updateTeachingById(id, {
		...req.body,
		labWeight: 0,
		theoryWeight: 100,
	});

	if (!updatedTeaching)
		throw new CustomError(
			'Seems like the course teaching that you are trying to update does not exist.',
			404
		);

	return res.status(200).json({ message: 'Teaching updated!', updatedTeaching });
});

export const deleteTeaching = tryCatch(async (req: Request, res: Response): Promise<Response> => {
	const { id } = req.params;
	const teachingToDelete = await deleteTeachingById(id);

	if (!teachingToDelete)
		throw new CustomError(
			'Seems like the course teaching that you are trying to delete does not exist.',
			404
		);

	return res
		.status(200)
		.json({ message: 'Course teaching deleted.', teaching: teachingToDelete._id });
});

export const viewTeachings = tryCatch(async (_: Request, res: Response): Promise<Response> => {
	const teachings = await getTeachings();

	if (!teachings.length)
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

export const assignTheoryInstructorsToTeaching = tryCatch(
	async (req: Request, res: Response): Promise<Response> => {
		const { theoryInstructors } = req.body;

		if (!theoryInstructors)
			throw new CustomError(
				'Please provide at least one instructor for the teaching of the theory.',
				400
			);

		const { id } = req.params;
		const assignedTheoryInstructors = await assignTheoryInstructors(
			id,
			theoryInstructors.map((instructor: string) => new mongoose.Types.ObjectId(instructor))
		);

		if (!assignedTheoryInstructors)
			throw new CustomError(
				'Seems like the course teaching that you are trying to assign instructor to, does not exist.',
				404
			);

		return res.status(200).json({
			message: 'Theory Instructor(s) assigned successfully.',
			assignedTheoryInstructors,
		});
	}
);

export const assignLabInstructorsToTeaching = tryCatch(
	async (req: Request, res: Response): Promise<Response> => {
		const { labInstructors } = req.body;

		if (!labInstructors)
			throw new CustomError(
				'Please provide at least one instructor for the teaching of the lab.',
				400
			);

		const { id } = req.params;
		const assignedLabInstructors = await assignLabInstructors(
			id,
			labInstructors.map((instructor: string) => new mongoose.Types.ObjectId(instructor))
		);

		if (!assignedLabInstructors)
			throw new CustomError(
				'Seems like the course teaching that you are trying to assign instructor to, does not exist.',
				404
			);

		return res.status(200).json({
			message: 'Lab Instructor(s) assigned successfully.',
			assignedLabInstructors,
		});
	}
);

export const unassignTheoryInstructorsFromTeaching = tryCatch(
	async (req: Request, res: Response): Promise<Response> => {
		const { id } = req.params;
		const unassignedTheoryInstructors = await unassignTheoryInstructors(id);

		if (!unassignedTheoryInstructors) {
			throw new CustomError(
				'Seems like the course teaching that you are trying to unassign instructor from, does not exist.',
				404
			);
		}

		return res.status(200).json({
			message: 'Theory instructor(s) unassigned successfully.',
			unassignedTheoryInstructors,
		});
	}
);

export const unassignLabInstructorsFromTeaching = tryCatch(
	async (req: Request, res: Response): Promise<Response> => {
		const { id } = req.params;
		const unassignedLabInstructors = await unassignLabInstructors(id);

		if (!unassignedLabInstructors) {
			throw new CustomError(
				'Seems like the course teaching that you are trying to unassign instructor from, does not exist.',
				404
			);
		}

		return res.status(200).json({
			message: 'Lab instructor(s) unassigned successfully.',
			unassignedLabInstructors,
		});
	}
);

export const updateTheoryInstructorsForTeaching = tryCatch(
	async (req: Request, res: Response): Promise<Response> => {
		const { theoryInstructors } = req.body;

		if (!theoryInstructors)
			throw new CustomError(
				'Please provide at least one instructor for updating the theory instructors.',
				400
			);

		const { id } = req.params;
		const updatedTheoryInstructors = await assignTheoryInstructors(
			id,
			theoryInstructors.map((instructor: string) => new mongoose.Types.ObjectId(instructor))
		);

		if (!updatedTheoryInstructors)
			throw new CustomError(
				'Seems like the course teaching that you are trying to update instructors for does not exist.',
				404
			);

		return res.status(200).json({
			message: 'Theory Instructor(s) updated successfully.',
			updatedTheoryInstructors,
		});
	}
);
