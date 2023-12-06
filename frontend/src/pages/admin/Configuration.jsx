import { Card, CardBody, CardTitle, Col, Row } from 'reactstrap';
import useConfiguration from '../../hooks/admin/useConfiguration';
import SemesterCard from '../../components/admin/cards/SemesterCard';
import AssessementCard from '../../components/admin/cards/AssessmentCard';
import ReviewCard from '../../components/admin/cards/ReviewCard';
import DegreeRulesCard from '../../components/admin/cards/DegreeRulesCard';
import CycleCard from '../../components/admin/cards/CycleCard';

export default function Configuration() {
	const {
		semester,
		semesters,
		assessment,
		review,
		degreeRules,
		cycles,
		isSemesterLoading,
		isAssessmentLoading,
		isReviewLoading,
		isDegreeRulesLoading,
		isCyclesLoading,
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
		academicYearEnd,
		academicYearStart,
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
