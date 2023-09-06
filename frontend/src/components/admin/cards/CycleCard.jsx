import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, Badge, Button } from 'reactstrap';
import { deleteCycle, deleteCycles, setEditCycle } from '../../../features/admin/cyclesSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons';
import { deleteAlert } from '../../../constants/sweetAlertNotification';
import CycleForm from '../forms/CycleForm';
import Spinner from '../../boilerplate/Spinner';

const CycleCard = ({ cycles, isCyclesLoading, isEditingCycle, editCycleId }) => {
	const [editedCycleIndex, setEditedCycleIndex] = useState(-1);
	const [addingCycle, setAddingCycle] = useState(false);
	const dispatch = useDispatch();

	return (
		<>
			<Col xl="6" lg="12" md="12" sm="12">
				<Badge color="info">Cycles</Badge>
				<Row className="mt-3 mb-4">
					<Col xl="11" lg="11" md="12" sm="12">
						<div className="card shadow mb-3 py-3">
							<div className="card-body">
								{isCyclesLoading ? (
									<Spinner card />
								) : !cycles.length > 0 || addingCycle ? (
									<Row>
										{addingCycle ? (
											<>
												<Col>
													<small
														className="text-muted pill-label mb-3"
														style={{
															textAlign: 'justify',
															fontWeight: '700',
															fontSize: 15,
														}}
													>
														Defined Cycles
													</small>
												</Col>
												{cycles.map((cycle, index) => (
													<div key={cycle._id}>
														<>
															<label>
																<b
																	style={{
																		textAlign: 'justify',
																		fontWeight: '600',
																		fontSize: 13,
																	}}
																>
																	Cycle {index + 1}
																</b>
															</label>
															<Row className="mb-3">
																<p
																	style={{
																		textAlign: 'justify',
																		fontWeight: '500',
																		fontSize: 13,
																	}}
																>
																	{cycle.cycle}
																</p>
															</Row>
														</>
													</div>
												))}
											</>
										) : null}
										<CycleForm setAddingCycle={setAddingCycle} />
										<Col
											className="text-warning mt-2"
											style={{
												textAlign: 'justify',
												fontWeight: '600',
												fontSize: 12,
											}}
										>
											{addingCycle
												? 'Adding a new cycle(s) . . .'
												: 'Cycles have not been defined!'}
										</Col>
										{addingCycle ? (
											<Col xs="2" sm="6" md="6" className="text-right mt-1">
												<FontAwesomeIcon
													onClick={() => setAddingCycle(false)}
													icon={faXmark}
												/>
											</Col>
										) : null}
									</Row>
								) : isEditingCycle ? (
									<Row>
										{cycles.map((cycle, index) => (
											<div key={cycle._id}>
												{editedCycleIndex === index && isEditingCycle ? (
													<CycleForm
														cycle={cycle}
														isEditingCycle={isEditingCycle}
														editCycleId={editCycleId}
													/>
												) : null}
											</div>
										))}
										<Col
											className="text-warning mt-2"
											style={{
												textAlign: 'justify',
												fontWeight: '600',
												fontSize: 12,
											}}
										>
											Editing the cycle . . .
										</Col>
										<Col xs="2" sm="6" md="6" className="text-right mt-1">
											<FontAwesomeIcon
												onClick={() => {
													setEditedCycleIndex(-1);
													dispatch(
														setEditCycle({
															isEditingCycle: false,
															editCycleId: '',
														})
													);
												}}
												icon={faXmark}
											/>
										</Col>
									</Row>
								) : (
									<>
										<Row className="mb-3">
											<Col>
												{cycles.map((cycle, index) => (
													<div key={cycle._id}>
														<>
															<label>
																<b>Cycle {index + 1}</b>
															</label>
															<Row>
																<Col>
																	<p
																		style={{
																			textAlign: 'justify',
																		}}
																	>
																		{cycle.cycle}
																	</p>
																</Col>
																<Col className="text-right">
																	<Row>
																		<Col>
																			<Button
																				className="btn btn-light"
																				style={{
																					fontWeight: 500,
																					fontSize: 15,
																				}}
																				onClick={() => {
																					setEditedCycleIndex(
																						index
																					);
																					dispatch(
																						setEditCycle(
																							{
																								isEditingCycle: true,
																								editCycleId:
																									cycle._id,
																							}
																						)
																					);
																				}}
																			>
																				<FontAwesomeIcon
																					icon={faEdit}
																				/>
																			</Button>
																		</Col>
																		<Col>
																			<Button
																				className="btn btn-light"
																				style={{
																					fontWeight: 500,
																					fontSize: 15,
																				}}
																				onClick={async () =>
																					deleteAlert(
																						() =>
																							dispatch(
																								deleteCycle(
																									cycle._id
																								)
																							)
																					)
																				}
																			>
																				<FontAwesomeIcon
																					icon={
																						faTrashAlt
																					}
																				/>
																			</Button>
																		</Col>
																	</Row>
																</Col>
															</Row>
															<hr />
														</>
													</div>
												))}
											</Col>
										</Row>
										<Row>
											<Col
												xs="12"
												sm="12"
												md="6"
												className="text-info"
												style={{
													textAlign: 'justify',
													fontWeight: '600',
													fontSize: 12,
												}}
											>
												{' '}
												Cycles have been defined!
											</Col>
											<Col className="text-right mt-sm-0 mt-4">
												<Row>
													<Col className="text-sm-left text-center">
														<Button
															className="btn btn-light"
															style={{
																fontWeight: 500,
																fontSize: 15,
															}}
															onClick={() => setAddingCycle(true)}
														>
															Add Cycle
														</Button>
													</Col>
													<Col className="text-sm-right text-center">
														<Button
															className="btn btn-light"
															style={{
																fontWeight: 500,
																fontSize: 15,
															}}
															onClick={async () =>
																deleteAlert(() =>
																	dispatch(deleteCycles())
																)
															}
														>
															<FontAwesomeIcon icon={faTrashAlt} />
														</Button>
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

export default CycleCard;
