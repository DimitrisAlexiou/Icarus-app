import { useDispatch } from 'react-redux';
import { FormGroup, Label, Row, Col, Button, Spinner } from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TeachingReviewSchema } from '../../../schemas/review/TeachingReview';
import {
	createTeachingReview,
	setEditTeachingReview,
	updateTeachingReview,
} from '../../../features/reviews/teachingReviewSlice';
import RangeSlider from 'react-bootstrap-range-slider';
import FormErrorMessage from '../../form/FormErrorMessage';

export default function TeachingReviewForm({
	user,
	teaching,
	teachingReview,
	isEditingTeachingReview,
	editTeachingReviewId,
	setFormIsVisible,
	setFormIsOpen,
}) {
	const dispatch = useDispatch();

	return (
		<>
			<Formik
				initialValues={{
					clear_course_objectives: teachingReview
						? teachingReview.clear_course_objectives
						: 1,
					course_material: teachingReview ? teachingReview.course_material : 1,
					course_comprehension: teachingReview ? teachingReview.course_comprehension : 1,
					examination_method: teachingReview ? teachingReview.examination_method : 1,
					course_difficulty: teachingReview ? teachingReview.course_difficulty : 1,
					course_activities: teachingReview ? teachingReview.course_activities : 1,
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
						teaching: teaching._id,
						user: user.user._id,
					};
					if (isEditingTeachingReview) {
						console.log(teachingReview);
						dispatch(
							updateTeachingReview({
								teachingReviewId: editTeachingReviewId,
								data: teachingReview,
							})
						);
						setSubmitting(false);
						dispatch(
							setEditTeachingReview({
								isEditingTeachingReview: false,
								editTeachingReviewId: '',
							})
						);
						setFormIsVisible(false);
						setFormIsOpen(false);
						return;
					}
					console.log(teachingReview);
					dispatch(createTeachingReview(teachingReview));
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
								<Label for="clear_course_objectives" className="text-gray-600 mt-2">
									Clear course objectives
								</Label>
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
							</Row>
							<ErrorMessage
								name="clear_course_objectives"
								component={FormErrorMessage}
							/>
						</FormGroup>
						<FormGroup className="form-floating mb-3" floating>
							<Row>
								<Label for="course_material" className="text-gray-600 mt-2">
									Course material matching the course objectives
								</Label>
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
							</Row>
							<ErrorMessage name="course_material" component={FormErrorMessage} />
						</FormGroup>
						<FormGroup className="form-floating mb-3" floating>
							<Row>
								<Label for="course_comprehension" className="text-gray-600 mt-2">
									Better course comprehension due to course material
								</Label>
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
							</Row>
							<ErrorMessage
								name="course_comprehension"
								component={FormErrorMessage}
							/>
						</FormGroup>
						<FormGroup className="form-floating mb-3" floating>
							<Row>
								<Label for="examination_method" className="text-gray-600 mt-2">
									Examination method and grading criteria awareness
								</Label>
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
							</Row>
							<ErrorMessage name="examination_method" component={FormErrorMessage} />
						</FormGroup>
						<FormGroup className="form-floating mb-3" floating>
							<Row>
								<Label for="course_difficulty" className="text-gray-600 mt-2">
									Course difficulty level
								</Label>
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
							</Row>
							<ErrorMessage name="course_difficulty" component={FormErrorMessage} />
						</FormGroup>
						<FormGroup className="form-floating mb-3" floating>
							<Row>
								<Label for="course_activities" className="text-gray-600 t-2">
									Better course comprehension due to labs/projects/tutorials
								</Label>
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
							</Row>
							<ErrorMessage name="course_activities" component={FormErrorMessage} />
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
									) : isEditingTeachingReview ? (
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
