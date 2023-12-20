import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormGroup, Label, Row, Col, Button, Spinner } from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ChangePasswordSchema } from '../../schemas/auth/ChangePassword';
import { changePassword } from '../../features/auth/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import FormErrorMessage from '../form/FormErrorMessage';

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
								<FormGroup className="form-group mb-3" floating>
									<Field
										type={showOldPassword ? 'text' : 'password'}
										className="form-control"
										name="oldPassword"
									/>
									<Label for="oldPassword" className="text-gray-600">
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
										onClick={() => setShowOldPassword(!showOldPassword)}
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
									<Label for="newPassword" className="text-gray-600">
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
										onClick={() => setShowNewPassword(!showNewPassword)}
									/>
								</Button>
							</Col>
						</Row>
						<Row>
							<Col>
								<FormGroup className="form-group mb-3" floating>
									<Field
										type={showConfirmPassword ? 'text' : 'password'}
										className="form-control"
										name="confirmPassword"
									/>
									<Label for="confirmPassword" className="text-gray-600">
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
										onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									/>
								</Button>
							</Col>
						</Row>
						<Row className="mt-3">
							<Col sm="6" md="6" xs="12" className="text-sm-left text-center">
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
							<Col className="text-sm-right text-center mt-sm-0 mt-3">
								<Button type="submit" color="primary" disabled={isSubmitting}>
									{isSubmitting ? (
										<>
											Please wait <Spinner type="grow" size="sm" />
										</>
									) : (
										'Change'
									)}
								</Button>
							</Col>
						</Row>
					</Form>
				)}
			</Formik>
		</>
	);
}
