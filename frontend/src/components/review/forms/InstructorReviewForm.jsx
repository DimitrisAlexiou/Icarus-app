import { useDispatch } from 'react-redux';
import { FormGroup, Label, Row, Col, Button, Spinner } from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { InstructorReviewSchema } from '../../../schemas/review/InstructorReview';
import {
	createInstructorReview,
	setEditInstructorReview,
	updateInstructorReview,
} from '../../../features/reviews/instructorReviewSlice';
import RangeSlider from 'react-bootstrap-range-slider';
import FormErrorMessage from '../../form/FormErrorMessage';

export default function InstructorReviewForm({
	user,
	teaching,
	instructorReview,
	isEditingInstructorReview,
	editInstructorReviewId,
	setFormIsVisible,
	setFormIsOpen,
}) {
	const dispatch = useDispatch();

	return (
		<>
			<Formik
				initialValues={{
					good_organization: instructorReview
						? instructorReview.good_organization
						: 1,
					clear_comprehensive_answers: instructorReview
						? instructorReview.clear_comprehensive_answers
						: 1,
					student_participation: instructorReview
						? instructorReview.student_participation
						: 1,
					course_consistency: instructorReview
						? instructorReview.course_consistency
						: 1,
					instructor_approachable: instructorReview
						? instructorReview.instructor_approachable
						: 1,
				}}
				validationSchema={InstructorReviewSchema}
				onSubmit={(values, { setSubmitting }) => {
					const instructorReview = {
						good_organization: values.good_organization,
						clear_comprehensive_answers: values.clear_comprehensive_answers,
						student_participation: values.student_participation,
						course_consistency: values.course_consistency,
						instructor_approachable: values.instructor_approachable,
						teaching: teaching._id,
						user: user.user._id,
					};
					if (isEditingInstructorReview) {
						console.log(instructorReview);
						dispatch(
							updateInstructorReview({
								instructorReviewId: editInstructorReviewId,
								data: instructorReview,
							})
						);
						setSubmitting(false);
						dispatch(
							setEditInstructorReview({
								isEditingInstructorReview: false,
								editInstructorReviewId: '',
							})
						);
						setFormIsVisible(false);
						setFormIsOpen(false);
						return;
					}
					console.log(instructorReview);
					dispatch(createInstructorReview(instructorReview));
					setSubmitting(false);
					setFormIsVisible(false);
					setFormIsOpen(false);
				}}
				validateOnMount
			>
				{({ isSubmitting, dirty, handleReset }) => (
					<Form>
						<FormGroup className="form-floating mb-3 mt-2" floating>
							<Row>
								<Label for="good_organization" className="text-gray-600 mt-2">
									Good organization of presentation material
								</Label>
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
							</Row>
							<ErrorMessage
								name="good_organization"
								component={FormErrorMessage}
							/>
						</FormGroup>
						<FormGroup className="form-floating mb-3" floating>
							<Row>
								<Label
									for="clear_comprehensive_answers"
									className="text-gray-600 mt-2"
								>
									Clear and comprehensive answers/exemplifications/examples
								</Label>
								<Field
									className="form-control"
									name="clear_comprehensive_answers"
								>
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
							</Row>
							<ErrorMessage
								name="clear_comprehensive_answers"
								component={FormErrorMessage}
							/>
						</FormGroup>
						<FormGroup className="form-floating mb-3" floating>
							<Row>
								<Label
									for="student_participation"
									className="text-gray-600 mt-2"
								>
									Active student participation encouragement
								</Label>
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
							</Row>
							<ErrorMessage
								name="student_participation"
								component={FormErrorMessage}
							/>
						</FormGroup>
						<FormGroup className="form-floating mb-3" floating>
							<Row>
								<Label for="course_consistency" className="text-gray-600 mt-2">
									Consistency in course obligations
								</Label>
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
							</Row>
							<ErrorMessage
								name="course_consistency"
								component={FormErrorMessage}
							/>
						</FormGroup>
						<FormGroup className="form-floating mb-3" floating>
							<Row>
								<Label
									for="instructor_approachable"
									className="text-gray-600 mt-2"
								>
									Approachability of the Instructor
								</Label>
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
							</Row>
							<ErrorMessage
								name="instructor_approachable"
								component={FormErrorMessage}
							/>
						</FormGroup>
						<Row>
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
									) : isEditingInstructorReview ? (
										'Update'
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
