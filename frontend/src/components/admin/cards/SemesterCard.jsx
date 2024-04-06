import { useState } from 'react';
import { Row, Col, Badge, Button, Spinner } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons';
import { SemesterType } from '../../../constants/enums';
import useSemesterCard from '../../../hooks/admin/useSemesterCard';
import moment from 'moment';
import SemesterForm from '../forms/SemesterForm';
import Loading from '../../boilerplate/spinners/Spinner';

const SemesterCard = ({
	isSemesterLoading,
	isEditingSemester,
	editSemesterId,
	dispatch,
}) => {
	const {
		semester,
		semesters,
		setEditSemester,
		missingSemesters,
		handleDeleteSemester,
	} = useSemesterCard();

	const [addingSemester, setAddingSemester] = useState(false);

	return (
		<>
			<Col xl="6" lg="12" md="12" sm="12">
				<Badge color="info">Semester</Badge>
				<Row className="mt-3 mb-4">
					<Col xl="11" lg="11" md="12" sm="12">
						<div className="card shadow mb-3 py-1">
							<div className="card-body">
								{isSemesterLoading ? (
									<Loading card />
								) : !semester || addingSemester ? (
									<Row>
										{addingSemester ? (
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
														Defined Semesters
													</small>
												</Col>
												<Row>
													{semesters.map((semester) => (
														<Col key={semester._id} md="4" className="mb-3">
															<b
																style={{
																	textAlign: 'justify',
																	fontWeight: '600',
																	fontSize: 14,
																}}
															>
																{semester.type}{' '}
																<small
																	className="text-muted pill-label"
																	style={{
																		textAlign: 'justify',
																		fontWeight: '700',
																		fontSize: 11,
																	}}
																>
																	{semester.academicYear}
																</small>
															</b>
														</Col>
													))}
												</Row>
											</>
										) : null}
										<SemesterForm
											setAddingSemester={setAddingSemester}
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
											{addingSemester
												? 'Adding a new semester . . .'
												: !semesters
												? 'Semesters have not been defined yet!'
												: 'Semester has not been defined for current period!'}
										</Col>
										{addingSemester ? (
											<Col xs="2" sm="6" md="6" className="text-right mt-1">
												<FontAwesomeIcon
													className="clickable"
													onClick={() => setAddingSemester(false)}
													icon={faXmark}
												/>
											</Col>
										) : null}
									</Row>
								) : isEditingSemester ? (
									<>
										<SemesterForm
											semester={semester}
											isEditingSemester={isEditingSemester}
											editSemesterId={editSemesterId}
											dispatch={dispatch}
										/>
										<Row>
											<Col
												className="text-warning mt-2"
												style={{
													textAlign: 'justify',
													fontWeight: '600',
													fontSize: 12,
												}}
											>
												Editing the semester configuration . . .
											</Col>
											<Col xs="2" sm="6" md="6" className="text-right mt-1">
												<FontAwesomeIcon
													className="clickable"
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
													<p style={{ textAlign: 'justify' }}>Invalid Type</p>
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
										{semester.type.includes(SemesterType.Any) ? (
											<Row className="mb-3">
												<Col>
													<label>
														<b>Academic Year</b>
													</label>
													<p style={{ textAlign: 'justify' }}>
														{semester.academicYear}
													</p>
													<hr />
												</Col>
											</Row>
										) : (
											<Row className="mb-3">
												<Col md="6">
													<label>
														<b>Start Date</b>
													</label>
													<p style={{ textAlign: 'justify' }}>
														{moment(semester.startDate).format('DD/MM/YYYY')}
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
										)}
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
																		editSemesterId: semester._id,
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
																onClick={() => handleDeleteSemester(semester)}
															>
																{isSemesterLoading ? (
																	<Spinner size="sm" color="dark" type="grow" />
																) : (
																	<FontAwesomeIcon icon={faTrashAlt} />
																)}
															</Button>
														</Col>
													</Col>
												</Row>
											</Col>
										</Row>
										{!addingSemester ? (
											<Row className="mt-4">
												<Col className="text-sm-left text-center">
													<Button
														className="btn btn-light"
														style={{
															fontWeight: 500,
															fontSize: 15,
														}}
														onClick={() => setAddingSemester(true)}
													>
														Add Semester
													</Button>
												</Col>
												<Col
													className="text-warning text-right"
													style={{
														textAlign: 'justify',
														fontWeight: '600',
														fontSize: 12,
													}}
												>
													{missingSemesters.length > 0
														? `${missingSemesters.join(
																', '
														  )} semester(s) type(s) has not been defined for the current academic year.`
														: null}
												</Col>
											</Row>
										) : null}
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
