import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	getTeachings,
	getInstructorTeachings,
} from '../../features/courses/teachingSlice';

const useTeachingGrading = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { user } = useSelector((state) => state.auth);
	const { teachings, isLoading: isTeachingsLoading } = useSelector(
		(state) => state.teachings
	);

	useEffect(() => {
		dispatch(user.user.isAdmin ? getTeachings() : getInstructorTeachings());
	}, [dispatch, user.user.isAdmin]);

	const handleTeachingClick = (teaching) => {
		navigate(`/teaching/${teaching._id}`);
	};

	return {
		teachings,
		isTeachingsLoading,
		handleTeachingClick,
	};
};

export default useTeachingGrading;
