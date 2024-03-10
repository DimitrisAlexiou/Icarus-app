import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSemester } from '../../context/SemesterProvider';
import { getSemesters } from '../../features/admin/semesterSlice';
import { getAssessment } from '../../features/admin/assessmentSlice';
import { getReview } from '../../features/admin/reviewSlice';
import { getDegreeRules } from '../../features/admin/degreeRulesSlice';
import { getCycles } from '../../features/admin/cyclesSlice';
import { getMasters } from '../../features/admin/masterProgramSlice';
import { academicYearEnd, academicYearStart } from '../../utils/academicYears';

const useConfiguration = () => {
	const dispatch = useDispatch();
	const { semester } = useSemester();

	const {
		semesters,
		isLoading: isSemesterLoading,
		isEditingSemester,
		editSemesterId,
	} = useSelector((state) => state.semesters);
	const {
		assessment,
		isLoading: assessmentIsLoading,
		isEditingAssessment,
		editAssessmentId,
	} = useSelector((state) => state.assessment);
	const {
		review,
		isLoading: isReviewLoading,
		isEditingReview,
		editReviewId,
	} = useSelector((state) => state.review);
	const {
		degreeRules,
		isLoading: isDegreeRulesLoading,
		isEditingDegreeRules,
		editDegreeRulesId,
	} = useSelector((state) => state.degreeRules);
	const {
		cycles,
		isLoading: isCyclesLoading,
		isEditingCycle,
		editCycleId,
	} = useSelector((state) => state.cycles);
	const {
		masters,
		isLoading: isMastersLoading,
		isEditingMaster,
		editMasterId,
	} = useSelector((state) => state.masters);

	const calculateReviewDates = () => {
		if (!review || !semester || isReviewLoading || isEditingReview) return null;

		const { startAfter, period } = review;
		const semesterStart = moment(semester.startDate);
		const reviewStart = semesterStart.clone().add(startAfter, 'weeks');
		const reviewEnd = reviewStart.clone().add(period, 'weeks');

		return { reviewStart, reviewEnd };
	};

	const { reviewStart, reviewEnd } = calculateReviewDates() || {};

	useEffect(() => {
		dispatch(getSemesters());
		dispatch(getAssessment());
		dispatch(getReview());
		dispatch(getDegreeRules());
		dispatch(getCycles());
		dispatch(getMasters());
	}, [dispatch]);

	return {
		semester,
		semesters,
		assessment,
		review,
		degreeRules,
		cycles,
		masters,
		isSemesterLoading,
		assessmentIsLoading,
		isReviewLoading,
		isDegreeRulesLoading,
		isCyclesLoading,
		isMastersLoading,
		isEditingSemester,
		editSemesterId,
		isEditingAssessment,
		editAssessmentId,
		isEditingReview,
		editReviewId,
		isEditingDegreeRules,
		editDegreeRulesId,
		isEditingCycle,
		editCycleId,
		isEditingMaster,
		editMasterId,
		academicYearEnd,
		academicYearStart,
		reviewStart,
		reviewEnd,
		dispatch,
	};
};

export default useConfiguration;
