import { Row, Spinner } from 'reactstrap';
import { Formik, Form } from 'formik';
import { InstructorReviewSchema } from '../../../schemas/review/InstructorReview';
import {
	createInstructorReview,
	setEditInstructorReview,
	updateInstructorReview,
} from '../../../features/reviews/instructorReviewSlice';
import RangeSliderField from '../../form/RangeSliderField';
import ClearButton from '../../buttons/ClearButton';
import SubmitButton from '../../buttons/SubmitButton';

export default function InstructorReviewForm({
	user,
	teaching,
	instructorReview,
	isEditingInstructorReview,
	editInstructorReviewId,
	setFormIsVisible,
	setFormIsOpen,
	dispatch,
}) {
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
						<RangeSliderField
							name="good_organization"
							label="Good organization of presentation material"
						/>
						<RangeSliderField
							name="clear_comprehensive_answers"
							label="Clear and comprehensive answers/exemplifications/examples"
						/>
						<RangeSliderField
							name="student_participation"
							label="Active student participation encouragement"
						/>
						<RangeSliderField
							name="course_consistency"
							label="Consistency in course obligations"
						/>
						<RangeSliderField
							name="instructor_approachable"
							label="Approachability of the Instructor"
						/>
						<Row>
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
									) : isEditingInstructorReview ? (
										'Update'
									) : (
										'Review'
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
