import * as Yup from 'yup';

export const TeachingSchema = Yup.object().shape({
	labWeight: Yup.number()
		.min(20, 'Lab weight must be at least 20.')
		.positive('Number must be positive.')
		.required('Please provide the theory weight.'),
	theoryWeight: Yup.number()
		.min(40, 'Theory weight must be at least 40.')
		.positive('Number must be positive.')
		.required('Please provide the lab weight.'),
	theoryGradeRetentionYears: Yup.number()
		.min(1, 'Theory grade can be kept at least 1 year.')
		.positive('Number must be positive.')
		.required('Please provide the theory grade retention period'),
	labGradeRetentionYears: Yup.number()
		.min(1, 'Lab grade can be kept at least 1 year.')
		.positive('Number must be positive.')
		.required('Please provide the lab grade retention period.'),
	theoryGradeThreshold: Yup.number()
		.min(4, 'Theory grade threshold must be at least 4.')
		.positive('Number must be positive.')
		.required('Please provide the theory grade threshold value.'),
	labGradeThreshold: Yup.number()
		.min(4, 'Lab grade threshold must be at least 4.')
		.positive('Number must be positive.')
		.required('Please provide the lab grade threshold value.'),
	books: Yup.array().of(
		Yup.string().required('Please provide one or more recommended course book/s.')
	),
});
