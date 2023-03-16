import { FormGroup, Label, Row, Col, Button } from 'reactstrap';
import { Form, Field, ErrorMessage } from 'formik';
import RangeSlider from 'react-bootstrap-range-slider';
import SubmitButton from '../buttons/SubmitButton';
import FormErrorMessage from '../FormErrorMessage';

export default function InstructorReviewForm({ isSubmitting, dirty, handleReset }) {
	return (
		<>
			<Form>
				<FormGroup className="form-floating mb-3 mt-2" floating>
					<Row>
						<Field className="form-control" name="good_organization">
							{({ field, form }) => (
								<RangeSlider
									step={1}
									min={1}
									max={5}
									value={field.value}
									onChange={(e) => form.setFieldValue(field.name, e.target.value)}
									tooltipPlacement="top"
								/>
							)}
						</Field>
						<Label for="good_organization" className="text-gray-600 mt-2">
							Good organization of presentation material
						</Label>
					</Row>
					<ErrorMessage name="good_organization" component={FormErrorMessage} />
				</FormGroup>
				<FormGroup className="form-floating mb-3" floating>
					<Row>
						<Field className="form-control" name="clear_comprehensive_answers">
							{({ field, form }) => (
								<RangeSlider
									step={1}
									min={1}
									max={5}
									value={field.value}
									onChange={(e) => form.setFieldValue(field.name, e.target.value)}
									tooltipPlacement="top"
								/>
							)}
						</Field>
						<Label for="clear_comprehensive_answers" className="text-gray-600 mt-2">
							Clear and comprehensive answers/exemplifications/examples
						</Label>
					</Row>
					<ErrorMessage name="clear_comprehensive_answers" component={FormErrorMessage} />
				</FormGroup>
				<FormGroup className="form-floating mb-3" floating>
					<Row>
						<Field className="form-control" name="student_participation">
							{({ field, form }) => (
								<RangeSlider
									step={1}
									min={1}
									max={5}
									value={field.value}
									onChange={(e) => form.setFieldValue(field.name, e.target.value)}
									tooltipPlacement="top"
								/>
							)}
						</Field>
						<Label for="student_participation" className="text-gray-600 mt-2">
							Active student participation encouragement
						</Label>
					</Row>
					<ErrorMessage name="student_participation" component={FormErrorMessage} />
				</FormGroup>
				<FormGroup className="form-floating mb-3" floating>
					<Row>
						<Field className="form-control" name="course_consistency">
							{({ field, form }) => (
								<RangeSlider
									step={1}
									min={1}
									max={5}
									value={field.value}
									onChange={(e) => form.setFieldValue(field.name, e.target.value)}
									tooltipPlacement="top"
								/>
							)}
						</Field>
						<Label for="course_consistency" className="text-gray-600 mt-2">
							Consistency in course obligations
						</Label>
					</Row>
					<ErrorMessage name="course_consistency" component={FormErrorMessage} />
				</FormGroup>
				<FormGroup className="form-floating mb-3" floating>
					<Row>
						<Field className="form-control" name="instructor_approachable">
							{({ field, form }) => (
								<RangeSlider
									step={1}
									min={1}
									max={5}
									value={field.value}
									onChange={(e) => form.setFieldValue(field.name, e.target.value)}
									tooltipPlacement="top"
								/>
							)}
						</Field>
						<Label for="instructor_approachable" className="text-gray-600 mt-2">
							Approachability of the Instructor
						</Label>
					</Row>
					<ErrorMessage name="instructor_approachable" component={FormErrorMessage} />
				</FormGroup>
				<Row className="mt-4">
					<Col md="6" sm="6" xs="6">
						<Button onClick={handleReset} disabled={!dirty || isSubmitting}>
							Clear
						</Button>
					</Col>
					<Col className="text-right px-0">
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
