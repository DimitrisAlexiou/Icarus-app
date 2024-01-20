import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTeachings } from '../../features/courses/teachingSlice';
import useCurrentSemester from '../useCurrentSemester';

const useTeachingReview = () => {
	const dispatch = useDispatch();

	const { isLoading: isSemesterLoading } = useCurrentSemester();

	const { user } = useSelector((state) => state.auth);
	const { teachings, isLoading: isTeachingsLoading } = useSelector(
		(state) => state.teachings
	);
	const { isLoading: isTeachingReviewLoading } = useSelector(
		(state) => state.teachingReviews
	);
	const enrolledCourses = useSelector(
		(state) => state.auth.user.user.student.enrolledCourses
	);

	useEffect(() => {
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
		isTeachingReviewLoading,
		findTeaching,
		dispatch,
	};
};

export default useTeachingReview;
