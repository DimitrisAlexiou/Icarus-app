import { Link, NavLink } from 'react-router-dom';
import { Row, Col, Nav } from 'reactstrap';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FaStudiovinari } from 'react-icons/fa';
import useRegister from '../../hooks/auth/useRegister';
import RegisterForm from '../../components/auth/RegisterForm';
import SignUpInButton from '../../components/buttons/SignUpInButton';
import FooterLanding from '../../components/boilerplate/FooterLanding';
import Spinner from '../../components/boilerplate/spinners/Spinner';

export default function Register() {
	const { isLoading, dispatch } = useRegister();

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
							<div className="card o-hidden border-0 shadow-lg my-2 animated--grow-in">
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

												{isLoading ? (
													<Spinner card />
												) : (
													<RegisterForm dispatch={dispatch} />
												)}

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
					<FooterLanding />
				</div>
			</div>
		</>
	);
}
