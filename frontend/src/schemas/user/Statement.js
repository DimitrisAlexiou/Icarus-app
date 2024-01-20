import * as Yup from 'yup';

export const StatementSchema = Yup.object().shape({
	teaching: Yup.array()
		.of(Yup.string().required('Course is required.'))
		.min(1, 'At least one course is required.'),
});

export const CreateStatementSchema = Yup.object().shape({
	teaching: Yup.array()
		.of(Yup.string().required('Course is required.'))
		.min(1, 'At least one course is required.'),
	student: Yup.string()
		.notOneOf(['Select student'], 'Please select a student.')
		.required('Please select a student.'),
});
