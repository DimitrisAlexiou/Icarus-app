import { Button, Col, Row, Spinner } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDot, faClock } from '@fortawesome/free-regular-svg-icons';
import {
	faArrowUp91,
	faCheckDouble,
	faDiagramPredecessor,
	faListCheck,
	faUserGraduate,
} from '@fortawesome/free-solid-svg-icons';
import {
	ExamPeriods,
	GradingStatus,
	SemesterType,
} from '../../constants/enums';
import useGrades from '../../hooks/course/useGrades';
import HeaderWithSemester from '../../components/boilerplate/headers/HeaderWithSemester';
import PillHeader from '../../components/boilerplate/headers/PillHeader';
import Loading from '../../components/boilerplate/spinners/Spinner';
import SpinnerComponent from '../../components/boilerplate/spinners/SpinnerMessage';

export default function Grades() {
	const {
		semester,
		statements,
		isGradeLoading,
		isStatementsLoading,
		getInstructorRoles,
		handleStatementClick,
		handleFinalizeGrading,
	} = useGrades();

	return (
		<>
			<HeaderWithSemester title="Grades" />

			<Row className="mb-4 justify-content-between animated--grow-in">
				<Col className="text-center">
					<PillHeader title="Statements" />
					{!isStatementsLoading ? (
						<h6
							className="text-muted pill-label"
							style={{
								fontWeight: '700',
								fontSize: 15,
							}}
						>
							{statements.length}
						</h6>
					) : null}
				</Col>
			</Row>

			<Row className="animated--grow-in">
				<Col>
					{isStatementsLoading ? (
						<Loading card />
					) : statements.length > 0 ? (
						<>
							{statements.map((statement) => (
								<div
									key={statement._id}
									className="profile_card clickable"
									onClick={() => handleStatementClick(statement)}
								>
									<div className="card-body">
										<Row>
											<Col>
												<h6
													className="text-gray-700"
													style={{
														fontWeight: '600',
														fontSize: 18,
													}}
												>
													<FontAwesomeIcon
														className="mr-2 text-gray-600"
														icon={faCircleDot}
													/>
													{statement?.type}
												</h6>
											</Col>
											<Col className="text-right">
												<Button
													className="btn btn-light"
													style={{
														fontWeight: 500,
														fontSize: 15,
													}}
													disabled={
														statement.numberOfInstructorGradedGrades !==
														statement.numberOfInstructorGrades
													}
													onClick={(e) => {
														e.stopPropagation();
														handleFinalizeGrading(statement);
													}}
												>
													{isGradeLoading ? (
														<Spinner size="sm" color="dark" type="grow" />
													) : (
														<FontAwesomeIcon icon={faCheckDouble} />
													)}
												</Button>
											</Col>
										</Row>
										<ul className="list-group list-group-flush">
											<li className="list-group-item">
												<Row>
													<Col className="d-flex justify-content-between flex-wrap">
														<h6
															className="text-gray-600"
															style={{
																fontWeight: '500',
															}}
														>
															<FontAwesomeIcon
																className="mr-2 text-gray-600"
																icon={faUserGraduate}
															/>
															{statement?.user.name} {statement?.user.surname}
														</h6>
														<span className="text-secondary">
															<FontAwesomeIcon
																className="mr-2 text-gray-600"
																icon={faArrowUp91}
															/>
															{statement.numberOfInstructorGradedGrades} /{' '}
															{statement.numberOfInstructorGrades}
														</span>
													</Col>
													<Row className="mt-2">
														<Col xs="12" sm="12" md="5" lg="6" xl="4">
															<small
																className="text-muted"
																style={{
																	textAlign: 'justify',
																	fontWeight: '600',
																	fontSize: 11,
																}}
															>
																<FontAwesomeIcon
																	className="mr-2 text-gray-600"
																	icon={faListCheck}
																/>
																{statement.numberOfInstructorTeachings === 1
																	? `${statement.numberOfInstructorTeachings} course `
																	: `${statement.numberOfInstructorTeachings} courses `}
																{getInstructorRoles(statement.teaching)}
															</small>
														</Col>
														<Col xs="12" sm="12" md="4" lg="3" xl="3">
															<small
																className="text-muted"
																style={{
																	textAlign: 'justify',
																	fontWeight: '600',
																	fontSize: 11,
																}}
															>
																<FontAwesomeIcon
																	className="mr-2 text-gray-600"
																	icon={faClock}
																/>
																Exams{' '}
																<small
																	className="text-success"
																	style={{
																		textAlign: 'justify',
																		fontWeight: '600',
																		fontSize: 12,
																	}}
																>
																	{statement.semester?.type?.includes(
																		SemesterType.Spring
																	)
																		? ExamPeriods.JUN
																		: ExamPeriods.FEB}{' '}
																	{semester?.academicYear}
																</small>
															</small>
														</Col>
														<Col xs="12" sm="12" md="4" lg="3" xl="3">
															<small
																className={
																	statement.numberOfInstructorGradedGrades ===
																	statement.numberOfInstructorGrades
																		? 'text-success'
																		: 'text-warning'
																}
																style={{
																	textAlign: 'justify',
																	fontWeight: '600',
																	fontSize: 11,
																}}
															>
																<FontAwesomeIcon
																	className="mr-2 text-gray-600"
																	icon={faDiagramPredecessor}
																/>
																{statement.numberOfInstructorGradedGrades ===
																statement.numberOfInstructorGrades
																	? GradingStatus.Graded
																	: GradingStatus.Pending}
															</small>
														</Col>
													</Row>
												</Row>
											</li>
										</ul>
									</div>
								</div>
							))}
						</>
					) : (
						<div className="mb-5">
							<SpinnerComponent message="There are no available course statements to be graded at the moment." />
						</div>
					)}
				</Col>
			</Row>
		</>
	);
}
