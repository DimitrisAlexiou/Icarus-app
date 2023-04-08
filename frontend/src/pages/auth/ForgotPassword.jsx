import { useEffect } from 'react';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Row, Col, FormGroup, Label, Nav } from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { forgotPassword, reset } from '../../features/auth/authSlice';
import { FaStudiovinari } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { EmailSchema } from '../../schemas/auth/ForgotPassword';
import { Toast } from '../../constants/sweetAlertNotification';
import FormErrorMessage from '../../components/FormErrorMessage';
import Spinner from '../../components/boilerplate/Spinner';

export default function ForgotPassword() {
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
		if (isSuccess) {
			Toast.fire({
				title: 'Success',
				text: `New password restored ${user.user.name}`,
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
					<Row className="justify-content-left">
						<Nav className="logo">
							<NavLink className="sidebar-brand d-flex align-items-center" to="/">
								<div className="logo-brand-icon rotate-n-15">
									<i>
										<FaStudiovinari />
									</i>
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
						<Col xl="10" lg="12" md="10" sm="12">
							<div className="card o-hidden border-0 shadow-lg my-4 animated--grow-in">
								<div className="card-body p-0">
									<Row>
										<Col
											lg="5"
											xl="5"
											className="d-none d-lg-block bg-password-image"
										></Col>
										<Col lg="7" xl="7">
											<div className="p-5">
												<div className="text-center">
													<h1 className="h4 text-gray-900 mb-4">
														Forgot Your Password?
													</h1>
													<p className="mb-5">
														We get it, stuff happens. Just enter your
														email address below and we'll send you a
														link to reset your password!
													</p>
												</div>
												<Formik
													initialValues={{
														email: '',
													}}
													validationSchema={EmailSchema}
													onSubmit={(values, { setSubmitting }) => {
														const email = {
															email: values.email,
														};
														dispatch(forgotPassword(user));
														setSubmitting(false);
													}}
													validateOnMount
												>
													{({ isSubmitting }) => (
														<Form>
															<FormGroup
																className="form-group mb-3"
																floating
															>
																<Field
																	type="email"
																	className="form-control"
																	name="email"
																/>
																<Label
																	for="email"
																	className="text-gray-600"
																>
																	Email
																</Label>
																<ErrorMessage
																	name="email"
																	component={FormErrorMessage}
																/>
															</FormGroup>
															<Row className="mt-4">
																<Col className="text-center">
																	<Button
																		className="btn-block"
																		color="primary"
																		disabled={isSubmitting}
																	>
																		Send Reset Link
																	</Button>
																</Col>
															</Row>
														</Form>
													)}
												</Formik>
												<Row>
													<Col className="text-center mt-4">
														<hr />
														<Link
															className="nav-item align-self-center text-gray-500"
															to="/auth/login"
															style={{
																textDecoration: 'none',
															}}
														>
															<FontAwesomeIcon
																className="mx-2"
																icon={faChevronLeft}
															/>
															Back to Login
														</Link>
													</Col>
												</Row>
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
