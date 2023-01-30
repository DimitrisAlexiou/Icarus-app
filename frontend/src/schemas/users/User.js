import * as Yup from 'yup';

export const UserSchema = Yup.object().shape({
	name: Yup.string()
		.max(40, 'Name must be up to 40 characters or less !')
		.matches(/^[A-Za-z]+$/, 'Name must be alphabetic !')
		.required('Please provide your name !'),
	surname: Yup.string()
		.max(40, 'Surname must be up to 40 characters or less !')
		.matches(/^[A-Za-z]+$/, 'Surname must be alphabetic !')
		.required('Please provide your surname !'),
	username: Yup.string()
		.matches(/^icsd[0-9]{5}$/, 'Username must follow the pattern: icsdxxxxx.')
		.required('Please provide username !'),
	email: Yup.string().email().required('Please provide an email !'),
	password: Yup.string()
		.min(8, 'Password is too short - should be 8 chars minimum.')
		.matches(
			/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/,
			`Password must have minimum eight characters, at least one digit, one lowercase letter, one uppercase letter, one letter(uppercase/lowercase) and one special character.`
		)
		.required('Please provide a password !'),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('password'), null], 'Passwords must match.')
		.required('Please confirm password !'),
});
