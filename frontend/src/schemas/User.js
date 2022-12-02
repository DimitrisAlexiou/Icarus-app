import * as Yup from 'yup';

export const UserSchema = Yup.object().shape({
	username: Yup.string()
		.matches(
			/^([i][c][s][d])\/[0-9][0-9][0-9][0-9][0-9]*$/,
			'Username must follow the pattern: icsd/xxxxx.'
		)
		.required('Please provide username !'),
	email: Yup.string().email().required('Please provide an email !'),
	password: Yup.string()
		.min(8, 'Password is too short - should be 8 chars minimum.')
		.matches(
			/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
			'Password must have minimum eight characters, at least one letter, one number and one special character.'
		)
		.required('Please provide a password !'),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('password'), null], 'Passwords must match.')
		.required('Please confirm password !'),
	// description: Yup.string()
	// 	.max(200, 'Course description must be 200 characters or less.')
	// 	.required('Please provide a course description !'),
	// semester: Yup.string()
	// 	.oneOf(['Winter', 'Spring', 'Any'])
	// 	.required('Please select the course semester !'),
	// year: Yup.string().oneOf(['1', '2', '3', '4', '5']).required('Please select the course year !'),
	// cycle: Yup.string()
	// 	.oneOf([
	// 		'Security',
	// 		'Software Engineering',
	// 		'Information Systems',
	// 		'Communication Systems',
	// 		'AI',
	// 	])
	// 	.required('Please select the course cycle !'),
	// ects: Yup.number()
	// 	.min(1, 'ECTS must be at least 1 !')
	// 	.required('Please provide an ECTS value !'),
	// isActive: Yup.boolean().default(false).required(),
	// hasLab: Yup.boolean().required(),
	// isObligatory: Yup.boolean().required(),
});
