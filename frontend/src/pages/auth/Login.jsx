import { Link, NavLink } from 'react-router-dom';
import { Row, Col, Nav } from 'reactstrap';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FaStudiovinari } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import useLogin from '../../hooks/auth/useLogin';
import LoginForm from '../../components/auth/LoginForm';
import ContactAdminForm from '../../components/auth/ContactAdminForm';
import SignUpInButton from '../../components/buttons/SignUpInButton';
import Spinner from '../../components/boilerplate/spinners/Spinner';
import FooterLanding from '../../components/boilerplate/FooterLanding';

export default function Login() {
	const { isLoading, isAccountLocked, handleResetLoginStatus } = useLogin();

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
						<Col xl="10" lg="12" md="10" sm="12" xs="12">
							<div className="card o-hidden border-0 shadow-lg my-2 animated--grow-in">
								<div className="card-body p-0">
									{isAccountLocked ? (
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
															No need to to worry about it. Just enter your
															email address and username below and we'll
															activate your account!
														</p>
													</div>
													{isLoading ? <Spinner card /> : <ContactAdminForm />}
													<Row>
														<Col className="text-center mt-4">
															<hr />
															<Link
																className="nav-item align-self-center text-gray-500"
																to="/auth/login"
																style={{
																	textDecoration: 'none',
																}}
																onClick={() => handleResetLoginStatus()}
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
									) : (
										<Row>
											<Col
												lg="5"
												xl="4"
												className="d-none d-lg-block bg-login-image"
											></Col>
											<Col lg="7" xl="8">
												<div className="p-5">
													<div className="text-center">
														<h4 className="text-gray-900 mb-4 justify-content-center">
															Welcome Back !
														</h4>
													</div>
													{isLoading ? <Spinner card /> : <LoginForm />}
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
														<Col className="text-sm-right text-center mt-sm-0 mt-3">
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
																className="nav-item align-self-center text-gray-500"
																to="/auth/forgot-password"
																style={{ textDecoration: 'none' }}
															>
																Forgot Password?
															</Link>
														</Col>
														<Col className="text-right">
															<Link
																className="nav-item align-self-center text-gray-500"
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
									)}
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
