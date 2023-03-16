import * as Yup from 'yup';

export const GeneralReviewSchema = Yup.object().shape({
	course_opinion: Yup.string()
		.max(800, 'Course opinion must be 800 characters or less.')
		.required('Tell us your opinion about the course.'),
	instructor_opinion: Yup.string()
		.max(800, 'Instructor opinion must be 800 characters or less.')
		.required('Tell us your opinion about the instructor.'),
	likes: Yup.string()
		.max(800, 'Positives opinion must be 800 characters or less.')
		.required('Tell us what you liked about the course.'),
	dislikes: Yup.string()
		.max(800, 'Negatives opinion must be 800 characters or less.')
		.required('Tell us what you disliked about the course.'),
});
