import { useDispatch } from 'react-redux';
import { FormGroup, Label, Row, Col, Button, Spinner } from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TeachingReviewSchema } from '../../schemas/review/TeachingReview';
import { createTeachingReview } from '../../features/reviews/teachingReviewSlice';
import RangeSlider from 'react-bootstrap-range-slider';
import FormErrorMessage from '../form/FormErrorMessage';

export default function TeachingReviewForm() {
	const dispatch = useDispatch();

	return (
		<>
			<Formik
				initialValues={{
					clear_course_objectives: 1,
					course_material: 1,
					course_comprehension: 1,
					examination_method: 1,
					course_difficulty: 1,
					course_activities: 1,
				}}
				validationSchema={TeachingReviewSchema}
				onSubmit={(values, { setSubmitting }) => {
					const teachingReview = {
						clear_course_objectives: values.clear_course_objectives,
						course_material: values.course_material,
						course_comprehension: values.course_comprehension,
						examination_method: values.examination_method,
						course_difficulty: values.course_difficulty,
						course_activities: values.course_activities,
					};
					console.log(teachingReview);
					dispatch(createTeachingReview(teachingReview));
					setSubmitting(false);
				}}
				validateOnMount
			>
				{({ isSubmitting, dirty, handleReset }) => (
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
											onChange={(e) =>
												form.setFieldValue(field.name, e.target.value)
											}
											tooltipPlacement="top"
										/>
									)}
								</Field>
								<Label for="clear_course_objectives" className="text-gray-600 mt-2">
									Clear course objectives
								</Label>
							</Row>
							<ErrorMessage
								name="clear_course_objectives"
								component={FormErrorMessage}
							/>
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
											onChange={(e) =>
												form.setFieldValue(field.name, e.target.value)
											}
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
											onChange={(e) =>
												form.setFieldValue(field.name, e.target.value)
											}
											tooltipPlacement="top"
										/>
									)}
								</Field>
								<Label for="course_comprehension" className="text-gray-600 mt-2">
									Better course comprehension due to course material
								</Label>
							</Row>
							<ErrorMessage
								name="course_comprehension"
								component={FormErrorMessage}
							/>
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
											onChange={(e) =>
												form.setFieldValue(field.name, e.target.value)
											}
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
											onChange={(e) =>
												form.setFieldValue(field.name, e.target.value)
											}
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
											onChange={(e) =>
												form.setFieldValue(field.name, e.target.value)
											}
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
							<Col sm="6" md="6" xs="12" className="text-sm-left text-center">
								<Button onClick={handleReset} disabled={!dirty || isSubmitting}>
									Clear
								</Button>
							</Col>
							<Col className="text-sm-right text-center mt-sm-0 mt-3">
								<Button type="submit" color="primary" disabled={isSubmitting}>
									{isSubmitting ? (
										<>
											Please wait <Spinner type="grow" size="sm" />
										</>
									) : (
										'Review'
									)}
								</Button>
							</Col>
						</Row>
					</Form>
				)}
			</Formik>
		</>
	);
}
