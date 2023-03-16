import { FormGroup, Label, Row, Col, Button } from 'reactstrap';
import { Form, Field, ErrorMessage } from 'formik';
import SubmitButton from '../buttons/SubmitButton';
import FormErrorMessage from '../FormErrorMessage';

export default function NoteForm({ isSubmitting, dirty, handleReset }) {
	return (
		<>
			<Form>
				<FormGroup className="form-floating mb-3" floating>
					<Field type="text" className="form-control" name="title" />
					<Label for="title" className="text-gray-600">
						Title
					</Label>
					<ErrorMessage name="title" component={FormErrorMessage} />
				</FormGroup>

				<FormGroup className="form-floating mb-3" floating>
					<Field
						as="textarea"
						className="form-control"
						style={{ height: '180px', text_align: 'justify' }}
						name="text"
					/>
					<Label for="text" className="text-gray-600">
						Text
					</Label>
					<ErrorMessage name="text" component={FormErrorMessage} />
				</FormGroup>

				<Row>
					<Col className="mb-3">
						<Button onClick={handleReset} disabled={!dirty || isSubmitting}>
							Clear
						</Button>
					</Col>
					<Col className="text-right px-0">
						<SubmitButton
							color={'primary'}
							message={'Post Note'}
							disabled={isSubmitting}
						/>
					</Col>
				</Row>
			</Form>
		</>
	);
}
