import * as Yup from 'yup';

export const SemesterSchema = Yup.object().shape({
	type: Yup.string()
		.oneOf(
			['Winter', 'Spring', 'Any'],
			'Type should be one of the following: [Winter, Spring, Any]'
		)
		.required('Please select the semester type.'),
	grading: Yup.number().min(1).required('Please select the grading duration period.'),
	startDate: Yup.date().required('Please select starting date.'),
	endDate: Yup.date().required('Please select ending date.'),
});
