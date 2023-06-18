import * as Yup from 'yup';
import { Degree, FacultyType, StudentType, UserType } from '../../constants/enums';
import {
	nameRegex,
	passwordRegex,
	studentIdRegex,
	surnameRegex,
	usernameRegex,
} from '../../constants/regex';

export const UserSchema = Yup.object().shape({
	name: Yup.string()
		.max(40, 'Name must be up to 40 characters or less.')
		.matches(nameRegex, 'Name must be alphabetic.')
		.required('Please provide your name.'),
	surname: Yup.string()
		.max(40, 'Surname must be up to 40 characters or less.')
		.matches(surnameRegex, 'Surname must be alphabetic.')
		.required('Please provide your surname.'),
	username: Yup.string().when('type', {
		is: UserType.admin,
		then: Yup.string().required('Username is required.'),
		otherwise: Yup.string()
			.matches(usernameRegex, 'Username must follow the pattern: icsdxxxxx.')
			.required('Username is required.'),
	}),
	email: Yup.string().email().required('Email is required.'),
	password: Yup.string()
		.min(8, 'Password is too short - should be 8 chars minimum.')
		.matches(
			passwordRegex,
			`Password must have minimum eight characters, at least one digit, one lowercase letter, one uppercase letter, one letter(uppercase/lowercase) and one special character.`
		)
		.required('Please provide a password.'),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('password'), null], 'Passwords must match.')
		.required('Please confirm password.'),
	type: Yup.string()
		.oneOf(
			[UserType.student, UserType.instructor],
			'Type should be one of the following: [Student, Instructor]'
		)
		.required('Please select the user type.'),
	studentId: Yup.string().when('type', {
		is: UserType.student,
		then: Yup.string()
			.matches(studentIdRegex, 'StudentId must follow the pattern: 321/xxxxxxx.')
			.required('Student ID is required.'),
		otherwise: Yup.string(),
	}),
	entranceYear: Yup.number().when('type', {
		is: UserType.student,
		then: Yup.number()
			.min(1980, 'Entrance year must be at least 1980.')
			.max(new Date().getFullYear(), 'Entrance year can be up to current year.')
			.positive('Year must be positive.')
			.test(
				'len',
				'Year must be at least 4 digits.',
				(val) => val && val.toString().length >= 4
			)
			.required('Entrance year is required.'),
		otherwise: Yup.number(),
	}),
	studentType: Yup.string().when('type', {
		is: UserType.student,
		then: Yup.string()
			.oneOf(
				[StudentType.Undergraduate, StudentType.Master, StudentType.PhD],
				`Student type should be one of the following: [${StudentType.Undergraduate}, ${StudentType.Master}, ${StudentType.PhD}]`
			)
			.required('Please select the student type.'),
		otherwise: Yup.string(),
	}),
	facultyType: Yup.string().when('type', {
		is: UserType.instructor,
		then: Yup.string()
			.oneOf(
				[FacultyType.DEP, FacultyType.EDIP, FacultyType.ETEP],
				`Faculty type should be one of the following: [${FacultyType.DEP}, ${FacultyType.EDIP}, ${FacultyType.ETEP}]`
			)
			.required('Please select the faculty type.'),
		otherwise: Yup.string(),
	}),
	degree: Yup.string().when('type', {
		is: UserType.instructor,
		then: Yup.string().oneOf(
			[Degree.Assistant, Degree.Associate, Degree.Professor],
			`Degree type should be one of the following: [${Degree.Assistant}, ${Degree.Associate}, ${Degree.Professor}]`
		),
		otherwise: Yup.string(),
	}),
	instructorEntranceYear: Yup.number().when('type', {
		is: UserType.instructor,
		then: Yup.number()
			.min(1980, 'Entrance year must be at least 1980.')
			.max(new Date().getFullYear(), 'Entrance year can be up to current year.')
			.positive('Number must be positive.'),
		otherwise: Yup.number(),
	}),
});
