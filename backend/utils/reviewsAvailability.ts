import { getReviewBySemester } from '../models/admin/review';
import { getCurrentSemester } from '../models/admin/semester';
import CustomError from './CustomError';

export const checkReviewAvailability = async () => {
	const currentDate = new Date();
	const semester = await getCurrentSemester(currentDate);

	if (!semester)
		throw new CustomError(
			`Seems like there is no defined semester for current period, so you can't submit a review.`,
			404
		);

	const semesterId = semester._id.toString();
	const reviewDuration = await getReviewBySemester(semesterId);

	if (!reviewDuration)
		throw new CustomError(
			`There is no review duration defined for the current semester.`,
			404
		);

	const reviewStart = new Date(
		semester.startDate.getDate() + reviewDuration.startAfter * 7
	);

	if (reviewStart > currentDate)
		throw new CustomError(
			'The review duration period has not started yet. Please wait until the review period starts.',
			406
		);

	const reviewEnd = new Date(reviewStart.getDate() + reviewDuration.period * 7);

	if (reviewEnd < currentDate)
		throw new CustomError(
			'The review duration period has ended. No more reviews can be submitted.',
			406
		);
};
