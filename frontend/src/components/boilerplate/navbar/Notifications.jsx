import { useState } from 'react';
import {
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faInfoCircle, faWarning } from '@fortawesome/free-solid-svg-icons';

export default function Notifications() {
	// const { notifications, isLoading } = useSelector(
	// 	(state) => state.notifications,
	// );

	const [dropdownOpen, setDropdownOpen] = useState(false);

	const toggle = () => setDropdownOpen((prevState) => !prevState);

	// useEffect(() => {
	// 	dispatch(getNotifications());
	// }, [dispatch]);

	return (
		<>
			<Dropdown isOpen={dropdownOpen} toggle={toggle}>
				<DropdownToggle className="nav-link" color="null">
					<FontAwesomeIcon icon={faBell} />
					<span className="badge badge-danger badge-counter my-4">
						{/* {notifications.length} */}
						3+
					</span>
				</DropdownToggle>
				<DropdownMenu className="rounded dropdown-list">
					<h6 className="dropdown-header">Notifications Center</h6>
					<DropdownItem className="dropdown-item d-flex align-items-center animated--grow-in">
						<div className="mr-3">
							<div className="icon-circle bg-success">
								<i className="text-white">
									<FontAwesomeIcon icon={faInfoCircle} />
								</i>
							</div>
						</div>
						<div>
							<div className="small text-gray-500">December 7, 2023</div>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
							sollicitudin.
						</div>
					</DropdownItem>
					<DropdownItem className="dropdown-item d-flex align-items-center animated--grow-in">
						<div className="mr-3">
							<div className="icon-circle bg-warning">
								<i className="text-white">
									<FontAwesomeIcon icon={faWarning} />
								</i>
							</div>
						</div>
						<div>
							<div className="small text-gray-500">December 2, 2023</div>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						</div>
					</DropdownItem>
					<DropdownItem className="dropdown-item text-center small text-gray-500">
						<NavLink
							to={'/notifications'}
							style={{
								textDecoration: 'none',
								color: 'inherit',
							}}
						>
							Show All Notifications
						</NavLink>
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</>
	);
}
