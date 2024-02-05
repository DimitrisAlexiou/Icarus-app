import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	getTeachings,
	getInstructorTeachings,
} from '../../features/courses/teachingSlice';
import { useSemester } from '../../context/SemesterProvider';

const useTeachingGrading = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { user } = useSelector((state) => state.auth);
	const { teachings, isLoading: isTeachingsLoading } = useSelector(
		(state) => state.teachings
	);
	const { semester, isSemesterLoading } = useSemester();

	const availableTeachings = teachings.filter(
		(teaching) => teaching.semester._id === semester._id
	);

	useEffect(() => {
		dispatch(user.user.isAdmin ? getTeachings() : getInstructorTeachings());
	}, [dispatch, user.user.isAdmin]);

	const handleTeachingClick = (teaching) => {
		navigate(`/teaching/${teaching._id}`);
	};

	return {
		semester,
		teachings,
		availableTeachings,
		isTeachingsLoading,
		isSemesterLoading,
		handleTeachingClick,
	};
};

export default useTeachingGrading;
