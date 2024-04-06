import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReview } from '../../features/admin/reviewSlice';

const useReviews = () => {
	const dispatch = useDispatch();

	const { review, isLoading } = useSelector((state) => state.review);
	const { semester } = useSelector((state) => state.semesters);

	const currentDate = new Date();
	const semesterStartDate = new Date(semester?.startDate);
	const reviewStart = review?.startAfter * 7 * 24 * 60 * 60 * 1000;
	const reviewPeriod = review?.period * 7 * 24 * 60 * 60 * 1000;

	const reviewStartDate = new Date(semesterStartDate.getTime() + reviewStart);
	const reviewEndDate = new Date(reviewStartDate.getTime() + reviewPeriod);

	const reviewHasStarted = reviewStartDate && currentDate >= reviewStartDate;
	const reviewHasEnded = reviewEndDate && currentDate > reviewEndDate;

	useEffect(() => {
		dispatch(getReview());
	}, [dispatch]);

	return {
		review,
		isLoading,
		reviewStartDate,
		reviewEndDate,
		reviewHasStarted,
		reviewHasEnded,
	};
};

export default useReviews;
