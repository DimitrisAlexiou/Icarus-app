import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteCourses,
	getSystemCourses,
} from '../../features/courses/courseSlice';
import { getSystemTeachings } from '../../features/courses/teachingSlice';
import { getStatements } from '../../features/courses/statementSlice';
import { getSemesters } from '../../features/admin/semesterSlice';
import { getCycles } from '../../features/admin/cyclesSlice';
import { getMasters } from '../../features/admin/masterProgramSlice';
import {
	getInstructors,
	getStudents,
	getUsers,
} from '../../features/admin/userSlice';
import { getTeachingReviewsTotalNumber } from '../../features/reviews/teachingReviewSlice';
import { getInstructorReviewsTotalNumber } from '../../features/reviews/instructorReviewSlice';
import { getGeneralReviewsTotalNumber } from '../../features/reviews/generalReviewSlice';
import { deleteAlert } from '../../constants/sweetAlertNotification';

const useAdminDashboard = () => {
	const dispatch = useDispatch();

	const {
		courses,
		totalCourses,
		isLoading: coursesIsLoading,
		isEditingCourse,
		editCourseId,
		page,
	} = useSelector((state) => state.courses);
	const {
		teachings,
		totalTeachings,
		isLoading: teachingsIsLoading,
	} = useSelector((state) => state.teachings);
	const { isLoading: isStatementsLoading, totalStatements } = useSelector(
		(state) => state.statements
	);
	const {
		isLoading: usersIsLoading,
		totalStudents,
		totalInstructors,
		totalUsers,
	} = useSelector((state) => state.users);
	const {
		cycles,
		isLoading: cyclesIsLoading,
		totalCycles,
	} = useSelector((state) => state.cycles);
	const {
		masters,
		isLoading: mastersIsLoading,
		totalMasterPrograms,
	} = useSelector((state) => state.masters);
	const {
		semesters,
		isLoading: semestersIsLoading,
		isEditingSemester,
		editSemesterId,
		totalSemesters,
	} = useSelector((state) => state.semesters);
	const { isLoading: teachingReviewsIsLoading, totalTeachingReviews } =
		useSelector((state) => state.teachingReviews);
	const { isLoading: instructorReviewsIsLoading, totalInstructorReviews } =
		useSelector((state) => state.instructorReviews);
	const { isLoading: generalReviewsIsLoading, totalGeneralReviews } =
		useSelector((state) => state.generalReviews);

	const activeTeachings = teachings.filter((teaching) => !teaching.isDeleted);

	useEffect(() => {
		// dispatch(getSystemCourses({ coursesPerPage: 10, page: 1 }));
		dispatch(getSystemCourses());
		dispatch(getSystemTeachings());
		dispatch(getStatements());
		dispatch(getSemesters());
		dispatch(getCycles());
		dispatch(getUsers());
		dispatch(getStudents());
		dispatch(getInstructors());
		dispatch(getMasters());
		dispatch(getTeachingReviewsTotalNumber());
		dispatch(getInstructorReviewsTotalNumber());
		dispatch(getGeneralReviewsTotalNumber());
	}, [dispatch]);

	const deleteSystemCourses = () => {
		deleteAlert(() => dispatch(deleteCourses()));
	};

	return {
		courses,
		page,
		activeTeachings,
		cycles,
		semesters,
		masters,
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
		totalCourses,
		totalTeachings,
		totalStatements,
		totalStudents,
		totalInstructors,
		totalUsers,
		totalTeachingReviews,
		totalInstructorReviews,
		totalGeneralReviews,
		totalSemesters,
		totalCycles,
		totalMasterPrograms,
		deleteSystemCourses,
		dispatch,
	};
};

export default useAdminDashboard;
