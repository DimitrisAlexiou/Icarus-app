import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faBars,
	faUserPlus,
	faUnlock,
	faGraduationCap,
	faUser,
	faCogs,
	faList,
	faSignOut,
} from '@fortawesome/free-solid-svg-icons';
import Clock from 'react-live-clock';
import '../index.css';
import '../index2.css';

export default function NavBar() {
	// state = {
	// 	hour: null,
	// };

	// componentDidMount() {
	// 	this.getHour();
	// }

	// getHour = () => {
	// 	const date = new Date();
	// 	const hour = date.getHours();
	// 	this.setState({
	// 		hour,
	// 	});
	// };

	// 	const { hour } = this.state;

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);

	const onLogout = () => {
		dispatch(logout());
		dispatch(reset());
		navigate('/');
	};

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const toggleLogout = () => setShow(true);

	return (
		<Nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow sticky-top">
			<a
				href="https://www.icsd.aegean.gr/"
				target="_blank"
				className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
				rel="noreferrer"
			>
				<i className="text-white-50">
					<FontAwesomeIcon icon={faGraduationCap} />
				</i>
				ICSD Webpage
			</a>

			<Button
				id="sidebarToggleTop"
				className="btn btn-link d-md-none rounded-circle mr-3"
			>
				<i>
					<FontAwesomeIcon icon={faBars} />
				</i>
			</Button>

			<ul className="navbar-nav ml-auto">
				<li className="nav-item dropdown no-arrow mx-1">
					<div className="nav-link dropdown-toggle" id="clock">
						<Clock format={'HH:mm:ss'} ticking={true} timezone={'EU/UTC+2'} />
					</div>
				</li>

				<li className="nav-item dropdown no-arrow mx-1">
					<div className="nav-link dropdown-toggle font-weight-bold">
						{/* {hour < 12 ? 'Good Morning' : 'Good evening'} */}
					</div>
				</li>

				<li className="nav-item dropdown no-arrow mx-1">
					<NavLink className="nav-link dropdown-toggle" to="/register">
						<FontAwesomeIcon icon={faUserPlus} />
					</NavLink>
				</li>

				<li className="nav-item dropdown no-arrow mx-1">
					<NavLink className="nav-link dropdown-toggle" to="/login">
						<FontAwesomeIcon icon={faUnlock} />
					</NavLink>
				</li>

				{/* <li className="nav-item dropdown no-arrow mx-1">
						<Dropdown>
							<Dropdown.Toggle
								className="nav-link dropdown-toggle"
								id="alertsDropdown"
								role="button"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							>
								<FontAwesomeIcon icon={faBell} />
								<span className="badge badge-danger badge-counter">3+</span>
							</Dropdown.Toggle>
							<Dropdown.Menu>
								<div
									className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
									aria-labelledby="alertsDropdown"
								>
									<h6 className="dropdown-header">Alerts Center</h6>
									<Dropdown.Item
										className="dropdown-item d-flex align-items-center"
									>
										<div className="mr-3">
											<div className="icon-circle bg-primary">
												<i className="fas fa-file-alt text-white"></i>
											</div>
										</div>
										<div>
											<div className="small text-gray-500">
												December 12, 2019
											</div>
											<span className="font-weight-bold">
												A new monthly report is ready to download!
											</span>
										</div>
									</Dropdown.Item>
									<Dropdown.Item
										className="dropdown-item d-flex align-items-center"
									>
										<div className="mr-3">
											<div className="icon-circle bg-success">
												<i className="fas fa-donate text-white"></i>
											</div>
										</div>
										<div>
											<div className="small text-gray-500">
												December 7, 2019
											</div>
											$290.29 has been deposited into your account!
										</div>
									</Dropdown.Item>
									<Dropdown.Item
										className="dropdown-item d-flex align-items-center"
									>
										<div className="mr-3">
											<div className="icon-circle bg-warning">
												<i className="fas fa-exclamation-triangle text-white"></i>
											</div>
										</div>
										<div>
											<div className="small text-gray-500">
												December 2, 2019
											</div>
											Spending Alert: We've noticed unusually high spending for
											your account.
										</div>
									</Dropdown.Item>
									<Dropdown.Item
										className="dropdown-item text-center small text-gray-500"
									>
										Show All Alerts
									</Dropdown.Item>
								</div>
							</Dropdown.Menu>
						</Dropdown>
						<a
							className="nav-link dropdown-toggle"
							id="alertsDropdown"
							role="button"
							data-toggle="dropdown"
							aria-haspopup="true"
							aria-expanded="false"
						>
						<FontAwesomeIcon icon={faBell} />
						<i className="fas fa-bell fa-fw"></i>
						<span className="badge badge-danger badge-counter">3+</span>
						</a>
						<div
							className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
							aria-labelledby="alertsDropdown"
						>
							<h6 className="dropdown-header">Alerts Center</h6>
							<a className="dropdown-item d-flex align-items-center" href="#">
								<div className="mr-3">
									<div className="icon-circle bg-primary">
										<i className="fas fa-file-alt text-white"></i>
									</div>
								</div>
								<div>
									<div className="small text-gray-500">December 12, 2019</div>
									<span className="font-weight-bold">
										A new monthly report is ready to download!
									</span>
								</div>
							</a>
							<a className="dropdown-item d-flex align-items-center" href="#">
								<div className="mr-3">
									<div className="icon-circle bg-success">
										<i className="fas fa-donate text-white"></i>
									</div>
								</div>
								<div>
									<div className="small text-gray-500">December 7, 2019</div>
									$290.29 has been deposited into your account!
								</div>
							</a>
							<a className="dropdown-item d-flex align-items-center" href="#">
								<div className="mr-3">
									<div className="icon-circle bg-warning">
										<i className="fas fa-exclamation-triangle text-white"></i>
									</div>
								</div>
								<div>
									<div className="small text-gray-500">December 2, 2019</div>
									Spending Alert: We've noticed unusually high spending for your
									account.
								</div>
							</a>
							<a
								className="dropdown-item text-center small text-gray-500"
							>
								Show All Alerts
							</a>
						</div> 
					</li> */}

				{/* <li className="nav-item dropdown no-arrow mx-1">
						<a
							className="nav-link dropdown-toggle"
							id="messagesDropdown"
							role="button"
							data-toggle="dropdown"
							aria-haspopup="true"
							aria-expanded="false"
						>
							<i className="fas fa-envelope fa-fw"></i>
							<span className="badge badge-danger badge-counter">7</span>
						</a>
						<div
							className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
							aria-labelledby="messagesDropdown"
						>
							<h6 className="dropdown-header">Message Center</h6>
							<a className="dropdown-item d-flex align-items-center" href="#">
								<div className="dropdown-list-image mr-3">
									<img
										className="rounded-circle"
										src="/img/undraw_profile_1.svg"
										alt="..."
									/>
									<div className="status-indicator bg-success"></div>
								</div>
								<div className="font-weight-bold">
									<div className="text-truncate">
										Hi there! I am wondering if you can help me with a problem
										I've been having.
									</div>
									<div className="small text-gray-500">Emily Fowler · 58m</div>
								</div>
							</a>
							<a className="dropdown-item d-flex align-items-center" href="#">
								<div className="dropdown-list-image mr-3">
									<img
										className="rounded-circle"
										src="/img/undraw_profile_2.svg"
										alt="..."
									/>
									<div className="status-indicator"></div>
								</div>
								<div>
									<div className="text-truncate">
										I have the photos that you ordered last month, how would you
										like them sent to you?
									</div>
									<div className="small text-gray-500">Jae Chun · 1d</div>
								</div>
							</a>
							<a className="dropdown-item d-flex align-items-center" href="#">
								<div className="dropdown-list-image mr-3">
									<img
										className="rounded-circle"
										src="/img/undraw_profile_3.svg"
										alt="..."
									/>
									<div className="status-indicator bg-warning"></div>
								</div>
								<div>
									<div className="text-truncate">
										Last month's report looks great, I am very happy with the
										progress so far, keep up the good work!
									</div>
									<div className="small text-gray-500">Morgan Alvarez · 2d</div>
								</div>
							</a>
							<a className="dropdown-item d-flex align-items-center" href="#">
								<div className="dropdown-list-image mr-3">
									<img
										className="rounded-circle"
										src="https://source.unsplash.com/Mv9hjnEUHR4/60x60"
										alt="..."
									/>
									<div className="status-indicator bg-success"></div>
								</div>
								<div>
									<div className="text-truncate">
										Am I a good boy? The reason I ask is because someone told me
										that people say this to all dogs, even if they aren't
										good...
									</div>
									<div className="small text-gray-500">
										Chicken the Dog · 2w
									</div>
								</div>
							</a>
							<a
								className="dropdown-item text-center small text-gray-500"
							>
								Read More Messages
							</a>
						</div>
					</li> */}

				<li className="nav-item dropdown no-arrow">
					{user ? (
						<>
							<div className="topbar-divider d-none d-sm-block"></div>

							<Dropdown title="Dropdown" id="basic-nav-dropdown">
								<Dropdown.Toggle
									className="nav-link dropdown-toggle"
									id="userDropdown"
									role="button"
									data-toggle="dropdown"
									aria-haspopup="true"
									aria-expanded="false"
								>
									<img
										className="img-profile rounded-circle"
										src="undraw_profile.svg"
										alt=""
									/>
								</Dropdown.Toggle>
								<Dropdown.Menu
									className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
									aria-labelledby="userDropdown"
									title="Dropdown"
									id="nav-dropdown"
								>
									<Dropdown.Item className="dropdown-item">
										<NavLink
											to="profile"
											style={{ textDecoration: 'none', color: 'inherit' }}
										>
											<i className="fa-sm fa-fw mr-2 text-gray-400">
												<FontAwesomeIcon icon={faUser} />
											</i>
											Profile
										</NavLink>
									</Dropdown.Item>
									<Dropdown.Item className="dropdown-item">
										<NavLink
											to="settings"
											style={{ textDecoration: 'none', color: 'inherit' }}
										>
											<i className="fa-sm fa-fw mr-2 text-gray-400">
												<FontAwesomeIcon icon={faCogs} />
											</i>
											Settings
										</NavLink>
									</Dropdown.Item>
									<Dropdown.Item className="dropdown-item">
										<NavLink
											to="activity"
											style={{ textDecoration: 'none', color: 'inherit' }}
										>
											<i className="fa-sm fa-fw mr-2 text-gray-400">
												<FontAwesomeIcon icon={faList} />
											</i>
											Activity Log
										</NavLink>
									</Dropdown.Item>
									<Dropdown.Divider />
									{/* <Dropdown.Item
								className="dropdown-item"
								data-toggle="modal"
								data-target="#logoutModal"
							>
								<Button
									className="btn btn-default"
									onClick={onLogout}
									style={{ textDecoration: 'none', color: 'inherit' }}
								>
									<i className="fa-sm fa-fw mr-2 text-gray-400">
										<FontAwesomeIcon icon={faSignOut} />
									</i>
									Logout
								</Button>
							</Dropdown.Item> */}
									<Dropdown.Item className="dropdown-item">
										<Button
											className="btn btn-default"
											onClick={toggleLogout}
											style={{ textDecoration: 'none', color: 'inherit' }}
										>
											<i className="fa-sm fa-fw mr-2 text-gray-400">
												<FontAwesomeIcon icon={faSignOut} />
											</i>
											Logout
										</Button>
										<Modal show={show} onHide={handleClose}>
											<Modal.Header className="modal-header" closeButton>
												<Modal.Title className="modal-title">
													Ready to Leave?
												</Modal.Title>
											</Modal.Header>
											<Modal.Body className="modal-body">
												Select "Logout" below if you are ready to end your
												current session.
											</Modal.Body>
											<Modal.Footer className="modal-footer">
												<Button
													className="btn btn-secondary"
													onClick={handleClose}
												>
													Close
												</Button>
												<Button
													className="btn btn-light-cornflower-blue btn-small align-self-center"
													onClick={handleClose}
												>
													Logout
												</Button>
											</Modal.Footer>
										</Modal>
									</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</>
					) : null}
				</li>
			</ul>
		</Nav>
	);
}
