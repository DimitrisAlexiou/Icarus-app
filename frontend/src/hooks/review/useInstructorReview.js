import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTeachings } from '../../features/courses/teachingSlice';
import { useSemester } from '../../context/SemesterProvider';

const useInstructorReview = () => {
	const dispatch = useDispatch();

	const { isSemesterLoading } = useSemester();
	const { user } = useSelector((state) => state.auth);
	const { teachings, isLoading: isTeachingsLoading } = useSelector(
		(state) => state.teachings
	);
	const { isLoading: isInstructorReviewLoading } = useSelector(
		(state) => state.instructorReviews
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
		isInstructorReviewLoading,
		findTeaching,
		dispatch,
	};
};

export default useInstructorReview;
