import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import {
	Nav,
	NavItem,
	Button,
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faUserPlus,
	faUnlock,
	faGraduationCap,
	faUser,
	faCogs,
	faList,
	faSignOut,
	faBell,
	faFileAlt,
	faDonate,
	faExclamationTriangle,
	faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import Clock from 'react-live-clock';
import '../App.css';

export default function NavBar() {
	const { loginWithRedirect } = useAuth0();
	const { user, logout } = useAuth0();

	// NOTIFICATIONS NAV
	const [isOpen, setIsOpen] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const toggle = () => setDropdownOpen((prevState) => !prevState);
	const Handletoggle = () => {
		setIsOpen(!isOpen);
	};

	// MESSAGES NAV
	const [isOpenMessages, setIsOpenMessages] = useState(false);
	const [dropdownOpenMessages, setDropdownOpenMessages] = useState(false);

	const toggleMessages = () =>
		setDropdownOpenMessages((prevState) => !prevState);
	const HandletoggleMessages = () => {
		setIsOpenMessages(!isOpenMessages);
	};

	// USER NAV
	const [isOpenUser, setIsOpenUser] = useState(false);
	const [dropdownOpenUser, setDropdownOpenUser] = useState(false);

	const toggleUser = () => setDropdownOpenUser((prevState) => !prevState);
	const HandletoggleUser = () => {
		setIsOpenUser(!isOpenUser);
	};

	// LOGOUT MODAL
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const toggleLogout = () => setShow(true);

	return (
		<>
			<Nav className="d-flex navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow sticky-top">
				<NavItem className="nav-item mx-1">
					<a
						href="https://www.icsd.aegean.gr/"
						target="_blank"
						className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
						rel="noreferrer"
					>
						<i className="text-white-50">
							<FontAwesomeIcon icon={faGraduationCap} />
						</i>
						<span className="ml-1">ICSD Webpage</span>
					</a>
				</NavItem>

				<NavItem className="navbar-nav ml-auto">
					<NavItem className="nav-item mx-1">
						<div className="nav-link" id="clock">
							<Clock format={'HH:mm:ss'} ticking={true} timezone={'EU/UTC+2'} />
						</div>
					</NavItem>

					<NavItem className="nav-item mx-1">
						<NavLink className="nav-link" color="null" to="/register">
							<FontAwesomeIcon icon={faUserPlus} />
						</NavLink>
					</NavItem>

					<NavItem className="nav-item mx-1">
						<Button
							className="nav-link"
							color="null"
							onClick={() => loginWithRedirect()}
						>
							<FontAwesomeIcon icon={faUnlock} />
						</Button>
					</NavItem>

					<NavItem className="nav-item mx-1">
						<Dropdown variant="muted" isOpen={dropdownOpen} toggle={toggle}>
							<DropdownToggle className="nav-link collapsed" color="null">
								<FontAwesomeIcon icon={faBell} />
								<span className="badge badge-danger badge-counter my-4">
									3+
								</span>
							</DropdownToggle>
							<DropdownMenu className="collapse">
								<div className="rounded dropdown-list shadow animated--grow-in">
									<h6 className="dropdown-header">Alerts Center</h6>
									<DropdownItem className="dropdown-item d-flex align-items-center animated--grow-in">
										<div className="mr-3">
											<div className="icon-circle bg-primary">
												<i className="text-white">
													<FontAwesomeIcon icon={faFileAlt} />
												</i>
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
									</DropdownItem>
									<DropdownItem className="dropdown-item d-flex align-items-center animated--grow-in">
										<div className="mr-3">
											<div className="icon-circle bg-success">
												<i className="text-white">
													<FontAwesomeIcon icon={faDonate} />
												</i>
											</div>
										</div>
										<div>
											<div className="small text-gray-500">
												December 7, 2019
											</div>
											$290.29 has been deposited into your account!
										</div>
									</DropdownItem>
									<DropdownItem className="dropdown-item d-flex align-items-center animated--grow-in">
										<div className="mr-3">
											<div className="icon-circle bg-warning">
												<i className="text-white">
													<FontAwesomeIcon icon={faExclamationTriangle} />
												</i>
											</div>
										</div>
										<div>
											<div className="small text-gray-500">
												December 2, 2019
											</div>
											Spending Alert: We've noticed unusually high spending for
											your account.
										</div>
									</DropdownItem>
									<DropdownItem className="dropdown-item text-center small text-gray-500">
										Show All Alerts
									</DropdownItem>
								</div>
							</DropdownMenu>
						</Dropdown>
					</NavItem>

					<NavItem className="nav-item mx-1">
						<Dropdown
							variant="muted"
							isOpen={dropdownOpenMessages}
							toggle={toggleMessages}
						>
							<DropdownToggle className="nav-link collapsed" color="null">
								<FontAwesomeIcon icon={faEnvelope} />
								<span className="badge badge-danger badge-counter my-4">7</span>
							</DropdownToggle>
							<DropdownMenu className="collapse">
								<div className="rounded dropdown-list animated--grow-in">
									<h6 className="dropdown-header">Message Center</h6>
									<DropdownItem className="dropdown-item d-flex align-items-center animated--grow-in">
										<div className="dropdown-list-image mr-3">
											<img
												className="rounded-circle"
												src="../assets/images/undraw_profile_1.svg"
												alt="..."
											/>
											<div className="status-indicator bg-success"></div>
										</div>
										<div className="font-weight-bold">
											<div className="text-truncate">
												Hi there! I am wondering if you can help me with a
												problem I've been having.
											</div>
											<div className="small text-gray-500">
												Emily Fowler · 58m
											</div>
										</div>
									</DropdownItem>
									<DropdownItem className="dropdown-item d-flex align-items-center animated--grow-in">
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
												I have the photos that you ordered last month, how would
												you like them sent to you?
											</div>
											<div className="small text-gray-500">Jae Chun · 1d</div>
										</div>
									</DropdownItem>
									<DropdownItem className="dropdown-item d-flex align-items-center animated--grow-in">
										<div className="dropdown-list-image mr-3">
											<img
												className="rounded-circle"
												src="../public/undraw_profile_3.svg"
												alt="..."
											/>
											<div className="status-indicator bg-warning"></div>
										</div>
										<div>
											<div className="text-truncate">
												Last month's report looks great, I am very happy with
												the progress so far, keep up the good work!
											</div>
											<div className="small text-gray-500">
												Morgan Alvarez · 2d
											</div>
										</div>
									</DropdownItem>
									<DropdownItem className="dropdown-item d-flex align-items-center animated--grow-in">
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
												Am I a good boy? The reason I ask is because someone
												told me that people say this to all dogs, even if they
												aren't good...
											</div>
											<div className="small text-gray-500">
												Chicken the Dog · 2w
											</div>
										</div>
									</DropdownItem>
									<DropdownItem className="dropdown-item text-center  animated--grow-in small text-gray-500">
										Read More Messages
									</DropdownItem>
								</div>
							</DropdownMenu>
						</Dropdown>
					</NavItem>

					<NavItem className="nav-item mx-1">
						{user ? (
							<>
								<Dropdown isOpen={dropdownOpenUser} toggle={toggleUser}>
									<DropdownToggle className="nav-link mx-1" color="null">
										<img
											className="img-profile rounded-circle"
											src="undraw_profile.svg"
											alt="profile_picture"
										/>
									</DropdownToggle>
									<DropdownMenu>
										<div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"></div>
										<DropdownItem className="dropdown-item d-flex align-items-center">
											<NavLink
												to="profile"
												style={{ textDecoration: 'none', color: 'inherit' }}
											>
												<i className="fa-sm fa-fw mr-2 text-gray-400">
													<FontAwesomeIcon icon={faUser} />
												</i>
												Profile
											</NavLink>
										</DropdownItem>
										<DropdownItem className="dropdown-item d-flex align-items-center">
											<NavLink
												to="settings"
												style={{ textDecoration: 'none', color: 'inherit' }}
											>
												<i className="fa-sm fa-fw mr-2 text-gray-400">
													<FontAwesomeIcon icon={faCogs} />
												</i>
												Settings
											</NavLink>
										</DropdownItem>
										<DropdownItem className="dropdown-item d-flex align-items-center">
											<NavLink
												to="activity"
												style={{ textDecoration: 'none', color: 'inherit' }}
											>
												<i className="fa-sm fa-fw mr-2 text-gray-400">
													<FontAwesomeIcon icon={faList} />
												</i>
												Activity Log
											</NavLink>
										</DropdownItem>
										<DropdownItem divider />
										<DropdownItem className="dropdown-item d-flex align-items-center">
											<Button
												className="btn btn-default"
												onClick={toggleLogout}
												style={{ textDecoration: 'none', color: 'inherit' }}
											>
												<i className="mr-2 text-gray-400">
													<FontAwesomeIcon icon={faSignOut} />
												</i>
												Logout
											</Button>
											<Modal show={show} onHide={handleClose}>
												<ModalHeader className="modal-header" closeButton>
													{/* <ModalTitle className="modal-title"> */}
													Ready to Leave?
												</ModalHeader>
												<ModalBody className="modal-body">
													Select "Logout" below if you are ready to end your
													current session.
												</ModalBody>
												<ModalFooter className="modal-footer">
													<Button
														className="btn btn-secondary"
														onClick={handleClose}
													>
														Close
													</Button>
													<Button
														className="btn btn-light-cornflower-blue btn-small align-self-center"
														onClick={() =>
															logout({ returnTo: window.location.origin })
														}
													>
														Logout
													</Button>
												</ModalFooter>
											</Modal>
										</DropdownItem>
									</DropdownMenu>
								</Dropdown>
							</>
						) : null}
					</NavItem>
				</NavItem>
			</Nav>
		</>
	);
}
