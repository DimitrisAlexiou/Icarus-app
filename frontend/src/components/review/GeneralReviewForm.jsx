import { FormGroup, Label, Row, Col, Button } from 'reactstrap';
import { Form, Field, ErrorMessage } from 'formik';
import SubmitButton from '../buttons/SubmitButton';
import FormErrorMessage from '../../components/FormErrorMessage';

export default function GeneralReviewForm({ isSubmitting, dirty, handleReset }) {
	return (
		<>
			<Form>
				<FormGroup className="form-floating mb-3" floating>
					<Field
						as="textarea"
						className="form-control"
						style={{ height: '100px', text_align: 'justify' }}
						name="course_opinion"
					/>
					<Label for="course_opinion" className="text-gray-600">
						What is your opinion about the course?
					</Label>
					<ErrorMessage name="course_opinion" component={FormErrorMessage} />
				</FormGroup>

				<FormGroup className="form-floating mb-3" floating>
					<Field
						as="textarea"
						className="form-control"
						style={{ height: '100px', text_align: 'justify' }}
						name="instructor_opinion"
					/>
					<Label for="instructor_opinion" className="text-gray-600">
						What is your opinion about the instructor(s)?
					</Label>
					<ErrorMessage name="instructor_opinion" component={FormErrorMessage} />
				</FormGroup>

				<FormGroup className="form-floating mb-3" floating>
					<Field
						as="textarea"
						className="form-control"
						style={{ height: '100px', text_align: 'justify' }}
						name="likes"
					/>
					<Label for="likes" className="text-gray-600">
						What did you liked about this course?
					</Label>
					<ErrorMessage name="likes" component={FormErrorMessage} />
				</FormGroup>

				<FormGroup className="form-floating mb-3" floating>
					<Field
						as="textarea"
						className="form-control"
						style={{ height: '100px', text_align: 'justify' }}
						name="dislikes"
					/>
					<Label for="dislikes" className="text-gray-600">
						What did you disliked about this course?
					</Label>
					<ErrorMessage name="dislikes" component={FormErrorMessage} />
				</FormGroup>

				<Row className="mt-4">
					<Col sm="6" md="6" xs="12" className="text-sm-left text-center">
						<Button onClick={handleReset} disabled={!dirty || isSubmitting}>
							Clear
						</Button>
					</Col>
					<Col className="text-sm-right text-center mt-sm-0 mt-3 px-0">
						<SubmitButton
							color={'primary'}
							message={'Review'}
							disabled={isSubmitting}
						/>
					</Col>
				</Row>
			</Form>
		</>
	);
}
