import * as Yup from 'yup';

export const MasterProgramSchema = Yup.object().shape({
	title: Yup.string()
		.max(80, 'Master Program title must be 80 characters or less.')
		.required('Master Program title is required.'),
	startDate: Yup.date().required('Please select starting date.'),
	duration: Yup.number()
		.min(1, 'Duration must be at least 1.')
		.positive('Number must be positive.')
		.required('Duration value is required.'),
	ects: Yup.number()
		.min(1, 'ECTS must be at least 1.')
		.positive('Number must be positive.')
		.required('ECTS value is required.'),
});
