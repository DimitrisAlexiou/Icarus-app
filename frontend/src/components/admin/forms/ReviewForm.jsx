import { Label, Row, Col, Spinner } from 'reactstrap';
import { Formik, Form } from 'formik';
import { ReviewSchema } from '../../../schemas/admin/Review';
import {
	defineReview,
	setEditReview,
	updateReview,
} from '../../../features/admin/reviewSlice';
import DatePickerField from '../../form/DatePickerField';
import NumberField from '../../form/NumberField';
import ClearButton from '../../buttons/ClearButton';
import SubmitButton from '../../buttons/SubmitButton';

export default function ReviewForm({
	review,
	isEditingReview,
	editReviewId,
	semester,
	dispatch,
}) {
	return (
		<>
			<Formik
				initialValues={{
					startDate: review ? new Date(review.startDate) : new Date(),
					endDate: review ? new Date(review.endDate) : new Date(),
					startAfter: review ? review.startAfter : 0,
					semesterStartDate: new Date(semester.startDate),
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
						dispatch(
							setEditReview({
								isEditingReview: false,
								editReviewId: '',
							})
						);
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
								<NumberField name="startAfter" min="1" label="Review start" />
							</Col>
						</Row>
						<Row>
							<Label
								for="period"
								className="text-gray-300 d-flex justify-content-center"
							>
								Review duration
							</Label>
							<DatePickerField />
						</Row>
						<Row className="mb-3">
							<ClearButton
								onClick={handleReset}
								disabled={!dirty || isSubmitting}
							/>
							<SubmitButton
								body={
									isSubmitting ? (
										<>
											Please wait <Spinner type="grow" size="sm" />
										</>
									) : isEditingReview ? (
										'Update'
									) : (
										'Configure'
									)
								}
								disabled={isSubmitting}
							/>
						</Row>
					</Form>
				)}
			</Formik>
		</>
	);
}
