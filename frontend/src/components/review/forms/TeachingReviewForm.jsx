import { Row, Spinner } from 'reactstrap';
import { Formik, Form } from 'formik';
import { TeachingReviewSchema } from '../../../schemas/review/TeachingReview';
import {
	createTeachingReview,
	setEditTeachingReview,
	updateTeachingReview,
} from '../../../features/reviews/teachingReviewSlice';
import RangeSliderField from '../../form/RangeSliderField';
import ClearButton from '../../buttons/ClearButton';
import SubmitButton from '../../buttons/SubmitButton';

export default function TeachingReviewForm({
	user,
	teaching,
	teachingReview,
	isEditingTeachingReview,
	editTeachingReviewId,
	setFormIsVisible,
	setFormIsOpen,
	dispatch,
}) {
	return (
		<>
			<Formik
				initialValues={{
					clear_course_objectives: teachingReview
						? teachingReview.clear_course_objectives
						: 1,
					course_material: teachingReview ? teachingReview.course_material : 1,
					course_comprehension: teachingReview
						? teachingReview.course_comprehension
						: 1,
					examination_method: teachingReview
						? teachingReview.examination_method
						: 1,
					course_difficulty: teachingReview
						? teachingReview.course_difficulty
						: 1,
					course_activities: teachingReview
						? teachingReview.course_activities
						: 1,
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
								reviewId: editTeachingReviewId,
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
						<RangeSliderField
							name="clear_course_objectives"
							label="Clear course objectives"
						/>
						<RangeSliderField
							name="course_material"
							label="Course material matching the course objectives"
						/>
						<RangeSliderField
							name="course_comprehension"
							label="Better course comprehension due to course material"
						/>
						<RangeSliderField
							name="examination_method"
							label="Examination method and grading criteria awareness"
						/>
						<RangeSliderField
							name="course_difficulty"
							label="Course difficulty level"
						/>
						<RangeSliderField
							name="course_activities"
							label="Better course comprehension due to labs/projects/tutorials"
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
									) : isEditingTeachingReview ? (
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
