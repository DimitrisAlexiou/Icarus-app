import { NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import {
	sidebarStudentUtilityLinks,
	sidebarStudentDataLinks,
	sidebarStudentCourseLinks,
} from '../../utils/NavigationLinks';

export default function StudentSidebar({ smallToggled, smallSidebar }) {
	return (
		<>
			<div className="sidebar-heading">Course</div>

			<NavItem className="nav-item">
				{sidebarStudentCourseLinks.map((sidebarStudentCourseLink) => {
					const { id, text, path, icon } = sidebarStudentCourseLink;
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

			<div className="sidebar-heading">Data</div>

			<NavItem className="nav-item">
				{sidebarStudentDataLinks.map((sidebarStudentDataLink) => {
					const { id, text, path, icon } = sidebarStudentDataLink;
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

			<div className="sidebar-heading">Utilities</div>

			<NavItem className="nav-item">
				{sidebarStudentUtilityLinks.map((sidebarStudentUtilityLink) => {
					const { id, text, path, icon } = sidebarStudentUtilityLink;
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
	);
}
