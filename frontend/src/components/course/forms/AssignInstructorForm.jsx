import { useState } from 'react';
import { FormGroup, Row, Col, Button, Spinner } from 'reactstrap';
import { Formik, Form } from 'formik';
import {
	assignLabInstructors,
	assignTheoryInstructors,
} from '../../../features/courses/teachingSlice';
import { AssignInstructorSchema } from '../../../schemas/course/AssignInstructor';
import SelectField from '../../form/SelectField';
import RadioField from '../../form/RadioField';
import ClearButton from '../../buttons/ClearButton';
import SubmitButton from '../../buttons/SubmitButton';

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
			<Row
				style={{ textAlign: 'center' }}
				className="justify-content-center mb-3 mt-2"
			>
				<Col md="5">
					<RadioField
						name="theory"
						value="theory"
						label="Theory"
						checked={selectedPart === 'theory'}
						onChange={() => setSelectedPart('theory')}
					/>
				</Col>
				{teaching.course.hasLab ? (
					<Col md="5">
						<RadioField
							name="lab"
							value="lab"
							label="Lab"
							checked={selectedPart === 'lab'}
							onChange={() => setSelectedPart('lab')}
						/>
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
																<SelectField
																	name={`theoryInstructors[${index}]`}
																	label={`Instructor ${index + 1} `}
																	options={
																		<>
																			<option
																				key={theoryInstructor._id}
																				value={theoryInstructor._id}
																			>
																				{theoryInstructor.user.surname}{' '}
																				{theoryInstructor.user.name}
																			</option>
																		</>
																	}
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
															<SelectField
																name={`theoryInstructors[${index}]`}
																label={`Instructor ${index + 1} `}
																options={
																	<>
																		<option
																			className="text-gray-300"
																			value=""
																			default
																			disabled
																		>
																			Theory Instructor
																		</option>
																		{instructors.map((instructor) => (
																			<option
																				key={instructor._id}
																				value={instructor._id}
																			>
																				{instructor.user.surname}{' '}
																				{instructor.user.name}
																			</option>
																		))}
																	</>
																}
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
															<SelectField
																name={`labInstructors[${index}]`}
																label={`Instructor ${index + 1} `}
																options={
																	<>
																		<option
																			key={labInstructor._id}
																			value={labInstructor._id}
																		>
																			{labInstructor.user.surname}{' '}
																			{labInstructor.user.name}
																		</option>
																	</>
																}
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
															<SelectField
																name={`labInstructors[${index}]`}
																label={`Instructor ${index + 1} `}
																options={
																	<>
																		<option
																			className="text-gray-300"
																			value=""
																			default
																			disabled
																		>
																			Lab Instructor
																		</option>
																		{instructors.map((instructor) => (
																			<option
																				key={instructor._id}
																				value={instructor._id}
																			>
																				{instructor.user.surname}{' '}
																				{instructor.user.name}
																			</option>
																		))}
																	</>
																}
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
							<ClearButton
								onClick={() => {
									handleReset();
									setSelectedPart('theory');
								}}
								disabled={!dirty || isSubmitting}
							/>
							<SubmitButton
								body={
									isSubmitting ? (
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
									)
								}
								disabled={isSubmitting}
							/>
						</Row>
					</Form>
				)}
			</Formik>
		</>
	);
}
