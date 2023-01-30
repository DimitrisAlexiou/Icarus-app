import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Formik, Form } from 'formik';
import { UserSchema } from '../../schemas/users/User';
import { Toast } from '../../constants/sweetAlertNotification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import { register, reset } from '../../features/auth/authSlice';
import RegisterForm from '../../components/auth/RegisterForm';
import SubmitButton from '../../components/buttons/SubmitButton';
import SignUpInButton from '../../components/buttons/SignUpInButton';
import Spinner from '../../components/boilerplate/Spinner';

export default function Register() {
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
				text: 'Account was successfully created!',
				icon: 'success',
			});
			navigate('/');
		}
		dispatch(reset());
	}, [dispatch, navigate, isError, isSuccess, user, message]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<div className="bg-gradient-primary">
				<div className="container">
					<Row className="justify-content-center">
						<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
							<div className="card o-hidden border-0 shadow-lg my-5">
								<div className="card-body p-0">
									<Row>
										<div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
										<div className="col-lg-7">
											<div className="p-5">
												<div className="text-center">
													<h1 className="h4 text-gray-900 mb-4 justify-content-center">
														Create Account !
													</h1>
												</div>
												<Formik
													initialValues={{
														name: '',
														surname: '',
														username: '',
														email: '',
														password: '',
														confirmPassword: '',
													}}
													validationSchema={UserSchema}
													onSubmit={(values, { setSubmitting }) => {
														const user = {
															user: {
																name: values.name,
																surname: values.surname,
																username: values.username,
																email: values.email,
																password: values.password,
															},
														};
														dispatch(register(user));
														setSubmitting(false);
													}}
													validateOnMount
												>
													{({ isSubmitting, dirty, handleReset }) => (
														<Form>
															<RegisterForm />

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
																	message={'Register'}
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
												<div className="d-flex justify-content-center">
													<Link
														to="/auth/login"
														style={{
															textDecoration: 'none',
															textAlign: 'center',
														}}
													>
														Already have an account? Login!
													</Link>
												</div>
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
