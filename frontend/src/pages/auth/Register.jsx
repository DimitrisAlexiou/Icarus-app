import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import { Row, Col, Nav } from 'reactstrap';
import { Formik } from 'formik';
import { UserSchema } from '../../schemas/auth/User';
import { Toast } from '../../constants/sweetAlertNotification';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FaStudiovinari } from 'react-icons/fa';
import { register, reset } from '../../features/auth/authSlice';
import RegisterForm from '../../components/auth/RegisterForm';
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
				text: 'Account created!',
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
					<Row className="justify-content-left">
						<Nav className="logo">
							<NavLink
								className="sidebar-brand d-flex align-items-center mt-3"
								to="/"
							>
								<div className="logo-brand-icon rotate-15">
									<FaStudiovinari />
								</div>
								<span
									style={{ fontSize: '1.3rem' }}
									className="sidebar-brand-text mx-3 mt-3"
								>
									Icarus
								</span>
							</NavLink>
						</Nav>
					</Row>
					<Row className="justify-content-center">
						<Col xl="11" lg="11" md="12" sm="12">
							<div className="card o-hidden border-0 shadow-lg my-4 animated--grow-in">
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
													<h4 className="text-gray-900 mb-4 justify-content-center">
														Create Account !
													</h4>
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
														<RegisterForm
															isSubmitting={isSubmitting}
															dirty={dirty}
															handleReset={handleReset}
														/>
													)}
												</Formik>

												<hr />
												<Row>
													<Col
														sm="6"
														md="6"
														xs="12"
														className="text-sm-left text-center"
													>
														<SignUpInButton
															message={'Continue with'}
															icon={faGoogle}
														/>
													</Col>
													<Col className="text-sm-right text-center mt-sm-0">
														<SignUpInButton
															message={'Continue with'}
															icon={faGithub}
														/>
													</Col>
												</Row>
												<hr />
												<div className="d-flex justify-content-center">
													<Link
														className="nav-item align-self-center text-gray-500"
														to="/auth/login"
														style={{
															textDecoration: 'none',
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
					</Row>
				</div>
			</div>
		</>
	);
}
