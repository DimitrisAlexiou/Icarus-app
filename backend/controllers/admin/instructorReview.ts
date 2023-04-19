import { Request, Response } from 'express';
import {
	getInstructorReviews,
	deleteInstructorReviews,
} from '../../models/review/instructorReview';

export const getAllInstructorReviews = async (_: Request, res: Response) => {
	try {
		const instructorReviews = await getInstructorReviews();
		if (!instructorReviews)
			return res.status(404).json({ message: 'Seems like there are no instructor reviews.' });
		else return res.status(200).json(instructorReviews);
	} catch (error) {
		console.error('❌ Error while finding instructor reviews: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later.' });
	}
};

export const deleteAllInstructorReviews = async (_: Request, res: Response) => {
	try {
		await deleteInstructorReviews();
		return res.status(200).json({ message: 'All instructor reviews deleted.' });
	} catch (error) {
		console.error('❌ Error while deleting all instructor reviews: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later.' });
	}
};
