import { Row, Col, Badge, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	deleteAssessment,
	setEditAssessment,
} from '../../../features/admin/assessmentSlice';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons';
import { deleteAlert } from '../../../constants/sweetAlertNotification';
import moment from 'moment';
import AssessmentForm from '../forms/AssessmentForm';
import Spinner from '../../boilerplate/spinners/Spinner';

const AssessementCard = ({
	assessment,
	semester,
	isAssessmentLoading,
	isEditingAssessment,
	editAssessmentId,
	dispatch,
}) => {
	return (
		<>
			<Col xl="6" lg="12" md="12" sm="12">
				<Badge color="info">Assessment / Vaccine</Badge>
				<Row className="mt-3 mb-4">
					<Col xl="11" lg="11" md="12" sm="12">
						<div className="card shadow mb-3 py-1">
							<div className="card-body">
								{!semester ? (
									<Col
										className="text-warning mt-2"
										style={{
											textAlign: 'justify',
											fontWeight: '600',
											fontSize: 12,
										}}
									>
										Semester must be defined first, in order to make the
										Assessment statement configuration for this period!
									</Col>
								) : isAssessmentLoading ? (
									<Spinner card />
								) : !assessment || isEditingAssessment ? (
									<>
										<Row>
											<AssessmentForm
												assessment={assessment}
												isEditingAssessment={isEditingAssessment}
												editAssessmentId={editAssessmentId}
												semester={semester}
												dispatch={dispatch}
											/>
											<Col
												className="text-warning mt-2"
												style={{
													textAlign: 'justify',
													fontWeight: '600',
													fontSize: 12,
												}}
											>
												{isEditingAssessment
													? 'Editing the assessment statement . . .'
													: 'Assessment/Vaccine statement period has not been defined!'}
											</Col>
											{isEditingAssessment ? (
												<Col xs="2" sm="6" md="6" className="text-right mt-1">
													<FontAwesomeIcon
														className="clickable"
														onClick={() =>
															dispatch(
																setEditAssessment({
																	isEditingAssessment: false,
																	editAssessmentId: '',
																})
															)
														}
														icon={faXmark}
													/>
												</Col>
											) : null}
										</Row>
									</>
								) : (
									<>
										<Row className="mb-3">
											<Col>
												<label>
													<b>Assessment Statement Period</b>
												</label>
												{assessment.period ? (
													<p style={{ textAlign: 'justify' }}>
														<span
															style={{
																fontWeight: '400',
																fontSize: 12,
															}}
														>
															Up to{' '}
														</span>
														{assessment.period}
														<span
															style={{
																fontWeight: '400',
																fontSize: 12,
															}}
														>
															{' '}
															weeks after the semester start
														</span>
													</p>
												) : (
													<p style={{ textAlign: 'justify' }}>0</p>
												)}
												<hr />
											</Col>
										</Row>
										<Row className="mb-3">
											<Col md="6">
												<label>
													<b>Start Date (Vaccine)</b>
												</label>
												<p style={{ textAlign: 'justify' }}>
													{moment(assessment.vaccineStartDate).format(
														'DD/MM/YYYY'
													)}
												</p>
												<hr />
											</Col>
											<Col>
												<label>
													<b>End Date (Vaccine)</b>
												</label>
												<p style={{ textAlign: 'justify' }}>
													{moment(assessment.vaccineEndDate).format(
														'DD/MM/YYYY'
													)}
												</p>
												<hr />
											</Col>
										</Row>
										<Row>
											<Col
												className="text-info mt-2"
												style={{
													textAlign: 'justify',
													fontWeight: '600',
													fontSize: 12,
												}}
											>
												Assessment statement period and Vaccine statement
												duration has been defined!
											</Col>
											<Col className="text-right px-0">
												<Row>
													<Col>
														<Button
															className="btn btn-light"
															style={{
																fontWeight: 500,
																fontSize: 15,
															}}
															onClick={() =>
																dispatch(
																	setEditAssessment({
																		editAssessmentId: assessment._id,
																	})
																)
															}
														>
															<FontAwesomeIcon icon={faEdit} />
														</Button>
													</Col>
													<Col>
														<Col>
															<Button
																className="btn btn-light"
																style={{
																	fontWeight: 500,
																	fontSize: 15,
																}}
																onClick={async () =>
																	deleteAlert(() =>
																		dispatch(deleteAssessment(assessment._id))
																	)
																}
															>
																<FontAwesomeIcon icon={faTrashAlt} />
															</Button>
														</Col>
													</Col>
												</Row>
											</Col>
										</Row>
									</>
								)}
							</div>
						</div>
					</Col>
				</Row>
			</Col>
		</>
	);
};

export default AssessementCard;
