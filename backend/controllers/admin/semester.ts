import { Request, Response } from 'express';
import {
	getSemesterByType,
	getCurrentSemester,
	getSemesters,
	createSemester,
	updateSemesterById,
	deleteSemesterById,
	deleteSemesters,
} from '../../models/admin/semester';

export const defineSemester = async (req: Request, res: Response) => {
	const { type, grading, startDate, endDate } = req.body;

	if (!type || !grading || !startDate || !endDate)
		return res.status(400).json({ message: 'Please provide the required fields.' });

	try {
		const existingSemester = await getSemesterByType(type);
		if (existingSemester) {
			return res
				.status(409)
				.json({ message: `Seems like the ${type} semester is already defined.` });
		} else {
			try {
				const semester = await createSemester({
					type,
					grading,
					startDate,
					endDate,
					status: 'new',
				});
				return res.status(201).json(semester);
			} catch (error) {
				console.error('❌ Error while defining semester: ', error);
				return res.status(500).json({
					message: 'Something went wrong, unfortunately the semester did not defined.',
				});
			}
		}
	} catch (error) {
		console.error('❌ Error while checking if semester already defined: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later.' });
	}
};

export const viewSemester = async (_: Request, res: Response) => {
	try {
		const currentDate = new Date();
		const semester = await getCurrentSemester(currentDate);
		if (!semester)
			return res
				.status(404)
				.json({ message: 'Seems like there is no defined semester for this period.' });
		else return res.status(200).json(semester);
	} catch (error) {
		console.error('❌ Error while finding current semester: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later.' });
	}
};

export const viewSemesters = async (_: Request, res: Response) => {
	try {
		const semesters = await getSemesters();
		if (!semesters)
			return res.status(404).json({ message: 'Seems like there are no defined semesters.' });
		else return res.status(200).json(semesters);
	} catch (error) {
		console.error('❌ Error while finding existing semesters: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later.' });
	}
};

export const updateSemester = async (req: Request, res: Response) => {
	const { grading, startDate, endDate } = req.body;

	if (!grading || !startDate || !endDate)
		return res.status(400).json({ message: 'Please provide the required fields.' });

	try {
		const { id } = req.params;
		const updatedSemester = await updateSemesterById(id, {
			...req.body,
		});
		if (!updatedSemester)
			return res.status(404).json({
				message: 'Seems like there is no defined semester for this period.',
			});
		else return res.status(200).json(updatedSemester);
	} catch (error) {
		console.error('❌ Error while updating current semester: ', error);
		return res.status(500).json({
			message: 'Something went wrong, unfortunately the semester did not updated.',
		});
	}
};

export const deleteSemester = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		await deleteSemesterById(id);
		return res.status(200).json({ message: 'Current semester deleted.' });
	} catch (error) {
		console.error('❌ Error while deleting current semester: ', error);
		return res.status(500).json({
			message: 'Something went wrong, unfortuantely the current semester did not deleted.',
		});
	}
};

export const deleteAllSemesters = async (_: Request, res: Response) => {
	try {
		await deleteSemesters();
		return res.status(200).json({ message: 'Defined semesters deleted.' });
	} catch (error) {
		console.error('❌ Error while deleting defined semesters: ', error);
		return res.status(500).json({
			message: 'Something went wrong, unfortunately defined semesters did not deleted.',
		});
	}
};
