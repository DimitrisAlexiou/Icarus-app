import { useDispatch } from 'react-redux';
import { FormGroup, Label, Row, Col, Button, Spinner } from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ReviewSchema } from '../../schemas/admin/Review';
import { defineReview, updateReview } from '../../features/admin/reviewSlice';
import FormErrorMessage from '../FormErrorMessage';
import DatePickerField from '../DatePickerField';

export default function ReviewForm({ review, isEditingReview, editReviewId, semester }) {
	const dispatch = useDispatch();

	return (
		<>
			<Formik
				initialValues={{
					startDate: review ? review.startDate : new Date(),
					endDate: review ? review.endDate : new Date(),
					startAfter: review ? review.startAfter : 0,
				}}
				validationSchema={ReviewSchema}
				onSubmit={(values, { setSubmitting }) => {
					const review = {
						startDate: values.startDate,
						endDate: values.endDate,
						startAfter: values.startAfter,
						semester: semester._id,
					};
					if (isEditingReview) {
						dispatch(
							updateReview({
								reviewId: editReviewId,
								data: review,
							})
						);
						setSubmitting(false);
						return;
					}
					dispatch(defineReview(review));
					setSubmitting(false);
				}}
				validateOnMount
			>
				{({ isSubmitting, dirty, handleReset }) => (
					<Form>
						<Row>
							<Col>
								<FormGroup className="form-floating mb-3" floating>
									<Field
										type="number"
										min="1"
										className="form-control"
										name="startAfter"
									/>
									<Label for="startAfter" className="text-gray-600">
										Review start
									</Label>
									<ErrorMessage name="startAfter" component={FormErrorMessage} />
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
							<Col className="text-sm-right text-center mt-sm-0 mt-3">
								<Button type="submit" color="primary" disabled={isSubmitting}>
									{isSubmitting ? (
										<>
											Please wait <Spinner type="grow" size="sm" />
										</>
									) : isEditingReview ? (
										'Update'
									) : (
										'Configure'
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
