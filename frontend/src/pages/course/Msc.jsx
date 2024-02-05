import { useSelector } from 'react-redux';
import { Col, Row, Nav } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { FaStudiovinari } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import useMasters from '../../hooks/course/useMasters';
import BreadcrumbNav from '../../components/boilerplate/Breadcrumb';
import BackButton from '../../components/buttons/BackButton';
import Notification from '../../components/boilerplate/Notification';
import Spinner from '../../components/boilerplate/spinners/Spinner';
import MscItem from '../../components/course/MscItem';
import Header from '../../components/boilerplate/headers/Header';

export default function Msc() {
	const { user } = useSelector((state) => state.auth);
	const { masters, isLoading } = useMasters();

	return (
		<>
			{user ? (
				<>
					<BreadcrumbNav
						link={'/course'}
						header={'Studies'}
						active={'Master of Science'}
					/>

					<Header title="Master of Science" />

					{isLoading ? (
						<Spinner card />
					) : masters.length ? (
						<>
							<Row className="mb-4 justify-content-center animated--grow-in">
								{masters.map((master) => (
									<Col key={master._id} md="8" lg="5" className="mb-3">
										<MscItem master={master} />
									</Col>
								))}
							</Row>
							<Col className="d-flex justify-content-end">
								<h6 className="mb-3 text-gray-400 font-weight-bold animated--grow-in">
									{masters.length} master
									{masters.length > 1 && 's'}
								</h6>
							</Col>
						</>
					) : (
						<Notification
							icon={<FontAwesomeIcon icon={faBook} />}
							message={'There are no master programs available right now !'}
							link={'/course'}
						/>
					)}
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

										{isLoading ? (
											<Spinner card />
										) : masters.length ? (
											<>
												<Row className="mb-4 justify-content-center animated--grow-in">
													{masters.map((master) => (
														<Col
															key={master._id}
															md="8"
															lg="5"
															className="mb-3"
														>
															<MscItem master={master} />
														</Col>
													))}
												</Row>
												<Col className="d-flex justify-content-end">
													<h6 className="mb-3 text-gray-400 font-weight-bold animated--grow-in">
														{masters.length} master
														{masters.length > 1 && 's'}
													</h6>
												</Col>
											</>
										) : (
											<Notification
												icon={<FontAwesomeIcon icon={faBook} />}
												message={
													'There are no master programs available right now !'
												}
												link={'/studies'}
											/>
										)}
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
