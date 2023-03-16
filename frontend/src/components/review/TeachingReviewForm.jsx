import { FormGroup, Label, Row, Col, Button } from 'reactstrap';
import { Form, Field, ErrorMessage } from 'formik';
import RangeSlider from 'react-bootstrap-range-slider';
import SubmitButton from '../buttons/SubmitButton';
import FormErrorMessage from '../FormErrorMessage';

export default function TeachingReviewForm({ isSubmitting, dirty, handleReset }) {
	return (
		<>
			<Form>
				<FormGroup className="form-floating mb-3 mt-2" floating>
					<Row>
						<Field className="form-control" name="clear_course_objectives">
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
						<Label for="clear_course_objectives" className="text-gray-600 mt-2">
							Clear course objectives
						</Label>
					</Row>
					<ErrorMessage name="clear_course_objectives" component={FormErrorMessage} />
				</FormGroup>
				<FormGroup className="form-floating mb-3" floating>
					<Row>
						<Field className="form-control" name="course_material">
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
						<Label for="course_material" className="text-gray-600 mt-2">
							Course material matching the course objectives
						</Label>
					</Row>
					<ErrorMessage name="course_material" component={FormErrorMessage} />
				</FormGroup>
				<FormGroup className="form-floating mb-3" floating>
					<Row>
						<Field className="form-control" name="course_comprehension">
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
						<Label for="course_comprehension" className="text-gray-600 mt-2">
							Better course comprehension due to course material
						</Label>
					</Row>
					<ErrorMessage name="course_comprehension" component={FormErrorMessage} />
				</FormGroup>
				<FormGroup className="form-floating mb-3" floating>
					<Row>
						<Field className="form-control" name="examination_method">
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
						<Label for="examination_method" className="text-gray-600 mt-2">
							Examination method and grading criteria awareness
						</Label>
					</Row>
					<ErrorMessage name="examination_method" component={FormErrorMessage} />
				</FormGroup>
				<FormGroup className="form-floating mb-3" floating>
					<Row>
						<Field className="form-control" name="course_difficulty">
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
						<Label for="course_difficulty" className="text-gray-600 mt-2">
							Course difficulty level
						</Label>
					</Row>
					<ErrorMessage name="course_difficulty" component={FormErrorMessage} />
				</FormGroup>
				<FormGroup className="form-floating mb-3" floating>
					<Row>
						<Field className="form-control" name="course_activities">
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
						<Label for="course_activities" className="text-gray-600 t-2">
							Better course comprehension due to labs/projects/tutorials
						</Label>
					</Row>
					<ErrorMessage name="course_activities" component={FormErrorMessage} />
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
