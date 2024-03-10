import mongoose from 'mongoose';
import { Response } from 'express';
import { AuthenticatedRequest } from '../../../interfaces/AuthRequest';
import {
	createAssessment,
	updateAssessmentById,
	getAssessments,
	getAssessmentBySemester,
	deleteAssessmentById,
	deleteAssessments,
} from '../../../models/admin/assessment';
import { getCurrentSemester } from '../../../models/admin/semester';
import { tryCatch } from '../../../utils/tryCatch';
import CustomError from '../../../utils/CustomError';

export const defineAssessment = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { vaccineStartDate, vaccineEndDate, period } = req.body;

		if (!vaccineStartDate || !vaccineEndDate || !period)
			throw new CustomError('Please fill in all the required fields.', 400);

		const semester = await getCurrentSemester(new Date());
		if (!semester)
			throw new CustomError(
				'Seems like there is no defined semester for current period. Define a semester first in order to define assessment statement configuration.',
				404
			);

		const semesterId = semester._id.toString();
		const existingAssessment = await getAssessmentBySemester(semesterId);
		if (existingAssessment)
			throw new CustomError(
				'Seems like assessment statement configuration is already defined for this semester.',
				400
			);

		if (vaccineStartDate < semester.startDate)
			throw new CustomError(
				'Vaccine statement starting date should be greater than the starting date of the current semester.',
				400
			);

		const assessment = await createAssessment({
			vaccineStartDate,
			vaccineEndDate,
			period,
			semester: new mongoose.Types.ObjectId(semesterId),
		});

		return res
			.status(201)
			.json({ message: 'Assessment configuration defined.', assessment });
	}
);

export const viewAssessment = tryCatch(
	async (_: AuthenticatedRequest, res: Response): Promise<Response> => {
		const semester = await getCurrentSemester(new Date());
		if (!semester)
			throw new CustomError(
				'Seems like there is no defined semester for current period. Define a semester first in order to define assessment statement configuration.',
				404
			);

		const semesterId = semester._id.toString();
		const assessment = await getAssessmentBySemester(semesterId);
		if (!assessment)
			throw new CustomError(
				'Seems like there is no assessment statement configuration defined for this semester.',
				404
			);

		return res.status(200).json(assessment);
	}
);

export const updateAssessment = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { period, vaccineStartDate, vaccineEndDate } = req.body;

		if (!period || !vaccineStartDate || !vaccineEndDate)
			throw new CustomError('Please fill in all the required fields.', 400);

		const semester = await getCurrentSemester(new Date());
		if (!semester)
			throw new CustomError(
				'Seems like there is no defined semester for current period. Define a semester first in order to update assessment statement configuration.',
				404
			);

		if (vaccineStartDate < semester.startDate)
			throw new CustomError(
				'Vaccine statement starting date should be greater than the starting date of the current semester.',
				400
			);

		const { id } = req.params;
		const updatedAssessment = await updateAssessmentById(id, {
			...req.body,
		});
		if (!updatedAssessment)
			throw new CustomError(
				'Seems like the assessment statement configuration that you are trying to update does not exist.',
				404
			);

		return res.status(200).json({
			message: 'Assessment configuration updated.',
			updatedAssessment,
		});
	}
);

export const deleteAssessment = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { id } = req.params;
		const assessmentToDelete = await deleteAssessmentById(id);
		if (!assessmentToDelete)
			throw new CustomError(
				'Seems like the assessment statement configuration that you are trying to delete does not exist.',
				404
			);

		return res.status(200).json({
			message: 'Assessment statement configuration deleted.',
		});
	}
);

export const viewAssessments = tryCatch(
	async (_: AuthenticatedRequest, res: Response): Promise<Response> => {
		const assessments = await getAssessments();
		if (!assessments.length)
			throw new CustomError(
				'Seems like there are no assessment statement configurations defined.',
				404
			);

		return res.status(200).json(assessments);
	}
);

export const deleteSystemAssessments = tryCatch(
	async (_: AuthenticatedRequest, res: Response): Promise<Response> => {
		await deleteAssessments();
		return res.status(200).json({
			message: 'Defined assessment statement configurations deleted.',
		});
	}
);
