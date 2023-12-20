import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCourses } from '../../features/courses/courseSlice';
import { CourseType } from '../../constants/enums';

const useCourses = (courseType = CourseType.Undergraduate) => {
	const dispatch = useDispatch();

	const {
		courses,
		page,
		numOfPages,
		search,
		searchSemester,
		searchCycle,
		searchHasLab,
		sort,
		isLoading,
	} = useSelector((state) => state.courses);

	const [Obligatory, setObligatory] = useState(true);
	const [filteredCourses, setFilteredCourses] = useState([]);

	// useEffect(() => {
	// 	const handleScroll = () => {
	// 		if (!hasMore || isFetching) return;

	// 		const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
	// 		if (scrollTop + clientHeight >= scrollHeight - 20) {
	// 			dispatch(getCourses());
	// 			dispatch(getCycles());
	// 		}
	// 	};

	// 	window.addEventListener('scroll', handleScroll);
	// 	return () => {
	// 		window.removeEventListener('scroll', handleScroll);
	// 	};
	// }, [dispatch, hasMore, isFetching]);

	useEffect(() => {
		dispatch(getCourses());
	}, [dispatch]);

	useEffect(() => {
		const filtered = courses.filter(
			(course) =>
				course.type === courseType && course.isObligatory === Obligatory
		);
		setFilteredCourses(filtered);
	}, [courses, Obligatory, courseType]);

	const handleNavigationClick = (isObligatory) => {
		setObligatory(isObligatory);
	};

	return {
		courses,
		page,
		numOfPages,
		search,
		searchSemester,
		searchCycle,
		searchHasLab,
		sort,
		isLoading,
		filteredCourses,
		Obligatory,
		handleNavigationClick,
	};
};

export default useCourses;
