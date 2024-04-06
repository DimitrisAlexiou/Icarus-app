import { Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faBarcode,
	faFlask,
	faPersonChalkboard,
} from '@fortawesome/free-solid-svg-icons';
import { faFileLines } from '@fortawesome/free-regular-svg-icons';
import Spinner from '../../boilerplate/spinners/Spinner';
import SpinnerComponent from '../../boilerplate/spinners/SpinnerMessage';

export default function RecentGradesCard({
	grades,
	getOverallGrade,
	isGradesLoading,
	handleTeachingRowClick,
}) {
	return (
		<>
			<div className="profile_card">
				<div className="card-body">
					<Row className="mb-3 d-flex flex-column align-items-center text-center">
						<Col>
							<small
								className="text-muted pill-label"
								style={{
									textAlign: 'justify',
									fontWeight: '700',
									fontSize: 18,
								}}
							>
								Recent Grades
							</small>
						</Col>
					</Row>
					{isGradesLoading ? (
						<Spinner card />
					) : grades.length > 0 ? (
						grades.map((grade, index) => (
							<div key={index}>
								<ul className="list-group list-group-flush">
									<li className="list-group-item">
										<Row
											className="clickable"
											onClick={() => handleTeachingRowClick(grade.teaching)}
										>
											<Col className="d-flex justify-content-between flex-wrap">
												<h6
													className="text-gray-600"
													style={{
														fontWeight: '600',
													}}
												>
													<FontAwesomeIcon
														className="mr-2 text-gray-600"
														icon={faFileLines}
													/>
													{grade.teaching.course.title}
												</h6>
												<span
													className="text-success"
													style={{
														textAlign: 'justify',
														fontWeight: '600',
														fontSize: 19,
													}}
												>
													{getOverallGrade(grade.teaching._id)}
												</span>
											</Col>
											<Row className="mt-2">
												<Col xs="12" sm="12" md="4" lg="3" xl="2">
													<small
														className="text-muted"
														style={{
															textAlign: 'justify',
															fontWeight: '600',
															fontSize: 13,
														}}
													>
														<FontAwesomeIcon
															className="mr-2 text-gray-600"
															icon={faBarcode}
														/>
														{grade.teaching.course.courseId}
													</small>
												</Col>
												<Col>
													<small
														className="text-muted"
														style={{
															textAlign: 'justify',
															fontWeight: '600',
															fontSize: 13,
														}}
													>
														<FontAwesomeIcon
															className="mr-2 text-gray-600"
															icon={faPersonChalkboard}
														/>
														{grade.teaching?.theoryInstructors?.map(
															(instructor, index) => (
																<span key={index}>
																	{index > 0 && ', '}
																	{`${instructor?.user?.name.toUpperCase()} ${instructor?.user?.surname.toUpperCase()}`}
																</span>
															)
														)}
													</small>
												</Col>
												<Col>
													<small
														className="text-muted"
														style={{
															textAlign: 'justify',
															fontWeight: '600',
															fontSize: 13,
														}}
													>
														<FontAwesomeIcon
															className="mr-2 text-gray-600"
															icon={faFlask}
														/>
														{grade.teaching?.labInstructors?.map(
															(instructor, index) => (
																<span key={index}>
																	{index > 0 && ', '}
																	{`${instructor?.user?.name.toUpperCase()} ${instructor?.user?.surname.toUpperCase()}`}
																</span>
															)
														)}
													</small>
												</Col>
											</Row>
										</Row>
									</li>
								</ul>
								{index !== grades.length - 1 && <hr />}
							</div>
						))
					) : (
						<SpinnerComponent
							message={`There aren't any teachings passed in the recent statement.`}
						/>
					)}
				</div>
			</div>
		</>
	);
}
