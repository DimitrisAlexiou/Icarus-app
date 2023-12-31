import { Link, NavLink } from 'react-router-dom';
import { Row, Col, Nav } from 'reactstrap';
import { Formik, Form } from 'formik';
import { FaStudiovinari } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { ActivateAccountSchema } from '../../schemas/auth/ActivateAccount';
import useContactAdmin from '../../hooks/auth/useContactAdmin';
import FooterLanding from '../../components/boilerplate/FooterLanding';
import Spinner from '../../components/boilerplate/spinners/Spinner';
import TextField from '../../components/form/TextField';
import EmailField from '../../components/form/EmailField';
import ClearButton from '../../components/buttons/ClearButton';
import SubmitButton from '../../components/buttons/SubmitButton';

export default function ContactAdmin() {
	const { isLoading } = useContactAdmin();

	return (
		<>
			<div className="bg-gradient-primary">
				<div className="container">
					<Row className="justify-content-left">
						<Nav className="logo">
							<NavLink
								className="sidebar-brand d-flex align-items-center"
								to="/"
							>
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
													<h1 className="h4 text-gray-900 mb-4">Locked Out?</h1>
													<p className="mb-5">
														No need to to worry about it. Just enter your email
														address and username below and we'll activate your
														account!
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
																<TextField name="username" label="Username" />
																<EmailField name="email" label="Email" />
																<Row>
																	<ClearButton
																		onClick={() => handleReset()}
																		disabled={!dirty || isSubmitting}
																	/>
																	<SubmitButton
																		body={
																			isSubmitting ? (
																				<>
																					Please wait{' '}
																					<Spinner type="grow" size="sm" />
																				</>
																			) : (
																				'Request Activation'
																			)
																		}
																		disabled={isSubmitting}
																	/>
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
