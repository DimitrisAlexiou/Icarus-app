import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Badge, Row, Col, Button } from 'reactstrap';
import { getSemester, deleteSemester, setEditSemester } from '../../features/admin/semesterSlice';
import {
	getAssessment,
	deleteAssessment,
	setEditAssessment,
} from '../../features/admin/assessmentSlice';
import { getReview, deleteReview, setEditReview } from '../../features/admin/reviewSlice';
import {
	getDegreeRules,
	deleteDegreeRules,
	setEditDegreeRules,
} from '../../features/admin/degreeRulesSlice';
import { getCycles, deleteCycles, setEditCycles } from '../../features/admin/cyclesSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons';
import Spinner from '../../components/boilerplate/Spinner';
import SemesterForm from '../../components/admin/SemesterForm';
import AssessmentForm from '../../components/admin/AssessmentForm';
import ReviewForm from '../../components/admin/ReviewForm';
import DegreeRulesForm from '../../components/admin/DegreeRulesForm';
import CyclesForm from '../../components/admin/CyclesForm';
import moment from 'moment';

export default function Configuration() {
	const {
		semester,
		isLoading: isSemesterLoading,
		isEditingSemester,
		editSemesterId,
	} = useSelector((state) => state.semesters);
	const {
		assessment,
		isLoading: isAssessmentLoading,
		isEditingAssessment,
		editAssessmentId,
	} = useSelector((state) => state.assessment);
	const {
		review,
		isLoading: isReviewLoading,
		isEditingReview,
		editReviewId,
	} = useSelector((state) => state.review);
	const {
		degreeRules,
		isLoading: isDegreeRulesLoading,
		isEditingDegreeRules,
		editDegreeRulesId,
	} = useSelector((state) => state.degreeRules);
	const {
		cycles,
		isLoading: isCyclesLoading,
		isEditingCycles,
		editCyclesId,
	} = useSelector((state) => state.cycles);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getSemester());
		dispatch(getAssessment());
		dispatch(getReview());
		dispatch(getDegreeRules());
		dispatch(getCycles());
	}, [dispatch]);

	const handleDeleteSemester = () => {
		dispatch(deleteSemester(semester._id));
	};

	const handleDeleteAssessment = () => {
		dispatch(deleteAssessment(assessment._id));
	};

	const handleDeleteReview = () => {
		dispatch(deleteReview(review._id));
	};

	const handleDeleteDegreeRules = () => {
		dispatch(deleteDegreeRules(degreeRules._id));
	};

	const handleDeleteCycles = () => {
		dispatch(deleteCycles(cycles._id));
	};

	return (
		<>
			<h3 className="mb-5 text-gray-800 font-weight-bold animated--grow-in">
				System Configuration
			</h3>

			<Row className="animated--grow-in">
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
														sm="6"
														md="6"
														xs="12"
														className="text-sm-right text-center"
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
										<>
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
														{moment(semester.endDate).format(
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
																	onClick={handleDeleteSemester}
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
				<Col xl="6" lg="12" md="12" sm="12">
					<Badge color="info">Assessment / Vaccine</Badge>
					<Row className="mt-3 mb-4">
						<Col xl="11" lg="11" md="12" sm="12">
							<div className="card shadow mb-3 py-3">
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
													<Col
														sm="6"
														md="6"
														xs="12"
														className="text-sm-right text-center"
													>
														<FontAwesomeIcon
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
													Assessment statement period and Vaccine
													statement duration has been defined!
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
																			editAssessmentId:
																				assessment._id,
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
																	onClick={handleDeleteAssessment}
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
			</Row>

			<Row className="animated--grow-in">
				<Col xl="6" lg="12" md="12" sm="12">
					<Badge color="info">Review</Badge>
					<Row className="mt-3 mb-4">
						<Col xl="11" lg="11" md="12" sm="12">
							<div className="card shadow mb-3 py-3">
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
											Review statement configuration for this period!
										</Col>
									) : isReviewLoading ? (
										<Spinner card />
									) : !review || isEditingReview ? (
										<>
											<Row>
												<ReviewForm
													review={review}
													isEditingReview={isEditingReview}
													editReviewId={editReviewId}
													semester={semester}
												/>
												<Col
													className="text-warning mt-2"
													style={{
														textAlign: 'justify',
														fontWeight: '600',
														fontSize: 12,
													}}
												>
													{isEditingReview
														? 'Editing the review statement . . .'
														: 'Review statement period has not been defined!'}
												</Col>
												{isEditingReview ? (
													<Col
														sm="6"
														md="6"
														xs="12"
														className="text-sm-right text-center"
													>
														<FontAwesomeIcon
															onClick={() =>
																dispatch(
																	setEditReview({
																		isEditingReview: false,
																		editReviewId: '',
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
														<b>Review Period</b>
													</label>
													{review.startAfter ? (
														<p style={{ textAlign: 'justify' }}>
															{review.startAfter}
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
														<b>Start Date</b>
													</label>
													<p style={{ textAlign: 'justify' }}>
														{moment(review.startDate).format(
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
														{moment(review.endDate).format(
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
													Review Statement period has been defined!
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
																		setEditReview({
																			editReviewId:
																				review._id,
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
																	onClick={handleDeleteReview}
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
														sm="6"
														md="6"
														xs="12"
														className="text-sm-right text-center"
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
																	onClick={
																		handleDeleteDegreeRules
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
			</Row>

			<Row className="animated--grow-in">
				<Col xl="6" lg="12" md="12" sm="12">
					<Badge color="info">Cycles</Badge>
					<Row className="mt-3 mb-4">
						<Col xl="11" lg="11" md="12" sm="12">
							<div className="card shadow mb-3 py-3">
								<div className="card-body">
									{isCyclesLoading ? (
										<Spinner card />
									) : !cycles || isEditingCycles ? (
										<>
											<Row>
												<CyclesForm
													cycles={cycles}
													isEditingCycles={isEditingCycles}
													editCyclesId={editCyclesId}
												/>
												<Col
													className="text-warning mt-2"
													style={{
														textAlign: 'justify',
														fontWeight: '600',
														fontSize: 12,
													}}
												>
													{isEditingCycles
														? 'Editing the cycles . . .'
														: 'Cycles have not been defined!'}
												</Col>
												{isEditingCycles ? (
													<Col
														sm="6"
														md="6"
														xs="12"
														className="text-sm-right text-center"
													>
														<FontAwesomeIcon
															onClick={() =>
																dispatch(
																	setEditCycles({
																		isEditingCycles: false,
																		editCyclesId: '',
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
													{cycles ? (
														<>
															{cycles.names.map((cycle, index) => (
																<div key={cycle._id}>
																	<label>
																		<b>Cycle {index + 1}</b>
																	</label>
																	<p
																		style={{
																			textAlign: 'justify',
																		}}
																	>
																		{cycle.cycle}
																	</p>
																	<hr />
																</div>
															))}
														</>
													) : (
														<p style={{ textAlign: 'justify' }}>
															Invalid Cycles
														</p>
													)}
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
													Cycles have been defined!
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
																		setEditCycles({
																			editCyclesId:
																				cycles._id,
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
																	onClick={handleDeleteCycles}
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
			</Row>
		</>
	);
}
