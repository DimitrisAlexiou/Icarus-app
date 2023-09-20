import { Row, Col, Nav, Card, CardTitle } from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
import { FaStudiovinari } from 'react-icons/fa';
import FooterLanding from '../components/boilerplate/FooterLanding';

export default function Landing() {
	return (
		<>
			<div id="wrapper">
				<div id="content-wrapper" className="d-flex flex-column">
					<div className="bg-gradient-primary">
						<div id="content">
							<Row className="mx-5 my-2">
								<Nav className="logo">
									<NavLink
										className="sidebar-brand d-flex align-items-center"
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
								<Col xl="6" lg="7" md="10" sm="10" xs="10" className="mb-3">
									<div className="card o-hidden border-0 shadow-lg animated--grow-in">
										<div className="card-body p-4 text-center">
											<Row className="text-center mb-4">
												<h2
													className="text-gray-800 justify-content-center"
													style={{
														fontWeight: '600',
														letterSpacing: '0.4rem',
													}}
												>
													Welcome to Icarus
												</h2>
											</Row>
											<Row className="text-center mb-2">
												<span>
													Τo login to{' '}
													<h6
														style={{
															display: 'inline-block',
															fontSize: '1.23rem',
															letterSpacing: '0.05rem',
														}}
													>
														<b>Icarus Student Information Services</b>
													</h6>
													, use:
												</span>
											</Row>
											<Row className="mb-3 text-center">
												<li>
													your{' '}
													<span className="text-success">academic</span>{' '}
													account if you are a{' '}
													<i>
														<small
															className="text-muted pill-label"
															style={{
																textAlign: 'justify',
																fontWeight: '700',
																fontSize: 16,
															}}
														>
															Student
														</small>
													</i>
												</li>
												<li className="mt-1">
													your{' '}
													<span className="text-success">instuctor</span>{' '}
													account if you are an{' '}
													<i>
														<small
															className="text-muted pill-label"
															style={{
																textAlign: 'justify',
																fontWeight: '700',
																fontSize: 16,
															}}
														>
															Instructor
														</small>
													</i>
												</li>
											</Row>
											<Row className="mb-3">
												<span>
													<span
														style={{
															fontSize: '1.15rem',
															color: 'tomato',
															letterSpacing: '0.05rem',
														}}
													>
														<b>Icarus</b>
													</span>{' '}
													Student Information System Services allows{' '}
													<small
														className="text-muted pill-label"
														style={{
															textAlign: 'justify',
															fontWeight: '700',
															fontSize: 16,
														}}
													>
														students
													</small>
												</span>
												<Row className="mt-2 text-center">
													<li>apply for semester registration</li>
													<li>apply for academic certificates</li>
													<li>
														view courses, semester registrations and
														grades
													</li>
													<li>
														review and communicate with their professors
													</li>
												</Row>
											</Row>
											<Row>
												<span>
													Also offers a wide set of features to{' '}
													<small
														className="text-muted pill-label"
														style={{
															textAlign: 'justify',
															fontWeight: '700',
															fontSize: 16,
														}}
													>
														instructors
													</small>
												</span>
												<Row className="mt-2 text-center">
													<li>viewing courses, teachings and students</li>
													<li>
														managing active teachings and course
														examinations
													</li>
													<li>
														uploading digital course material for
														students to study
													</li>
													<li>
														uploading digitally signed grades for course
														examinations
													</li>
												</Row>
											</Row>
										</div>
									</div>
								</Col>
								<Col xl="4" lg="4" md="6" sm="10" xs="10">
									<Row>
										<Col>
											<div className="card o-hidden border-0 shadow-lg animated--grow-in">
												<div className="card-body">
													<Row className="mb-3 justify-content-center">
														<img
															style={{ width: '35%' }}
															src="sculpture.png"
															alt="sculpture"
														/>
													</Row>
													<Col className="text-center">
														<Link
															style={{ textDecoration: 'none' }}
															to="/auth/login"
														>
															<Card
																className="card-animate border-0 text-center"
																body
																color="success"
																inverse
															>
																<CardTitle
																	tag="h5"
																	className="mt-2"
																>
																	Login
																</CardTitle>
															</Card>
														</Link>
													</Col>
												</div>
											</div>
										</Col>
										<Col className="mt-3 mb-3 animated--grow-in" xl="12">
											<Link style={{ textDecoration: 'none' }} to="/studies">
												<Card
													className="card-animate border-0 text-center"
													body
													color="warning"
													inverse
												>
													<CardTitle tag="h5" className="mt-2">
														Studies
													</CardTitle>
												</Card>
											</Link>
										</Col>
									</Row>
								</Col>
							</Row>
						</div>
						<FooterLanding />
					</div>
				</div>
			</div>
		</>
	);
}
