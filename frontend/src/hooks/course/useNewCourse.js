import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCourses } from '../../features/courses/courseSlice';
import { getCycles } from '../../features/admin/cyclesSlice';
import { getSemesters } from '../../features/admin/semesterSlice';

const useNewCourse = () => {
	const dispatch = useDispatch();

	const { courses, isLoading: coursesIsLoading } = useSelector(
		(state) => state.courses
	);
	const { cycles, isLoading: cyclesIsLoading } = useSelector(
		(state) => state.cycles
	);
	const { semesters, isLoading: semestersIsLoading } = useSelector(
		(state) => state.semesters
	);

	useEffect(() => {
		dispatch(getCourses());
		dispatch(getCycles());
		dispatch(getSemesters());
	}, [dispatch]);

	return {
		courses,
		cycles,
		semesters,
		coursesIsLoading,
		cyclesIsLoading,
		semestersIsLoading,
		dispatch,
	};
};

export default useNewCourse;
