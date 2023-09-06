import * as Yup from 'yup';

export const TeachingSchema = Yup.object().shape({
	labWeight: Yup.number()
		.max(100, 'Lab weight cannot exceed 100.')
		.min(20, 'Lab weight must be at least 20.')
		.positive('Number must be positive.')
		.required('Please provide the theory weight.')
		.test(
			'weightSum',
			'The sum of theory weight and lab weight should be equal to 100.',
			function () {
				return this.parent.theoryWeight + this.parent.labWeight === 100;
			}
		),
	theoryWeight: Yup.number()
		.max(100, 'Theory weight cannot exceed 100.')
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
		.max(10, 'Theory grade threshold cannot exceed 10.')
		.min(4, 'Theory grade threshold must be at least 4.')
		.moreThan(0, 'Theory grade threshold must be greater than 0.')
		.required('Please provide the theory grade threshold value.'),
	labGradeThreshold: Yup.number()
		.max(10, 'Lab grade threshold cannot exceed 10.')
		.min(4, 'Lab grade threshold must be at least 4.')
		.moreThan(0, 'Theory grade threshold must be greater than 0.')
		.required('Please provide the lab grade threshold value.'),
	books: Yup.array().of(
		Yup.string().required('Please provide one or more recommended course book/s.')
	),
});
