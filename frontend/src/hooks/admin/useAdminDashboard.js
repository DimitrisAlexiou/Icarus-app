import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCourses, getCourses } from '../../features/courses/courseSlice';
import { getTeachings } from '../../features/courses/teachingSlice';
import { getStatements } from '../../features/courses/statementSlice';
import { getSemesters } from '../../features/admin/semesterSlice';
import { getCycles } from '../../features/admin/cyclesSlice';
import { getMasters } from '../../features/admin/masterProgramSlice';
import {
	getInstructors,
	getStudents,
	getUsers,
} from '../../features/admin/userSlice';
import { getTeachingReviews } from '../../features/reviews/teachingReviewSlice';
import { getInstructorReviews } from '../../features/reviews/instructorReviewSlice';
import { getGeneralReviews } from '../../features/reviews/generalReviewSlice';
import { deleteAlert } from '../../constants/sweetAlertNotification';

const useAdminDashboard = () => {
	const dispatch = useDispatch();

	const {
		courses,
		isLoading: coursesIsLoading,
		isEditingCourse,
		editCourseId,
	} = useSelector((state) => state.courses);
	const { teachings, isLoading: teachingsIsLoading } = useSelector(
		(state) => state.teachings
	);
	const { statements, isLoading: isStatementsLoading } = useSelector(
		(state) => state.statements
	);
	const {
		users,
		students,
		instructors,
		isLoading: usersIsLoading,
	} = useSelector((state) => state.users);
	const { cycles, isLoading: cyclesIsLoading } = useSelector(
		(state) => state.cycles
	);
	const { masters, isLoading: mastersIsLoading } = useSelector(
		(state) => state.masters
	);
	const {
		semesters,
		isLoading: semestersIsLoading,
		isEditingSemester,
		editSemesterId,
	} = useSelector((state) => state.semesters);
	const { teachingReviews, isLoading: teachingReviewsIsLoading } = useSelector(
		(state) => state.teachingReviews
	);
	const { instructorReviews, isLoading: instructorReviewsIsLoading } =
		useSelector((state) => state.instructorReviews);
	const { generalReviews, isLoading: generalReviewsIsLoading } = useSelector(
		(state) => state.generalReviews
	);

	useEffect(() => {
		dispatch(getCourses());
		dispatch(getTeachings());
		dispatch(getStatements());
		dispatch(getSemesters());
		dispatch(getCycles());
		dispatch(getUsers());
		dispatch(getStudents());
		dispatch(getInstructors());
		dispatch(getMasters());
		dispatch(getTeachingReviews());
		dispatch(getInstructorReviews());
		dispatch(getGeneralReviews());
	}, [dispatch]);

	const deleteSystemCourses = () => {
		deleteAlert(() => dispatch(deleteCourses()));
	};

	return {
		courses,
		teachings,
		statements,
		users,
		students,
		instructors,
		cycles,
		semesters,
		masters,
		teachingReviews,
		instructorReviews,
		generalReviews,
		coursesIsLoading,
		teachingsIsLoading,
		isStatementsLoading,
		usersIsLoading,
		cyclesIsLoading,
		mastersIsLoading,
		semestersIsLoading,
		teachingReviewsIsLoading,
		instructorReviewsIsLoading,
		generalReviewsIsLoading,
		isEditingSemester,
		editSemesterId,
		isEditingCourse,
		editCourseId,
		deleteSystemCourses,
		dispatch,
	};
};

export default useAdminDashboard;
