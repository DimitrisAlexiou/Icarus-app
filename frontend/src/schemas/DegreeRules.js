import * as Yup from 'yup';

export const DegreeRulesSchema = Yup.object().shape({
	cycles: Yup.number()
		.min(1, 'Required closed cycles must be at least 1 !')
		.required('Please provide a closed cycles value !'),
	courses: Yup.number()
		.min(1, 'Required passed courses must be at least 1 !')
		.required('Please provide a passed courses value !'),
	cycleCourses: Yup.number()
		.min(1, 'Required passed courses for cycle completion must be at least 1 !')
		.required('Please provide a passed courses for cycle completion value !'),
	practice: Yup.boolean().default(false).required(),
});
