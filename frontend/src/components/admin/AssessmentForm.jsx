import { FormGroup, Label, Row, Col, Button } from 'reactstrap';
import { Form, Field, ErrorMessage } from 'formik';
import FormErrorMessage from '../FormErrorMessage';
import SubmitButton from '../buttons/SubmitButton';
import DatePickerField from '../DatePickerField';

export default function AssessmentForm({ isSubmitting, dirty, handleReset }) {
	return (
		<>
			<Form>
				<Row>
					<Col md="6">
						<FormGroup className="form-floating mb-3" floating>
							<Field type="number" min="1" className="form-control" name="period" />
							<Label for="period" className="text-gray-600">
								Assessment statement period
							</Label>
							<ErrorMessage name="period" component={FormErrorMessage} />
						</FormGroup>
					</Col>
				</Row>
				<Row>
					<DatePickerField />
				</Row>
				<Row>
					<Col className="mb-3">
						<Button onClick={handleReset} disabled={!dirty || isSubmitting}>
							Clear
						</Button>
					</Col>
					<Col className="text-right px-0">
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
