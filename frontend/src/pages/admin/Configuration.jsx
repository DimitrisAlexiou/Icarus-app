import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row } from 'reactstrap';
import { getSemester } from '../../features/admin/semesterSlice';
import { getAssessment } from '../../features/admin/assessmentSlice';
import { getReview } from '../../features/admin/reviewSlice';
import { getDegreeRules } from '../../features/admin/degreeRulesSlice';
import { getCycles } from '../../features/admin/cyclesSlice';
import SemesterCard from '../../components/admin/SemesterCard';
import AssessementCard from '../../components/admin/AssessmentCard';
import ReviewCard from '../../components/admin/ReviewCard';
import DegreeRulesCard from '../../components/admin/DegreeRulesCard';
import CycleCard from '../../components/admin/CycleCard';

export default function Configuration() {
	const {
		semester,
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

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getSemester());
		dispatch(getAssessment());
		dispatch(getReview());
		dispatch(getDegreeRules());
		dispatch(getCycles());
	}, [dispatch]);

	return (
		<>
			<h3 className="mb-5 text-gray-800 font-weight-bold animated--grow-in">
				System Configuration
			</h3>

			<Row className="animated--grow-in">
				<SemesterCard
					semester={semester}
					isSemesterLoading={isSemesterLoading}
					isEditingSemester={isEditingSemester}
					editSemesterId={editSemesterId}
				/>
				<AssessementCard
					assessment={assessment}
					semester={semester}
					isAssessmentLoading={isAssessmentLoading}
					isEditingAssessment={isEditingAssessment}
					editAssessmentId={editAssessmentId}
				/>
			</Row>

			<Row className="animated--grow-in">
				<ReviewCard
					review={review}
					semester={semester}
					isReviewLoading={isReviewLoading}
					isEditingReview={isEditingReview}
					editReviewId={editReviewId}
				/>
				<DegreeRulesCard
					degreeRules={degreeRules}
					isDegreeRulesLoading={isDegreeRulesLoading}
					isEditingDegreeRules={isEditingDegreeRules}
					editDegreeRulesId={editDegreeRulesId}
				/>
			</Row>

			<Row className="animated--grow-in">
				<CycleCard
					cycles={cycles}
					isCyclesLoading={isCyclesLoading}
					isEditingCycle={isEditingCycle}
					editCycleId={editCycleId}
				/>
			</Row>
		</>
	);
}
