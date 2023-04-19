import { Request, Response } from 'express';
import { getGeneralReviews, deleteGeneralReviews } from '../../models/review/generalReview';

export const getAllGeneralReviews = async (_: Request, res: Response) => {
	try {
		const generalReviews = await getGeneralReviews();
		if (!generalReviews)
			return res.status(404).json({ message: 'Seems like there are no general reviews.' });
		else return res.status(200).json(generalReviews);
	} catch (error) {
		console.error('❌ Error while finding general reviews: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later.' });
	}
};

export const deleteAllGeneralReviews = async (_: Request, res: Response) => {
	try {
		await deleteGeneralReviews();
		return res.status(200).json({ message: 'All general reviews deleted.' });
	} catch (error) {
		console.error('❌ Error while deleting all general reviews: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later.' });
	}
};
