import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Formik, Form } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { UserSchema } from '../../schemas/User';
import { Toast } from '../../constants/sweetAlertNotification';
// import loginService from '../../features/auth/loginService';
import LoginForm from '../../components/auth/LoginForm';
import CancelButton from '../../components/buttons/CancelButton';
import SubmitButton from '../../components/buttons/SubmitButton';
import SignUpInButton from '../../components/buttons/SignUpInButton';

export default function Login() {
	const initialValues = {
		username: '',
		email: '',
		password: '',
	};

	const navigate = useNavigate();

	// const onSubmit = async (loginData) => {
	// 	try {
	// 		await registerService.createUser(loginData);
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
			<div class="bg-gradient-primary">
				<div class="container">
					<Row class="justify-content-center">
						<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
							<div class="card o-hidden border-0 shadow-lg my-5">
								<div class="card-body p-0">
									<Row>
										<div class="col-lg-6 d-none d-lg-block bg-password-image"></div>
										<div class="col-lg-6">
											<div class="p-5">
												<div class="text-center">
													<h1 class="h4 text-gray-900 mb-2">
														Forgot Your Password?
													</h1>
													<p class="mb-4">
														We get it, stuff happens. Just enter your
														email address below and we'll send you a
														link to reset your password!
													</p>
												</div>
												<Formik
													initialValues={initialValues}
													// validationSchema={UserSchema}
													// onSubmit={(loginData) => {
													// 	onSubmit(loginData);
													// }}
													validateOnMount
												>
													<Form class="ForgotPassword">
														{/* <div class="form-group">
                                                        <input type="email" class="form-control form-control-user"
                                                            id="exampleInputEmail" aria-describedby="emailHelp"
                                                            placeholder="Enter Email Address...">
                                                    </div>
                                                    <a href="login.html" class="btn btn-primary btn-user btn-block">
													Reset Password
												</a> */}
													</Form>
												</Formik>
												<hr />
												<Row>
													<Col md="6">
														<Link
															to="/auth/register"
															style={{ textDecoration: 'none' }}
														>
															Create Account!
														</Link>
													</Col>
													<Col className="text-right">
														<Link
															to="/auth/login"
															style={{
																textDecoration: 'none',
															}}
														>
															Already have an account?
														</Link>
													</Col>
												</Row>
											</div>
										</div>
									</Row>
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
					</Row>
				</div>
			</div>
		</>
	);
}
