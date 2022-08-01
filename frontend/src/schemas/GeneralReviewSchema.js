import * as Yup from 'yup';

export const GeneralReviewSchema = Yup.object().shape({
	course_opinion: Yup.string()
		.max(200, 'Course opinion must be 200 characters or less !')
		.required('Please provide a course opinion !'),
	instructor_opinion: Yup.string()
		.max(200, 'Instructor opinion must be 200 characters or less !')
		.required('Please provide a instructor opinion !'),
	likes: Yup.string()
		.max(200, 'Likes opinion must be 200 characters or less !')
		.required('Please provide a likes opinion !'),
	dislikes: Yup.string()
		.max(200, 'Dislikes opinion must be 200 characters or less !')
		.required('Please provide a dislikes opinion !'),
});
