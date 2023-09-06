import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardBody, CardTitle, Col, Row } from 'reactstrap';
import { getSemester, getSemesters } from '../../features/admin/semesterSlice';
import { getAssessment } from '../../features/admin/assessmentSlice';
import { getReview } from '../../features/admin/reviewSlice';
import { getDegreeRules } from '../../features/admin/degreeRulesSlice';
import { getCycles } from '../../features/admin/cyclesSlice';
import { academicYearEnd, academicYearStart } from '../../utils/academicYears';
import SemesterCard from '../../components/admin/cards/SemesterCard';
import AssessementCard from '../../components/admin/cards/AssessmentCard';
import ReviewCard from '../../components/admin/cards/ReviewCard';
import DegreeRulesCard from '../../components/admin/cards/DegreeRulesCard';
import CycleCard from '../../components/admin/cards/CycleCard';

export default function Configuration() {
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

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getSemester());
		dispatch(getSemesters());
		dispatch(getAssessment());
		dispatch(getReview());
		dispatch(getDegreeRules());
		dispatch(getCycles());
	}, [dispatch]);

	return (
		<>
			<Row className="mb-4 animated--grow-in">
				<Col>
					<h3 className="mb-4 text-gray-800 font-weight-bold animated--grow-in">
						System Configuration
					</h3>
				</Col>
				<Col xl="3" md="6" className="text-right">
					<Card className="card-note">
						<CardBody>
							<CardTitle>
								<Col>
									<h6>Academic Year</h6>
								</Col>
								<Col>
									<h3>{`${academicYearStart}-${academicYearEnd}`}</h3>
								</Col>
							</CardTitle>
						</CardBody>
					</Card>
				</Col>
			</Row>

			<Row className="animated--grow-in">
				<SemesterCard
					semester={semester}
					semesters={semesters}
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
