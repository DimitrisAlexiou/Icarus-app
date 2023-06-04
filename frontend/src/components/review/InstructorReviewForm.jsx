import { useDispatch } from 'react-redux';
import { FormGroup, Label, Row, Col, Button, Spinner } from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { InstructorReviewSchema } from '../../schemas/review/InstructorReview';
import { createInstructorReview } from '../../features/reviews/instructorReviewSlice';
import RangeSlider from 'react-bootstrap-range-slider';
import FormErrorMessage from '../FormErrorMessage';

export default function InstructorReviewForm() {
	const dispatch = useDispatch();

	return (
		<>
			<Formik
				initialValues={{
					good_organization: 1,
					clear_comprehensive_answers: 1,
					student_participation: 1,
					course_consistency: 1,
					instructor_approachable: 1,
				}}
				validationSchema={InstructorReviewSchema}
				onSubmit={(values, { setSubmitting }) => {
					const instructorReview = {
						good_organization: values.good_organization,
						clear_comprehensive_answers: values.clear_comprehensive_answers,
						student_participation: values.student_participation,
						course_consistency: values.course_consistency,
						instructor_approachable: values.instructor_approachable,
					};
					console.log(instructorReview);
					dispatch(createInstructorReview(instructorReview));
					setSubmitting(false);
				}}
				validateOnMount
			>
				{({ isSubmitting, dirty, handleReset }) => (
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
											onChange={(e) =>
												form.setFieldValue(field.name, e.target.value)
											}
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
											onChange={(e) =>
												form.setFieldValue(field.name, e.target.value)
											}
											tooltipPlacement="top"
										/>
									)}
								</Field>
								<Label
									for="clear_comprehensive_answers"
									className="text-gray-600 mt-2"
								>
									Clear and comprehensive answers/exemplifications/examples
								</Label>
							</Row>
							<ErrorMessage
								name="clear_comprehensive_answers"
								component={FormErrorMessage}
							/>
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
											onChange={(e) =>
												form.setFieldValue(field.name, e.target.value)
											}
											tooltipPlacement="top"
										/>
									)}
								</Field>
								<Label for="student_participation" className="text-gray-600 mt-2">
									Active student participation encouragement
								</Label>
							</Row>
							<ErrorMessage
								name="student_participation"
								component={FormErrorMessage}
							/>
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
											onChange={(e) =>
												form.setFieldValue(field.name, e.target.value)
											}
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
											onChange={(e) =>
												form.setFieldValue(field.name, e.target.value)
											}
											tooltipPlacement="top"
										/>
									)}
								</Field>
								<Label for="instructor_approachable" className="text-gray-600 mt-2">
									Approachability of the Instructor
								</Label>
							</Row>
							<ErrorMessage
								name="instructor_approachable"
								component={FormErrorMessage}
							/>
						</FormGroup>
						<Row className="mt-4">
							<Col sm="6" md="6" xs="12" className="text-sm-left text-center">
								<Button onClick={handleReset} disabled={!dirty || isSubmitting}>
									Clear
								</Button>
							</Col>
							<Col className="text-sm-right text-center mt-sm-0 mt-3">
								<Button type="submit" color="primary" disabled={!isSubmitting}>
									{!isSubmitting ? (
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
