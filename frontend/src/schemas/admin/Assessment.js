import * as Yup from 'yup';

export const AssessmentSchema = Yup.object().shape({
	period: Yup.number()
		.min(1, 'Assessment statement period must be at least 1.')
		.test(
			'no-leading-zero',
			'Assessment statement period should not start with 0.',
			(value) => {
				if (typeof value !== 'number') return false;

				const stringValue = String(value);
				return stringValue.charAt(0) !== '0';
			}
		)
		.required('Please select the assessment statement period.'),
	startDate: Yup.date()
		.min(
			Yup.ref('semesterStartDate'),
			'Start date should be greater than semester starting date.'
		)
		.required('Please select starting date.'),
	endDate: Yup.date()
		.min(Yup.ref('startDate'), 'End date should be greater than assessment starting date.')
		.required('Please select ending date.'),
});
