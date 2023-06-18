import * as Yup from 'yup';

export const DegreeRulesSchema = Yup.object().shape({
	cycles: Yup.number()
		.min(1, 'Required closed cycles must be at least 1.')
		.positive('Number must be positive.')
		.required('Please define the obligatory closed cycles.'),
	courses: Yup.number()
		.min(1, 'Required passed courses must be at least 1.')
		.positive('Number must be positive.')
		.required('Please define the obligatory passed courses.'),
	cycleCourses: Yup.number()
		.min(1, 'Required passed courses for cycle completion must be at least 1.')
		.positive('Number must be positive.')
		.required('Please define the obligatory passed courses for cycle completion.'),
	practice: Yup.boolean().default(false),
});
