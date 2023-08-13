import { useDispatch } from 'react-redux';
import { Row, Col, Badge, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteSemester, setEditSemester } from '../../features/admin/semesterSlice';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons';
import { deleteAlert } from '../../constants/sweetAlertNotification';
import moment from 'moment';
import SemesterForm from './forms/SemesterForm';
import Spinner from '../../components/boilerplate/Spinner';

const SemesterCard = ({ semester, isSemesterLoading, isEditingSemester, editSemesterId }) => {
	const dispatch = useDispatch();

	return (
		<>
			<Col xl="6" lg="12" md="12" sm="12">
				<Badge color="info">Semester</Badge>
				<Row className="mt-3 mb-4">
					<Col xl="11" lg="11" md="12" sm="12">
						<div className="card shadow mb-3 py-3">
							<div className="card-body">
								{isSemesterLoading ? (
									<Spinner card />
								) : !semester || isEditingSemester ? (
									<>
										<Row>
											<SemesterForm
												semester={semester}
												isEditingSemester={isEditingSemester}
												editSemesterId={editSemesterId}
											/>
											<Col
												className="text-warning mt-2"
												style={{
													textAlign: 'justify',
													fontWeight: '600',
													fontSize: 12,
												}}
											>
												{isEditingSemester
													? 'Editing the semester configuration . . . '
													: 'Semester has not been defined for this period!'}
											</Col>
											{isEditingSemester ? (
												<Col
													xs="2"
													sm="6"
													md="6"
													className="text-right mt-1"
												>
													<FontAwesomeIcon
														onClick={() =>
															dispatch(
																setEditSemester({
																	isEditingSemester: false,
																	editSemesterId: '',
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
									<div>
										<Row className="mb-3">
											<Col md="6">
												<label>
													<b>Semester Type</b>
												</label>
												{semester.type ? (
													<p style={{ textAlign: 'justify' }}>
														{semester.type}
													</p>
												) : (
													<p style={{ textAlign: 'justify' }}>
														Invalid Type
													</p>
												)}
												<hr />
											</Col>
											<Col>
												<label>
													<b>Grading Period</b>
												</label>
												{semester.grading ? (
													<p style={{ textAlign: 'justify' }}>
														<span
															style={{
																fontWeight: '400',
																fontSize: 12,
															}}
														>
															Up to{' '}
														</span>
														{semester.grading}
														<span
															style={{
																fontWeight: '400',
																fontSize: 12,
															}}
														>
															{' '}
															weeks after the end of semester
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
													<b>Start Date</b>
												</label>
												<p style={{ textAlign: 'justify' }}>
													{moment(semester.startDate).format(
														'DD/MM/YYYY'
													)}
												</p>
												<hr />
											</Col>
											<Col>
												<label>
													<b>End Date</b>
												</label>
												<p style={{ textAlign: 'justify' }}>
													{moment(semester.endDate).format('DD/MM/YYYY')}
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
												Semester has been defined for this period!
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
																	setEditSemester({
																		editSemesterId:
																			semester._id,
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
																		dispatch(
																			deleteSemester(
																				semester._id
																			)
																		)
																	)
																}
															>
																<FontAwesomeIcon
																	icon={faTrashAlt}
																/>
															</Button>
														</Col>
													</Col>
												</Row>
											</Col>
										</Row>
									</div>
								)}
							</div>
						</div>
					</Col>
				</Row>
			</Col>
		</>
	);
};

export default SemesterCard;
