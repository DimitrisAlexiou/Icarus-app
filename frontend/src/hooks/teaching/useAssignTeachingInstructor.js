import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getTeachings,
	unassignLabInstructors,
	unassignTheoryInstructors,
} from '../../features/courses/teachingSlice';
import { getInstructors } from '../../features/admin/userSlice';
import { deleteAlert } from '../../constants/sweetAlertNotification';
import useCurrentSemester from '../useCurrentSemester';

const useAssignTeachingInstructor = () => {
	const dispatch = useDispatch();

	const { semester, isLoading: isSemesterLoading } = useCurrentSemester();

	const { teachings, isLoading: isTeachingsLoading } = useSelector(
		(state) => state.teachings
	);
	const { instructors, isLoading: isInstructorsLoading } = useSelector(
		(state) => state.users
	);

	const availableTeachings = teachings.filter(
		(teaching) => teaching.semester._id === semester._id
	);

	useEffect(() => {
		dispatch(getTeachings());
		dispatch(getInstructors());
	}, [dispatch]);

	const handleUnassignTheoryInstructors = (teaching) => {
		deleteAlert(() => dispatch(unassignTheoryInstructors(teaching._id)));
	};

	const handleUnassignLabInstructors = (teaching) => {
		deleteAlert(() => dispatch(unassignLabInstructors(teaching._id)));
	};

	return {
		semester,
		teachings,
		instructors,
		isSemesterLoading,
		isTeachingsLoading,
		isInstructorsLoading,
		availableTeachings,
		handleUnassignTheoryInstructors,
		handleUnassignLabInstructors,
		dispatch,
	};
};

export default useAssignTeachingInstructor;
