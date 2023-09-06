import { NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import {
	sidebarInstructorUtilityLinks,
	sidebarInstructorCourseLinks,
} from '../../../utils/NavigationLinks';

export default function InstructorSidebar({ smallToggled, smallSidebar }) {
	return (
		<>
			<div className="sidebar-heading">Course Configuration</div>

			<NavItem className="nav-item">
				{sidebarInstructorCourseLinks.map((sidebarInstructorCourseLink) => {
					const { id, text, path, icon } = sidebarInstructorCourseLink;
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
				{sidebarInstructorUtilityLinks.map((sidebarInstructorUtilityLink) => {
					const { id, text, path, icon } = sidebarInstructorUtilityLink;
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
