import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Row, Col, Button } from 'reactstrap';
import { Formik, Form } from 'formik';
import { LoginSchema } from '../../schemas/auth/Login';
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
				text: `Welcome Back ${user.user.name}`,
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
						<Col xl="10" lg="12" md="10" sm="12" xs="12">
							<div className="card o-hidden border-0 shadow-lg my-5 animated--grow-in">
								<div className="card-body p-0">
									<Row>
										<Col
											lg="6"
											xl="4"
											className="d-none d-lg-block bg-login-image"
										></Col>
										<Col lg="6" xl="8">
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
															<LoginForm />

															<Row>
																<Col md="6" sm="6" xs="6">
																	<Button
																		onClick={handleReset}
																		disabled={
																			!dirty || isSubmitting
																		}
																	>
																		Clear
																	</Button>
																</Col>
																<Col className="text-right px-0">
																	<SubmitButton
																		color={'primary'}
																		message={'Login'}
																		disabled={isSubmitting}
																	/>
																</Col>
															</Row>
														</Form>
													)}
												</Formik>

												<hr />
												<Row>
													<Col md="6" sm="12" xs="12">
														<SignUpInButton
															message={'Continue with'}
															icon={faGoogle}
														/>
													</Col>
													<Col className="text-right px-4">
														<SignUpInButton
															message={'Continue with'}
															icon={faGithub}
														/>
													</Col>
												</Row>
												<hr />
												<Row className="d-flex justify-content-center">
													<Col md="6" sm="6" xs="6">
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
										</Col>
									</Row>
								</div>
							</div>
						</Col>
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
