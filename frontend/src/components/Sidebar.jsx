import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
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
import '../App.css';
// import '../index.css';
// import '../index2.css';

export default function Sidebar() {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);

	return (
		<Nav
			className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
			id="accordionSidebar"
		>
			<NavLink
				className="sidebar-brand d-flex align-items-center justify-content-center"
				to="/"
			>
				<div className="sidebar-brand-icon rotate-n-15">
					<i className="">
						<FaStudiovinari />
					</i>
				</div>
				<div className="sidebar-brand-text mx-3">Icarus</div>
			</NavLink>

			<hr className="sidebar-divider my-0" />

			<li className="nav-item">
				<NavLink className="nav-link" to="/">
					<i>
						<FontAwesomeIcon icon={faUniversity} />
					</i>
					<span>Dashboard</span>
				</NavLink>
			</li>

			<hr className="sidebar-divider" />

			<div className="sidebar-heading">System Interface</div>

			<li className="nav-item">
				<Dropdown title="Dropdown" variant="muted" id="basic-nav-dropdown">
					<Dropdown.Toggle
						className="nav-link collapsed"
						data-toggle="collapse"
						data-target="#collapseUtilities"
						aria-expanded="true"
						aria-controls="collapseUtilities"
					>
						<i>
							<FontAwesomeIcon icon={faWrench} />
						</i>
						<span>Utilities</span>
					</Dropdown.Toggle>
					<Dropdown.Menu
						id="collapseUtilities"
						className="collapse"
						aria-labelledby="headingUtilities"
						data-parent="#accordionSidebar"
					>
						<div className="bg-white py-2 collapse-inner rounded">
							<h6 className="collapse-header">Utilities:</h6>
						</div>
						<Dropdown.Item className="collapse-item">
							<NavLink
								to="courses/new"
								style={{ textDecoration: 'none', color: 'inherit' }}
							>
								Add Course
							</NavLink>
						</Dropdown.Item>
						<Dropdown.Item className="collapse-item">
							<NavLink
								to="courses/assign"
								style={{ textDecoration: 'none', color: 'inherit' }}
							>
								Assign Course
							</NavLink>
						</Dropdown.Item>
						<Dropdown.Item className="collapse-item">
							<NavLink
								to="subjectGrading"
								style={{ textDecoration: 'none', color: 'inherit' }}
							>
								Grade Course
							</NavLink>
						</Dropdown.Item>
						<Dropdown.Item className="collapse-item">
							<NavLink
								to="subjectStatement"
								style={{ textDecoration: 'none', color: 'inherit' }}
							>
								Statement
							</NavLink>
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</li>

			<hr className="sidebar-divider" />

			<div className="sidebar-heading">Data</div>

			<li className="nav-item">
				<NavLink className="nav-link" to="/courses">
					<i>
						<FontAwesomeIcon icon={faBook} />
					</i>
					<span>Courses</span>
				</NavLink>
			</li>

			<li className="nav-item">
				<NavLink className="nav-link" to="/reviews">
					<i>
						<FontAwesomeIcon icon={faBarsProgress} />
					</i>
					<span>Reviews</span>
				</NavLink>
			</li>

			<li className="nav-item">
				<NavLink className="nav-link" to="/students">
					<i>
						<FontAwesomeIcon icon={faUserGraduate} />
					</i>
					<span>Students</span>
				</NavLink>
			</li>

			<li className="nav-item">
				<NavLink className="nav-link" to="/professors">
					<i>
						<FontAwesomeIcon icon={faChalkboardTeacher} />
					</i>
					<span>Professors</span>
				</NavLink>
			</li>

			<li className="nav-item">
				<NavLink className="nav-link" to="/users">
					<i>
						<FontAwesomeIcon icon={faUsers} />
					</i>
					<span>Users</span>
				</NavLink>
			</li>

			<hr className="sidebar-divider d-none d-md-block" />

			<div className="text-center d-none d-md-inline">
				<Button
					className="rounded-circle border-0"
					id="sidebarToggle"
					onClick={toggle}
				></Button>
			</div>
		</Nav>
	);
}
