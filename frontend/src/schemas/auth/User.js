import * as Yup from 'yup';

export const UserSchema = Yup.object().shape({
	name: Yup.string()
		.max(40, 'Name must be up to 40 characters or less!')
		.matches(/^[A-Za-z]+$/, 'Name must be alphabetic!')
		.required('Please provide your name.'),
	surname: Yup.string()
		.max(40, 'Surname must be up to 40 characters or less!')
		.matches(/^[A-Za-z]+$/, 'Surname must be alphabetic!')
		.required('Please provide your surname.'),
	username: Yup.string()
		.matches(/^icsd[0-9]{5}$/, 'Username must follow the pattern: icsdxxxxx!')
		.required('Username is required.'),
	email: Yup.string().email().required('Email is required.'),
	password: Yup.string()
		.min(8, 'Password is too short - should be 8 chars minimum!')
		.matches(
			/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/,
			`Password must have minimum eight characters, at least one digit, one lowercase letter, one uppercase letter, one letter(uppercase/lowercase) and one special character.`
		)
		.required('Please provide a password.'),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('password'), null], 'Passwords must match!')
		.required('Please confirm password.'),
	type: Yup.string()
		.oneOf(
			['Student', 'Instructor'],
			'Type should be one of the following: [Student, Instructor]'
		)
		.required('Please select the user type.'),
	studentId: Yup.string().when('type', {
		is: 'Student',
		then: Yup.string()
			.matches(/^321\/\d{7}$/, 'StudentId must follow the pattern: 321/xxxxxxx!')
			.required('Student ID is required.'),
		otherwise: Yup.string(),
	}),
	entranceYear: Yup.number().when('type', {
		is: 'Student',
		then: Yup.number()
			.min(1980, 'Entrance year must be at least 1980!')
			.max(new Date().getFullYear(), 'Entrance year can be up to current year!')
			.positive('Year must be positive!')
			.test(
				'len',
				'Year must be at least 4 digits!',
				(val) => val && val.toString().length >= 4
			)
			.required('Entrance year is required.'),
		otherwise: Yup.number(),
	}),
	studentType: Yup.string().when('type', {
		is: 'Student',
		then: Yup.string()
			.oneOf(
				['Undergraduate', 'Master', 'PhD'],
				'Student type should be one of the following: [Undergraduate, Master, PhD]'
			)
			.required('Please select the student type.'),
		otherwise: Yup.string(),
	}),
	facultyType: Yup.string().when('type', {
		is: 'Instructor',
		then: Yup.string()
			.oneOf(
				['DEP', 'EDIP', 'ETEP'],
				'Faculty type should be one of the following: [DEP, EDIP, ETEP]'
			)
			.required('Please select the faculty type.'),
		otherwise: Yup.string(),
	}),
	degree: Yup.string().when('type', {
		is: 'Instructor',
		then: Yup.string().oneOf(
			['Assistant', 'Associate', 'Professor'],
			'Degree type should be one of the following: [Assistant, Associate, Professor]'
		),
		otherwise: Yup.string(),
	}),
	instructorEntranceYear: Yup.number().when('type', {
		is: 'Instructor',
		then: Yup.number()
			.min(1980, 'Entrance year must be at least 1980!')
			.max(new Date().getFullYear(), 'Entrance year can be up to current year!')
			.positive('Number must be positive!'),
		otherwise: Yup.number(),
	}),
});
