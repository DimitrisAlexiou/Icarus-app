import { FormGroup, Label, Row, Col, Button } from 'reactstrap';
import { Form, Field, ErrorMessage } from 'formik';
import FormErrorMessage from '../FormErrorMessage';
import SubmitButton from '../buttons/SubmitButton';
import DatePickerField from '../DatePickerField';

export default function ReviewForm({ isSubmitting, dirty, handleReset }) {
	return (
		<>
			<Form>
				<Row>
					<Col md="6">
						<FormGroup className="form-floating mb-3" floating>
							<Field type="number" min="1" className="form-control" name="start" />
							<Label for="start" className="text-gray-600">
								Review start
							</Label>
							<ErrorMessage name="start" component={FormErrorMessage} />
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
