import { useState } from 'react';
import {
	Nav,
	NavItem,
	Button,
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faUnlock,
	faIdCard,
	faGraduationCap,
	faUser,
	faCogs,
	faList,
	faSignOut,
	faBarsStaggered,
} from '@fortawesome/free-solid-svg-icons';
import Clock from 'react-live-clock';
import NotificationsNavItem from './NotificationsNavItem';
import MessagesNavItem from './MessagesNavItem';
import LogoutModal from './LogoutModal';
import img from '../../assets/images/undraw_profile.svg';
import '../../App.css';

export default function NavBar() {
	const { user } = useSelector((store) => store.auth);
	const dispatch = useDispatch();

	const [dropdownOpenUser, setDropdownOpenUser] = useState(false);
	const toggleUser = () => setDropdownOpenUser((prevState) => !prevState);

	const [showLogout, setShowLogout] = useState(false);

	return (
		<>
			<Nav
				fixed="top"
				className="d-flex navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow sticky-top"
			>
				<NavItem className="nav-item mx-1 text-center d-none d-md-inline">
					<Button
						id="sidebarToggleTop"
						className="rounded-circle border-0"
						color="null"
						// onClick={openSidebar}
					>
						<FontAwesomeIcon icon={faBarsStaggered} />
					</Button>
				</NavItem>

				<NavItem className="nav-item mx-3">
					<a
						href="https://www.icsd.aegean.gr/"
						target="_blank"
						className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
						rel="noreferrer"
					>
						<FontAwesomeIcon className="text-white-50" icon={faGraduationCap} />
						<span className="ml-1">ICSD Webpage</span>
					</a>
				</NavItem>

				<NavItem className="navbar-nav ml-auto">
					<NavItem className="nav-item mx-1">
						<Clock className="nav-link" format={'HH:mm:ss'} ticking={true} />
					</NavItem>

					{user ? null : (
						<>
							<NavItem className="nav-item mx-1">
								<NavLink className="nav-link" to="/auth/register">
									<FontAwesomeIcon icon={faIdCard} />
									<span className="ml-2">Register</span>
								</NavLink>
							</NavItem>

							<NavItem className="nav-item  mx-1">
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
								<Dropdown
									className="animated--grow-in"
									isOpen={dropdownOpenUser}
									toggle={toggleUser}
								>
									<DropdownToggle className="nav-link mx-1" color="null">
										<img
											className="img-profile rounded-circle"
											src={img}
											alt="profile_picture"
										/>
									</DropdownToggle>
									<DropdownMenu style={{ margin: 0 }}>
										<DropdownItem className="dropdown-item d-flex align-items-center">
											<NavLink
												to="profile"
												style={{
													textDecoration: 'none',
													color: 'inherit',
												}}
											>
												<FontAwesomeIcon
													className="fa-sm fa-fw mr-2 text-gray-400"
													icon={faUser}
												/>
												Profile
											</NavLink>
										</DropdownItem>
										<DropdownItem className="dropdown-item d-flex align-items-center">
											<NavLink
												to="settings"
												style={{
													textDecoration: 'none',
													color: 'inherit',
												}}
											>
												<FontAwesomeIcon
													className="fa-sm fa-fw mr-2 text-gray-400"
													icon={faCogs}
												/>
												Settings
											</NavLink>
										</DropdownItem>
										<DropdownItem className="dropdown-item d-flex align-items-center">
											<NavLink
												to="activity"
												style={{
													textDecoration: 'none',
													color: 'inherit',
												}}
											>
												<FontAwesomeIcon
													className="fa-sm fa-fw mr-2 text-gray-400"
													icon={faList}
												/>
												Activity Log
											</NavLink>
										</DropdownItem>
										<DropdownItem divider />
										<DropdownItem className="dropdown-item d-flex align-items-center">
											<NavItem onClick={() => dispatch(logout())}>
												<FontAwesomeIcon
													className="mr-2 text-gray-400"
													icon={faSignOut}
												/>
												Logout
											</NavItem>
										</DropdownItem>
										{/* <DropdownItem className="dropdown-item d-flex align-items-center">
											<div type="button" onClick={() => setShowLogout(true)}>
													<FontAwesomeIcon className="mr-2 text-gray-400"> icon={faSignOut} />
												Logout
											</div>
										</DropdownItem> */}
										{/* {showLogout && (
											<LogoutModal setShowLogout={setShowLogout} />
										)} */}
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
