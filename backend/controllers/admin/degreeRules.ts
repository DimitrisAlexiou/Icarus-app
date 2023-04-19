import { Request, Response } from 'express';
import {
	getDegreeRules,
	createDegreeRules,
	updateDegreeRulesById,
	deleteDegreeRules,
} from '../../models/admin/degreeRules';

export const defineDegreeRules = async (req: Request, res: Response) => {
	const { cycles, cycleCourses, courses, practice } = req.body;

	if (!cycles || !cycleCourses || !courses || !practice)
		return res.status(400).json({ message: 'Please provide all the required fields.' });

	try {
		const existingDegreeRules = await getDegreeRules();
		if (existingDegreeRules) {
			return res
				.status(400)
				.json({ message: 'Seems like degree rules are already defined.' });
		} else {
			try {
				const degreeRules = await createDegreeRules({
					cycles,
					cycleCourses,
					courses,
					practice,
					status: 'new',
				});
				return res.status(201).json(degreeRules);
			} catch (error) {
				console.error('❌ Error while defining degree rules: ', error);
				return res.status(500).json({
					message:
						'Something went wrong, unfortunately the degree rules did not defined.',
				});
			}
		}
	} catch (error) {
		console.error('❌ Error while checking if degree rules already defined: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later.' });
	}
};

export const viewDegreeRules = async (_: Request, res: Response) => {
	try {
		const degreeRules = await getDegreeRules();
		if (!degreeRules)
			return res
				.status(404)
				.json({ message: 'Seems like there are no defined degree rules.' });
		else return res.status(200).json(degreeRules);
	} catch (error) {
		console.error('❌ Error while finding existing degree rules: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later.' });
	}
};

export const updateDegreeRules = async (req: Request, res: Response) => {
	const { cycles, cycleCourses, courses, practice } = req.body;

	if (!cycles || !cycleCourses || !courses || !practice)
		return res.status(400).json({ message: 'Please provide all the required fields.' });

	try {
		const { id } = req.params;
		const updatedDegreeRules = await updateDegreeRulesById(id, {
			...req.body,
		});
		if (!updatedDegreeRules)
			return res
				.status(404)
				.json({ message: 'Seems like there are no defined degree rules.' });
		else return res.status(200).json(updatedDegreeRules);
	} catch (error) {
		console.error('❌ Error while updating current degree rules: ', error);
		return res.status(500).json({
			message: 'Something went wrong, unfortunately the degree rules did not updated.',
		});
	}
};

export const deleteAllDegreeRules = async (_: Request, res: Response) => {
	try {
		await deleteDegreeRules();
		return res.status(200).json({ message: 'Current degree rules deleted.' });
	} catch (error) {
		console.error('❌ Error while deleting current degree rules: ', error);
		return res.status(500).json({
			message:
				'Something went wrong, unfortuantely the current degree rules did not deleted.',
		});
	}
};
