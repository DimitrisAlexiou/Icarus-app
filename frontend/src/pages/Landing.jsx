import { Row, Col, Nav, NavItem } from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
import { FaStudiovinari } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';

export default function Landing() {
	return (
		<>
			<div className="bg-gradient-primary">
				<div className="container">
					<Row className="justify-content-left mb-md-3">
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
					<Row className="justify-content-xl-end justify-content-md-center">
						{/* <Col>
							<Row className="landing-login d-xl-flex d-lg-flex d-md-none">
								<div className="card o-hidden border-0 shadow-lg animated--grow-in">
									<div className="card-body p-0">
										<Col>
											<div className="p-5">
												<div className="text-center">
													<img
														style={{ width: '80%' }}
														src="sculpture.png"
														alt="sculpture"
													/>
													<Row className="mt-4">
														<Col className="text-center">
															<Link
																style={{ textDecoration: 'none' }}
																className="btn btn-light-cornflower-blue align-self-center"
																color="primary"
																to="/auth/login"
															>
																LOGIN
															</Link>
														</Col>
													</Row>
												</div>
											</div>
										</Col>
									</div>
								</div>
							</Row>
						</Col> */}
						<Col xl="7" lg="7" md="9" sm="12" xs="12">
							<div className="card o-hidden border-0 shadow-lg animated--grow-in">
								<div className="card-body p-0">
									<Col>
										<div style={{ padding: '2.2rem' }}>
											<div className="text-center">
												<h2 className="text-gray-900 mb-4 justify-content-center">
													Welcome to Icarus
												</h2>
											</div>
											{/* <img
												style={{ width: '24%' }}
												src="sculpture.png"
												alt="sculpture"
											/> */}
											<Row>
												<span>
													Τo login to{' '}
													<h6
														style={{
															display: 'inline-block',
															fontSize: '1.23rem',
														}}
													>
														<b>Icarus Student Information Services</b>
													</h6>
													, use:
													<ul>
														<li className="mt-2 text-justify">
															your{' '}
															<span className="text-success">
																academic
															</span>{' '}
															account if you are a{' '}
															<i>
																<b className="">Student</b>
															</i>
														</li>
														<li>
															your{' '}
															<span className="text-success">
																InstuctorClass
															</span>{' '}
															account if you are an{' '}
															<i>
																<b className="">Instructor</b>
															</i>
														</li>
													</ul>
												</span>
												<span className="mt-3">
													<span
														style={{
															fontSize: '1.15rem',
															color: 'tomato',
															letterSpacing: '0.05rem',
														}}
													>
														<b>Icarus</b>
													</span>{' '}
													Student Information Services allows{' '}
													<b>students</b> to:
													<ul>
														<li className="mt-2 text-justify">
															view courses, semester registrations and
															grades
														</li>
														<li>apply for semester registration</li>
														<li>apply for academic certificates</li>
														<li>
															review and communicate with their
															professors
														</li>
													</ul>
												</span>
												<span className="mt-3">
													Also offers a wide set of features to{' '}
													<b>instructors</b> for:
													<ul>
														<li className="mt-2 text-justify">
															viewing courses, teachings and students
														</li>
														<li>
															managing active teachings and course
															examinations
														</li>
														<li>
															uploading digitally signed grades for
															course examinations
														</li>
														<li>
															uploading digital course material for
															students to study
														</li>
													</ul>
												</span>
											</Row>
										</div>
									</Col>
								</div>
							</div>
						</Col>
					</Row>
					{/* <Row className="landing-login d-xl-flex d-lg-flex d-md-none">
						<div className="card o-hidden border-0 shadow-lg animated--grow-in">
							<div className="card-body p-0">
								<Col>
									<div className="p-5">
										<div className="text-center">
											<img
												style={{ width: '80%' }}
												src="sculpture.png"
												alt="sculpture"
											/>
											<Row className="mt-4">
												<Col className="text-center">
													<Link
														style={{ textDecoration: 'none' }}
														className="btn btn-light-cornflower-blue align-self-center"
														color="primary"
														to="/auth/login"
													>
														LOGIN
													</Link>
												</Col>
											</Row>
										</div>
									</div>
								</Col>
							</div>
						</div>
					</Row> */}
					<div className="mt-3">
						<div className="landing-bottom-left">
							<Nav className="logo">
								<NavItem className="sidebar-brand d-flex align-items-center nav-links-animate">
									<a
										href="https://www.aegean.gr/"
										target="_blank"
										rel="noreferrer"
										style={{
											textDecoration: 'none',
											color: '#E0E0E0',
											marginTop: '15px',
										}}
									>
										<span
											style={{ fontSize: '0.6rem' }}
											className="sidebar-brand-text mx-3"
										>
											University of the Aegean
										</span>
									</a>
								</NavItem>
							</Nav>
						</div>
						<div className="landing-bottom-right">
							<Nav className="logo">
								<NavItem className="sidebar-brand d-flex align-items-center nav-links-animate">
									<a
										href="https://www.linkedin.com/in/dimitris-alexiou"
										target="_blank"
										rel="noreferrer"
										style={{
											textDecoration: 'none',
											color: '#E0E0E0',
											marginTop: '15px',
										}}
									>
										<span
											style={{ fontSize: '0.6rem' }}
											className="sidebar-brand-text mx-3"
										>
											<FontAwesomeIcon
												className="mx-2"
												style={{ fontSize: '0.9rem' }}
												icon={faCode}
											/>
											Developed
										</span>
									</a>
								</NavItem>
							</Nav>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
