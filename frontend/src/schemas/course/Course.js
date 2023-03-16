import * as Yup from 'yup';

export const CourseSchema = Yup.object().shape({
	courseId: Yup.string()
		.max(9, 'Course ID must be 8 digits or less.')
		.matches(
			/^([3][2][1])\/[0-9][0-9][0-9][0-9][0-9]*$/,
			'Course ID must follow the pattern: 321/xxxx OR 321/xxxxx.'
		)
		.required('Course ID is required.'),
	title: Yup.string()
		.max(40, 'Course title must be 40 characters or less.')
		.matches(/^[A-Z a-z]+$/, 'Course title must be alphabetic.')
		.required('Course title is required.'),
	type: Yup.string()
		.oneOf(
			['Undergraduate', 'Master', 'Mixed'],
			'Course type should be one of the following: [Undergraduate, Master, Mixed]'
		)
		.required('Please select the course type.'),
	isObligatory: Yup.boolean().required(),
	hasPrerequisites: Yup.boolean().required(),
	hasLab: Yup.boolean().required(),
	description: Yup.string().max(800, 'Course description must be 800 characters or less.'),
	semester: Yup.string()
		.notOneOf(['Select course semester'], 'Select semester.')
		.required('Please select the course semester.'),
	ects: Yup.number()
		.min(1, 'ECTS must be at least 1.')
		.positive('Number must be positive.')
		.required('ECTS value is required.'),
	year: Yup.string()
		.oneOf(['1', '2', '3', '4', '5'], 'Year should be one of the following: [1, 2, 3, 4, 5]')
		.required('Please select the course year.'),
	cycle: Yup.string().when('isObligatory', {
		is: false,
		then: Yup.string().required('Please select the course cycle.'),
		otherwise: Yup.string(),
	}),
	// prerequisites: Yup.array().of(
	// 	Yup.object().shape({
	// 		prerequisite: Yup.string().when('hasPrerequisites', {
	// 			is: true,
	// 			then: Yup.string().required('Please select the prerequisite.'),
	// 			otherwise: Yup.string(),
	// 		}),
	// 		prerequisiteType: Yup.string().when('hasPrerequisites', {
	// 			is: true,
	// 			then: Yup.string()
	// 				.oneOf(['Hard', 'Soft'], 'Type should be one of the following: [Hard, Soft]')
	// 				.required('Please select the prerequisite type.'),
	// 			otherwise: Yup.string(),
	// 		}),
	// 	})
	// ),
	// prerequisite: Yup.string().when('hasPrerequisites', {
	// 	is: true,
	// 	then: Yup.string().required('Please select the prerequisite.'),
	// 	otherwise: Yup.string(),
	// }),
	// prerequisiteType: Yup.string().when('hasPrerequisites', {
	// 	is: true,
	// 	then: Yup.string()
	// 		.oneOf(['Hard', 'Soft'], 'Type should be one of the following: [Hard, Soft]')
	// 		.required('Please select the prerequisite type.'),
	// 	otherwise: Yup.string(),
	// }),
});
