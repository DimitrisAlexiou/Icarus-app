import { Col, Row, Spinner } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDot } from '@fortawesome/free-regular-svg-icons';
import { ExaminationType } from '../../../constants/enums';
import Loading from '../../boilerplate/spinners/Spinner';

const GradeDetailsCard = ({
	grades,
	overallGrade,
	isGradesLoading,
	extractCourseTitle,
}) => {
	return (
		<>
			<div className="profile_card">
				<div className="card-body">
					<Row className="mb-3 d-flex flex-column align-items-center text-center">
						<Col>
							{isGradesLoading ? (
								<Spinner size="sm" color="dark" type="grow" />
							) : (
								<small
									className="text-muted pill-label"
									style={{
										textAlign: 'justify',
										fontWeight: '700',
										fontSize: 18,
									}}
								>
									{extractCourseTitle(grades)}
								</small>
							)}
						</Col>
						<Col className="text-right">
							{isGradesLoading ? (
								<Spinner size="sm" color="dark" type="grow" />
							) : (
								<>
									<small
										className="pill-label"
										style={{
											textAlign: 'justify',
											fontWeight: '700',
											fontSize: 18,
										}}
									>
										Overall
									</small>
									<small
										className="text-success"
										style={{
											textAlign: 'justify',
											fontWeight: '600',
											fontSize: 24,
										}}
									>
										{overallGrade}
									</small>
								</>
							)}
						</Col>
					</Row>
					{isGradesLoading ? (
						<Loading card />
					) : (
						Object.keys(grades).map((examination) => (
							<div key={examination} className="mb-3">
								<h6
									className="text-gray-600"
									style={{
										fontWeight: '600',
										fontSize: 18,
									}}
								>
									<FontAwesomeIcon
										className="mr-2 text-gray-600"
										icon={faCircleDot}
									/>
									{examination}
								</h6>
								<ul className="list-group list-group-flush">
									{grades[examination].map((grade, index) => (
										<li key={index} className="list-group-item">
											<Row>
												<Col className="d-flex justify-content-between flex-wrap">
													<small
														className={`${
															grade?.exam?.type.includes(
																ExaminationType.Progress
															)
																? 'text-primary'
																: grade?.exam?.type.includes(
																		ExaminationType.Final
																  )
																? 'text-danger'
																: grade?.exam?.type.includes(
																		ExaminationType.Exercise
																  )
																? 'text-warning'
																: 'text-info'
														}`}
														style={{
															textAlign: 'justify',
															fontWeight: '700',
															fontSize: 17,
														}}
													>
														{grade?.exam?.type}
													</small>
													<span
														className="text-success"
														style={{
															textAlign: 'justify',
															fontWeight: '600',
															fontSize: 19,
														}}
													>
														{grade?.exam?.grade}
													</span>
												</Col>
											</Row>
										</li>
									))}
								</ul>
							</div>
						))
					)}
				</div>
			</div>
		</>
	);
};

export default GradeDetailsCard;
