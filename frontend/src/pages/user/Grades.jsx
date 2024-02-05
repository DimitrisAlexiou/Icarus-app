import { Button, Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDot, faClock } from '@fortawesome/free-regular-svg-icons';
import {
	faCheckDouble,
	faDiagramPredecessor,
	faListCheck,
	faUserGraduate,
} from '@fortawesome/free-solid-svg-icons';
import HeaderWithSemester from '../../components/boilerplate/headers/HeaderWithSemester';
import PillHeader from '../../components/boilerplate/headers/PillHeader';

export default function Grades() {
	return (
		<>
			<HeaderWithSemester title="Grades" />

			<Row className="mb-4 justify-content-between animated--grow-in">
				<Col className="text-center">
					<PillHeader title="Statements" />
					<h6
						className="text-muted pill-label"
						style={{
							fontWeight: '700',
							fontSize: 15,
						}}
					>
						{/* {statements.length} */}
					</h6>
				</Col>
			</Row>

			<Row className="animated--grow-in">
				<Col>
					<div className="profile_card">
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
										Type of statement (assessment / vaccine)
									</h6>
								</Col>
								<Col className="text-right">
									<Button
										className="btn btn-light"
										style={{
											fontWeight: 500,
											fontSize: 15,
										}}
										// onClick={() => handleFinalizeGrading(currentStatement)}
									>
										<FontAwesomeIcon icon={faCheckDouble} />
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
												Student name
											</h6>
											<span className="text-secondary">
												number of graded courses
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
													Number of courses that has been assigned to the
													current logged in instructor (Theory/Lab)
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
													Exams period ΦΕΒΡ 2017-2018
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
														icon={faDiagramPredecessor}
													/>
													State of the grading (Pending / Finalized) add grading
													(status) in the statement schema
												</small>
											</Col>
										</Row>
									</Row>
								</li>
							</ul>
						</div>
					</div>
				</Col>
			</Row>
		</>
	);
}
