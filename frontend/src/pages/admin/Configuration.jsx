import { useState, useEffect, forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Badge } from 'reactstrap';
import { FormGroup, Label, Row, Col, Button } from 'reactstrap';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import { DegreeRulesSchema } from '../../schemas/admin/DegreeRules';
import { CycleSchema } from '../../schemas/admin/Cycles';
import { SemesterSchema } from '../../schemas/admin/Semester';
import { GradingSchema } from '../../schemas/admin/Grading';
import { VaccineReassessmentSchema } from '../../schemas/admin/VaccineReassessment';
import {
	defineSemester,
	getSemester,
	deleteSemester,
	resetSemester,
} from '../../features/admin/semesterSlice';
import {
	defineGrading,
	getGrading,
	deleteGrading,
	resetGrading,
} from '../../features/admin/gradingSlice';
import {
	defineVaccineReassessment,
	getVaccineReassessment,
} from '../../features/admin/vaccineReassessmentSlice';
import { Toast } from '../../constants/sweetAlertNotification';
import DegreeRulesForm from '../../components/DegreeRulesForm';
import SubmitButton from '../../components/buttons/SubmitButton';
import DatePick from '../../components/DatePicker';
import FormErrorMessage from '../../components/FormErrorMessage';
import Spinner from '../../components/boilerplate/Spinner';
import SemesterForm from '../../components/admin/SemesterForm';
import VaccineReassessmentForm from '../../components/admin/VaccineReassessmentForm';
import GradingForm from '../../components/admin/GradingForm';

export default function Configuration() {
	const { semester, isError, isLoading, message } = useSelector((state) => state.semester);
	const {
		vaccineReassessment,
		isError: vaccineReassessmentIsError,
		isLoading: vaccineReassessmentIsLoading,
		message: vaccineReassessmentMessage,
	} = useSelector((state) => state.vaccineReassessment);

	const dispatch = useDispatch();

	useEffect(() => {
		if (isError) {
			Toast.fire({
				title: 'Something went wrong!',
				text: message,
				icon: 'error',
			});
		}
	}, [dispatch, isError, message]);

	useEffect(() => {
		dispatch(getSemester());
	}, [dispatch]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<h1 className="h3 mb-5 text-gray-800 font-weight-bold">
				System Configuration {semester.type}
			</h1>

			<Row>
				<Col xl="6" lg="12" md="12" sm="12">
					<Badge color="info">Semester Period</Badge>
					<Row className="mt-3 mb-4">
						<Col xl="10" lg="10" md="12" sm="12">
							<div className="card shadow mb-3 py-3">
								<div className="card-body">
									{!semester ? (
										<>
											<Row className="mb-3">
												<Col>
													<label>
														<b>Semester Type</b>
													</label>
													<p style={{ textAlign: 'justify' }}>
														{semester.type}
													</p>
													<hr />
												</Col>
											</Row>
											<Row className="mb-3">
												<Col md="6">
													<label>
														<b>Start Date</b>
													</label>
													<p style={{ textAlign: 'justify' }}>
														{semester.startDate}
													</p>
													<hr />
												</Col>
												<Col>
													<label>
														<b>End Date</b>
													</label>
													<p style={{ textAlign: 'justify' }}>
														{semester.endDate}
													</p>
													<hr />
												</Col>
											</Row>
											<div
												className="text-warning"
												style={{
													textAlign: 'justify',
													fontWeight: '600',
													fontSize: 12,
												}}
											>
												Semester has already been assigned! {semester.type}
											</div>
										</>
									) : (
										<Formik
											initialValues={{
												type: '',
												startDate: new Date(),
												endDate: new Date(),
											}}
											validationSchema={SemesterSchema}
											onSubmit={(values, { setSubmitting }) => {
												const semester = {
													semester: {
														type: values.type,
														startDate: values.startDate,
														endDate: values.endDate,
													},
												};
												dispatch(defineSemester(semester));
												Toast.fire({
													title: 'Success',
													text: 'Semester defined successfully!',
													icon: 'success',
												});
												setSubmitting(false);
												dispatch(getSemester());
											}}
											validateOnMount
										>
											{({ isSubmitting, dirty, handleReset }) => (
												// <Form>
												// 	<FormGroup
												// 		className="form-floating mb-3"
												// 		floating
												// 	>
												// 		<Field
												// 			as="select"
												// 			className="form-control"
												// 			name="type"
												// 		>
												// 			<option default>
												// 				Select semester type
												// 			</option>
												// 			<option value={'Winter'}>Winter</option>
												// 			<option value={'Spring'}>Spring</option>
												// 			<option value={'Any'}>Any</option>
												// 		</Field>
												// 		<Label for="type" className="text-gray-600">
												// 			Semester type
												// 		</Label>
												// 		<ErrorMessage
												// 			name="type"
												// 			component={FormErrorMessage}
												// 		/>
												// 	</FormGroup>
												// 	<Row>
												// 		<Col xl="6" lg="6" md="6" sm="6" xs="12">
												// 			<StartDatePickerField />
												// 		</Col>
												// 		<Col xl="6" lg="6" md="6" sm="6" xs="12">
												// 			<EndDatePickerField />
												// 		</Col>
												// 	</Row>
												// 	<Row>
												// 		<Col className="mb-3">
												// 			<Button
												// 				onClick={handleReset}
												// 				disabled={!dirty || isSubmitting}
												// 			>
												// 				Clear
												// 			</Button>
												// 		</Col>
												// 		{!semester ? (
												// 			<Col className="text-right px-0">
												// 			<SubmitButton
												// 				color={'danger'}
												// 				message={'Delete Semester'}
												// 				disabled={isSubmitting}
												// 			/>
												// 			</Col>
												// 		) : (
												// 			<Col className="text-right px-0">
												// 			<SubmitButton
												// 				color={'primary'}
												// 				message={'Define period'}
												// 				disabled={isSubmitting}
												// 			/>
												// 			</Col>
												// 		)}
												// 	</Row>
												// </Form>
												<SemesterForm
													semester={semester}
													isSubmitting={isSubmitting}
													dirty={dirty}
													handleReset={handleReset}
												/>
											)}
										</Formik>
									)}
								</div>
							</div>
						</Col>
					</Row>
				</Col>
				<Col xl="6" lg="12" md="12" sm="12">
					<Badge color="info">Grading Duration Period</Badge>
					<Row className="mt-3 mb-4">
						<Col xl="10" lg="10" md="12" sm="12">
							<div className="card shadow mb-3 py-3">
								<div className="card-body">
									<Formik
										initialValues={{
											startDate: new Date(),
											endDate: new Date(),
										}}
										validationSchema={GradingSchema}
										onSubmit={(values, { setSubmitting }) => {
											const grading = {
												grading: {
													startDate: values.startDate,
													endDate: values.endDate,
												},
											};
											dispatch(defineGrading(grading));
											Toast.fire({
												title: 'Success',
												text: 'Grading period defined successfully!',
												icon: 'success',
											});
											setSubmitting(false);
										}}
										validateOnMount
									>
										{/* {({ isSubmitting, dirty, handleReset }) => (
											// <GradingForm
											// 		grading={grading}
											// 		isSubmitting={isSubmitting}
											// 		dirty={dirty}
											// 		handleReset={handleReset}
											// 	/>
										)} */}
									</Formik>
								</div>
							</div>
						</Col>
					</Row>
				</Col>
			</Row>

			<Row>
				<Col xl="6" lg="12" md="12" sm="12">
					<Badge color="info">Vaccine/Reassessment Statement Period</Badge>
					<Row className="mt-3 mb-4">
						<Col xl="10" lg="10" md="12" sm="12">
							<div className="card shadow mb-3 py-3">
								{/* <div className="card-body">
									{!vaccineReassessment ? (
										<>
											<Row className="mb-3">
												<Col md="6">
													<label>
														<b>Start Date</b>
													</label>
													<p style={{ textAlign: 'justify' }}>
														{vaccineReassessment.startDate}
													</p>
													<hr />
												</Col>
												<Col>
													<label>
														<b>End Date</b>
													</label>
													<p style={{ textAlign: 'justify' }}>
														{vaccineReassessment.endDate}
													</p>
													<hr />
												</Col>
											</Row>
											<div
												className="text-warning"
												style={{
													textAlign: 'justify',
													fontWeight: '600',
													fontSize: 12,
												}}
											>
												Vaccine/Reassessment period has already been
												assigned!
											</div>
										</>
									) : (
										<Formik
											initialValues={{
												startDate: new Date(),
												endDate: new Date(),
											}}
											validationSchema={VaccineReassessmentSchema}
											onSubmit={(values, { setSubmitting }) => {
												const vaccineReassessment = {
													vaccineReassessment: {
														startDate: values.startDate,
														endDate: values.endDate,
													},
												};
												// dispatch(
												// 	defineVaccineReassessment(vaccineReassessment)
												// );
												Toast.fire({
													title: 'Success',
													text: 'Vaccine/Reassessment period defined successfully!',
													icon: 'success',
												});
												setSubmitting(false);
												// dispatch(getVaccineReassessment());
											}}
											validateOnMount
										>
											{({ isSubmitting, dirty, handleReset }) => (
												<VaccineReassessmentForm
													vaccineReassessment={vaccineReassessment}
													isSubmitting={isSubmitting}
													dirty={dirty}
													handleReset={handleReset}
												/>
											)}
										</Formik>
									)}
								</div> */}
							</div>
						</Col>
					</Row>
				</Col>
				<Col xl="6" lg="12" md="12" sm="12">
					<Badge color="info">Assessment Statement Period</Badge>
					<Row className="mt-3 mb-4">
						<Col xl="10" lg="10" md="12" sm="12">
							<div className="card shadow mb-3 py-3">
								<div className="card-body">
									<DatePick />
									<Row className="mt-3">
										<Col className="mb-3">
											<Button
											// onClick={handleReset}
											// disabled={!dirty || isSubmitting}
											>
												Clear
											</Button>
										</Col>
										<Col className="text-right px-0">
											<SubmitButton
												message={'Define period'}
												color={'primary'}
												// disabled={isSubmitting}
											/>
										</Col>
									</Row>
								</div>
							</div>
						</Col>
					</Row>
				</Col>
			</Row>

			<Row>
				<Col xl="6" lg="12" md="12" sm="12">
					<Badge color="info">Review Duration Period</Badge>
					<Row className="mt-3 mb-4">
						<Col xl="10" lg="10" md="12" sm="12">
							<div className="card shadow mb-3 py-3">
								<div className="card-body">
									<DatePick />
									<Row className="mt-3">
										<Col className="mb-3">
											<Button
											// onClick={handleReset}
											// disabled={!dirty || isSubmitting}
											>
												Clear
											</Button>
										</Col>
										<Col className="text-right px-0">
											<SubmitButton
												message={'Define period'}
												color={'primary'}
												// disabled={isSubmitting}
											/>
										</Col>
									</Row>
								</div>
							</div>
						</Col>
					</Row>
				</Col>
				<Col xl="6" lg="12" md="12" sm="12">
					<Badge color="info">Review Start Period</Badge>
					<Row className="mt-3 mb-4">
						<Col xl="10" lg="10" md="12" sm="12">
							<div className="card shadow mb-3 py-3">
								<div className="card-body">
									<DatePick />
									<Row className="mt-3">
										<Col className="mb-3">
											<Button
											// onClick={handleReset}
											// disabled={!dirty || isSubmitting}
											>
												Clear
											</Button>
										</Col>
										<Col className="text-right px-0">
											<SubmitButton
												message={'Define period'}
												color={'primary'}
												// disabled={isSubmitting}
											/>
										</Col>
									</Row>
								</div>
							</div>
						</Col>
					</Row>
				</Col>
			</Row>

			<Row>
				<Col xl="6" lg="12" md="12" sm="12">
					<Badge color="info">List of Cycles</Badge>
					<Row className="mt-3 mb-4">
						<Col xl="10" lg="10" md="12" sm="12">
							<div className="card shadow mb-3 py-3">
								<div className="card-body">
									<Formik
										initialValues={{
											cycles: [
												{
													name: '',
												},
											],
										}}
										validationSchema={CycleSchema}
										onSubmit={(values, { setSubmitting }) => {
											const cycles = {
												cycles: [
													{
														name: values.name,
													},
												],
											};
											// dispatch(defineCycles(cycles));
											setSubmitting(false);
										}}
									>
										{({ isSubmitting, dirty, values, handleReset }) => (
											<Form>
												<FieldArray name="cycles">
													{({ insert, remove, push }) => (
														<Row>
															{values.cycles.length > 0 &&
																values.cycles.map(
																	(cycle, index) => (
																		<Row key={index}>
																			<Col md="6">
																				<FormGroup
																					className="form-floating mb-3"
																					floating
																				>
																					<Field
																						type="text"
																						className="form-control"
																						name={`cycles.${index}.name`}
																					/>
																					<Label
																						for={`cycles.${index}.name`}
																						className="text-gray-600"
																					>
																						Name
																					</Label>
																					<ErrorMessage
																						name={`cycles.${index}.name`}
																						component={
																							FormErrorMessage
																						}
																					/>
																				</FormGroup>
																			</Col>
																			<Col
																				md="5"
																				className="mb-3"
																			>
																				<Button
																					onClick={() =>
																						push({
																							type: '',
																						})
																					}
																				>
																					Add Cycle
																				</Button>
																			</Col>
																			<Col
																				md="1"
																				className="mb-3"
																			>
																				<Button
																					onClick={() =>
																						remove(
																							index
																						)
																					}
																				>
																					-
																				</Button>
																			</Col>
																		</Row>
																	)
																)}
														</Row>
													)}
												</FieldArray>

												<Row>
													<Col className="mb-3">
														<Button
															onClick={handleReset}
															disabled={!dirty || isSubmitting}
														>
															Clear
														</Button>
													</Col>
													<Col className="text-right px-0">
														<SubmitButton
															message={'Define cycles'}
															color={'primary'}
															disabled={isSubmitting}
														/>
													</Col>
												</Row>
											</Form>
										)}
									</Formik>
								</div>
							</div>
						</Col>
					</Row>
				</Col>
				<Col xl="6" lg="12" md="12" sm="12">
					<Badge color="info">Rules for Degree</Badge>
					<Row className="mt-3 mb-4">
						<Col xl="10" lg="10" md="12" sm="12">
							<div className="card shadow mb-3 py-3">
								<div className="card-body">
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
												degreeRules: {
													cycles: values.cycles,
													courses: values.courses,
													cycleCourses: values.cycleCourses,
													practice: values.practice,
												},
											};
											// dispatch(assignDegreeRules(degreeRules));
											setSubmitting(false);
										}}
										validateOnMount
									>
										{({ isSubmitting, dirty, handleReset }) => (
											<Form>
												<DegreeRulesForm />
												<Row>
													<Col className="mb-3">
														<Button
															onClick={handleReset}
															disabled={!dirty || isSubmitting}
														>
															Clear
														</Button>
													</Col>
													<Col className="text-right px-0">
														<SubmitButton
															message={'Assign Rules'}
															color={'primary'}
															disabled={isSubmitting}
														/>
													</Col>
												</Row>
											</Form>
										)}
									</Formik>
								</div>
							</div>
						</Col>
					</Row>
				</Col>
			</Row>
		</>
	);
}
