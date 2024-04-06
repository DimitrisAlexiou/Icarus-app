import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	getInstructorTeachings,
	getSemesterActiveTeachings,
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

	useEffect(() => {
		dispatch(
			user.user.isAdmin
				? getSemesterActiveTeachings()
				: getInstructorTeachings()
		);
	}, [dispatch, user.user.isAdmin]);

	const handleTeachingClick = (teaching) => {
		navigate(`/teaching/${teaching?._id}`);
	};

	return {
		semester,
		teachings,
		isTeachingsLoading,
		isSemesterLoading,
		handleTeachingClick,
	};
};

export default useTeachingGrading;
