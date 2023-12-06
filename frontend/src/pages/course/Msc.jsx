import { Col, Row, Card, CardTitle, CardText, Nav } from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
import { academicYearStart } from '../../utils/academicYears';
import { FaStudiovinari } from 'react-icons/fa';
import BreadcrumbNav from '../../components/boilerplate/Breadcrumb';
import BackButton from '../../components/buttons/BackButton';

export default function Msc({ user }) {
	return (
		<>
			{user ? (
				<>
					<BreadcrumbNav
						link={'/course'}
						header={'Studies'}
						active={'Master of Science'}
					/>

					<Row className="mb-3 animated--grow-in">
						<Col sm="12" xs="12" md="12" lg="9">
							<h3 className="mb-3 text-gray-800 font-weight-bold animated--grow-in">
								Master of Science
							</h3>
						</Col>
					</Row>

					<Row className="mb-4 justify-content-center animated--grow-in">
						<Col md="7" lg="4" className="mb-3">
							<Link
								style={{
									textDecoration: 'none',
								}}
								to="/course/msc/infoSec"
							>
								<Card className="card-animate" body color="primary" inverse>
									<CardTitle tag="h5">
										Information and Communication Systems Security
									</CardTitle>
									<CardText className="mt-3">
										<small
											style={{
												textAlign: 'justify',
												fontWeight: '700',
												fontSize: 13,
											}}
										>
											Starting Date: October {academicYearStart}
										</small>
									</CardText>
									<CardText>
										<small
											style={{
												textAlign: 'justify',
												fontWeight: '700',
												fontSize: 13,
											}}
										>
											Duration: 3 semesters (part time: up to 6 semesters)
										</small>
									</CardText>
									<CardText>
										<small
											style={{
												textAlign: 'justify',
												fontWeight: '700',
												fontSize: 13,
											}}
										>
											ECTS: 90
										</small>
									</CardText>
								</Card>
							</Link>
						</Col>
						<Col md="7" lg="4">
							<Link
								style={{
									textDecoration: 'none',
								}}
								to="/course/msc/ics-conversion"
							>
								<Card className="card-animate" body color="warning" inverse>
									<CardTitle tag="h5">
										Information and Communication Systems
									</CardTitle>
									<CardText className="mt-3">
										<small
											style={{
												textAlign: 'justify',
												fontWeight: '700',
												fontSize: 13,
											}}
										>
											Starting Date: October {academicYearStart}
										</small>
									</CardText>
									<CardText>
										<small
											style={{
												textAlign: 'justify',
												fontWeight: '700',
												fontSize: 13,
											}}
										>
											Duration: 3 semesters (part time: up to 6 semesters)
										</small>
									</CardText>
									<CardText>
										<small
											style={{
												textAlign: 'justify',
												fontWeight: '700',
												fontSize: 13,
											}}
										>
											ECTS: 90
										</small>
									</CardText>
								</Card>
							</Link>
						</Col>
					</Row>

					<Row className="mb-4 justify-content-center animated--grow-in">
						<Col md="7" lg="4" className="mb-3">
							<Link
								style={{
									textDecoration: 'none',
								}}
								to="/course/msc/egov"
							>
								<Card className="card-animate" body color="success" inverse>
									<CardTitle tag="h5">E-Government</CardTitle>
									<CardText className="mt-3">
										<small
											style={{
												textAlign: 'justify',
												fontWeight: '700',
												fontSize: 13,
											}}
										>
											Starting Date: October {academicYearStart}
										</small>
									</CardText>
									<CardText>
										<small
											style={{
												textAlign: 'justify',
												fontWeight: '700',
												fontSize: 13,
											}}
										>
											Duration: 3 semesters (part time: up to 6 semesters)
										</small>
									</CardText>
									<CardText>
										<small
											style={{
												textAlign: 'justify',
												fontWeight: '700',
												fontSize: 13,
											}}
										>
											ECTS: 90
										</small>
									</CardText>
								</Card>
							</Link>
						</Col>
						<Col md="7" lg="4">
							<Link
								style={{
									textDecoration: 'none',
								}}
								to="/course/msc/iot"
							>
								<Card className="card-animate" body color="info" inverse>
									<CardTitle tag="h5">Internet of Things</CardTitle>
									<CardText className="mt-3">
										<small
											style={{
												textAlign: 'justify',
												fontWeight: '700',
												fontSize: 13,
											}}
										>
											Starting Date: October {academicYearStart}
										</small>
									</CardText>
									<CardText>
										<small
											style={{
												textAlign: 'justify',
												fontWeight: '700',
												fontSize: 13,
											}}
										>
											Duration: 4 semesters (part time: up to 8 semesters)
										</small>
									</CardText>
									<CardText>
										<small
											style={{
												textAlign: 'justify',
												fontWeight: '700',
												fontSize: 13,
											}}
										>
											ECTS: 120
										</small>
									</CardText>
								</Card>
							</Link>
						</Col>
					</Row>

					<Row className="mb-4 justify-content-center animated--grow-in">
						<Col md="7" lg="4" className="mb-3">
							<Link
								style={{
									textDecoration: 'none',
								}}
								to="/course/msc/innovation"
							>
								<Card className="card-animate" body color="danger" inverse>
									<CardTitle tag="h5">
										Digital Innovation and Startup Entrepreneurship
									</CardTitle>
									<CardTitle tag="h6">
										<small
											style={{
												textAlign: 'justify',
												fontWeight: '500',
												fontSize: 10,
											}}
										>
											In collaboration with the National Technical University of
											Athens
										</small>
									</CardTitle>
									<CardText className="mt-3">
										<small
											style={{
												textAlign: 'justify',
												fontWeight: '700',
												fontSize: 13,
											}}
										>
											Starting Date: October {academicYearStart}
										</small>
									</CardText>
									<CardText>
										<small
											style={{
												textAlign: 'justify',
												fontWeight: '700',
												fontSize: 13,
											}}
										>
											Duration: 4 semesters (part time: up to 8 semesters)
										</small>
									</CardText>
									<CardText>
										<small
											style={{
												textAlign: 'justify',
												fontWeight: '700',
												fontSize: 13,
											}}
										>
											ECTS: 120
										</small>
									</CardText>
								</Card>
							</Link>
						</Col>
					</Row>
				</>
			) : (
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
								<div className="card o-hidden border-0 shadow-lg my-4 animated--grow-in">
									<div className="card-body p-4">
										<Row className="mb-4 animated--grow-in">
											<Col>
												<h3 className="text-gray-800 font-weight-bold">
													Master
												</h3>
											</Col>
											<Col className="d-flex justify-content-end">
												<BackButton url={'/studies'} />
											</Col>
										</Row>

										<Row className="mb-4 justify-content-center animated--grow-in">
											<Col md="7" lg="5" className="mb-3">
												<Link
													style={{
														textDecoration: 'none',
													}}
													to="/studies/msc/infoSec"
												>
													<Card
														className="card-animate"
														body
														color="primary"
														inverse
													>
														<CardTitle tag="h5">
															Information and Communication Systems Security
														</CardTitle>
														<CardText className="mt-3">
															<small
																style={{
																	textAlign: 'justify',
																	fontWeight: '700',
																	fontSize: 13,
																}}
															>
																Starting Date: October {academicYearStart}
															</small>
														</CardText>
														<CardText>
															<small
																style={{
																	textAlign: 'justify',
																	fontWeight: '700',
																	fontSize: 13,
																}}
															>
																Duration: 3 semesters (part time: up to 6
																semesters)
															</small>
														</CardText>
														<CardText>
															<small
																style={{
																	textAlign: 'justify',
																	fontWeight: '700',
																	fontSize: 13,
																}}
															>
																ECTS: 90
															</small>
														</CardText>
													</Card>
												</Link>
											</Col>
											<Col md="7" lg="5">
												<Link
													style={{
														textDecoration: 'none',
													}}
													to="/studies/msc/ics-conversion"
												>
													<Card
														className="card-animate"
														body
														color="warning"
														inverse
													>
														<CardTitle tag="h5">
															Information and Communication Systems
														</CardTitle>
														<CardText className="mt-3">
															<small
																style={{
																	textAlign: 'justify',
																	fontWeight: '700',
																	fontSize: 13,
																}}
															>
																Starting Date: October {academicYearStart}
															</small>
														</CardText>
														<CardText>
															<small
																style={{
																	textAlign: 'justify',
																	fontWeight: '700',
																	fontSize: 13,
																}}
															>
																Duration: 3 semesters (part time: up to 6
																semesters)
															</small>
														</CardText>
														<CardText>
															<small
																style={{
																	textAlign: 'justify',
																	fontWeight: '700',
																	fontSize: 13,
																}}
															>
																ECTS: 90
															</small>
														</CardText>
													</Card>
												</Link>
											</Col>
										</Row>

										<Row className="mb-4 justify-content-center animated--grow-in">
											<Col md="7" lg="5" className="mb-3">
												<Link
													style={{
														textDecoration: 'none',
													}}
													to="/studies/msc/egov"
												>
													<Card
														className="card-animate"
														body
														color="success"
														inverse
													>
														<CardTitle tag="h5">E-Government</CardTitle>
														<CardText className="mt-3">
															<small
																style={{
																	textAlign: 'justify',
																	fontWeight: '700',
																	fontSize: 13,
																}}
															>
																Starting Date: October {academicYearStart}
															</small>
														</CardText>
														<CardText>
															<small
																style={{
																	textAlign: 'justify',
																	fontWeight: '700',
																	fontSize: 13,
																}}
															>
																Duration: 3 semesters (part time: up to 6
																semesters)
															</small>
														</CardText>
														<CardText>
															<small
																style={{
																	textAlign: 'justify',
																	fontWeight: '700',
																	fontSize: 13,
																}}
															>
																ECTS: 90
															</small>
														</CardText>
													</Card>
												</Link>
											</Col>
											<Col md="7" lg="5">
												<Link
													style={{
														textDecoration: 'none',
													}}
													to="/studies/msc/iot"
												>
													<Card
														className="card-animate"
														body
														color="info"
														inverse
													>
														<CardTitle tag="h5">Internet of Things</CardTitle>
														<CardText className="mt-3">
															<small
																style={{
																	textAlign: 'justify',
																	fontWeight: '700',
																	fontSize: 13,
																}}
															>
																Starting Date: October {academicYearStart}
															</small>
														</CardText>
														<CardText>
															<small
																style={{
																	textAlign: 'justify',
																	fontWeight: '700',
																	fontSize: 13,
																}}
															>
																Duration: 4 semesters (part time: up to 8
																semesters)
															</small>
														</CardText>
														<CardText>
															<small
																style={{
																	textAlign: 'justify',
																	fontWeight: '700',
																	fontSize: 13,
																}}
															>
																ECTS: 120
															</small>
														</CardText>
													</Card>
												</Link>
											</Col>
										</Row>

										<Row className="mb-4 justify-content-center animated--grow-in">
											<Col md="7" lg="5" className="mb-3">
												<Link
													style={{
														textDecoration: 'none',
													}}
													to="/studies/msc/innovation"
												>
													<Card
														className="card-animate"
														body
														color="danger"
														inverse
													>
														<CardTitle tag="h5">
															Digital Innovation and Startup Entrepreneurship
														</CardTitle>
														<CardTitle tag="h6">
															<small
																style={{
																	textAlign: 'justify',
																	fontWeight: '500',
																	fontSize: 10,
																}}
															>
																In collaboration with the National Technical
																University of Athens
															</small>
														</CardTitle>
														<CardText className="mt-3">
															<small
																style={{
																	textAlign: 'justify',
																	fontWeight: '700',
																	fontSize: 13,
																}}
															>
																Starting Date: October {academicYearStart}
															</small>
														</CardText>
														<CardText>
															<small
																style={{
																	textAlign: 'justify',
																	fontWeight: '700',
																	fontSize: 13,
																}}
															>
																Duration: 4 semesters (part time: up to 8
																semesters)
															</small>
														</CardText>
														<CardText>
															<small
																style={{
																	textAlign: 'justify',
																	fontWeight: '700',
																	fontSize: 13,
																}}
															>
																ECTS: 120
															</small>
														</CardText>
													</Card>
												</Link>
											</Col>
										</Row>
									</div>
								</div>
							</Col>
						</Row>
					</div>
				</div>
			)}
		</>
	);
}
