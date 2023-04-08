import { FormGroup, Label, Row, Col, Button } from 'reactstrap';
import { Form, Field, ErrorMessage, FieldArray } from 'formik';
import SubmitButton from '../buttons/SubmitButton';
import FormErrorMessage from '../FormErrorMessage';

export default function TeachingForm({ values, isSubmitting, dirty, handleReset }) {
	return (
		<>
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
							<ErrorMessage name="theoryWeight" component={FormErrorMessage} />
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
							<Field type="number" min="0" className="form-control" name="labGrade" />
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
							<ErrorMessage name="labGradeThreshold" component={FormErrorMessage} />
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
									{values.books.length > 0 &&
										values.books.map((book, index) => (
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
										))}
								</Col>
								<Col xs="10" sm="10" md="2" lg="5" className="text-right mb-3">
									{values.books.length > 1 && (
										<Button color="warning" onClick={() => arrayHelpers.pop()}>
											-
										</Button>
									)}
								</Col>
								<Col xs="2" sm="2" md="2" lg="1" className="mb-3">
									<Button color="info" onClick={() => arrayHelpers.push('')}>
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
					<Col className="text-sm-right text-center mt-sm-0 mt-3 px-0">
						<SubmitButton
							color={'primary'}
							message={'Configure'}
							disabled={isSubmitting}
						/>
					</Col>
				</Row>
			</Form>
		</>
	);
}
