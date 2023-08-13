import * as Yup from 'yup';
import { Degree, UserType } from '../constants/enums';
import { nameRegex, surnameRegex, usernameRegex } from '../constants/regex';

export const UserProfileSchema = Yup.object().shape({
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
	degree: Yup.string().when('type', {
		is: UserType.instructor,
		then: Yup.string().oneOf(
			[Degree.Assistant, Degree.Associate, Degree.Professor],
			`Degree type should be one of the following: [${Degree.Assistant}, ${Degree.Associate}, ${Degree.Professor}]`
		),
		otherwise: Yup.string(),
	}),
});
