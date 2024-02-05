import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { Card, CardText, CardTitle, Row, Col, Nav } from 'reactstrap';
import { FaStudiovinari } from 'react-icons/fa';
import FooterLanding from '../../components/boilerplate/FooterLanding';
import Header from '../../components/boilerplate/headers/Header';

export default function Studies() {
	const { user } = useSelector((state) => state.auth);

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
							<div className="card o-hidden border-0 shadow-lg my-4 animated--grow-in">
								<div className="card-body p-4">
									<Header title="Studies" />

									<Row className="justify-content-center animated--grow-in">
										<Col md="8" lg="7" xl="4" className="mb-4">
											<Link
												style={{ textDecoration: 'none' }}
												to={
													user
														? '/course/undergraduate'
														: '/studies/undergraduate'
												}
											>
												<Card
													body
													color="success"
													className="card-animate"
													inverse
												>
													<CardTitle tag="h4" className="text-center">
														Undergraduate
													</CardTitle>
													<CardText className="mt-3 text-center">
														Undergraduate program guide
													</CardText>
												</Card>
											</Link>
										</Col>
										<Col md="8" lg="7" xl="4" className="mb-4">
											<Link
												style={{ textDecoration: 'none' }}
												to={user ? '/course/msc' : '/studies/msc'}
											>
												<Card
													className="card-animate"
													body
													color="info"
													inverse
												>
													<CardTitle tag="h4" className="text-center">
														Msc
													</CardTitle>
													<CardText className="mt-3 text-center">
														Master of Science program guide
													</CardText>
												</Card>
											</Link>
										</Col>
									</Row>

									<Row className="justify-content-center animated--grow-in">
										<Col md="8" lg="7" xl="4" className="mb-5">
											<Link
												style={{ textDecoration: 'none' }}
												to={user ? '/course/phd' : '/studies/phd'}
											>
												<Card
													body
													color="warning"
													className="card-animate"
													inverse
												>
													<CardTitle tag="h4" className="text-center">
														Phd
													</CardTitle>
													<CardText className="mt-3 text-center">
														Doctoral Diploma program guide
													</CardText>
												</Card>
											</Link>
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
