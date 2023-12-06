import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getTeachingReviews,
	getUserTeachingReviews,
} from '../../features/reviews/teachingReviewSlice';

const useTeachingReviews = () => {
	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.auth);
	const { teachingReviews, isLoading } = useSelector(
		(state) => state.teachingReviews
	);

	useEffect(() => {
		dispatch(user ? getUserTeachingReviews() : getTeachingReviews());
	}, [dispatch, user]);

	return {
		teachingReviews,
		isLoading,
	};
};

export default useTeachingReviews;
