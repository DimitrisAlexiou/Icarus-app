import { useState } from 'react';
import { FormGroup, Label, Row, Col, Button, Spinner, Input } from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {
	assignLabInstructors,
	assignTheoryInstructors,
} from '../../../features/courses/teachingSlice';
import { AssignInstructorSchema } from '../../../schemas/course/AssignInstructor';
import FormErrorMessage from '../../form/FormErrorMessage';

export default function AssignInstructorForm({
	teaching,
	instructors,
	isEditingTheoryInstructors,
	isEditingLabInstructors,
	setModal,
	dispatch,
}) {
	const [selectedPart, setSelectedPart] = useState('theory');

	return (
		<>
			<Row style={{ textAlign: 'center' }} className="justify-content-center">
				<Col md="5">
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
				{teaching.course.hasLab ? (
					<Col md="5">
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
					theoryInstructors: teaching.theoryInstructors.length
						? teaching.theoryInstructors
						: [''],
					labInstructors: teaching.labInstructors.length
						? teaching.labInstructors
						: [''],
				}}
				validationSchema={AssignInstructorSchema(selectedPart)}
				onSubmit={(values, { setSubmitting }) => {
					const instructorAssignment = {
						theoryInstructors: values.theoryInstructors.filter(
							(instructor) => instructor !== ''
						),
						labInstructors: values.labInstructors.filter(
							(instructor) => instructor !== ''
						),
					};
					if (selectedPart === 'theory') {
						dispatch(
							assignTheoryInstructors({
								teachingId: teaching._id,
								data: instructorAssignment.theoryInstructors,
							})
						);
					} else {
						dispatch(
							assignLabInstructors({
								teachingId: teaching._id,
								data: instructorAssignment.labInstructors,
							})
						);
					}
					setSubmitting(false);
					setModal(false);
				}}
				validateOnMount
			>
				{({ isSubmitting, dirty, values, handleReset, setFieldValue }) => (
					<Form>
						<Row>
							<FormGroup className="form-floating mb-3" floating>
								{selectedPart === 'theory' ? (
									<>
										{isEditingTheoryInstructors ? (
											<>
												{values.theoryInstructors.map(
													(theoryInstructor, index) => (
														<Row key={index}>
															<Col xs="10" sm="10" md="10">
																<Field
																	as="select"
																	className="form-control mb-3"
																	name={`theoryInstructors[${index}]`}
																>
																	<option
																		key={theoryInstructor._id}
																		value={theoryInstructor._id}
																	>
																		{theoryInstructor.user.surname}
																	</option>
																</Field>
																<ErrorMessage
																	name={`theoryInstructors[${index}]`}
																	component={FormErrorMessage}
																/>
															</Col>
															{index === 0 ? (
																<Col
																	xs="2"
																	sm="2"
																	md="2"
																	className="mb-3 text-right"
																>
																	<Button
																		type="button"
																		color="info"
																		onClick={() =>
																			setFieldValue('theoryInstructors', [
																				...values.theoryInstructors,
																				'',
																			])
																		}
																		disabled={isSubmitting}
																	>
																		+
																	</Button>
																</Col>
															) : (
																<Col
																	xs="2"
																	sm="2"
																	md="2"
																	className="mb-3 text-right"
																>
																	<Button
																		type="button"
																		color="warning"
																		onClick={() =>
																			setFieldValue(
																				'theoryInstructors',
																				values.theoryInstructors.filter(
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
													)
												)}
											</>
										) : (
											<>
												{values.theoryInstructors.map((_, index) => (
													<Row key={index}>
														<Col xs="10" sm="10" md="10">
															<Field
																as="select"
																className="form-control mb-3"
																name={`theoryInstructors[${index}]`}
															>
																<option
																	className="text-gray-600"
																	value=""
																	default
																	disabled
																>
																	Theory Instructor{' '}
																	{index === 0 ? null : '(' + (index + 1) + ')'}
																</option>
																{instructors.map((instructor) => (
																	<option
																		key={instructor._id}
																		value={instructor._id}
																	>
																		{instructor.user.surname}
																	</option>
																))}
															</Field>
															<ErrorMessage
																name={`theoryInstructors[${index}]`}
																component={FormErrorMessage}
															/>
														</Col>
														{index === 0 ? (
															<Col
																xs="2"
																sm="2"
																md="2"
																className="mb-3 text-right"
															>
																<Button
																	type="button"
																	color="info"
																	onClick={() =>
																		setFieldValue('theoryInstructors', [
																			...values.theoryInstructors,
																			'',
																		])
																	}
																	disabled={isSubmitting}
																>
																	+
																</Button>
															</Col>
														) : (
															<Col
																xs="2"
																sm="2"
																md="2"
																className="mb-3 text-right"
															>
																<Button
																	type="button"
																	color="warning"
																	onClick={() =>
																		setFieldValue(
																			'theoryInstructors',
																			values.theoryInstructors.filter(
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
												))}
											</>
										)}
									</>
								) : (
									<>
										{isEditingLabInstructors ? (
											<>
												{values.labInstructors.map((labInstructor, index) => (
													<Row key={index}>
														<Col xs="10" sm="10" md="10">
															<Field
																as="select"
																className="form-control mb-3"
																name={`labInstructors[${index}]`}
															>
																<option
																	key={labInstructor._id}
																	value={labInstructor._id}
																>
																	{labInstructor.user.surname}
																</option>
															</Field>
															<ErrorMessage
																name={`labInstructors[${index}]`}
																component={FormErrorMessage}
															/>
														</Col>
														{index === 0 ? (
															<Col
																xs="2"
																sm="2"
																md="2"
																className="mb-3 text-right"
															>
																<Button
																	type="button"
																	color="info"
																	onClick={() =>
																		setFieldValue('labInstructors', [
																			...values.labInstructors,
																			'',
																		])
																	}
																	disabled={isSubmitting}
																>
																	+
																</Button>
															</Col>
														) : (
															<Col
																xs="2"
																sm="2"
																md="2"
																className="mb-3 text-right"
															>
																<Button
																	type="button"
																	color="warning"
																	onClick={() =>
																		setFieldValue(
																			'labInstructors',
																			values.labInstructors.filter(
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
												))}
											</>
										) : (
											<>
												{values.labInstructors.map((_, index) => (
													<Row key={index}>
														<Col xs="10" sm="10" md="10">
															<Field
																as="select"
																className="form-control mb-3"
																name={`labInstructors[${index}]`}
															>
																<option
																	className="text-gray-600"
																	value=""
																	default
																	disabled
																>
																	Lab Instructor{' '}
																	{index === 0 ? null : '(' + (index + 1) + ')'}
																</option>
																{instructors.map((instructor) => (
																	<option
																		key={instructor._id}
																		value={instructor._id}
																	>
																		{instructor.user.surname}
																	</option>
																))}
															</Field>
															<ErrorMessage
																name={`labInstructors[${index}]`}
																component={FormErrorMessage}
															/>
														</Col>
														{index === 0 ? (
															<Col
																xs="2"
																sm="2"
																md="2"
																className="mb-3 text-right"
															>
																<Button
																	type="button"
																	color="info"
																	onClick={() =>
																		setFieldValue('labInstructors', [
																			...values.labInstructors,
																			'',
																		])
																	}
																	disabled={isSubmitting}
																>
																	+
																</Button>
															</Col>
														) : (
															<Col
																xs="2"
																sm="2"
																md="2"
																className="mb-3 text-right"
															>
																<Button
																	type="button"
																	color="warning"
																	onClick={() =>
																		setFieldValue(
																			'labInstructors',
																			values.labInstructors.filter(
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
												))}
											</>
										)}
									</>
								)}
							</FormGroup>
						</Row>
						<Row>
							<Col sm="6" md="6" xs="6" className="text-sm-left text-center">
								<Button
									onClick={() => {
										handleReset();
										setSelectedPart('theory');
									}}
									disabled={!dirty || isSubmitting}
								>
									Clear
								</Button>
							</Col>
							<Col className="text-sm-right text-center">
								<Button type="submit" color="primary" disabled={isSubmitting}>
									{isSubmitting ? (
										<>
											Please wait <Spinner type="grow" size="sm" />
										</>
									) : selectedPart === 'theory' &&
									  isEditingTheoryInstructors ? (
										'Update'
									) : selectedPart === 'lab' && isEditingLabInstructors ? (
										'Update'
									) : (
										'Assign'
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
