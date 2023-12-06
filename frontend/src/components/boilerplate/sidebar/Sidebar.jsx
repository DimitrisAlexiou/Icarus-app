import { NavLink } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaStudiovinari } from 'react-icons/fa';
import {
	faUniversity,
	faBarsStaggered,
} from '@fortawesome/free-solid-svg-icons';
import { UserType } from '../../../constants/enums';
import AdminSidebar from './AdminSidebar';
import InstructorSidebar from './InstructorSidebar';
import StudentSidebar from './StudentSidebar';

export default function Sidebar({
	user,
	isSidebarCollapsed,
	setSidebarCollapsed,
	smallSidebar,
}) {
	const smallToggled = () => {
		if (smallSidebar) setSidebarCollapsed(true);
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

				{user && user.user.type === UserType.student ? (
					<StudentSidebar
						smallSidebar={smallSidebar}
						smallToggled={smallToggled}
					/>
				) : user && user.user.type === UserType.instructor ? (
					<InstructorSidebar
						smallSidebar={smallSidebar}
						smallToggled={smallToggled}
					/>
				) : user && user.user.isAdmin ? (
					<AdminSidebar
						smallSidebar={smallSidebar}
						smallToggled={smallToggled}
						isSidebarCollapsed={isSidebarCollapsed}
					/>
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
