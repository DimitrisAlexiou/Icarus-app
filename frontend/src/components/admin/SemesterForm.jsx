import { FormGroup, Label, Row, Col, Button } from 'reactstrap';
import { Form, Field, ErrorMessage } from 'formik';
import FormErrorMessage from '../FormErrorMessage';
import SubmitButton from '../buttons/SubmitButton';
import DatePickerField from '../DatePickerField';

export default function SemesterForm({ isSubmitting, dirty, handleReset, isEditting }) {
	return (
		<>
			<Form>
				<Row>
					<Col md="8">
						<FormGroup className="form-floating mb-3" floating>
							<Field as="select" className="form-control" name="type">
								<option default>Select semester type</option>
								<option value={'Winter'}>Winter</option>
								<option value={'Spring'}>Spring</option>
								<option value={'Any'}>Any</option>
							</Field>
							<Label for="type" className="text-gray-600">
								Semester type
							</Label>
							<ErrorMessage name="type" component={FormErrorMessage} />
						</FormGroup>
					</Col>
					<Col>
						<FormGroup className="form-floating mb-3" floating>
							<Field type="number" min="1" className="form-control" name="grading" />
							<Label for="grading" className="text-gray-600">
								Grading period
							</Label>
							<ErrorMessage name="grading" component={FormErrorMessage} />
						</FormGroup>
					</Col>
				</Row>
				<Row>
					<DatePickerField />
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
							message={isEditting ? 'Update' : 'Configure'}
							disabled={isSubmitting}
						/>
					</Col>
				</Row>
			</Form>
		</>
	);
}
