import { Card, CardBody, CardTitle, Col, Row } from 'reactstrap';
import useConfiguration from '../../hooks/admin/useConfiguration';
import SemesterCard from '../../components/admin/cards/SemesterCard';
import AssessementCard from '../../components/admin/cards/AssessmentCard';
import ReviewCard from '../../components/admin/cards/ReviewCard';
import DegreeRulesCard from '../../components/admin/cards/DegreeRulesCard';
import CycleCard from '../../components/admin/cards/CycleCard';
import MastersCard from '../../components/admin/cards/MastersCard';

export default function Configuration() {
	const {
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
		dispatch,
	} = useConfiguration();

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
					dispatch={dispatch}
				/>
				<AssessementCard
					assessment={assessment}
					semester={semester}
					assessmentIsLoading={assessmentIsLoading}
					isEditingAssessment={isEditingAssessment}
					editAssessmentId={editAssessmentId}
					dispatch={dispatch}
				/>
			</Row>

			<Row className="animated--grow-in">
				<ReviewCard
					review={review}
					semester={semester}
					isReviewLoading={isReviewLoading}
					isEditingReview={isEditingReview}
					editReviewId={editReviewId}
					dispatch={dispatch}
				/>
				<DegreeRulesCard
					degreeRules={degreeRules}
					isDegreeRulesLoading={isDegreeRulesLoading}
					isEditingDegreeRules={isEditingDegreeRules}
					editDegreeRulesId={editDegreeRulesId}
					dispatch={dispatch}
				/>
			</Row>

			<Row className="animated--grow-in">
				<CycleCard
					cycles={cycles}
					isCyclesLoading={isCyclesLoading}
					isEditingCycle={isEditingCycle}
					editCycleId={editCycleId}
					dispatch={dispatch}
				/>
				<MastersCard
					masters={masters}
					isMastersLoading={isMastersLoading}
					isEditingMaster={isEditingMaster}
					editMasterId={editMasterId}
					dispatch={dispatch}
				/>
			</Row>
		</>
	);
}
