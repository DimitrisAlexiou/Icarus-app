import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReview } from '../../features/admin/reviewSlice';

const useReviews = () => {
	const dispatch = useDispatch();

	const { review, isLoading } = useSelector((state) => state.review);

	useEffect(() => {
		dispatch(getReview());
	}, [dispatch]);

	const reviewStartDate = review && review.startDate;
	const currentDate = new Date();
	const reviewHasStarted =
		reviewStartDate && currentDate >= new Date(reviewStartDate);

	return { review, isLoading, reviewStartDate, reviewHasStarted };
};

export default useReviews;
