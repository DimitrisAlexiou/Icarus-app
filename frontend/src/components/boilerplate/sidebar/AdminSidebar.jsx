import { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import {
	sidebarAdminSystemLinks,
	sidebarAdminDataLinks,
	sidebarCourseConfigDropDown,
	sidebarAdminUtilityLinks,
} from '../../../utils/NavigationLinks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench } from '@fortawesome/free-solid-svg-icons';

export default function AdminSidebar({ smallToggled, isSidebarCollapsed, smallSidebar }) {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const toggle = () => setDropdownOpen((prevState) => !prevState);

	return (
		<>
			<div className="sidebar-heading">System Interface</div>

			<NavItem className="nav-item">
				{sidebarAdminSystemLinks.map((sidebarAdminSystemLink) => {
					const { id, text, path, icon } = sidebarAdminSystemLink;
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

			<div className="sidebar-heading">Course Configuration</div>

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
					<DropdownMenu className={`collapse ${isSidebarCollapsed ? 'mx-4' : ''}`}>
						{sidebarCourseConfigDropDown.map((dropdownItem) => {
							const { id, text, path } = dropdownItem;
							return (
								<DropdownItem
									key={id}
									className="nav-links-animate animated--grow-in text-gray-600"
									style={{ backgroundColor: 'transparent' }}
								>
									<NavLink
										to={path}
										style={{
											textDecoration: 'none',
											color: 'inherit',
										}}
										onClick={smallSidebar ? smallToggled : null}
									>
										{text}
									</NavLink>
								</DropdownItem>
							);
						})}
					</DropdownMenu>
				</Dropdown>
			</NavItem>

			<div className="sidebar-heading">Data</div>

			<NavItem className="nav-item">
				{sidebarAdminDataLinks.map((sidebarAdminDataLink) => {
					const { id, text, path, icon } = sidebarAdminDataLink;
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
				{sidebarAdminUtilityLinks.map((sidebarAdminUtilityLink) => {
					const { id, text, path, icon } = sidebarAdminUtilityLink;
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
