import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSemester } from '../../features/admin/semesterSlice';
import { getTeachings } from '../../features/courses/teachingSlice';

const useGeneralreview = () => {
	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.auth);
	const { teachings, isLoading: isTeachingsLoading } = useSelector(
		(state) => state.teachings
	);
	const { isLoading: isSemesterLoading } = useSelector(
		(state) => state.semesters
	);
	const { isLoading: isGeneralaReviewLoading } = useSelector(
		(state) => state.generalReviews
	);
	const enrolledCourses = useSelector(
		(state) => state.auth.user.user.student.enrolledCourses
	);

	useEffect(() => {
		dispatch(getSemester());
		dispatch(getTeachings());
	}, [dispatch]);

	const findTeaching = (enrolledCourse) => {
		return teachings.find((teaching) => teaching._id === enrolledCourse);
	};

	return {
		user,
		teachings,
		enrolledCourses,
		isTeachingsLoading,
		isSemesterLoading,
		isGeneralaReviewLoading,
		findTeaching,
	};
};

export default useGeneralreview;
