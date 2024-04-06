import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getSemesterActiveTeachings,
	unassignLabInstructors,
	unassignTheoryInstructors,
} from '../../features/courses/teachingSlice';
import { getInstructors } from '../../features/admin/userSlice';
import { deleteAlert } from '../../constants/sweetAlertNotification';
import { useSemester } from '../../context/SemesterProvider';

const useAssignTeachingInstructor = () => {
	const dispatch = useDispatch();

	const { semester, isSemesterLoading } = useSemester();
	const { teachings, isLoading: isTeachingsLoading } = useSelector(
		(state) => state.teachings
	);
	const { instructors, isLoading: isInstructorsLoading } = useSelector(
		(state) => state.users
	);

	useEffect(() => {
		dispatch(getSemesterActiveTeachings());
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
		handleUnassignTheoryInstructors,
		handleUnassignLabInstructors,
		dispatch,
	};
};

export default useAssignTeachingInstructor;
