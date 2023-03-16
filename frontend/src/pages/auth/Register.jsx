import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Formik, Form } from 'formik';
import { UserSchema } from '../../schemas/auth/User';
import { Toast } from '../../constants/sweetAlertNotification';
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
						<Col xl="12" lg="12" md="12" sm="12">
							<div className="card o-hidden border-0 shadow-lg my-5 animated--grow-in">
								<div className="card-body p-0">
									<Row>
										{/* <Col
											lg="5"
											className="d-none d-lg-block bg-register-image"
										></Col> */}
										{/* <Col lg="7"> */}
										<Col>
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
														type: '',
														studentId: '',
														studentType: '',
														entranceYear: '',
														facultyType: '',
														degree: '',
														instructorEntranceYear: '',
													}}
													validationSchema={UserSchema}
													onSubmit={(values, { setSubmitting }) => {
														if (values.type === 'Student') {
															const user = {
																name: values.name,
																surname: values.surname,
																username: values.username,
																email: values.email,
																password: values.password,
																type: values.type,
																studentId: values.studentId,
																studentType: values.studentType,
																entranceYear: values.entranceYear,
															};
															dispatch(register(user));
															setSubmitting(false);
														} else if (values.type === 'Instructor') {
															const user = {
																name: values.name,
																surname: values.surname,
																username: values.username,
																email: values.email,
																password: values.password,
																type: values.type,
																facultyType: values.facultyType,
																degree: values.degree,
																instructorEntranceYear:
																	values.instructorEntranceYear,
															};
															dispatch(register(user));
															setSubmitting(false);
														}
													}}
													validateOnMount
												>
													{({ isSubmitting, dirty, handleReset }) => (
														<Form>
															<RegisterForm />

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
																		message={'Register'}
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
