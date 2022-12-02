import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar } from '../../features/sidebarSlice';
import { useGlobalContext } from '../../context';
import { useAuth0 } from '@auth0/auth0-react';
import {
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Nav,
	NavItem,
	Button,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaStudiovinari } from 'react-icons/fa';
import {
	faUnlock,
	faIdCard,
	faUniversity,
	faWrench,
	faBarsStaggered,
} from '@fortawesome/free-solid-svg-icons';
import dataLinks from '../../utils/NavigationLinks';
import '../../App.css';

export default function Sidebar() {
	const { user, isAuthenticated } = useAuth0();

	// const [isSidebarOpen] = useSelector((store) => store.sidebar);
	// const dispatch = useDispatch();

	// const sidebarToggle = () => {
	// 	dispatch(toggleSidebar());
	// };

	const [isOpen, setIsOpen] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const toggle = () => setDropdownOpen((prevState) => !prevState);
	const Handletoggle = () => {
		setIsOpen(!isOpen);
	};

	return (
		// isAuthenticated && (
		<>
			{/* <Nav
				className={
					isSidebarOpen
						? 'navbar-nav bg-gradient-primary sidebar sidebar-dark accordion shadow'
						: 'navbar-nav bg-gradient-primary sidebar sidebar-dark accordion shadow accordionSidebar'
				}
				// id="accordionSidebar"
			> */}
			<Nav
				className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion shadow"
				id="accordionSidebar"
			>
				<NavLink
					className="sidebar-brand d-flex align-items-center justify-content-center"
					to="/"
				>
					<div className="sidebar-brand-icon rotate-n-15">
						<i>
							<FaStudiovinari />
						</i>
					</div>
					<span className="sidebar-brand-text mx-3">Icarus</span>
				</NavLink>

				<hr className="sidebar-divider my-0" />

				<NavItem className="nav-item">
					<NavLink className="nav-link" to="/">
						<FontAwesomeIcon icon={faUniversity} />
						<span className="ml-2">Dashboard</span>
					</NavLink>
				</NavItem>

				<hr className="sidebar-divider" />
				<div className="sidebar-heading">System Interface</div>

				<NavItem className="nav-item">
					<Dropdown variant="muted" isOpen={dropdownOpen} toggle={toggle}>
						<DropdownToggle className="nav-link collapsed" color="null">
							<FontAwesomeIcon icon={faWrench} />
							<span className="ml-2">Utilities</span>
						</DropdownToggle>
						<DropdownMenu className="collapse">
							<div className="bg-white collapse-inner rounded dropdown-list dropdown-menu-right animated--grow-in">
								<h6 className="collapse-header">Utilities :</h6>
								<DropdownItem className="dropdown-item d-flex animated--grow-in text-gray-600">
									<NavLink
										to="course/new"
										style={{ textDecoration: 'none', color: 'inherit' }}
									>
										Add Course
									</NavLink>
								</DropdownItem>
								<DropdownItem className="dropdown-item d-flex animated--grow-in text-gray-600">
									<NavLink
										to="courses/assign"
										style={{ textDecoration: 'none', color: 'inherit' }}
									>
										Assign Course
									</NavLink>
								</DropdownItem>
								<DropdownItem className="dropdown-item d-flex animated--grow-in text-gray-600">
									<NavLink
										to="subjectGrading"
										style={{ textDecoration: 'none', color: 'inherit' }}
									>
										Grade Course
									</NavLink>
								</DropdownItem>
								<DropdownItem className="dropdown-item d-flex animated--grow-in text-gray-600">
									<NavLink
										to="subjectStatement"
										style={{ textDecoration: 'none', color: 'inherit' }}
									>
										Statement
									</NavLink>
								</DropdownItem>
							</div>
						</DropdownMenu>
					</Dropdown>
				</NavItem>

				<hr className="sidebar-divider" />
				<div className="sidebar-heading">Data</div>

				<NavItem className="nav-item">
					{dataLinks.map((dataLink) => {
						const { id, text, path, icon } = dataLink;
						return (
							<NavLink className="nav-link" to={path} key={id}>
								{icon}
								<span className="ml-2">{text}</span>
							</NavLink>
						);
					})}
				</NavItem>

				<hr className="sidebar-divider" />

				<NavItem className="nav-item">
					<NavLink className="nav-link" to="/auth/register">
						<FontAwesomeIcon icon={faIdCard} />
						<span className="ml-2">Register</span>
					</NavLink>
				</NavItem>

				<NavItem className="nav-item">
					<NavLink className="nav-link" to="/auth/login">
						<FontAwesomeIcon icon={faUnlock} />
						<span className="ml-2">Login</span>
					</NavLink>
				</NavItem>

				<hr className="sidebar-divider" />

				{/* <div class="text-center d-none d-md-inline">
					<button class="rounded-circle border-0" ></button>
				</div> */}

				<div className="nav-item text-center d-none d-md-inline">
					<Button
						id="sidebarToggleTop"
						className="rounded-circle border-0"
						color="null"
						// sidebarToggle={sidebarToggle}
						// onClick={openSidebar}
					>
						<FontAwesomeIcon icon={faBarsStaggered} />
					</Button>
				</div>
			</Nav>
			{/* </asside> */}
			{/* </div> */}
		</>
		// )
	);
}
