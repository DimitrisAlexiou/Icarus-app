import { useState } from 'react';
import {
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

export default function Inbox() {
	// const { messages, isLoading, isSuccess } = useSelector(
	// 	(state) => state.messages,
	// );

	const [dropdownOpen, setDropdownOpen] = useState(false);

	const toggle = () => setDropdownOpen((prevState) => !prevState);

	// useEffect(() => {
	// 	dispatch(getMessages());
	// }, [dispatch]);

	return (
		<>
			<Dropdown isOpen={dropdownOpen} toggle={toggle}>
				<DropdownToggle className="nav-link" color="null">
					<FontAwesomeIcon icon={faEnvelope} />
					<span className="badge badge-danger badge-counter my-4">
						{/* {messages.length} */}7
					</span>
				</DropdownToggle>
				<DropdownMenu className="rounded dropdown-list">
					<h6 className="dropdown-header">Message Center</h6>
					<DropdownItem className="dropdown-item d-flex align-items-center animated--grow-in">
						<div>
							<div className="text-truncate">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
								sollicitudin.
							</div>
							<div className="small text-gray-500">John Doe · 1d</div>
						</div>
					</DropdownItem>
					<DropdownItem className="dropdown-item d-flex align-items-center animated--grow-in">
						<div>
							<div className="text-truncate">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
								sollicitudin.
							</div>
							<div className="small text-gray-500">John Doe · 2d</div>
						</div>
					</DropdownItem>
					<DropdownItem className="dropdown-item d-flex align-items-center animated--grow-in">
						<div>
							<div className="text-truncate">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
								sollicitudin.
							</div>
							<div className="small text-gray-500">John Doe · 2w</div>
						</div>
					</DropdownItem>
					<DropdownItem className="dropdown-item text-center animated--grow-in small text-gray-500">
						<Link
							to={'/messages'}
							style={{
								textDecoration: 'none',
								color: 'inherit',
							}}
						>
							Read More Messages
						</Link>
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</>
	);
}
