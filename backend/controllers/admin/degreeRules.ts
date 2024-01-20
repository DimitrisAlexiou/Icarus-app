import { Response } from 'express';
import { AuthenticatedRequest } from '../../interfaces/AuthRequest';
import {
	getDegreeRules,
	createDegreeRules,
	updateDegreeRulesById,
	deleteDegreeRules,
} from '../../models/admin/degreeRules';
import { tryCatch } from '../../utils/tryCatch';
import CustomError from '../../utils/CustomError';

export const defineDegreeRules = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { cycles, cycleCourses, courses, practice } = req.body;

		if (!cycles || !cycleCourses || !courses)
			throw new CustomError('Please fill in all the required fields.', 400);

		const existingDegreeRules = await getDegreeRules();
		if (existingDegreeRules)
			throw new CustomError(
				'Seems like degree rules are already defined.',
				400
			);

		const degreeRules = await createDegreeRules({
			cycles,
			cycleCourses,
			courses,
			practice,
		});

		return res
			.status(201)
			.json({ message: 'Degree rules configuration assigned!', degreeRules });
	}
);

export const viewDegreeRules = tryCatch(
	async (_: AuthenticatedRequest, res: Response): Promise<Response> => {
		const degreeRules = await getDegreeRules();
		if (!degreeRules)
			throw new CustomError(
				'Seems like there are no defined degree rules.',
				404
			);

		return res.status(200).json(degreeRules);
	}
);

export const updateDegreeRules = tryCatch(
	async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
		const { cycles, cycleCourses, courses } = req.body;

		if (!cycles || !cycleCourses || !courses)
			throw new CustomError('Please provide all the required fields.', 400);

		const { id } = req.params;
		const updatedDegreeRules = await updateDegreeRulesById(id, {
			...req.body,
		});
		if (!updatedDegreeRules)
			throw new CustomError(
				'Seems like there are no defined degree rules to update.',
				404
			);

		return res.status(200).json({
			message: 'Degree rules configuration updated!',
			updatedDegreeRules,
		});
	}
);

export const deleteSystemDegreeRules = tryCatch(
	async (_: AuthenticatedRequest, res: Response): Promise<Response> => {
		await deleteDegreeRules();
		return res.status(200).json({ message: 'Defined degree rules deleted.' });
	}
);
