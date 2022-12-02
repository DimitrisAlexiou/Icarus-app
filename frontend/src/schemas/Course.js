import * as Yup from 'yup';

export const CourseSchema = Yup.object().shape({
	courseId: Yup.string()
		.max(9, 'Course ID must be 8 digits or less !')
		.matches(
			/^([3][2][1])\/[0-9][0-9][0-9][0-9][0-9]*$/,
			'Course ID must follow the pattern: 321/xxxx OR 321/xxxxx !'
		)
		.required('Please provide a course ID !'),
	title: Yup.string()
		.max(40, 'Course title must be 40 characters or less !')
		.matches(/^[A-Za-z ]+$/, 'Course title must be alphabetic !')
		.required('Please provide the course title !'),
	type: Yup.string()
		.oneOf(['Undergraduate', 'Master', 'Mixed'])
		.required('Please select the course type !'),
	description: Yup.string()
		.max(200, 'Course description must be 200 characters or less !')
		.required('Please provide a course description !'),
	semester: Yup.string()
		.oneOf(['Winter', 'Spring', 'Any'])
		.required('Please select the course semester !'),
	year: Yup.string().oneOf(['1', '2', '3', '4', '5']).required('Please select the course year !'),
	cycle: Yup.string()
		.oneOf([
			'Security',
			'Software Engineering',
			'Information Systems',
			'Communication Systems',
			'AI',
		])
		.required('Please select the course cycle !'),
	ects: Yup.number()
		.min(1, 'ECTS must be at least 1 !')
		.required('Please provide an ECTS value !'),
	isActive: Yup.boolean().default(false).required(),
	hasLab: Yup.boolean().required(),
	isObligatory: Yup.boolean().required(),
});
