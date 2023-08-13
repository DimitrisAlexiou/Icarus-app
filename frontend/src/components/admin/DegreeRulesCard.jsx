import { useDispatch } from 'react-redux';
import { Row, Col, Badge, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons';
import { deleteDegreeRules, setEditDegreeRules } from '../../features/admin/degreeRulesSlice';
import { deleteAlert } from '../../constants/sweetAlertNotification';
import DegreeRulesForm from './forms/DegreeRulesForm';
import Spinner from '../../components/boilerplate/Spinner';

const DegreeRulesCard = ({
	degreeRules,
	isDegreeRulesLoading,
	isEditingDegreeRules,
	editDegreeRulesId,
}) => {
	const dispatch = useDispatch();

	return (
		<>
			<Col xl="6" lg="12" md="12" sm="12">
				<Badge color="info">Degree Rules</Badge>
				<Row className="mt-3 mb-4">
					<Col xl="11" lg="11" md="12" sm="12">
						<div className="card shadow mb-3 py-3">
							<div className="card-body">
								{isDegreeRulesLoading ? (
									<Spinner card />
								) : !degreeRules || isEditingDegreeRules ? (
									<>
										<Row>
											<DegreeRulesForm
												degreeRules={degreeRules}
												isEditingDegreeRules={isEditingDegreeRules}
												editDegreeRulesId={editDegreeRulesId}
											/>
											<Col
												className="text-warning mt-2"
												style={{
													textAlign: 'justify',
													fontWeight: '600',
													fontSize: 12,
												}}
											>
												{isEditingDegreeRules
													? 'Editing the degree Rules . . .'
													: 'Degree Rules have not been defined!'}
											</Col>
											{isEditingDegreeRules ? (
												<Col
													xs="2"
													sm="6"
													md="6"
													className="text-right mt-1"
												>
													<FontAwesomeIcon
														onClick={() =>
															dispatch(
																setEditDegreeRules({
																	isEditingDegreeRules: false,
																	editDegreeRulesId: '',
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
											<Col md="6">
												<label>
													<b>Obligatory Courses</b>
												</label>
												{degreeRules.courses ? (
													<p style={{ textAlign: 'justify' }}>
														{degreeRules.courses}
													</p>
												) : (
													<p style={{ textAlign: 'justify' }}>0</p>
												)}
												<hr />
											</Col>
											<Col>
												<label>
													<b>Obligatory Cycles (completed)</b>
												</label>
												{degreeRules.cycles ? (
													<p style={{ textAlign: 'justify' }}>
														{degreeRules.cycles}
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
													<b>Cycle Completion (Courses)</b>
												</label>
												{degreeRules.cycleCourses ? (
													<p style={{ textAlign: 'justify' }}>
														{degreeRules.cycleCourses}
													</p>
												) : (
													<p style={{ textAlign: 'justify' }}>0</p>
												)}
												<hr />
											</Col>
											<Col>
												<label>
													<b>Obligatory Practice</b>
												</label>

												<p style={{ textAlign: 'justify' }}>
													{degreeRules.practice ? 'Yes' : 'No'}
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
												Degree Rules have been defined!
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
																	setEditDegreeRules({
																		editDegreeRulesId:
																			degreeRules._id,
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
																			deleteDegreeRules(
																				degreeRules._id
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

export default DegreeRulesCard;
