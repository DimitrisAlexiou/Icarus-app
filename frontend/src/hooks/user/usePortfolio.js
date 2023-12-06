import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTeaching } from '../../features/courses/teachingSlice';

const usePortfolio = () => {
	const dispatch = useDispatch();

	const { teaching, isLoading } = useSelector((state) => state.teachings);
	const { teachingId } = useParams();

	useEffect(() => {
		dispatch(getTeaching(teachingId));
	}, [dispatch, teachingId]);

	return { teaching, isLoading };
};

export default usePortfolio;
