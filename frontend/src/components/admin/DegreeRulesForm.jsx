import { FormGroup, Label, Row, Col, Button } from 'reactstrap';
import { Form, Field, ErrorMessage } from 'formik';
import { FormCheckbox } from '../FormCheckbox';
import SubmitButton from '../buttons/SubmitButton';
import FormErrorMessage from '../FormErrorMessage';

export default function DegreeRulesForm({ isSubmitting, dirty, handleReset }) {
	return (
		<>
			<Form>
				<Row>
					<Col md="6">
						<FormGroup className="form-floating mb-3" floating>
							<Field type="number" min="0" className="form-control" name="cycles" />
							<Label for="cycles" className="text-gray-600">
								Obligatory closed Cycles
							</Label>
							<ErrorMessage name="cycles" component={FormErrorMessage} />
						</FormGroup>
					</Col>
					<Col>
						<FormGroup className="form-floating mb-3" floating>
							<Field type="number" min="0" className="form-control" name="courses" />
							<Label for="courses" className="text-gray-600">
								Obligatory passed Courses
							</Label>
							<ErrorMessage name="courses" component={FormErrorMessage} />
						</FormGroup>
					</Col>
				</Row>
				<Row>
					<Col md="7">
						<FormGroup className="form-floating mb-3" floating>
							<Field
								type="number"
								min="0"
								className="form-control"
								name="cycleCourses"
							/>
							<Label for="cycleCourses" className="text-gray-600">
								Passed courses for Cycle completion
							</Label>
							<ErrorMessage name="cycleCourses" component={FormErrorMessage} />
						</FormGroup>
					</Col>
					<Col>
						<FormGroup className="mx-1 mb-3" check>
							<Field name="practice" component={FormCheckbox} />
							<Label for="practice" className="text-gray-500">
								Obligatory Practice
							</Label>
						</FormGroup>
					</Col>
				</Row>
				<Row className="mb-3">
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
