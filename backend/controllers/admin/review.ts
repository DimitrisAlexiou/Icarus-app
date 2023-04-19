import { Request, Response } from 'express';
import {
	createReview,
	updateReviewById,
	getReview,
	getReviewByStartingDate,
	deleteReviewById,
} from '../../models/admin/review';

export const defineReviewStatement = async (req: Request, res: Response) => {
	const { startDate, endDate, start } = req.body;

	if (!startDate || !endDate || !start)
		return res.status(400).json({ message: 'Please provide the required fields.' });

	try {
		const existingReview = await getReviewByStartingDate(startDate);
		if (existingReview) {
			return res.status(400).json({
				message: 'Seems like review statement period is already defined.',
			});
		} else {
			try {
				const review = await createReview({
					startDate,
					endDate,
					start,
					status: 'new',
				});
				return res.status(201).json(review);
			} catch (error) {
				console.error('❌ Error while defining review statement period: ', error);
				return res.status(500).json({
					message:
						'Something went wrong, unfortunately the review statement period did not defined.',
				});
			}
		}
	} catch (error) {
		console.error(
			'❌ Error while checking if review statement period already defined: ',
			error
		);
		return res.status(500).json({ message: 'Something went wrong, try again later.' });
	}
};

export const getReviewStatement = async (_: Request, res: Response) => {
	try {
		const reviewStatement = await getReview();
		if (!reviewStatement) {
			return res
				.status(404)
				.json({ message: 'Seems like there is no review statement period defined.' });
		} else {
			return res.status(200).json(reviewStatement);
		}
	} catch (error) {
		console.error('❌ Error while finding review statement period: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later.' });
	}
};

export const updateReviewStatement = async (req: Request, res: Response) => {
	const { startDate, endDate, start } = req.body;

	if (!startDate || !endDate || !start)
		return res.status(400).json({
			message: 'Please provide the required fields.',
		});

	try {
		const { id } = req.params;
		const updatedReview = await updateReviewById(id, req.body);
		if (!updatedReview)
			return res.status(404).json({
				message:
					'Seems like there is no review statement duration period defined for current semester.',
			});
		else return res.status(200).json(updatedReview);
	} catch (error) {
		console.error('❌ Error while updating review statement period: ', error);
		return res.status(500).json({
			message:
				'Something went wrong, unfortunately the review statement period did not updated.',
		});
	}
};

export const deleteReviewStatement = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		await deleteReviewById(id);
		return res.status(200).json({ message: 'Current review statement period deleted.' });
	} catch (error) {
		console.error('❌ Error while deleting defined review statement period: ', error);
		return res.status(500).json({
			message:
				'Something went wrong, unfortunately defined review statement did not deleted.',
		});
	}
};
