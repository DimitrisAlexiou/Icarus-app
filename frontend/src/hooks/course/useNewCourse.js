import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSystemCourses } from '../../features/courses/courseSlice';
import { getCycles } from '../../features/admin/cyclesSlice';
import { getSemesters } from '../../features/admin/semesterSlice';
import { getMasters } from '../../features/admin/masterProgramSlice';

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
	const { masters, isLoading: mastersIsLoading } = useSelector(
		(state) => state.masters
	);

	useEffect(() => {
		dispatch(getSystemCourses());
		dispatch(getCycles());
		dispatch(getSemesters());
		dispatch(getMasters());
	}, [dispatch]);

	return {
		courses,
		cycles,
		semesters,
		masters,
		coursesIsLoading,
		cyclesIsLoading,
		semestersIsLoading,
		mastersIsLoading,
		dispatch,
	};
};

export default useNewCourse;
