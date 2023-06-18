import * as Yup from 'yup';
import { passwordRegex } from '../../constants/regex';

export const PasswordSchema = Yup.object().shape({
	password: Yup.string()
		.min(8, 'Password is too short - should be 8 chars minimum.')
		.matches(
			passwordRegex,
			`Password must have minimum eight characters, at least one digit, one lowercase letter, one uppercase letter, one letter(uppercase/lowercase) and one special character.`
		)
		.required('Please provide the old password.'),
	newPassword: Yup.string()
		.min(8, 'Password is too short - should be 8 chars minimum.')
		.matches(
			passwordRegex,
			`Password must have minimum eight characters, at least one digit, one lowercase letter, one uppercase letter, one letter(uppercase/lowercase) and one special character.`
		)
		.required('Please provide a new password.'),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('newPassword'), null], 'New password must match.')
		.required('Please confirm new password.'),
});
