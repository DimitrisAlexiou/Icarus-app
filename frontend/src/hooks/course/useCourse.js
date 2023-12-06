import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCourse } from '../../features/courses/courseSlice';
import { getTeachingByCourseId } from '../../features/courses/teachingSlice';

const useCourse = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {
		course,
		isLoading: isCourseLoading,
		isEditingCourse,
		editCourseId,
	} = useSelector((state) => state.courses);
	const { teaching, isLoading: isTeachingLoading } = useSelector(
		(state) => state.teachings
	);

	const { courseId } = useParams();

	useEffect(() => {
		dispatch(getCourse(courseId));
		if (course.isActive) dispatch(getTeachingByCourseId(courseId));
	}, [dispatch, courseId, course.isActive]);

	const handleNavigateToTeaching = (teaching) => {
		navigate('/teaching/' + teaching._id);
	};

	return {
		course,
		teaching,
		isCourseLoading,
		isTeachingLoading,
		isEditingCourse,
		editCourseId,
		handleNavigateToTeaching,
	};
};

export default useCourse;
