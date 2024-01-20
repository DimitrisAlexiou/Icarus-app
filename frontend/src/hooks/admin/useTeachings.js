import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteAlert,
	downloadAlert,
} from '../../constants/sweetAlertNotification';
import {
	deleteTeaching,
	deleteTeachings,
	downloadEnrolledStudentsPDF,
	getInstructorTeachings,
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
		dispatch(user.user.isAdmin ? getTeachings() : getInstructorTeachings());
	}, [dispatch, user.user.isAdmin]);

	const handleTeachingRowClick = (teaching) => {
		navigate(`/teaching/${teaching._id}`);
	};

	const handleDeleteTeachings = () => {
		deleteAlert(() => dispatch(deleteTeachings()));
	};

	const handleDeleteTeaching = (teaching) => {
		deleteAlert(() => dispatch(deleteTeaching(teaching._id)));
	};

	const handleGenerateEnrolledStudentsPDF = (teaching) => {
		downloadAlert(() => dispatch(downloadEnrolledStudentsPDF(teaching._id)));
	};

	const getInstructorLabel = (teaching) => {
		const theoryInstructor = teaching.theoryInstructors.find(
			(instructor) => instructor.user._id === user.user._id
		);
		const labInstructor = teaching.labInstructors.find(
			(instructor) => instructor.user._id === user.user._id
		);

		const instructorLabels = [];

		if (theoryInstructor) instructorLabels.push('Theory');

		if (labInstructor) instructorLabels.push('Lab');

		return instructorLabels;
	};

	return {
		teachings,
		user,
		isLoading,
		isEditingTeaching,
		isEditingTeachingGrading,
		editTeachingId,
		setEditTeaching,
		setEditTeachingGrading,
		handleTeachingRowClick,
		handleDeleteTeachings,
		handleDeleteTeaching,
		handleGenerateEnrolledStudentsPDF,
		getInstructorLabel,
		dispatch,
	};
};

export default useTeachings;
