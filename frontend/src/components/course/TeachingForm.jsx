import { useDispatch } from 'react-redux';
import { FormGroup, Label, Row, Col, Button, Spinner } from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { updateTeaching } from '../../features/courses/teachingSlice';
import { TeachingSchema } from '../../schemas/course/Teaching';
import FormErrorMessage from '../form/FormErrorMessage';

export default function TeachingForm({ teaching, isEditingTeaching, editTeachingId }) {
	const dispatch = useDispatch();

	return (
		<>
			<Formik
				initialValues={{
					theoryWeight: teaching ? teaching.theoryWeight : 0,
					labWeight: teaching ? teaching.labWeight : 0,
					theoryGradeRetentionYears: teaching ? teaching.theoryGradeRetentionYears : 0,
					labGradeRetentionYears: teaching ? teaching.labGradeRetentionYears : 0,
					theoryGradeThreshold: teaching ? teaching.theoryGradeThreshold : 0,
					labGradeThreshold: teaching ? teaching.labGradeThreshold : 0,
					books: teaching ? teaching.books : [],
				}}
				enableReinitialize={true}
				validationSchema={TeachingSchema}
				onSubmit={(values, { setSubmitting }) => {
					const teachingData = {
						theoryWeight: values.theoryWeight,
						labWeight: values.labWeight,
						theoryGradeRetentionYears: values.theoryGradeRetentionYears,
						labGradeRetentionYears: values.labGradeRetentionYears,
						theoryGradeThreshold: values.theoryGradeThreshold,
						labGradeThreshold: values.labGradeThreshold,
						books: values.books.some(Boolean) ? values.books : [],
					};
					if (isEditingTeaching) {
						console.log(teachingData);
						dispatch(
							updateTeaching({ teachingId: editTeachingId, data: teachingData })
						);
						setSubmitting(false);
						return;
					}
				}}
				validateOnMount
			>
				{({ isSubmitting, dirty, values, handleReset, setFieldValue }) => (
					<Form>
						<Row>
							<Col md="12" lg="6">
								<FormGroup className="form-floating mb-3" floating>
									<Field
										type="number"
										min="0"
										className="form-control"
										name="theoryWeight"
									/>
									<Label for="theoryWeight" className="text-gray-600">
										Theory Weight
									</Label>
									<ErrorMessage
										name="theoryWeight"
										component={FormErrorMessage}
									/>
								</FormGroup>
							</Col>
							<Col>
								<FormGroup className="form-floating mb-3" floating>
									<Field
										type="number"
										min="0"
										className="form-control"
										name="labWeight"
									/>
									<Label for="labWeight" className="text-gray-600">
										Lab Weight
									</Label>
									<ErrorMessage name="labWeight" component={FormErrorMessage} />
								</FormGroup>
							</Col>
						</Row>
						<Row>
							<Col md="12" lg="6">
								<FormGroup className="form-floating mb-3" floating>
									<Field
										type="number"
										min="0"
										className="form-control"
										name="theoryGradeRetentionYears"
									/>
									<Label
										for="theoryGradeRetentionYears"
										className="text-gray-600"
									>
										Theory Grade Retention Years
									</Label>
									<ErrorMessage
										name="theoryGradeRetentionYears"
										component={FormErrorMessage}
									/>
								</FormGroup>
							</Col>
							<Col>
								<FormGroup className="form-floating mb-3" floating>
									<Field
										type="number"
										min="0"
										className="form-control"
										name="labGradeRetentionYears"
									/>
									<Label for="labGradeRetentionYears" className="text-gray-600">
										Lab Grade Retention Years
									</Label>
									<ErrorMessage
										name="labGradeRetentionYears"
										component={FormErrorMessage}
									/>
								</FormGroup>
							</Col>
						</Row>
						<Row>
							<Col md="12" lg="6">
								<FormGroup className="form-floating mb-3" floating>
									<Field
										type="number"
										min="0"
										className="form-control"
										name="theoryGradeThreshold"
									/>
									<Label for="theoryGradeThreshold" className="text-gray-600">
										Theory Grade Threshold
									</Label>
									<ErrorMessage
										name="theoryGradeThreshold"
										component={FormErrorMessage}
									/>
								</FormGroup>
							</Col>
							<Col>
								<FormGroup className="form-floating mb-3" floating>
									<Field
										type="number"
										min="0"
										className="form-control"
										name="labGradeThreshold"
									/>
									<Label for="labGradeThreshold" className="text-gray-600">
										Lab Grade Threshold
									</Label>
									<ErrorMessage
										name="labGradeThreshold"
										component={FormErrorMessage}
									/>
								</FormGroup>
							</Col>
						</Row>
						<small
							className="text-muted pill-label mb-3"
							style={{
								textAlign: 'justify',
								fontWeight: '700',
								fontSize: 12,
							}}
						>
							Recommended Books
						</small>
						{/* {isEditingTeaching && !teaching.books.length > 0 ? (
							<Row className="mb-3">
								<Col className="mx-3">
									<small
										style={{
											textAlign: 'justify',
											fontWeight: '700',
											fontSize: 13,
										}}
									>
										No books available
									</small>
								</Col>
							</Row>
						) : ( */}
						<FormGroup className="form-floating mb-3" floating>
							{values.books.map((_, index) => (
								<Row key={index}>
									<Col xs="10" sm="10" md="10">
										<Field
											type="text"
											className="form-control mb-3"
											name={`books[${index}]`}
											placeholder={`Book ${index + 1}`}
										/>
										<ErrorMessage
											name={`books[${index}]`}
											component={FormErrorMessage}
										/>
									</Col>
									{index === 0 && (
										<Col xs="2" sm="2" md="2" className="mb-3 text-right">
											<Button
												type="button"
												color="info"
												onClick={() =>
													setFieldValue('books', [...values.books, ''])
												}
												disabled={isSubmitting}
											>
												+
											</Button>
										</Col>
									)}
									{index > 0 && (
										<Col xs="2" sm="2" md="2" className="mb-3 text-right">
											<Button
												type="button"
												color="warning"
												onClick={() =>
													setFieldValue(
														'books',
														values.books.filter((_, i) => i !== index)
													)
												}
											>
												-
											</Button>
										</Col>
									)}
								</Row>
							))}
						</FormGroup>
						{/* )} */}
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
									) : isEditingTeaching ? (
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
