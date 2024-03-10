import { Row, Col, Spinner } from 'reactstrap';
import { Formik, Form } from 'formik';
import { ReviewSchema } from '../../../schemas/admin/Review';
import {
	defineReview,
	setEditReview,
	updateReview,
} from '../../../features/admin/reviewSlice';
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
					period: review ? review.period : 1,
					startAfter: review ? review.startAfter : 1,
				}}
				validationSchema={ReviewSchema}
				onSubmit={(values, { setSubmitting }) => {
					const review = {
						period: values.period,
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
							<Col>
								<NumberField name="period" min="1" label="Review period" />
							</Col>
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
