import { FormGroup, Label, Row, Col } from 'reactstrap';
import { Field, ErrorMessage } from 'formik';
import { FormCheckbox } from '../FormCheckbox';
import FormErrorMessage from '../FormErrorMessage';

const DegreeRulesForm = ({ initialValues }) => {
	// export default function DegreeRulesForm() {
	return (
		<>
			<Row>
				<Col md="6">
					<FormGroup className="form-floating mb-3" floating>
						<Field
							type="number"
							min="0"
							className="form-control"
							name="cycles"
						/>
						<Label for="cycles" className="text-gray-600">
							Obligatory closed Cycles
						</Label>
						<ErrorMessage name="cycles" component={FormErrorMessage} />
					</FormGroup>
				</Col>

				<Col md="6">
					<FormGroup className="form-floating mb-3" floating>
						<Field
							type="number"
							min="0"
							className="form-control"
							name="courses"
						/>
						<Label for="courses" className="text-gray-600">
							Obligatory passed Courses
						</Label>
						<ErrorMessage name="courses" component={FormErrorMessage} />
					</FormGroup>
				</Col>
			</Row>

			<Row>
				<Col md="6">
					<FormGroup className="form-floating mb-3" floating>
						<Field
							type="number"
							min="0"
							className="form-control"
							name="cycleCourses"
						/>
						<Label for="cycleCourses" className="text-gray-600">
							Passed courses for cycle completion
						</Label>
						<ErrorMessage name="cycleCourses" component={FormErrorMessage} />
					</FormGroup>
				</Col>

				<Col md="6">
					<FormGroup className="mx-1 mb-3" check>
						<Field name="practice" component={FormCheckbox} />
						<Label for="practice" className="text-gray-500">
							Obligatory Practice
						</Label>
					</FormGroup>
				</Col>
			</Row>
		</>
	);
};

export default DegreeRulesForm;
