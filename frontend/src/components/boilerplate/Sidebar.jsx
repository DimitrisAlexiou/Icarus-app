import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import {
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Nav,
	NavItem,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaStudiovinari } from 'react-icons/fa';
import {
	faUniversity,
	faBook,
	faUserGraduate,
	faChalkboardTeacher,
	faUsers,
	faWrench,
	faBarsProgress,
} from '@fortawesome/free-solid-svg-icons';
import '../../App.css';

export default function Sidebar() {
	const { user, isAuthenticated } = useAuth0();

	const [isOpen, setIsOpen] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const toggle = () => setDropdownOpen((prevState) => !prevState);
	const Handletoggle = () => {
		setIsOpen(!isOpen);
	};

	const toggleSidebar = () => {
		document.getElementById('sidebarArea').classList.toggle('showSidebar');
	};

	return (
		// isAuthenticated && (
		// 	<>
		<Nav className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion">
			<NavLink
				className="sidebar-brand d-flex align-items-center justify-content-center"
				to="/"
			>
				<div className="sidebar-brand-icon rotate-n-15">
					<i>
						<FaStudiovinari />
					</i>
				</div>
				<div className="sidebar-brand-text mx-3">Icarus</div>
			</NavLink>

			<hr className="sidebar-divider my-0" />

			<NavItem className="nav-item">
				<NavLink className="nav-link" to="/">
					<i>
						<FontAwesomeIcon icon={faUniversity} />
					</i>
					<span>Dashboard</span>
				</NavLink>
			</NavItem>

			<hr className="sidebar-divider" />
			<div className="sidebar-heading">System Interface</div>

			<NavItem className="nav-item">
				<Dropdown variant="muted" isOpen={dropdownOpen} toggle={toggle}>
					<DropdownToggle className="nav-link collapsed" color="null">
						<FontAwesomeIcon icon={faWrench} />
						<span className="ml-1">Utilities</span>
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
				<NavLink className="nav-link" to="/course">
					<FontAwesomeIcon icon={faBook} />
					<span className="ml-1">Courses</span>
				</NavLink>
			</NavItem>

			<NavItem className="nav-item">
				<NavLink className="nav-link" to="/review">
					<FontAwesomeIcon icon={faBarsProgress} />
					<span className="ml-1">Reviews</span>
				</NavLink>
			</NavItem>

			<NavItem className="nav-item">
				<NavLink className="nav-link" to="/students">
					<FontAwesomeIcon icon={faUserGraduate} />
					<span className="ml-1">Students</span>
				</NavLink>
			</NavItem>

			<NavItem className="nav-item">
				<NavLink className="nav-link" to="/professors">
					<FontAwesomeIcon icon={faChalkboardTeacher} />
					<span className="ml-1">Professors</span>
				</NavLink>
			</NavItem>

			<NavItem className="nav-item">
				<NavLink className="nav-link" to="/users">
					<FontAwesomeIcon icon={faUsers} />
					<span className="ml-1">Users</span>
				</NavLink>
			</NavItem>

			<hr className="sidebar-divider d-none d-md-block" />

			{/* <div className="text-center d-none d-md-inline">
				<Button
					className="rounded-circle border-0"
					onClick={toggleSidebar}
				></Button>
			</div> */}
		</Nav>
		// 	</>
		// )
	);
}
