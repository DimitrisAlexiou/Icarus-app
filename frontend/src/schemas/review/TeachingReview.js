import * as Yup from 'yup';

export const TeachingReviewSchema = Yup.object().shape({
	clear_course_objectives: Yup.number()
		.oneOf([1, 2, 3, 4, 5])
		.required('Tell us if the course objectives were clear.'),
	course_material: Yup.number()
		.oneOf([1, 2, 3, 4, 5])
		.required('Tell us if the course material was good.'),
	course_comprehension: Yup.number()
		.oneOf([1, 2, 3, 4, 5])
		.required('Tell us if the course comprehension was good.'),
	examination_method: Yup.number()
		.oneOf([1, 2, 3, 4, 5])
		.required('Tell us if the examination method was good.'),
	course_difficulty: Yup.number()
		.oneOf([1, 2, 3, 4, 5])
		.required('Tell us if the course difficulty was managable.'),
	course_activities: Yup.number()
		.oneOf([1, 2, 3, 4, 5])
		.required('Tell us if the course activities were managable'),
});
