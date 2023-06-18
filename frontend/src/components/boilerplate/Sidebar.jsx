import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Nav, NavItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaStudiovinari } from 'react-icons/fa';
import { faUniversity, faWrench, faBarsStaggered } from '@fortawesome/free-solid-svg-icons';
import {
	sidebarLinks,
	sidebarAdminLinks,
	sidebarStudentLinks,
	sidebarInstructorLinks,
} from '../../utils/NavigationLinks';
import '../../App.css';
import { useSelector } from 'react-redux';
import { UserType } from '../../constants/enums';

export default function Sidebar({ isSidebarCollapsed, setSidebarCollapsed, smallSidebar }) {
	const { user } = useSelector((state) => state.auth);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const toggle = () => setDropdownOpen((prevState) => !prevState);
	const smallToggled = () => {
		if (smallSidebar) {
			setSidebarCollapsed(true);
		}
	};

	return (
		<>
			<Nav
				className={`navbar-nav bg-gradient-primary sidebar sidebar-dark shadow ${
					isSidebarCollapsed ? 'toggled' : ''
				}`}
			>
				<NavLink
					className="sidebar-brand d-flex align-items-center justify-content-center"
					to="/"
					onClick={smallSidebar ? smallToggled : null}
				>
					<div className="sidebar-brand-icon rotate-15">
						<FaStudiovinari />
					</div>
					<span className="sidebar-brand-text mx-3">Icarus</span>
				</NavLink>

				<NavItem className="nav-item">
					<NavLink
						className="nav-link nav-links-animate"
						to="/"
						onClick={smallSidebar ? smallToggled : null}
					>
						<FontAwesomeIcon icon={faUniversity} />
						<span className="ml-2">Dashboard</span>
					</NavLink>
				</NavItem>

				{user && user.user.isAdmin ? (
					<>
						<div className="sidebar-heading">Admin</div>

						<NavItem className="nav-item">
							{sidebarAdminLinks.map((sidebarAdminLink) => {
								const { id, text, path, icon } = sidebarAdminLink;
								return (
									<NavLink
										className="nav-link nav-links-animate"
										to={path}
										key={id}
									>
										{icon}
										<span className="ml-2">{text}</span>
									</NavLink>
								);
							})}
						</NavItem>
					</>
				) : null}

				{user && user.user.isAdmin ? (
					<>
						<div className="sidebar-heading">System Interface</div>

						<NavItem className="nav-item">
							<Dropdown
								variant="muted"
								direction={isSidebarCollapsed ? 'end' : null}
								isOpen={dropdownOpen}
								toggle={toggle}
							>
								<DropdownToggle className="nav-link" color="null">
									<FontAwesomeIcon icon={faWrench} />
									<span className="ml-2">Course Utilities</span>
								</DropdownToggle>
								<DropdownMenu
									className={`collapse ${isSidebarCollapsed ? 'mx-4' : ''}`}
								>
									<DropdownItem
										className="nav-links-animate animated--grow-in text-gray-600"
										style={{ backgroundColor: 'transparent' }}
									>
										<NavLink
											to="course/new"
											style={{
												textDecoration: 'none',
												color: 'inherit',
											}}
											onClick={smallSidebar ? smallToggled : null}
										>
											Add Course
										</NavLink>
									</DropdownItem>
									<DropdownItem
										className="nav-links-animate animated--grow-in text-gray-600"
										style={{ backgroundColor: 'transparent' }}
									>
										<NavLink
											to="courses/assign"
											style={{ textDecoration: 'none', color: 'inherit' }}
											onClick={smallSidebar ? smallToggled : null}
										>
											Assign Course
										</NavLink>
									</DropdownItem>
									<DropdownItem
										className="nav-links-animate animated--grow-in text-gray-600"
										style={{ backgroundColor: 'transparent' }}
									>
										<NavLink
											to="subjectGrading"
											style={{ textDecoration: 'none', color: 'inherit' }}
											onClick={smallSidebar ? smallToggled : null}
										>
											Grade Course
										</NavLink>
									</DropdownItem>
									<DropdownItem
										className="nav-links-animate animated--grow-in text-gray-600"
										style={{ backgroundColor: 'transparent' }}
									>
										<NavLink
											to="subjectStatement"
											style={{ textDecoration: 'none', color: 'inherit' }}
											onClick={smallSidebar ? smallToggled : null}
										>
											Statement
										</NavLink>
									</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						</NavItem>
					</>
				) : null}

				<div className="sidebar-heading">Data</div>

				{user && user.user.type === UserType.student ? (
					<NavItem className="nav-item">
						{sidebarStudentLinks.map((sidebarStudentLink) => {
							const { id, text, path, icon } = sidebarStudentLink;
							return (
								<NavLink
									className="nav-link nav-links-animate"
									to={path}
									key={id}
									onClick={smallSidebar ? smallToggled : null}
								>
									{icon}
									<span className="ml-2">{text}</span>
								</NavLink>
							);
						})}
					</NavItem>
				) : user && user.user.type === UserType.instructor ? (
					<NavItem className="nav-item">
						{sidebarInstructorLinks.map((sidebarInstructorLink) => {
							const { id, text, path, icon } = sidebarInstructorLink;
							return (
								<NavLink
									className="nav-link nav-links-animate"
									to={path}
									key={id}
									onClick={smallSidebar ? smallToggled : null}
								>
									{icon}
									<span className="ml-2">{text}</span>
								</NavLink>
							);
						})}
					</NavItem>
				) : (
					<NavItem className="nav-item">
						{sidebarLinks.map((sidebarLink) => {
							const { id, text, path, icon } = sidebarLink;
							return (
								<NavLink
									className="nav-link nav-links-animate"
									to={path}
									key={id}
									onClick={smallSidebar ? smallToggled : null}
								>
									{icon}
									<span className="ml-2">{text}</span>
								</NavLink>
							);
						})}
					</NavItem>
				)}

				{user && user.user.isAdmin ? (
					<>
						<div className="sidebar-heading">Instructor</div>

						<NavItem className="nav-item">
							{sidebarInstructorLinks.map((sidebarInstructorLink) => {
								const { id, text, path, icon } = sidebarInstructorLink;
								return (
									<NavLink
										className="nav-link nav-links-animate"
										to={path}
										key={id}
										onClick={smallSidebar ? smallToggled : null}
									>
										{icon}
										<span className="ml-2">{text}</span>
									</NavLink>
								);
							})}
						</NavItem>

						<div className="sidebar-heading">Student</div>

						<NavItem className="nav-item">
							{sidebarStudentLinks.map((sidebarStudentLink) => {
								const { id, text, path, icon } = sidebarStudentLink;
								return (
									<NavLink
										className="nav-link nav-links-animate"
										to={path}
										key={id}
										onClick={smallSidebar ? smallToggled : null}
									>
										{icon}
										<span className="ml-2">{text}</span>
									</NavLink>
								);
							})}
						</NavItem>
					</>
				) : null}

				<NavItem className="nav-item">
					<NavLink
						className={`nav-link nav-links-animate ${
							isSidebarCollapsed ? '' : 'd-flex justify-content-center'
						}`}
						color="null"
						onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
					>
						<FontAwesomeIcon icon={faBarsStaggered} />
					</NavLink>
				</NavItem>
			</Nav>
		</>
	);
}
