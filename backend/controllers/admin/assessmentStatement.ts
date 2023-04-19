import { Request, Response } from 'express';
import {
	createAssessment,
	updateAssessmentById,
	getAssessments,
	getAssessmentBySemester,
	deleteAssessmentById,
	deleteAssessments,
} from '../../models/admin/assessment';

export const defineAssessment = async (req: Request, res: Response) => {
	const { vaccineStartDate, vaccineEndDate, period, semesterId } = req.body;

	if (!vaccineStartDate || !vaccineEndDate || !period || !semesterId)
		return res.status(400).json({ message: 'Please provide the required fields.' });

	try {
		const existingAssessment = await getAssessmentBySemester(semesterId);
		if (existingAssessment) {
			return res.status(400).json({
				message:
					'Seems like assessment statement duration period is already defined for current semester.',
			});
		} else {
			try {
				const assessment = await createAssessment({
					vaccineStartDate,
					vaccineEndDate,
					period,
					semester: semesterId,
					status: 'new',
				});
				return res.status(201).json(assessment);
			} catch (error) {
				console.error(
					'❌ Error while defining assessment statement duration period: ',
					error
				);
				return res.status(500).json({
					message:
						'Something went wrong, unfortunately the assessment statement duration period did not defined.',
				});
			}
		}
	} catch (error) {
		console.error(
			'❌ Error while checking if assessment statement duration period already defined for current semester: ',
			error
		);
		return res.status(500).json({ message: 'Something went wrong, try again later.' });
	}
};

export const viewAssessment = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const assessment = await getAssessmentBySemester(id);
		if (!assessment)
			return res.status(404).json({
				message:
					'Seems like there is no assessment statement duration period defined for current semester.',
			});
		else return res.status(200).json(assessment);
	} catch (error) {
		console.error(
			'❌ Error while finding assessment statement duration period for current semester: ',
			error
		);
		return res.status(500).json({ message: 'Something went wrong, try again later.' });
	}
};

export const updateAssessment = async (req: Request, res: Response) => {
	const { period, startDate, endDate } = req.body;

	if (!period || !startDate || !endDate)
		return res.status(400).json({ message: 'Please provide the required fields.' });

	try {
		const { id } = req.params;
		const updatedAssessment = await updateAssessmentById(id, {
			...req.body,
		});
		if (!updatedAssessment)
			return res.status(404).json({
				message:
					'Seems like there is no assessment statement duration period defined for current semester.',
			});
		else return res.status(200).json(updatedAssessment);
	} catch (error) {
		console.error('❌ Error while updating assessment statement duration period: ', error);
		return res.status(500).json({
			message:
				'Something went wrong, unfortunately the assessment statement duration period did not updated.',
		});
	}
};

export const deleteAssessment = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		await deleteAssessmentById(id);
		return res.status(200).json({
			message: 'Assessment statement duration period for current semester deleted.',
		});
	} catch (error) {
		console.error(
			'❌ Error while deleting assessment statement duration period for current semester: ',
			error
		);
		return res.status(500).json({ message: 'Something went wrong, try again later.' });
	}
};

export const viewAssessments = async (_: Request, res: Response) => {
	try {
		const assessments = await getAssessments();
		if (!assessments)
			return res.status(404).json({
				message: 'Seems like there are no defined assessment statement duration periods.',
			});
		else return res.status(200).json(assessments);
	} catch (error) {
		console.error(
			'❌ Error while finding existing assessment statement duration periods: ',
			error
		);
		return res.status(500).json({ message: 'Something went wrong, try again later.' });
	}
};

export const deleteAllAssessments = async (_: Request, res: Response) => {
	try {
		await deleteAssessments();
		return res
			.status(200)
			.json({ message: 'Defined assessment statements duration periods deleted.' });
	} catch (error) {
		console.error(
			'❌ Error while deleting defined assessment statements duration periods: ',
			error
		);
		return res.status(500).json({
			message:
				'Something went wrong, unfortunately defined assessment statements duration periods did not deleted.',
		});
	}
};
