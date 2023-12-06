import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getGeneralReviews,
	getUserGeneralReviews,
} from '../../features/reviews/generalReviewSlice';

const useGeneralReviews = () => {
	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.auth);
	const { generalReviews, isLoading } = useSelector(
		(state) => state.generalReviews
	);

	useEffect(() => {
		dispatch(user ? getUserGeneralReviews() : getGeneralReviews());
	}, [dispatch, user]);

	return {
		generalReviews,
		isLoading,
	};
};

export default useGeneralReviews;
