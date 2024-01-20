import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTeachings } from '../../features/courses/teachingSlice';
import {
	disenrollCourse,
	enrollCourse,
} from '../../features/courses/courseSlice';
import { PrerequisiteType } from '../../constants/enums';
import {
	deleteAlert,
	enrollAlert,
} from '../../constants/sweetAlertNotification';
import useCurrentSemester from '../useCurrentSemester';

const useMyCourses = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { semester, isLoading: isSemesterLoading } = useCurrentSemester();

	const { teachings, isLoading: isTeachingsLoading } = useSelector(
		(state) => state.teachings
	);
	const enrolledCourses = useSelector(
		(state) => state.auth.user.user.student.enrolledCourses
	);

	const availableTeachings = teachings.filter(
		(teaching) => teaching?.semester?._id === semester?._id
	);

	const filteredAvailableTeachings = availableTeachings.filter(
		(teaching) => !enrolledCourses.includes(teaching._id)
	);

	const hasMoreAvailableCoursesToEnroll = filteredAvailableTeachings.length > 0;

	const handleCourseEnrollment = (teaching) => {
		// const prerequisitesMet = arePrerequisitesMet(teaching);

		// if (prerequisitesMet)
		enrollAlert(() => dispatch(enrollCourse(teaching._id)));
		// else
		// 	displayNotification('Oops!', 'You have not met the prerequisites for this course. Please check the course description for more information.', WARNING);
	};

	const handleCourseDisenrollment = (teaching) => {
		deleteAlert(() => dispatch(disenrollCourse(teaching._id)));
	};

	const handleNavigateToCoursePortfolio = (enrolledCourse) => {
		const teaching = findTeaching(enrolledCourse);
		navigate('/teaching/' + teaching._id + '/portfolio');
	};

	const handleCourseRowClick = (teaching) => {
		navigate('/teaching/' + teaching._id + '/portfolio');
	};

	const findTeaching = (enrolledCourse) => {
		return teachings.find((teaching) => teaching._id === enrolledCourse);
	};

	const getInstructorNames = (teaching) => {
		return teaching?.theoryInstructors.map(
			(instructor) => instructor.user.surname
		);
	};

	// const arePrerequisitesMet = (teaching) => {
	// 	const prerequisites = teaching.course.prerequisites;
	// 	console.log(prerequisites);

	// 	if (!prerequisites.length > 0) return true;

	// 	return prerequisites.every((prerequisite) => {
	// 		const prerequisiteTeaching = teachings.find(
	// 			(teaching) => teaching._id === prerequisite.prerequisite
	// 		);

	// 		if (!prerequisiteTeaching) return false;

	// 		if (prerequisite.prerequisiteType === PrerequisiteType.Hard) return false;
	// 		else if (prerequisite.prerequisiteType === PrerequisiteType.Soft) return true;

	// 		return false;
	// 	});
	// };

	useEffect(() => {
		dispatch(getTeachings());
	}, [dispatch]);

	return {
		semester,
		teachings,
		isSemesterLoading,
		isTeachingsLoading,
		availableTeachings,
		filteredAvailableTeachings,
		hasMoreAvailableCoursesToEnroll,
		enrolledCourses,
		PrerequisiteType,
		disenrollCourse,
		findTeaching,
		getInstructorNames,
		handleCourseRowClick,
		handleCourseEnrollment,
		handleCourseDisenrollment,
		handleNavigateToCoursePortfolio,
		dispatch,
	};
};

export default useMyCourses;
