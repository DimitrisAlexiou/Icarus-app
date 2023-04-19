import { Request, Response } from 'express';
import { getTeachingReviews, deleteTeachingReviews } from '../../models/review/teachingReview';

export const getAllTeachingReviews = async (_: Request, res: Response) => {
	try {
		const teachingReviews = await getTeachingReviews();
		if (!teachingReviews)
			return res.status(404).json({ message: 'Seems like there are no teaching reviews.' });
		else return res.status(200).json(teachingReviews);
	} catch (error) {
		console.error('❌ Error while finding teaching reviews: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later.' });
	}
};

export const deleteAllTeachingReviews = async (_: Request, res: Response) => {
	try {
		await deleteTeachingReviews();
		return res.status(200).json({ message: 'All teaching reviews deleted.' });
	} catch (error) {
		console.error('❌ Error while deleting all teaching reviews: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later.' });
	}
};
