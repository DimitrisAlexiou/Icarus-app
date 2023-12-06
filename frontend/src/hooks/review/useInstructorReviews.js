import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getInstructorReviews,
	getUserInstructorReviews,
} from '../../features/reviews/instructorReviewSlice';

const useInstructorReviews = () => {
	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.auth);
	const { instructorReviews, isLoading } = useSelector(
		(state) => state.instructorReviews
	);

	useEffect(() => {
		dispatch(user ? getUserInstructorReviews() : getInstructorReviews());
	}, [dispatch, user]);

	return {
		instructorReviews,
		isLoading,
	};
};

export default useInstructorReviews;
