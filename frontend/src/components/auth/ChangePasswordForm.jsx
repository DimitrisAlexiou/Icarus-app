import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, Button, Spinner } from 'reactstrap';
import { Formik, Form } from 'formik';
import { ChangePasswordSchema } from '../../schemas/auth/ChangePassword';
import { changePassword } from '../../features/auth/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import PasswordField from '../form/PasswordField';
import ClearButton from '../buttons/ClearButton';
import SubmitButton from '../buttons/SubmitButton';

export default function ChangePasswordForm({ user }) {
	const [showOldPassword, setShowOldPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const dispatch = useDispatch();

	return (
		<>
			<Formik
				initialValues={{
					oldPassword: '',
					newPassword: '',
					confirmPassword: '',
				}}
				validationSchema={ChangePasswordSchema}
				onSubmit={(values, { setSubmitting }) => {
					const userPassToUpdate = {
						password: values.newPassword,
					};
					console.log(userPassToUpdate);
					console.log('TRIGGERED');
					dispatch(
						changePassword({ userId: user.user._id, data: userPassToUpdate })
					);
					setSubmitting(false);
				}}
				validateOnMount
			>
				{({ isSubmitting, dirty, handleReset }) => (
					<Form>
						<Row>
							<Col>
								<PasswordField
									name="oldPassword"
									label="Old Password"
									type={showOldPassword ? 'text' : 'password'}
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
										onClick={() => setShowOldPassword(!showOldPassword)}
									/>
								</Button>
							</Col>
						</Row>
						<Row>
							<Col>
								<PasswordField
									name="newPassword"
									label="New Password"
									type={showNewPassword ? 'text' : 'password'}
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
										onClick={() => setShowNewPassword(!showNewPassword)}
									/>
								</Button>
							</Col>
						</Row>
						<Row>
							<Col>
								<PasswordField
									name="confirmPassword"
									label="Confirm new Password"
									type={showConfirmPassword ? 'text' : 'password'}
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
										onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									/>
								</Button>
							</Col>
						</Row>
						<Row>
							<ClearButton
								onClick={() => {
									setShowOldPassword(false);
									setShowNewPassword(false);
									setShowConfirmPassword(false);
									handleReset();
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
										'Change'
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
