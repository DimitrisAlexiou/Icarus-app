import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAlert } from '../../constants/sweetAlertNotification';
import {
	deleteTeaching,
	deleteTeachings,
	getTeachings,
	setEditTeaching,
	setEditTeachingGrading,
} from '../../features/courses/teachingSlice';

const useTeachings = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {
		teachings,
		isLoading,
		isEditingTeaching,
		isEditingTeachingGrading,
		editTeachingId,
	} = useSelector((state) => state.teachings);
	const { user } = useSelector((state) => state.auth);

	useEffect(() => {
		dispatch(getTeachings());
	}, [dispatch]);

	const filteredTeachings = user.user.isAdmin
		? teachings
		: teachings.filter(
				(teaching) =>
					teaching.theoryInstructors.some((instructor) => {
						return instructor.user._id === user.user._id;
					}) ||
					teaching.labInstructors.some((instructor) => {
						return instructor.user._id === user.user._id;
					})
		  );

	const handleTeachingRowClick = (teaching) => {
		navigate(`/teaching/${teaching._id}`);
	};

	const handleDeleteTeachings = () => {
		deleteAlert(() => dispatch(deleteTeachings()));
	};

	const handleDeleteTeaching = (teaching) => {
		deleteAlert(() => dispatch(deleteTeaching(teaching._id)));
	};

	return {
		teachings,
		user,
		isLoading,
		isEditingTeaching,
		isEditingTeachingGrading,
		editTeachingId,
		filteredTeachings,
		setEditTeaching,
		setEditTeachingGrading,
		handleTeachingRowClick,
		handleDeleteTeachings,
		handleDeleteTeaching,
		dispatch,
	};
};

export default useTeachings;
