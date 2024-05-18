import { Row, Spinner } from 'reactstrap';
import { Formik, Form } from 'formik';
import { GeneralReviewSchema } from '../../../schemas/review/GeneralReview';
import {
	createGeneralReview,
	setEditGeneralReview,
	updateGeneralReview,
} from '../../../features/reviews/generalReviewSlice';
import TextAreaField from '../../form/TextAreaField';
import ClearButton from '../../buttons/ClearButton';
import SubmitButton from '../../buttons/SubmitButton';

export default function GeneralReviewForm({
	user,
	teaching,
	generalReview,
	isEditingGeneralReview,
	editGeneralReviewId,
	setFormIsVisible,
	setFormIsOpen,
	dispatch,
}) {
	return (
		<>
			<Formik
				initialValues={{
					course_opinion: generalReview ? generalReview.course_opinion : '',
					instructor_opinion: generalReview
						? generalReview.instructor_opinion
						: '',
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
								reviewId: editGeneralReviewId,
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
						<TextAreaField
							name="course_opinion"
							label="What is your opinion about the course?"
						/>

						<TextAreaField
							name="instructor_opinion"
							label="What is your opinion about the instructor(s)?"
						/>

						<TextAreaField
							name="likes"
							label="What did you liked about this course?"
						/>

						<TextAreaField
							name="dislikes"
							label="What did you disliked about this course?"
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
									) : isEditingGeneralReview ? (
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
