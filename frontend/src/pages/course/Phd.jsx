import { Card, Col, Nav, NavLink, Row } from 'reactstrap';
import { FaStudiovinari } from 'react-icons/fa';
import BreadcrumbNav from '../../components/boilerplate/Breadcrumb';
import BackButton from '../../components/buttons/BackButton';

export default function Phd({ user }) {
	return (
		<>
			{user ? (
				<>
					<BreadcrumbNav link={'/course'} header={'Studies'} active={'Phd'} />
					<h3 className="mb-4 text-gray-800 font-weight-bold animated--grow-in">
						Phd Research
					</h3>
					<Row className="justify-content-center">
						<Col md="8" lg="7" xl="6">
							<Card className="card-note card-body-note mb-4">
								<h5 className="">Phd Studies</h5>
								<p className="mt-2 mx-2 text-justify">
									The Department of Information and Communication Systems
									Engineering offers research opportunities in all sectors of
									information and communications technology.
								</p>
								<p className="mx-2 text-justify">
									The goal of PhD study in the Department is to advance
									knowledge and original research, as well as to offer a high
									standard of specialization.
								</p>
								<p className="mx-2 text-justify">
									PhD study leads to a doctoral diploma (PhD), an academic title
									which certifies that its holder has carried out original
									scientific research and has effectively contributed to the
									advancement of science and knowledge in their field.
								</p>
								<p className="mx-2 text-justify">
									PhD study in the Department charges no tuition fees and
									follows the clauses of Law 4485/2017 and any relevant
									regulatory framework.
								</p>
							</Card>
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
													Phd Research
												</h3>
											</Col>
											<Col className="d-flex justify-content-end">
												<BackButton url={'/studies'} />
											</Col>
										</Row>
										<Row className="justify-content-center">
											<Card className="card-note">
												<h5 className="">Phd Studies</h5>
												<p className="mt-2 mx-2 text-justify">
													The Department of Information and Communication
													Systems Engineering offers research opportunities in
													all sectors of information and communications
													technology.
												</p>
												<p className="mx-2 text-justify">
													The goal of PhD study in the Department is to advance
													knowledge and original research, as well as to offer a
													high standard of specialization.
												</p>
												<p className="mx-2 text-justify">
													PhD study leads to a doctoral diploma (PhD), an
													academic title which certifies that its holder has
													carried out original scientific research and has
													effectively contributed to the advancement of science
													and knowledge in their field.
												</p>
												<p className="mx-2 text-justify">
													PhD study in the Department charges no tuition fees
													and follows the clauses of Law 4485/2017 and any
													relevant regulatory framework.
												</p>
											</Card>
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
