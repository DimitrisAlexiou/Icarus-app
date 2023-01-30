import * as Yup from 'yup';

export const CycleSchema = Yup.object().shape({
	name: Yup.string()
		.oneOf([
			'Security',
			'Software Engineering',
			'Information Systems',
			'Communication Systems',
			'AI',
		])
		.required('Please select the course cycle !'),
});
