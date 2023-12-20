import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTeaching } from '../../features/courses/teachingSlice';

const useTeaching = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { teaching, isLoading } = useSelector((state) => state.teachings);
	const { teachingId } = useParams();

	useEffect(() => {
		dispatch(getTeaching(teachingId));
	}, [dispatch, teachingId]);

	const handleTeachingPortfolio = (teaching) => {
		navigate('/teaching/' + teaching._id + '/portfolio');
	};

	return { teaching, isLoading, handleTeachingPortfolio };
};

export default useTeaching;
