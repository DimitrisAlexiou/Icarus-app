import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormGroup, Label, Row, Col, Button, Spinner, Input } from 'reactstrap';
import {
	assignLabGrading,
	assignTheoryGrading,
	unassignLabGrading,
	unassignTheoryGrading,
} from '../../../features/courses/teachingSlice';
import { TeachingGradingSchema } from '../../../schemas/course/TeachingGrading';
import { ExaminationType } from '../../../constants/enums';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkCircle } from '@fortawesome/free-regular-svg-icons';
import { deleteAlert } from '../../../constants/sweetAlertNotification';
import FormErrorMessage from '../../form/FormErrorMessage';

export default function TeachingGradingForm({
	teaching,
	editTeachingId,
	isEditingTeachingGrading,
	setModalGrading,
	user,
	dispatch,
}) {
	const [selectedPart, setSelectedPart] = useState('theory');

	const canEditTheory =
		teaching.theoryInstructors.some(
			(instructor) => instructor.user._id === user.user._id
		) || user.user.isAdmin;

	const canEditLab =
		teaching.labInstructors.some(
			(instructor) => instructor.user._id === user.user._id
		) || user.user.isAdmin;

	return (
		<>
			<Row className={teaching.course.hasLab ? 'justify-content-center' : null}>
				<Col md="6">
					<Row className="align-items-center mb-3">
						<Col>
							<FormGroup className="mx-1" check>
								<Input
									type="radio"
									name="teachingPart"
									value="theory"
									checked={selectedPart === 'theory'}
									onChange={() => setSelectedPart('theory')}
									disabled={!canEditTheory}
								/>
								<Label for="theory" className="mx-2 text-gray-500">
									Theory
								</Label>
							</FormGroup>
						</Col>
						{teaching.theoryExamination.length ? (
							<Col className="text-right">
								<FontAwesomeIcon
									className="text-danger clickable"
									style={{
										textAlign: 'justify',
										fontWeight: '700',
										fontSize: 16,
									}}
									icon={faXmarkCircle}
									onClick={() => {
										deleteAlert(() =>
											dispatch(unassignTheoryGrading(teaching._id))
										);
										setModalGrading(false);
									}}
								/>
							</Col>
						) : null}
					</Row>
				</Col>
				{teaching.course.hasLab ? (
					<Col md="6">
						<Row className="align-items-center mb-3">
							<Col>
								<FormGroup className="mx-1" check>
									<Input
										type="radio"
										name="teachingPart"
										value="lab"
										checked={selectedPart === 'lab'}
										onChange={() => setSelectedPart('lab')}
										disabled={!canEditLab}
									/>
									<Label for="lab" className="mx-2 text-gray-500">
										Lab
									</Label>
								</FormGroup>
							</Col>
							{teaching.labExamination.length ? (
								<Col className="text-right">
									<FontAwesomeIcon
										className="text-danger clickable"
										style={{
											textAlign: 'justify',
											fontWeight: '700',
											fontSize: 16,
										}}
										icon={faXmarkCircle}
										onClick={() => {
											deleteAlert(() =>
												dispatch(unassignLabGrading(teaching._id))
											);
											setModalGrading(false);
										}}
									/>
								</Col>
							) : null}
						</Row>
					</Col>
				) : null}
			</Row>

			<Formik
				initialValues={{
					theoryExamination: teaching?.theoryExamination?.length
						? teaching.theoryExamination
						: [
								{
									type: '',
									weight: '',
									lowerGradeThreshold: '',
								},
						  ],
					labExamination: teaching?.labExamination?.length
						? teaching.labExamination
						: [
								{
									type: '',
									weight: '',
									lowerGradeThreshold: '',
								},
						  ],
				}}
				enableReinitialize={true}
				validationSchema={TeachingGradingSchema(selectedPart)}
				onSubmit={(values, { setSubmitting }) => {
					const teachingGradingData = {
						theoryExamination: values.theoryExamination,
						labExamination: values.labExamination,
					};
					if (selectedPart === 'theory' && canEditTheory) {
						dispatch(
							assignTheoryGrading({
								teachingId: editTeachingId,
								data: teachingGradingData.theoryExamination,
							})
						);
					} else if (selectedPart === 'lab' && canEditLab) {
						dispatch(
							assignLabGrading({
								teachingId: editTeachingId,
								data: teachingGradingData.labExamination,
							})
						);
					}
					setSelectedPart('theory');
					setSubmitting(false);
					setModalGrading(false);
				}}
				validateOnMount
			>
				{({ isSubmitting, dirty, values, setFieldValue, resetForm }) => (
					<Form>
						{selectedPart === 'theory' ? (
							<>
								{values.theoryExamination.map((_, index) => (
									<div key={index}>
										<Row>
											<Col className="mb-3">
												<small
													className="text-muted pill-label"
													style={{
														textAlign: 'justify',
														fontWeight: '700',
														fontSize: 12,
													}}
												>
													Examination {index + 1}
												</small>
											</Col>
											{index === 0 ? (
												<Col xs="2" sm="2" md="2" className="mb-3 text-right">
													<Button
														type="button"
														color="info"
														onClick={() =>
															setFieldValue('theoryExamination', [
																...values.theoryExamination,
																{},
															])
														}
														disabled={isSubmitting}
													>
														+
													</Button>
												</Col>
											) : (
												<Col xs="2" sm="2" md="2" className="mb-3 text-right">
													<Button
														type="button"
														color="warning"
														onClick={() =>
															setFieldValue(
																'theoryExamination',
																values.theoryExamination.filter(
																	(_, i) => i !== index
																)
															)
														}
													>
														-
													</Button>
												</Col>
											)}
										</Row>
										<Row>
											<Col md="6">
												<FormGroup className="form-floating mb-3" floating>
													<Field
														as="select"
														name={`theoryExamination[${index}].type`}
														className="form-control"
													>
														<option default>Select exam type</option>
														{Object.values(ExaminationType).map((type) => (
															<option key={type} value={type}>
																{type}
															</option>
														))}
													</Field>
													<Label
														for={`theoryExamination[${index}].type`}
														className="text-gray-600"
													>
														Examination Type
													</Label>
													<ErrorMessage
														name={`theoryExamination[${index}].type`}
														component={FormErrorMessage}
													/>
												</FormGroup>
											</Col>
											<Col md="6">
												<FormGroup className="form-floating mb-3" floating>
													<Field
														type="number"
														name={`theoryExamination[${index}].weight`}
														min="0"
														max="100"
														className="form-control"
													/>
													<Label
														for={`theoryExamination[${index}].weight`}
														className="text-gray-600"
													>
														Weight
													</Label>
													<ErrorMessage
														name={`theoryExamination[${index}].weight`}
														component={FormErrorMessage}
													/>
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<Col md="6">
												<FormGroup className="form-floating mb-3" floating>
													<Field
														type="number"
														name={`theoryExamination[${index}].lowerGradeThreshold`}
														min="0"
														max="10"
														className="form-control"
													/>
													<Label
														for={`theoryExamination[${index}].lowerGradeThreshold`}
														className="text-gray-600"
													>
														Lower Grade Threshold
													</Label>
													<ErrorMessage
														name={`theoryExamination[${index}].lowerGradeThreshold`}
														component={FormErrorMessage}
													/>
												</FormGroup>
											</Col>
										</Row>
									</div>
								))}
							</>
						) : (
							<>
								{values.labExamination.map((_, index) => (
									<div key={index}>
										<Row>
											<Col className="mb-3">
												<small
													className="text-muted pill-label"
													style={{
														textAlign: 'justify',
														fontWeight: '700',
														fontSize: 12,
													}}
												>
													Examination {index + 1}
												</small>
											</Col>
											{index === 0 ? (
												<Col xs="2" sm="2" md="2" className="mb-3 text-right">
													<Button
														type="button"
														color="info"
														onClick={() =>
															setFieldValue('labExamination', [
																...values.labExamination,
																{},
															])
														}
														disabled={isSubmitting}
													>
														+
													</Button>
												</Col>
											) : (
												<Col xs="2" sm="2" md="2" className="mb-3 text-right">
													<Button
														type="button"
														color="warning"
														onClick={() =>
															setFieldValue(
																'labExamination',
																values.labExamination.filter(
																	(_, i) => i !== index
																)
															)
														}
													>
														-
													</Button>
												</Col>
											)}
										</Row>
										<Row>
											<Col md="6">
												<FormGroup className="form-floating mb-3" floating>
													<Field
														as="select"
														name={`labExamination[${index}].type`}
														className="form-control"
													>
														<option default>Select exam type</option>
														{Object.values(ExaminationType).map((type) => (
															<option key={type} value={type}>
																{type}
															</option>
														))}
													</Field>
													<Label
														for={`labExamination[${index}].type`}
														className="text-gray-600"
													>
														Examination Type
													</Label>
													<ErrorMessage
														name={`labExamination[${index}].type`}
														component={FormErrorMessage}
													/>
												</FormGroup>
											</Col>
											<Col md="6">
												<FormGroup className="form-floating mb-3" floating>
													<Field
														type="number"
														name={`labExamination[${index}].weight`}
														min="0"
														max="100"
														className="form-control"
													/>
													<Label
														for={`labExamination[${index}].weight`}
														className="text-gray-600"
													>
														Weight
													</Label>
													<ErrorMessage
														name={`labExamination[${index}].weight`}
														component={FormErrorMessage}
													/>
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<Col md="6">
												<FormGroup className="form-floating mb-3" floating>
													<Field
														type="number"
														name={`labExamination[${index}].lowerGradeThreshold`}
														min="0"
														max="10"
														className="form-control"
													/>
													<Label
														for={`labExamination[${index}].lowerGradeThreshold`}
														className="text-gray-600"
													>
														Lower Grade Threshold
													</Label>
													<ErrorMessage
														name={`labExamination[${index}].lowerGradeThreshold`}
														component={FormErrorMessage}
													/>
												</FormGroup>
											</Col>
										</Row>
									</div>
								))}
							</>
						)}
						<Row>
							<Col sm="6" md="6" xs="12" className="text-sm-left text-center">
								<Button
									onClick={() => resetForm()}
									disabled={!dirty || isSubmitting}
								>
									Clear
								</Button>
							</Col>
							<Col className="text-sm-right text-center mt-sm-0 mt-3">
								<Button type="submit" color="primary" disabled={isSubmitting}>
									{isSubmitting ? (
										<>
											Please wait <Spinner type="grow" size="sm" />
										</>
									) : isEditingTeachingGrading &&
									  (teaching.theoryExamination.length ||
											teaching.labExamination.length) ? (
										'Update'
									) : (
										'Configure'
									)}
								</Button>
							</Col>
						</Row>
					</Form>
				)}
			</Formik>
		</>
	);
}
