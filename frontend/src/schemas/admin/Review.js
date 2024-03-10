import * as Yup from 'yup';

export const ReviewSchema = Yup.object().shape({
	period: Yup.number()
		.min(1, 'Review duration period must be at least 1.')
		.test(
			'no-leading-zero',
			'Review duration period should not start with 0.',
			(value) => {
				if (typeof value !== 'number') return false;

				const stringValue = String(value);
				return stringValue.charAt(0) !== '0';
			}
		)
		.required('Please select the review start period.'),
	startAfter: Yup.number()
		.min(1, 'Review start period must be at least 1.')
		.test(
			'no-leading-zero',
			'Review start period should not start with 0.',
			(value) => {
				if (typeof value !== 'number') return false;

				const stringValue = String(value);
				return stringValue.charAt(0) !== '0';
			}
		)
		.required('Please select the review start period.'),
});
