import { useDispatch } from 'react-redux';
import { FormGroup, Label, Row, Col, Button, Spinner } from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { GeneralReviewSchema } from '../../../schemas/review/GeneralReview';
import {
	createGeneralReview,
	setEditGeneralReview,
	updateGeneralReview,
} from '../../../features/reviews/generalReviewSlice';
import FormErrorMessage from '../../form/FormErrorMessage';

export default function GeneralReviewForm({
	user,
	teaching,
	generalReview,
	isEditingGeneralReview,
	editGeneralReviewId,
	setFormIsVisible,
	setFormIsOpen,
}) {
	const dispatch = useDispatch();

	return (
		<>
			<Formik
				initialValues={{
					course_opinion: generalReview ? generalReview.course_opinion : '',
					instructor_opinion: generalReview ? generalReview.instructor_opinion : '',
					likes: generalReview ? generalReview.likes : '',
					dislikes: generalReview ? generalReview.dislikes : '',
				}}
				validationSchema={GeneralReviewSchema}
				onSubmit={(values, { setSubmitting }) => {
					const generalReview = {
						course_opinion: values.course_opinion,
						instructor_opinion: values.instructor_opinion,
						likes: values.likes,
						dislikes: values.dislikes,
						teaching: teaching._id,
						user: user.user._id,
					};
					if (isEditingGeneralReview) {
						console.log(generalReview);
						dispatch(
							updateGeneralReview({
								generalReviewId: editGeneralReviewId,
								data: generalReview,
							})
						);
						setSubmitting(false);
						dispatch(
							setEditGeneralReview({
								isEditingGeneralReview: false,
								editGeneralReviewId: '',
							})
						);
						setFormIsVisible(false);
						setFormIsOpen(false);
						return;
					}
					dispatch(createGeneralReview(generalReview));
					setSubmitting(false);
					setFormIsVisible(false);
					setFormIsOpen(false);
				}}
				validateOnMount
			>
				{({ isSubmitting, dirty, handleReset }) => (
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
									) : isEditingGeneralReview ? (
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
