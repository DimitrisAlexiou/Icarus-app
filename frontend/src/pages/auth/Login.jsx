import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Row, Col, Button } from 'reactstrap';
import { Formik, Form } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import { UserSchema } from '../../schemas/User';
import { Toast } from '../../constants/sweetAlertNotification';
import userService from '../../features/auth/userService';
import LoginForm from '../../components/auth/LoginForm';
import SubmitButton from '../../components/buttons/SubmitButton';
import SignUpInButton from '../../components/buttons/SignUpInButton';

export default function Login() {
	const { user, isError, isLoading, isSuccess, message } = useSelector((state) => state.user);

	const initialValues = {
		username: '',
		email: '',
		password: '',
	};

	const navigate = useNavigate();

	// const onSubmit = async (loginData) => {
	// 	try {
	// 		await userService.loginUser(loginData);
	// 		Toast.fire({
	// 			title: 'Success',
	// 			text: 'User logged in successfully!',
	// 			icon: 'success',
	// 		});
	// 		navigate('/');
	// 	} catch (error) {
	// 		Toast.fire({
	// 			title: 'Error while logging user!',
	// 			text: error.response.data,
	// 			icon: 'error',
	// 		});
	// 	}
	// };

	return (
		<>
			<Formik
				initialValues={initialValues}
				// validationSchema={UserSchema}
				// onSubmit={(loginData) => {
				// 	onSubmit(loginData);
				// }}
				validateOnMount
			>
				<div className="bg-gradient-primary">
					<div className="container">
						<div className="row justify-content-center">
							<div className="col-xl-10 col-lg-12 col-md-9">
								<div className="card o-hidden border-0 shadow-lg my-5">
									<div className="card-body p-0">
										<div className="row">
											<div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
											<div className="col-lg-6">
												<div className="p-5">
													<div className="text-center">
														<h1 className="h4 text-gray-900 mb-4 justify-content-center">
															Welcome Back !
														</h1>
													</div>
													<Form className="Login">
														<LoginForm initialValues={initialValues} />

														<div className="row d-grid d-md-block">
															<SubmitButton
																message={'Login'}
																disabled={isLoading}
															/>
														</div>
													</Form>
													<hr />
													<div className="d-flex justify-content-center">
														<SignUpInButton
															icon={''}
															message={'Continue with '}
														/>
														<FontAwesomeIcon icon={faGoogle} />
													</div>
													<div className="d-flex justify-content-center">
														<SignUpInButton
															icon={''}
															message={'Continue with '}
														/>
														<FontAwesomeIcon icon={faGithub} />
													</div>
													<hr />
													<Row>
														<Col md="6">
															<Link
																to="/auth/forgot-password"
																style={{ textDecoration: 'none' }}
															>
																Forgot Password?
															</Link>
														</Col>
														<Col md="6" className="text-right">
															<Link
																to="/auth/register"
																style={{
																	textDecoration: 'none',
																}}
															>
																Create Account!
															</Link>
														</Col>
													</Row>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="text-center">
								<Link
									to="/"
									className="col-xs-2 col-sm-2 col-md-2 col-lg-2 mb-sm-0 mb-3"
								>
									<Button>Landing Page</Button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</Formik>
		</>
	);
}
