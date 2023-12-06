import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getSemester } from '../../features/admin/semesterSlice';
import { getTeachings } from '../../features/courses/teachingSlice';

const useTeachingGrading = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { user } = useSelector((state) => state.auth);
	const { semester, isLoading: isSemesterLoading } = useSelector(
		(state) => state.semesters
	);
	const { teachings, isLoading: isTeachingsLoading } = useSelector(
		(state) => state.teachings
	);

	const filteredTeachings = user.user.isAdmin
		? teachings
		: teachings.filter((teaching) => {
				const isInstructorAssigned =
					teaching.theoryInstructors.some(
						(instructor) => instructor.user._id === user.user._id
					) ||
					teaching.labInstructors.some(
						(instructor) => instructor.user._id === user.user._id
					);

				return isInstructorAssigned && teaching.semester?._id === semester?._id;
		  });

	useEffect(() => {
		dispatch(getSemester());
		dispatch(getTeachings());
	}, [dispatch]);

	const handleTeachingClick = (teaching) => {
		navigate(`/teaching/${teaching._id}`);
	};

	return {
		user,
		semester,
		teachings,
		isSemesterLoading,
		isTeachingsLoading,
		filteredTeachings,
		handleTeachingClick,
	};
};

export default useTeachingGrading;
