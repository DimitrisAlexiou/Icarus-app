import { useState } from 'react';
import { NavLink } from 'react-router-dom';
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
import { faUniversity, faWrench, faBarsStaggered } from '@fortawesome/free-solid-svg-icons';
import dataLinks from '../../utils/NavigationLinks';
import '../../App.css';

export default function Sidebar() {
	const [isOpen, setIsOpen] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const toggle = () => setDropdownOpen((prevState) => !prevState);

	return (
		<>
			<Nav className="navbar-nav bg-gradient-primary sidebar sidebar-dark shadow">
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
						<DropdownToggle className="nav-link" color="null">
							<FontAwesomeIcon icon={faWrench} />
							<span className="ml-2">Utilities</span>
						</DropdownToggle>
						<DropdownMenu className="collapse dropdown-list dropdown-menu-right">
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

				<NavItem className="nav-item text-center">
					<Button
						className="rounded-circle"
						color="null"
						onClick={() => setIsOpen(!isOpen)}
					>
						<FontAwesomeIcon icon={faBarsStaggered} />
					</Button>
				</NavItem>
			</Nav>
		</>
	);
}
