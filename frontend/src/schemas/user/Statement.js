import * as Yup from 'yup';

export const StatementSchema = Yup.object().shape({
	teaching: Yup.array()
		.of(Yup.string().required('Course is required.'))
		.min(1, 'At least one course is required.'),
});
