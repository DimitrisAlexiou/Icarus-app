import { useState } from 'react';
import { Row, Col, Spinner } from 'reactstrap';
import { Formik, Form } from 'formik';
import {
	assignLabInstructors,
	assignTheoryInstructors,
} from '../../../features/courses/teachingSlice';
import { AssignInstructorSchema } from '../../../schemas/course/AssignInstructor';
import RadioField from '../../form/RadioField';
import ClearButton from '../../buttons/ClearButton';
import SubmitButton from '../../buttons/SubmitButton';

export default function AssignInstructorFormDataTable({
	teachings,
	courses,
	isEditingTheoryInstructors,
	isEditingLabInstructors,
	setModal,
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
				<Col md="5">
					<RadioField
						name="lab"
						value="lab"
						label="Lab"
						checked={selectedPart === 'lab'}
						onChange={() => setSelectedPart('lab')}
					/>
				</Col>
			</Row>

			<Formik
				initialValues={
					{
						// theoryInstructors: teaching.theoryInstructors.length
						// 	? teaching.theoryInstructors
						// 	: [''],
						// labInstructors: teaching.labInstructors.length
						// 	? teaching.labInstructors
						// 	: [''],
					}
				}
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
					// if (selectedPart === 'theory') {
					// 	dispatch(
					// 		assignTheoryInstructors({
					// 			teachingId: teaching._id,
					// 			data: instructorAssignment.theoryInstructors,
					// 		})
					// 	);
					// } else {
					// 	dispatch(
					// 		assignLabInstructors({
					// 			teachingId: teaching._id,
					// 			data: instructorAssignment.labInstructors,
					// 		})
					// 	);
					// }
					setSubmitting(false);
					setModal(false);
				}}
				validateOnMount
			>
				{({ isSubmitting, dirty, values, handleReset, setFieldValue }) => (
					<Form>
						<Row>
							{/* <FormGroup className="form-floating mb-3" floating>
								{selectedPart === 'theory' ? (
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
														{isEditingTheoryInstructors ? (
															<>
																{values.theoryInstructors.map(
																	(theoryInstructor) => (
																		<option
																			key={theoryInstructor._id}
																			value={theoryInstructor}
																		>
																			{theoryInstructor.user.surname}
																		</option>
																	)
																)}
															</>
														) : (
															<>
																{instructors.map((instructor) => (
																	<option
																		key={instructor._id}
																		value={instructor._id}
																	>
																		{instructor.user.surname}
																	</option>
																))}
															</>
														)}
													</Field>
													<ErrorMessage
														name={`theoryInstructors[${index}]`}
														component={FormErrorMessage}
													/>
												</Col>
												{index === 0 ? (
													<Col xs="2" sm="2" md="2" className="mb-3 text-right">
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
													<Col xs="2" sm="2" md="2" className="mb-3 text-right">
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
														{isEditingLabInstructors ? (
															<>
																{values.labInstructors.map((instructor) => (
																	<option
																		key={instructor._id}
																		value={instructor._id}
																	>
																		{instructor.user.surname}
																	</option>
																))}
															</>
														) : (
															<>
																{instructors.map((instructor) => (
																	<option
																		key={instructor._id}
																		value={instructor._id}
																	>
																		{instructor.user.surname}
																	</option>
																))}
															</>
														)}
													</Field>
													<ErrorMessage
														name={`labInstructors[${index}]`}
														component={FormErrorMessage}
													/>
												</Col>
												{index === 0 ? (
													<Col xs="2" sm="2" md="2" className="mb-3 text-right">
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
													<Col xs="2" sm="2" md="2" className="mb-3 text-right">
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
							</FormGroup> */}
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
