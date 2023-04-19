import { Request, Response } from 'express';
import {
	getTeachings,
	getTeachingById,
	updateTeachingById,
	deleteTeachingById,
	deleteTeachings,
} from '../../models/course/teaching';

export const viewTeaching = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const teaching = await getTeachingById(id);
		if (!teaching)
			return res
				.status(404)
				.json({ message: 'Seems like there is no course teaching with this ID.' });
		else return res.status(200).json(teaching);
	} catch (error) {
		console.error('❌ Error while finding course teaching: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later.' });
	}
};

export const updateTeaching = async (req: Request, res: Response) => {
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
		return res.status(400).json({ message: 'Please fill in all the required fields.' });

	try {
		const { id } = req.params;
		const updatedTeaching = await updateTeachingById(id, { ...req.body });
		if (!updatedTeaching)
			return res
				.status(404)
				.json({ message: 'Seems like there is no course teaching with this ID.' });
		return res.status(200).json(updatedTeaching);
	} catch (error) {
		console.error('❌ Error while updating course teaching: ', error);
		return res.status(500).json({
			message: 'Something went wrong, unfortunately the teaching did not updated.',
		});
	}
};

export const deleteTeaching = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		await deleteTeachingById(id);
		return res.status(200).json({ message: 'Course teaching deleted.' });
	} catch (error) {
		console.error('❌ Error while deleting course teaching: ', error);
		return res.status(500).json({
			message: 'Something went wrong, unfortunately the course teaching did not deleted.',
		});
	}
};

export const viewTeachings = async (_: Request, res: Response) => {
	try {
		const teachings = await getTeachings().populate('course');
		if (!teachings)
			return res.status(404).json({ message: 'Seems like there are no teachings.' });
		else return res.status(200).json(teachings);
	} catch (error) {
		console.error('❌ Error while finding teachings: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later.' });
	}
};

export const deleteAllTeachings = async (_: Request, res: Response) => {
	try {
		await deleteTeachings();
		return res.status(200).json({ message: 'All course teachings deleted.' });
	} catch (error) {
		console.error('❌ Error while deleting all course teachings: ', error);
		return res
			.status(500)
			.json({
				message:
					'Something went wrong, unfortunately the courses teachings did not deleted.',
			});
	}
};
