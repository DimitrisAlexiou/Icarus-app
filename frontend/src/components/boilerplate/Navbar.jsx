import { useState, forwardRef, useRef } from 'react';
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
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { navbarLinks } from '../../utils/NavigationLinks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faUnlock,
	faGraduationCap,
	faSignOut,
	faBarsStaggered,
} from '@fortawesome/free-solid-svg-icons';
import { faIdCard, faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import Clock from 'react-live-clock';
import NotificationsNavItem from './Notifications';
import MessagesNavItem from './Messages';
import img from '../../assets/images/undraw_profile.svg';

export default function NavBar({ isSidebarCollapsed, setSidebarCollapsed }) {
	const [darkTheme, setDarkTheme] = useState(false);

	const { user } = useSelector((store) => store.auth);

	const myRef = useRef(null);

	const [showLogout, setShowLogout] = useState(false);
	const [dropdownOpenUser, setDropdownOpenUser] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const toggleUser = () => setDropdownOpenUser((prevState) => !prevState);
	const toggleLogout = () => setShowLogout(!showLogout);
	const handleLogout = () => {
		dispatch(logout());
		setShowLogout(false);
		navigate('/');
	};

	const ModalComponent = forwardRef((props, ref) => {
		return (
			<Modal
				className="modal-dialog modal-content"
				isOpen={showLogout}
				toggle={toggleLogout}
				ref={ref}
			>
				<ModalHeader toggle={toggleLogout}>Ready to Leave?</ModalHeader>
				<ModalBody className="modal-body">
					Logout will terminate your current session.
				</ModalBody>
				<ModalFooter className="modal-footer">
					<Button
						className="btn btn-light-cornflower-blue align-self-center"
						onClick={() => handleLogout()}
					>
						Logout
					</Button>
				</ModalFooter>
			</Modal>
		);
	});

	return (
		<>
			<Nav
				fixed="top"
				className={`justify-content-between navbar navbar-expand topbar mb-4 static-top shadow sticky-top ${
					darkTheme ? 'navbar-dark bg-dark' : 'navbar-light bg-white'
				}`}
			>
				<div className="navbar-nav">
					<NavItem className="nav-item mx-1">
						<Button
							className="nav-link rounded-circle border-0"
							color="null"
							onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
						>
							<FontAwesomeIcon icon={faBarsStaggered} />
						</Button>
					</NavItem>

					<NavItem className="d-none d-md-none d-sm-block d-lg-block nav-item mx-3">
						<a
							href="https://www.icsd.aegean.gr/"
							target="_blank"
							className="btn btn-sm btn-primary shadow-sm"
							rel="noreferrer"
							style={{ marginTop: '20px' }}
						>
							<FontAwesomeIcon className="text-white-50" icon={faGraduationCap} />
							<span className="ml-1">ICSD Webpage</span>
						</a>
					</NavItem>
				</div>

				<div className="navbar-nav ml-auto">
					{/* <NavItem className="nav-item d-none d-sm-none d-sm-block d-lg-block mx-1">
						<span className="nav-link">
							{new Date().toLocaleString('en-GB', {
								day: '2-digit',
								month: '2-digit',
								year: 'numeric',
							})}
						</span>
					</NavItem> */}

					<NavItem className="nav-item mx-1">
						<Clock className="nav-link" format={'HH:mm:ss'} ticking={true} />
					</NavItem>

					<NavItem className="nav-item">
						<Button
							className="nav-link border-0"
							color="null"
							onClick={() => setDarkTheme(!darkTheme)}
						>
							{darkTheme ? (
								<FontAwesomeIcon icon={faSun} />
							) : (
								<FontAwesomeIcon icon={faMoon} />
							)}
						</Button>
					</NavItem>

					{user ? null : (
						<>
							<NavItem className="nav-item mx-1">
								<NavLink className="nav-link" to="/auth/register">
									<FontAwesomeIcon icon={faIdCard} />
									<span className="ml-2">Register</span>
								</NavLink>
							</NavItem>

							<NavItem className="nav-item mx-1">
								<NavLink className="nav-link" to="/auth/login">
									<FontAwesomeIcon icon={faUnlock} />
									<span className="ml-2">Login</span>
								</NavLink>
							</NavItem>
						</>
					)}

					<NavItem className="nav-item mx-1">
						{user ? <NotificationsNavItem /> : null}
					</NavItem>

					<NavItem className="nav-item mx-1">{user ? <MessagesNavItem /> : null}</NavItem>

					<NavItem className="nav-item mx-1">
						{user ? (
							<>
								<Dropdown isOpen={dropdownOpenUser} toggle={toggleUser}>
									<DropdownToggle className="nav-link" color="null">
										<span className="mr-2 d-none d-lg-inline text-gray-600 small">
											{user.user.name}
										</span>
										<span className="rounded-circle-success">
											<img
												className="img-profile rounded-circle"
												src={img}
												alt="profile_picture"
											/>
										</span>
									</DropdownToggle>
									<DropdownMenu>
										{navbarLinks.map((navbarLink) => {
											const { id, text, path, icon } = navbarLink;
											return (
												<DropdownItem
													key={id}
													className="nav-links-animate align-items-center animated--grow-in"
													style={{ backgroundColor: 'transparent' }}
												>
													<NavLink
														to={path}
														style={{
															textDecoration: 'none',
															color: 'inherit',
														}}
													>
														{icon}
														{text}
													</NavLink>
												</DropdownItem>
											);
										})}
									</DropdownMenu>
								</Dropdown>
							</>
						) : null}
					</NavItem>

					{user ? (
						<NavItem className="nav-item mx-1" onClick={() => setShowLogout(true)}>
							<NavLink className="nav-link">
								<FontAwesomeIcon className="text-gray-400" icon={faSignOut} />
							</NavLink>
						</NavItem>
					) : null}
				</div>
			</Nav>
			<ModalComponent ref={myRef} />
		</>
	);
}
