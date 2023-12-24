import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSemester, getSemesters } from '../../features/admin/semesterSlice';
import { getAssessment } from '../../features/admin/assessmentSlice';
import { getReview } from '../../features/admin/reviewSlice';
import { getDegreeRules } from '../../features/admin/degreeRulesSlice';
import { getCycles } from '../../features/admin/cyclesSlice';
import { getMasters } from '../../features/admin/masterProgramSlice';
import { academicYearEnd, academicYearStart } from '../../utils/academicYears';

const useConfiguration = () => {
	const dispatch = useDispatch();

	const {
		semester,
		semesters,
		isLoading: isSemesterLoading,
		isEditingSemester,
		editSemesterId,
	} = useSelector((state) => state.semesters);
	const {
		assessment,
		isLoading: isAssessmentLoading,
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

	useEffect(() => {
		dispatch(getSemester());
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
		isAssessmentLoading,
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
		dispatch,
	};
};

export default useConfiguration;
