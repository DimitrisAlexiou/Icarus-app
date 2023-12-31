import { useState } from 'react';
import { Row, Col, Button, Spinner } from 'reactstrap';
import { Formik, Form } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { LoginSchema } from '../../schemas/auth/Login';
import { login } from '../../features/auth/authSlice';
import TextField from '../form/TextField';
import PasswordField from '../form/PasswordField';
import ClearButton from '../buttons/ClearButton';
import SubmitButton from '../buttons/SubmitButton';

export default function LoginForm({ dispatch }) {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<>
			<Formik
				initialValues={{
					username: '',
					password: '',
				}}
				validationSchema={LoginSchema}
				onSubmit={(values, { setSubmitting }) => {
					const user = {
						username: values.username,
						password: values.password,
					};
					dispatch(login(user));
					setSubmitting(false);
				}}
				validateOnMount
			>
				{({ isSubmitting, dirty, handleReset }) => (
					<Form>
						<TextField name="username" label="Username" />
						<Row>
							<Col md="10" sm="10" xs="10">
								<PasswordField
									name="password"
									label="Password"
									type={showPassword ? 'text' : 'password'}
								/>
							</Col>
							<Col
								md="2"
								sm="2"
								xs="2"
								className="mb-3 d-flex justify-content-center"
							>
								<Button
									type="button"
									className="nav-link align-items-center"
									color="null"
								>
									<FontAwesomeIcon
										icon={faEyeSlash}
										onClick={() => setShowPassword(!showPassword)}
									/>
								</Button>
							</Col>
						</Row>
						<Row>
							<ClearButton
								onClick={() => {
									handleReset();
									setShowPassword(false);
								}}
								disabled={!dirty || isSubmitting}
							/>
							<SubmitButton
								body={
									isSubmitting ? (
										<>
											Please wait <Spinner type="grow" size="sm" />
										</>
									) : (
										'Login'
									)
								}
								disabled={isSubmitting}
							/>
						</Row>
					</Form>
				)}
			</Formik>
		</>
	);
}
