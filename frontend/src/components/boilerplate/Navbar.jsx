import React, { useState } from 'react';
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
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faUnlock,
	faGraduationCap,
	faUser,
	faCogs,
	faList,
	faSignOut,
} from '@fortawesome/free-solid-svg-icons';
import Clock from 'react-live-clock';
import NotificationsNavItem from './NotificationsNavItem';
import MessagesNavItem from './MessagesNavItem';
import '../../App.css';

export default function NavBar() {
	const { loginWithRedirect, user, logout } = useAuth0();

	// NOTIFICATIONS NAV
	const [isOpen, setIsOpen] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const toggle = () => setDropdownOpen((prevState) => !prevState);
	const Handletoggle = () => {
		setIsOpen(!isOpen);
	};

	// USER NAV
	const [isOpenUser, setIsOpenUser] = useState(false);
	const [dropdownOpenUser, setDropdownOpenUser] = useState(false);

	const toggleUser = () => setDropdownOpenUser((prevState) => !prevState);
	const HandletoggleUser = () => {
		setIsOpenUser(!isOpenUser);
	};

	// LOGOUT MODAL
	const [isOpenLogout, setIsOpenLogout] = useState(false);
	const [modal, setModal] = useState(false);

	const toggleLogout = () => setModal((prevState) => !prevState);
	const handleClose = () => setIsOpenLogout(!isOpenLogout);

	// const [show, setShow] = useState(false);
	// const toggleLogout = () => setShow(true);

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

				<div className="navbar-nav ml-auto">
					<NavItem className="nav-item mx-1">
						<div className="nav-link" id="clock">
							<Clock format={'HH:mm:ss'} ticking={true} />
						</div>
					</NavItem>

					<NavItem className="nav-item mx-1">
						<Button
							className="nav-link"
							color="null"
							onClick={() => loginWithRedirect()}
						>
							<FontAwesomeIcon icon={faUnlock} />
							<div className="nav-link">Login</div>
						</Button>
					</NavItem>

					<NavItem className="nav-item mx-1">
						{user ? <NotificationsNavItem /> : null}
					</NavItem>

					<NavItem className="nav-item mx-1">
						{user ? <MessagesNavItem /> : null}
					</NavItem>

					<NavItem className="nav-item mx-1">
						{user ? (
							<>
								<Dropdown
									className="animated--grow-in"
									isOpen={dropdownOpenUser}
									toggle={toggleUser}
								>
									<DropdownToggle className="nav-link mx-1" color="null">
										<img
											className="img-profile rounded-circle"
											src="undraw_profile.svg"
											alt="profile_picture"
										/>
									</DropdownToggle>
									<DropdownMenu>
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
											<div
												type="button"
												onClick={() =>
													logout({ returnTo: window.location.origin })
												}
												style={{ textDecoration: 'none', color: 'inherit' }}
											>
												<i className="mr-2 text-gray-400">
													<FontAwesomeIcon icon={faSignOut} />
												</i>
												Logout
											</div>
											{/* <Modal isOpenLogout={modal} onHide={handleClose}>
                                                <ModalHeader className="modal-header" closeButton>
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
                                            </Modal> */}
										</DropdownItem>
									</DropdownMenu>
								</Dropdown>
							</>
						) : null}
					</NavItem>
				</div>
			</Nav>
		</>
	);
}
