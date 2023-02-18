import * as Yup from 'yup';

export const GeneralReviewSchema = Yup.object().shape({
	course_opinion: Yup.string()
		.max(200, 'Course opinion must be 200 characters or less!')
		.required('Tell us your opinion about the course.'),
	instructor_opinion: Yup.string()
		.max(200, 'Instructor opinion must be 200 characters or less!')
		.required('Tell us your opinion about the instructor.'),
	likes: Yup.string()
		.max(200, 'Positives opinion must be 200 characters or less!')
		.required('Tell us what you liked about the course.'),
	dislikes: Yup.string()
		.max(200, 'Negatives opinion must be 200 characters or less!')
		.required('Tell us what you disliked about the course.'),
});
