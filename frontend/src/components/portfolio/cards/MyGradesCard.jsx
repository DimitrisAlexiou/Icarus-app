import { Col, Row } from 'reactstrap';
import { faFlask, faPersonChalkboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Examination } from '../../../constants/enums';
import useMyGradesCard from '../../../hooks/user/useMyGradesCard';
import PillHeader from '../../boilerplate/headers/PillHeader';
import Spinner from '../../boilerplate/spinners/Spinner';
import SpinnerComponent from '../../boilerplate/spinners/SpinnerMessage';

export default function MyGradesCard() {
	const { user, grades, isGradesLoading } = useMyGradesCard();

	return (
		<>
			<Row className="justify-content-center animated--grow-in mb-3">
				<Col className="text-center">
					<PillHeader title="Recent Grades" />
				</Col>
			</Row>
			<div className="profile_card">
				<div className="card-body">
					<div className="align-items-center text-center">
						{isGradesLoading ? (
							<Spinner card />
						) : grades && Object.keys(grades).length > 0 ? (
							Object.values(grades).map((group, index) => (
								<div key={group.teaching._id}>
									<p
										style={{
											textAlign: 'justify',
											fontWeight: '700',
											fontSize: 15,
										}}
										className="text-light-cornflower-blue mb-2"
									>
										{group.teaching.course.title} (
										{group.teaching.course.courseId})
									</p>
									{group?.grades?.map((grade, index) => (
										<Row key={index}>
											<Col>
												<Row
													className="mb-2"
													style={{ textAlign: 'justify', fontSize: 13 }}
												>
													<Col xl="3" lg="3" md="3" xs="6" sm="3">
														{grade?.exam?.type}
													</Col>
													<Col xl="7" lg="7" md="7" xs="4" sm="7">
														<small
															key={index}
															className="text-muted"
															style={{
																textAlign: 'justify',
																fontWeight: '700',
																fontSize: 15,
																display: 'inline',
															}}
														>
															{grade?.exam?.grade}
														</small>
													</Col>
													<Col xl="2" lg="2" md="2" xs="2" sm="2">
														{grade?.exam?.examination?.includes(
															Examination.Lab
														) ? (
															<FontAwesomeIcon
																className="mr-2 text-honey-yellow pill-label"
																icon={faFlask}
															/>
														) : (
															<FontAwesomeIcon
																className="mr-2 text-blue-green pill-label"
																icon={faPersonChalkboard}
															/>
														)}
													</Col>
												</Row>
											</Col>
										</Row>
									))}
									{index !== Object.values(grades).length - 1 && <hr />}
								</div>
							))
						) : (
							<SpinnerComponent
								message={
									user.user.instructor
										? 'You have not submitted any grades yet.'
										: `There aren't any grades submitted yet.`
								}
							/>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
