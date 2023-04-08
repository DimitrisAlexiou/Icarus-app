import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormGroup, Label, Row, Col, Button } from 'reactstrap';
import { PasswordSchema } from '../../schemas/auth/ResetPassword';
import { resetPassword, reset } from '../../features/auth/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { Toast } from '../../constants/sweetAlertNotification';
import FormErrorMessage from '../FormErrorMessage';
import SubmitButton from '../buttons/SubmitButton';
import Spinner from '../boilerplate/Spinner';

export default function ResetPassword() {
	const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

	const [showOldPassword, setShowOldPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const dispatch = useDispatch();

	useEffect(() => {
		if (isError) {
			Toast.fire({
				title: 'Something went wrong!',
				text: message,
				icon: 'error',
			});
		}
		if (isSuccess) {
			Toast.fire({
				title: 'Success',
				text: 'Password updated!',
				icon: 'success',
			});
		}
		dispatch(reset());
	}, [dispatch, isError, isSuccess, message]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<h5 className="text-gray-800 font-weight-bold animated--grow-in mb-4 mx-4">
				Reset Password
			</h5>

			<Row className="d-flex justify-content-center">
				<Col xl="8" lg="8" md="10" sm="12" xs="12">
					<div className="profile_card animated--grow-in">
						<div className="card-body">
							<Formik
								initialValues={{
									oldPassword: '',
									newPassword: '',
									confirmPassword: '',
								}}
								validationSchema={PasswordSchema}
								onSubmit={(values, { setSubmitting }) => {
									const user = {
										password: values.newPassword,
									};
									// dispatch(resetPassword(user));
									setSubmitting(false);
								}}
								validateOnMount
							>
								{({ isSubmitting, dirty, handleReset }) => (
									<Form>
										<Row>
											<Col>
												<FormGroup className="form-group mb-3" floating>
													<Field
														type={showOldPassword ? 'text' : 'password'}
														className="form-control"
														name="oldPassword"
													/>
													<Label
														for="oldPassword"
														className="text-gray-600"
													>
														Old Password
													</Label>
													<ErrorMessage
														name="oldPassword"
														component={FormErrorMessage}
													/>
												</FormGroup>
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
														onClick={() =>
															setShowOldPassword(!showOldPassword)
														}
													/>
												</Button>
											</Col>
										</Row>
										<Row>
											<Col>
												<FormGroup className="form-group mb-3" floating>
													<Field
														type={showNewPassword ? 'text' : 'password'}
														className="form-control"
														name="newPassword"
													/>
													<Label
														for="newPassword"
														className="text-gray-600"
													>
														New Password
													</Label>
													<ErrorMessage
														name="newPassword"
														component={FormErrorMessage}
													/>
												</FormGroup>
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
														onClick={() =>
															setShowNewPassword(!showNewPassword)
														}
													/>
												</Button>
											</Col>
										</Row>
										<Row>
											<Col>
												<FormGroup className="form-group mb-3" floating>
													<Field
														type={
															showConfirmPassword
																? 'text'
																: 'password'
														}
														className="form-control"
														name="confirmPassword"
													/>
													<Label
														for="confirmPassword"
														className="text-gray-600"
													>
														Confirm new Password
													</Label>
													<ErrorMessage
														name="confirmPassword"
														component={FormErrorMessage}
													/>
												</FormGroup>
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
														onClick={() =>
															setShowConfirmPassword(
																!showConfirmPassword
															)
														}
													/>
												</Button>
											</Col>
										</Row>
										<Row className="mt-3">
											<Col
												sm="6"
												md="6"
												xs="12"
												className="text-sm-left text-center"
											>
												<Button
													onClick={() => {
														setShowOldPassword(false);
														setShowNewPassword(false);
														setShowConfirmPassword(false);
														handleReset();
													}}
													disabled={!dirty || isSubmitting}
												>
													Clear
												</Button>
											</Col>
											<Col className="text-sm-right text-center mt-sm-0 mt-3 px-0">
												<SubmitButton
													color={'primary'}
													message={'Reset'}
													disabled={isSubmitting}
												/>
											</Col>
										</Row>
									</Form>
								)}
							</Formik>
						</div>
					</div>
				</Col>
			</Row>
		</>
	);
}
