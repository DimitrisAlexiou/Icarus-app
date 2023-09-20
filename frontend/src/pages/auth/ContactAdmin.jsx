import { useEffect } from 'react';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Row, Col, FormGroup, Label, Nav } from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { activateAccount, reset } from '../../features/auth/authSlice';
import { FaStudiovinari } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { ActivateAccountSchema } from '../../schemas/auth/ActivateAccount';
import { Toast } from '../../constants/sweetAlertNotification';
import FooterLanding from '../../components/boilerplate/FooterLanding';
import FormErrorMessage from '../../components/form/FormErrorMessage';
import Spinner from '../../components/boilerplate/Spinner';

export default function ContactAdmin() {
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
				text: `New password restored ${user.name}`,
				icon: 'success',
			});
			navigate('/');
		}

		dispatch(reset());
	}, [isError, isSuccess, user, message, navigate, dispatch]);

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
														Locked Out?
													</h1>
													<p className="mb-5">
														No need to to worry about it. Just enter
														your email address and username below and
														we'll activate your account!
													</p>
												</div>
												{isLoading ? (
													<Spinner card />
												) : (
													<Formik
														initialValues={{
															email: '',
															username: '',
														}}
														validationSchema={ActivateAccountSchema}
														onSubmit={(values, { setSubmitting }) => {
															const activate = {
																email: values.email,
																username: values.username,
															};
															// dispatch(activateAccount(activate));
															setSubmitting(false);
														}}
														validateOnMount
													>
														{({ isSubmitting, dirty, handleReset }) => (
															<Form>
																<FormGroup
																	className="form-floating mb-3"
																	floating
																>
																	<Field
																		type="text"
																		className="form-control"
																		name="username"
																	/>
																	<Label
																		for="username"
																		className="text-gray-600"
																	>
																		Username
																	</Label>
																	<ErrorMessage
																		name="username"
																		component={FormErrorMessage}
																	/>
																</FormGroup>
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
																	<Col
																		md="6"
																		sm="6"
																		xs="12"
																		className="text-sm-left text-center"
																	>
																		<Button
																			onClick={() =>
																				handleReset()
																			}
																			disabled={
																				!dirty ||
																				isSubmitting
																			}
																		>
																			Clear
																		</Button>
																	</Col>
																	<Col className="text-center">
																		<Button
																			type="submit"
																			className="btn-block"
																			color="primary"
																			disabled={isSubmitting}
																		>
																			{isSubmitting ? (
																				<>
																					Please wait{' '}
																					<Spinner
																						type="grow"
																						size="sm"
																					/>
																				</>
																			) : (
																				'Request Activation'
																			)}
																		</Button>
																	</Col>
																</Row>
															</Form>
														)}
													</Formik>
												)}
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
					<FooterLanding />
				</div>
			</div>
		</>
	);
}
