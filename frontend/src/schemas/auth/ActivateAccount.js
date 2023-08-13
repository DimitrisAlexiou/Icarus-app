import * as Yup from 'yup';

export const ActivateAccountSchema = Yup.object().shape({
	email: Yup.string().email().required('Email is required.'),
	username: Yup.string().required('Username is required.'),
});
