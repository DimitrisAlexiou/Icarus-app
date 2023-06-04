import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FormGroup, Label, Row, Col, Button, Spinner } from 'reactstrap';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import { TeachingSchema } from '../../schemas/course/Teaching';
import FormErrorMessage from '../FormErrorMessage';

export default function TeachingForm({ courseId }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	return (
		<>
			<Formik
				initialValues={{
					labWeight: 0,
					theoryWeight: 0,
					theoryGrade: 0,
					labGrade: 0,
					theoryGradeThreshold: 0,
					labGradeThreshold: 0,
					books: [''],
				}}
				validationSchema={TeachingSchema}
				onSubmit={(values, { setSubmitting }) => {
					const teaching = {
						labWeight: values.labWeight,
						theoryWeight: values.theoryWeight,
						theoryGrade: values.theoryGrade,
						labGrade: values.labGrade,
						theoryGradeThreshold: values.theoryGradeThreshold,
						labGradeThreshold: values.labGradeThreshold,
						books: values.books,
					};
					console.log(teaching);
					// dispatch(configureTeaching(teaching));
					setSubmitting(false);
					navigate('/course/' + courseId);
				}}
				validateOnMount
			>
				{({ isSubmitting, dirty, values, handleReset }) => (
					<Form>
						<Row>
							<Col md="12" lg="6">
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
							<Col>
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
						</Row>

						<Row>
							<Col md="12" lg="6">
								<FormGroup className="form-floating mb-3" floating>
									<Field
										type="number"
										min="0"
										className="form-control"
										name="theoryGrade"
									/>
									<Label for="theoryGrade" className="text-gray-600">
										Theory Grade
									</Label>
									<ErrorMessage name="theoryGrade" component={FormErrorMessage} />
								</FormGroup>
							</Col>
							<Col>
								<FormGroup className="form-floating mb-3" floating>
									<Field
										type="number"
										min="0"
										className="form-control"
										name="labGrade"
									/>
									<Label for="labGrade" className="text-gray-600">
										Lab Grade
									</Label>
									<ErrorMessage name="labGrade" component={FormErrorMessage} />
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

						<Label for="books" className="text-gray-600">
							Recommended Books
						</Label>
						<FormGroup className="form-floating mb-3" floating>
							<FieldArray
								name="books"
								render={(arrayHelpers) => (
									<Row>
										<Col md="8" lg="6">
											{values.books.length > 0
												? values.books.map((index) => (
														<FormGroup
															className="form-floating mb-3"
															key={index}
															floating
														>
															<Field
																type="text"
																className="form-control"
																name={`books.${index}`}
															/>
															<Label
																for={`books.${index}`}
																className="text-gray-600"
															>
																Book {index + 1}
															</Label>
															<ErrorMessage
																name={`books.${index}`}
																component={FormErrorMessage}
															/>
														</FormGroup>
												  ))
												: null}
										</Col>
										<Col
											xs="10"
											sm="10"
											md="2"
											lg="5"
											className="text-right mb-3"
										>
											{values.books.length > 1 ? (
												<Button
													color="warning"
													onClick={() => arrayHelpers.pop()}
												>
													-
												</Button>
											) : null}
										</Col>
										<Col xs="2" sm="2" md="2" lg="1" className="mb-3">
											<Button
												color="info"
												onClick={() => arrayHelpers.push('')}
											>
												+
											</Button>
										</Col>
									</Row>
								)}
							/>
						</FormGroup>
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
