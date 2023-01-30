import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Row, Col, Button } from 'reactstrap';
import { Formik, Form } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import { Toast } from '../../constants/sweetAlertNotification';
import { login, reset } from '../../features/auth/authSlice';
import LoginForm from '../../components/auth/LoginForm';
import SubmitButton from '../../components/buttons/SubmitButton';
import SignUpInButton from '../../components/buttons/SignUpInButton';
import Spinner from '../../components/boilerplate/Spinner';

export default function Login() {
	const { user, isError, isLoading, isSuccess, message } = useSelector((state) => state.auth);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (isError) {
			Toast.fire({
				title: 'Something went wrong!',
				text: message,
				icon: 'error',
			});
		}
		if (user) {
			Toast.fire({
				title: 'Info',
				text: 'You are already logged in',
				icon: 'info',
			});
			navigate('/');
		}
		if (isSuccess) {
			Toast.fire({
				title: 'Success',
				text: `Welcome Back ${user.name}`,
				icon: 'success',
			});
			navigate('/');
		}

		dispatch(reset());
	}, [isError, isSuccess, user, message, navigate, dispatch]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<div className="bg-gradient-primary">
				<div className="container">
					<Row className="justify-content-center">
						<div className="col-xl-10 col-lg-12 col-md-9">
							<div className="card o-hidden border-0 shadow-lg my-5">
								<div className="card-body p-0">
									<Row>
										<div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
										<div className="col-lg-6">
											<div className="p-5">
												<div className="text-center">
													<h1 className="h4 text-gray-900 mb-4 justify-content-center">
														Welcome Back !
													</h1>
												</div>
												<Formik
													initialValues={{
														username: '',
														password: '',
													}}
													onSubmit={(values, { setSubmitting }) => {
														const user = {
															user: {
																username: values.username,
																password: values.password,
															},
														};
														dispatch(login(user));
														setSubmitting(false);
													}}
													validateOnMount
												>
													{({ isSubmitting, dirty, handleReset }) => (
														<Form>
															<LoginForm />

															<Row>
																<Col>
																	<Button
																		onClick={handleReset}
																		disabled={
																			!dirty || isSubmitting
																		}
																	>
																		Clear
																	</Button>
																</Col>
																<SubmitButton
																	message={'Login'}
																	disabled={isSubmitting}
																/>
															</Row>
														</Form>
													)}
												</Formik>

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
													<Col className="text-right">
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
