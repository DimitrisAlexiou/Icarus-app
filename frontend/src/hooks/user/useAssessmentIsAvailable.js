import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSemester } from '../../features/admin/semesterSlice';
import { getAssessment } from '../../features/admin/assessmentSlice';
import useCurrentSemester from '../useCurrentSemester';

const useAssessmentIsAvailable = () => {
	const dispatch = useDispatch();

	const { semester } = useCurrentSemester();

	const { assessment, isLoading: isAssessmentLoading } = useSelector(
		(state) => state.assessment
	);

	const currentDate = new Date();
	const assessmentStartDate = new Date(semester?.startDate);
	const assessmentEndDate = new Date(
		assessmentStartDate.getTime() + assessment?.period * 7 * 24 * 60 * 60 * 1000
	);

	const assessmentIsAvailable =
		assessmentStartDate && currentDate <= new Date(assessmentEndDate);

	const vaccineStartDate = new Date(assessment?.vaccineStartDate);
	const vaccineEndDate = new Date(assessment?.vaccineEndDate);

	const vaccineIsAvailable =
		vaccineStartDate && currentDate <= new Date(vaccineEndDate);

	useEffect(() => {
		dispatch(getAssessment());
		dispatch(getSemester());
	}, [dispatch]);

	return {
		assessment,
		isAssessmentLoading,
		assessmentIsAvailable,
		assessmentEndDate,
		vaccineIsAvailable,
		vaccineEndDate,
	};
};

export default useAssessmentIsAvailable;
