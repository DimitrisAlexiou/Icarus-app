import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormGroup, Label, Row, Col, Button, Spinner, Input } from 'reactstrap';
import { TeachingGradingSchema } from '../../schemas/course/TeachingGrading';
import { ExaminationType } from '../../constants/enums';
import FormErrorMessage from '../form/FormErrorMessage';

export default function TeachingGradingForm({
	teaching,
	editTeachingId,
	isEditingTeachingGrading,
}) {
	const [selectedPart, setSelectedPart] = useState('theory');

	const dispatch = useDispatch();

	const initialTheoryExaminations = teaching?.theoryExamination?.length
		? teaching.theoryExamination
		: [{}];

	const initialLabExaminations = teaching?.labExamination?.length
		? teaching.labExamination
		: [{}];

	const initialValues = {
		theoryExamination: selectedPart === 'theory' ? initialTheoryExaminations : [],
		labExamination: selectedPart === 'lab' ? initialLabExaminations : [],
	};

	console.log(initialValues);

	return (
		<>
			<Row className="justify-content-center">
				<Col md="6">
					<FormGroup className="mx-1 mb-3 mt-3" check>
						<Input
							type="radio"
							name="teachingPart"
							value="theory"
							checked={selectedPart === 'theory'}
							onChange={() => setSelectedPart('theory')}
						/>
						<Label for="theory" className="mx-2 text-gray-500">
							Theory
						</Label>
					</FormGroup>
				</Col>
				{teaching.labWeight > 0 ? (
					<Col md="6">
						<FormGroup className="mx-1 mb-3 mt-3" check>
							<Input
								type="radio"
								name="teachingPart"
								value="lab"
								checked={selectedPart === 'lab'}
								onChange={() => setSelectedPart('lab')}
							/>
							<Label for="lab" className="mx-2 text-gray-500">
								Lab
							</Label>
						</FormGroup>
					</Col>
				) : null}
			</Row>

			<Formik
				initialValues={{
					theoryExamination: teaching?.theoryExamination?.length
						? teaching.theoryExamination
						: [{}],
					labExamination: teaching?.labExamination?.length
						? teaching.labExamination
						: [{}],
				}}
				enableReinitialize={true}
				validationSchema={TeachingGradingSchema(selectedPart)}
				onSubmit={(values, { setSubmitting }) => {
					const teachingGradingData = {
						theoryExamination: values.theoryExamination,
						labExamination: values.labExamination,
					};
					if (selectedPart === 'theory') {
						console.log(teachingGradingData.theoryExamination);
						// dispatch(
						// 	configureTeachingGrading({
						// 		teachingId: teaching._id,
						// 		data: teachingGradingData.theoryExamination,
						// 	})
						// );
					}
					console.log(teachingGradingData);
					// dispatch(
					// 	configureTeachingGrading({
					// 		teachingId: teaching._id,
					// 		data: teachingGradingData.labExamination,
					// 	})
					// );
					setSelectedPart('theory');
					setSubmitting(false);
				}}
				validateOnMount
			>
				{({ isSubmitting, dirty, values, handleReset, setFieldValue }) => (
					<Form>
						{selectedPart === 'theory' ? (
							<>
								{values.theoryExamination.map((_, index) => (
									<Row key={index}>
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
										<Row>
											<Col md="6">
												<FormGroup className="form-floating mb-3" floating>
													<Field
														as="select"
														name={`theoryExamination[${index}].type`}
														className="form-control"
													>
														<option value="">
															Select examination type
														</option>
														{Object.values(ExaminationType).map(
															(type) => (
																<option key={type} value={type}>
																	{type}
																</option>
															)
														)}
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
									</Row>
								))}
							</>
						) : (
							<>
								{values.labExamination.map((_, index) => (
									<Row key={index}>
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
										<Row>
											<Col md="6">
												<FormGroup className="form-floating mb-3" floating>
													<Field
														as="select"
														name={`labExamination[${index}].type`}
														className="form-control"
													>
														<option value="">
															Select examination type
														</option>
														{Object.values(ExaminationType).map(
															(type) => (
																<option key={type} value={type}>
																	{type}
																</option>
															)
														)}
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
									</Row>
								))}
							</>
						)}
						<Row>
							<Col sm="6" md="6" xs="12" className="text-sm-left text-center">
								<Button onClick={handleReset} disabled={!dirty || isSubmitting}>
									Clear
								</Button>
							</Col>
							<Col className="text-sm-right text-center mt-sm-0 mt-3">
								<Button type="submit" color="primary" disabled={isSubmitting}>
									{isSubmitting ? (
										<>
											Please wait <Spinner type="grow" size="sm" />
										</>
									) : isEditingTeachingGrading ? (
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
