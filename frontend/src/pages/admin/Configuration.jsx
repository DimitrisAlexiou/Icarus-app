import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Badge } from 'reactstrap';
import { FormGroup, Label, Row, Col, Button } from 'reactstrap';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import { SemesterSchema } from '../../schemas/admin/Semester';
import { AssessmentSchema } from '../../schemas/admin/Assessment';
import { ReviewSchema } from '../../schemas/admin/Review';
import { DegreeRulesSchema } from '../../schemas/admin/DegreeRules';
import { CyclesSchema } from '../../schemas/admin/Cycles';
import {
	defineSemester,
	getSemester,
	updateSemester,
	deleteSemester,
} from '../../features/admin/semesterSlice';
import {
	defineAssessment,
	getAssessment,
	deleteAssessment,
} from '../../features/admin/assessmentSlice';
import { defineReview, getReview, deleteReview } from '../../features/admin/reviewSlice';
import {
	defineDegreeRules,
	getDegreeRules,
	deleteDegreeRules,
} from '../../features/admin/degreeRulesSlice';
import { defineCycles, getCycles, deleteCycles } from '../../features/admin/cyclesSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons';
import { Toast } from '../../constants/sweetAlertNotification';
import SubmitButton from '../../components/buttons/SubmitButton';
import FormErrorMessage from '../../components/FormErrorMessage';
import Spinner from '../../components/boilerplate/Spinner';
import SemesterForm from '../../components/admin/SemesterForm';
import AssessmentForm from '../../components/admin/AssessmentForm';
import ReviewForm from '../../components/admin/ReviewForm';
import DegreeRulesForm from '../../components/admin/DegreeRulesForm';

export default function Configuration() {
	const [isMounted, setIsMounted] = useState(true);
	const [mode, setMode] = useState('create');

	const {
		semester,
		isSuccess: isSemesterSuccess,
		isError: isSemesterError,
		isLoading: isSemesterLoading,
		message: semesterMessage,
	} = useSelector((state) => state.semesters);
	const {
		assessment,
		isSuccess: isAssessmentSuccess,
		isError: isAssessmentError,
		isLoading: isAssessmentLoading,
		message: assessmentMessage,
	} = useSelector((state) => state.assessment);
	const {
		review,
		isSuccess: isReviewSuccess,
		isError: isReviewError,
		isLoading: isReviewLoading,
		message: reviewMessage,
	} = useSelector((state) => state.review);
	const {
		degreeRules,
		isSuccess: isDegreeRulesSuccess,
		isError: isDegreeRulesError,
		isLoading: isDegreeRulesLoading,
		message: degreeRulesMessage,
	} = useSelector((state) => state.degreeRules);
	const {
		cycles,
		isSuccess: isCyclesSuccess,
		isError: isCyclesError,
		isLoading: isCyclesLoading,
		message: cyclesMessage,
	} = useSelector((state) => state.cycles);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getSemester());
		dispatch(getAssessment());
		dispatch(getReview());
		dispatch(getDegreeRules());
		dispatch(getCycles());

		if (isSemesterError) {
			if (semesterMessage !== 'Seems like there is no defined semester for this period!') {
				Toast.fire({
					title: 'Something went wrong!',
					text: semesterMessage,
					icon: 'error',
				});
			}
		} else if (isAssessmentError) {
			if (
				assessmentMessage !==
				'Seems like there is no assessment statement duration period defined!'
			) {
				Toast.fire({
					title: 'Something went wrong!',
					text: assessmentMessage,
					icon: 'error',
				});
			}
		} else if (isReviewError) {
			if (reviewMessage !== 'Seems like there is no review statement period defined!') {
				Toast.fire({
					title: 'Something went wrong!',
					text: reviewMessage,
					icon: 'error',
				});
			}
		} else if (isDegreeRulesError) {
			if (degreeRulesMessage !== 'Seems like there are no defined degree rules!') {
				Toast.fire({
					title: 'Something went wrong!',
					text: degreeRulesMessage,
					icon: 'error',
				});
			}
		} else if (isCyclesError) {
			if (cyclesMessage !== 'Seems like there are no defined cycles!') {
				Toast.fire({
					title: 'Something went wrong!',
					text: cyclesMessage,
					icon: 'error',
				});
			}
		}
		if (isSemesterSuccess) {
			Toast.fire({
				title: 'Success',
				text: 'Current semester deleted!',
				icon: 'success',
			});
			navigate('/admin/configuration');
		} else if (isAssessmentSuccess) {
			Toast.fire({
				title: 'Success',
				text: 'Assessment configuration deleted!',
				icon: 'success',
			});
			navigate('/admin/configuration');
		} else if (isReviewSuccess) {
			Toast.fire({
				title: 'Success',
				text: 'Review configuration deleted!',
				icon: 'success',
			});
			navigate('/admin/configuration');
		} else if (isDegreeRulesSuccess) {
			Toast.fire({
				title: 'Success',
				text: 'Degree Rules configuration deleted!',
				icon: 'success',
			});
			navigate('/admin/configuration');
		} else if (isCyclesSuccess) {
			Toast.fire({
				title: 'Success',
				text: 'Cycles configuration deleted!',
				icon: 'success',
			});
			navigate('/admin/configuration');
		}
	}, [
		dispatch,
		navigate,
		isSemesterError,
		isAssessmentError,
		isReviewError,
		isDegreeRulesError,
		isCyclesError,
		semesterMessage,
		assessmentMessage,
		reviewMessage,
		degreeRulesMessage,
		cyclesMessage,
		isSemesterSuccess,
		isAssessmentSuccess,
		isReviewSuccess,
		isDegreeRulesSuccess,
		isCyclesSuccess,
	]);

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

	useEffect(() => {
		return () => {
			setIsMounted(false);
		};
	}, []);

	if (
		isSemesterLoading ||
		isAssessmentLoading ||
		isReviewLoading ||
		isDegreeRulesLoading ||
		isCyclesLoading
	) {
		return <Spinner />;
	}

	return (
		<>
			<h1 className="h3 mb-5 text-gray-800 font-weight-bold animated--grow-in">
				System Configuration
			</h1>

			<Row className="animated--grow-in">
				<Col xl="6" lg="12" md="12" sm="12">
					<Badge color="info">Semester</Badge>
					<Row className="mt-3 mb-4">
						<Col xl="11" lg="11" md="12" sm="12">
							<div className="card shadow mb-3 py-3">
								<div className="card-body">
									{!semester ? (
										<>
											<Row>
												<Formik
													initialValues={
														mode === 'create'
															? {
																	type: '',
																	grading: 0,
																	startDate: new Date(),
																	endDate: new Date(),
															  }
															: {
																	type: semester.type,
																	grading: semester.grading,
																	startDate: semester.startDate,
																	endDate: semester.endDate,
															  }
													}
													validationSchema={SemesterSchema}
													onSubmit={(values, { setSubmitting }) => {
														const semester = {
															type: values.type,
															grading: values.grading,
															startDate: values.startDate,
															endDate: values.endDate,
														};
														if (isMounted) {
															if (mode === 'create') {
																dispatch(defineSemester(semester));
															} else {
																dispatch(
																	updateSemester({
																		id: semester._id,
																		semester,
																	})
																);
															}
															setSubmitting(false);
															setIsMounted(false);
														}
													}}
													validateOnMount
												>
													{({ isSubmitting, dirty, handleReset }) => (
														<SemesterForm
															isSubmitting={isSubmitting}
															dirty={dirty}
															handleReset={handleReset}
														/>
													)}
												</Formik>
												<Col
													className="text-warning mt-2"
													style={{
														textAlign: 'justify',
														fontWeight: '600',
														fontSize: 12,
													}}
												>
													Semester has not been defined for this period!
												</Col>
											</Row>
										</>
									) : mode === 'create' ? (
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
														{new Date(semester.startDate)
															.toLocaleDateString('en-US', {
																year: 'numeric',
																month: '2-digit',
																day: '2-digit',
															})
															.replace(
																/(\d+)\/(\d+)\/(\d+)/,
																'$2/$1/$3'
															)}
													</p>
													<hr />
												</Col>
												<Col>
													<label>
														<b>End Date</b>
													</label>
													<p style={{ textAlign: 'justify' }}>
														{new Date(semester.endDate)
															.toLocaleDateString('en-US', {
																year: 'numeric',
																month: '2-digit',
																day: '2-digit',
															})
															.replace(
																/(\d+)\/(\d+)\/(\d+)/,
																'$2/$1/$3'
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
													Semester has been assigned for this period!
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
																	setMode(
																		mode === 'create'
																			? 'edit'
																			: 'create'
																	)
																}
															>
																{mode === 'create' ? (
																	<FontAwesomeIcon
																		icon={faEdit}
																	/>
																) : (
																	<FontAwesomeIcon
																		icon={faCheck}
																	/>
																)}
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
									) : (
										<>
											<Row>
												<Formik
													initialValues={{
														type: semester.type,
														grading: semester.grading,
														startDate: semester.startDate,
														endDate: semester.endDate,
													}}
													validationSchema={SemesterSchema}
													onSubmit={(values, { setSubmitting }) => {
														const semester = {
															type: values.type,
															grading: values.grading,
															startDate: values.startDate,
															endDate: values.endDate,
														};
														if (isMounted) {
															dispatch(
																updateSemester({
																	id: semester._id,
																	semester,
																})
															);
															setSubmitting(false);
															setIsMounted(false);
														}
													}}
													validateOnMount
												>
													{({ isSubmitting, dirty, handleReset }) => (
														<SemesterForm
															isSubmitting={isSubmitting}
															dirty={dirty}
															handleReset={handleReset}
														/>
													)}
												</Formik>
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
									{!assessment ? (
										<>
											<Row>
												<Formik
													initialValues={{
														startDate: new Date(),
														endDate: new Date(),
														period: 0,
													}}
													validationSchema={AssessmentSchema}
													onSubmit={(values, { setSubmitting }) => {
														const assessment = {
															vaccineStartDate: values.startDate,
															vaccineEndDate: values.endDate,
															period: values.period,
														};
														dispatch(defineAssessment(assessment));
														Toast.fire({
															title: 'Success',
															text: 'Assessment/Vaccine period defined!',
															icon: 'success',
														});
														setSubmitting(false);
													}}
													validateOnMount
												>
													{({ isSubmitting, dirty, handleReset }) => (
														<AssessmentForm
															isSubmitting={isSubmitting}
															dirty={dirty}
															handleReset={handleReset}
														/>
													)}
												</Formik>
												<Col
													className="text-warning mt-2"
													style={{
														textAlign: 'justify',
														fontWeight: '600',
														fontSize: 12,
													}}
												>
													Assessment/Vaccine statement period has not been
													defined!
												</Col>
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
														{new Date(assessment.vaccineStartDate)
															.toLocaleDateString('en-US', {
																year: 'numeric',
																month: '2-digit',
																day: '2-digit',
															})
															.replace(
																/(\d+)\/(\d+)\/(\d+)/,
																'$2/$1/$3'
															)}
													</p>
													<hr />
												</Col>
												<Col>
													<label>
														<b>End Date (Vaccine)</b>
													</label>
													<p style={{ textAlign: 'justify' }}>
														{new Date(assessment.vaccineEndDate)
															.toLocaleDateString('en-US', {
																year: 'numeric',
																month: '2-digit',
																day: '2-digit',
															})
															.replace(
																/(\d+)\/(\d+)\/(\d+)/,
																'$2/$1/$3'
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
																// onClick={handleEditAssessment}
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
									{!review ? (
										<>
											<Row>
												<Formik
													initialValues={{
														startDate: new Date(),
														endDate: new Date(),
														start: 0,
													}}
													validationSchema={ReviewSchema}
													onSubmit={(values, { setSubmitting }) => {
														const review = {
															startDate: values.startDate,
															endDate: values.endDate,
															start: values.start,
														};
														if (isMounted) {
															dispatch(defineReview(review));
															setSubmitting(false);
															setIsMounted(false);
														}
													}}
													validateOnMount
												>
													{({ isSubmitting, dirty, handleReset }) => (
														<ReviewForm
															isSubmitting={isSubmitting}
															dirty={dirty}
															handleReset={handleReset}
														/>
													)}
												</Formik>
												<Col
													className="text-warning mt-2"
													style={{
														textAlign: 'justify',
														fontWeight: '600',
														fontSize: 12,
													}}
												>
													Review Statement period has not been defined!
												</Col>
											</Row>
										</>
									) : (
										<>
											<Row className="mb-3">
												<Col>
													<label>
														<b>Review Period</b>
													</label>
													{review.start ? (
														<p style={{ textAlign: 'justify' }}>
															{review.start}
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
														{new Date(review.startDate)
															.toLocaleDateString('en-US', {
																year: 'numeric',
																month: '2-digit',
																day: '2-digit',
															})
															.replace(
																/(\d+)\/(\d+)\/(\d+)/,
																'$2/$1/$3'
															)}
													</p>
													<hr />
												</Col>
												<Col>
													<label>
														<b>End Date</b>
													</label>
													<p style={{ textAlign: 'justify' }}>
														{new Date(review.endDate)
															.toLocaleDateString('en-US', {
																year: 'numeric',
																month: '2-digit',
																day: '2-digit',
															})
															.replace(
																/(\d+)\/(\d+)\/(\d+)/,
																'$2/$1/$3'
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
																// onClick={handleEditReview}
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
									{!degreeRules ? (
										<>
											<Row>
												<Formik
													initialValues={{
														cycles: 0,
														courses: 0,
														cycleCourses: 0,
														practice: false,
													}}
													validationSchema={DegreeRulesSchema}
													onSubmit={(values, { setSubmitting }) => {
														const degreeRules = {
															cycles: values.cycles,
															courses: values.courses,
															cycleCourses: values.cycleCourses,
															practice: values.practice,
														};
														if (isMounted) {
															dispatch(
																defineDegreeRules(degreeRules)
															);
															setSubmitting(false);
															setIsMounted(false);
														}
													}}
													validateOnMount
												>
													{({ isSubmitting, dirty, handleReset }) => (
														<DegreeRulesForm
															isSubmitting={isSubmitting}
															dirty={dirty}
															handleReset={handleReset}
														/>
													)}
												</Formik>
												<Col
													className="text-warning mt-2"
													style={{
														textAlign: 'justify',
														fontWeight: '600',
														fontSize: 12,
													}}
												>
													Degree Rules have not been assigned!
												</Col>
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
													{degreeRules.practice ? (
														<p style={{ textAlign: 'justify' }}>
															{degreeRules.practice ? 'Yes' : 'No'}
														</p>
													) : (
														<p style={{ textAlign: 'justify' }}>
															Invalid Type
														</p>
													)}

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
													Degree Rules have been assigned!
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
																// onClick={handleEditDegreeRules}
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
									{Object.keys(cycles).length === 0 ? (
										<>
											<Row>
												<Formik
													initialValues={{
														names: [
															{
																cycle: '',
															},
														],
													}}
													validationSchema={CyclesSchema}
													onSubmit={(values, { setSubmitting }) => {
														const cycles = {
															names: values.names,
														};
														if (isMounted) {
															dispatch(defineCycles(cycles));
															setSubmitting(false);
															setIsMounted(false);
															navigate('/admin/configuration');
														}
													}}
													validateOnMount
												>
													{({
														isSubmitting,
														dirty,
														values,
														handleReset,
													}) => (
														<Form>
															<FormGroup
																className="form-floating mb-3"
																floating
															>
																<FieldArray
																	name="names"
																	render={(arrayHelpers) => (
																		<Row>
																			<Col
																				md="8"
																				lg="6"
																				xl="8"
																			>
																				{values.names
																					.length > 0 &&
																					values.names.map(
																						(
																							name,
																							index
																						) => (
																							<FormGroup
																								className="form-floating mb-3"
																								key={
																									index
																								}
																								floating
																							>
																								<Field
																									type="text"
																									className="form-control"
																									name={`names[${index}].cycle`}
																								/>
																								<Label
																									for={`names[${index}].cycle`}
																									className="text-gray-600"
																								>
																									Cycle{' '}
																									{index +
																										1}
																								</Label>
																								<ErrorMessage
																									name={`names[${index}].cycle`}
																									component={
																										FormErrorMessage
																									}
																								/>
																							</FormGroup>
																						)
																					)}
																			</Col>
																			<Col
																				xs="10"
																				sm="10"
																				md="2"
																				lg="5"
																				xl="2"
																				className="mb-3 text-right"
																			>
																				{values.names
																					.length > 1 && (
																					<Button
																						color="warning"
																						onClick={() =>
																							arrayHelpers.pop()
																						}
																					>
																						-
																					</Button>
																				)}
																			</Col>
																			<Col
																				xs="2"
																				sm="2"
																				md="2"
																				lg="1"
																				xl="2"
																				className="mb-3"
																			>
																				<Button
																					color="info"
																					onClick={() =>
																						arrayHelpers.push(
																							{
																								cycle: '',
																							}
																						)
																					}
																				>
																					+
																				</Button>
																			</Col>
																		</Row>
																	)}
																/>
															</FormGroup>
															<Row className="mb-3">
																<Col
																	sm="6"
																	md="6"
																	xs="12"
																	className="text-sm-left text-center"
																>
																	<Button
																		onClick={handleReset}
																		disabled={
																			!dirty || isSubmitting
																		}
																	>
																		Clear
																	</Button>
																</Col>
																<Col className="text-sm-right text-center mt-sm-0 mt-3 px-0">
																	<SubmitButton
																		color={'primary'}
																		message={'Configure'}
																		disabled={isSubmitting}
																	/>
																</Col>
															</Row>
														</Form>
													)}
												</Formik>
												<Col
													className="text-warning mt-2"
													style={{
														textAlign: 'justify',
														fontWeight: '600',
														fontSize: 12,
													}}
												>
													Cycles have not been assigned!
												</Col>
											</Row>
										</>
									) : (
										<>
											<Row className="mb-3">
												<Col>
													{cycles ? (
														<>
															{cycles.names.map((cycle, index) => (
																<div key={index}>
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
													Cycles have been assigned!
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
																// onClick={handleEditCycles}
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
