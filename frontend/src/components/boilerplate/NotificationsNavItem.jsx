import React, { useState, useEffect } from 'react';
import {
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faBell,
	faFileAlt,
	faDonate,
	faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
// import {
// 	getNotifications,
// 	reset,
// } from '../../features/notifications/notificationsSlice';
// import GeneralReviewItem from '../../components/review/GeneralReviewItem';
import Spinner from './Spinner';
import '../../App.css';

export default function NotificationsNavItem() {
	const [isOpen, setIsOpen] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const toggle = () => setDropdownOpen((prevState) => !prevState);
	const Handletoggle = () => {
		setIsOpen(!isOpen);
	};

	const { notifications, isLoading, isSuccess } = useSelector(
		(state) => state.notifications,
	);

	const dispatch = useDispatch();

	// useEffect(() => {
	// 	return () => {
	// 		if (isSuccess) {
	// 			dispatch(reset());
	// 		}
	// 	};
	// }, [dispatch, isSuccess]);

	// useEffect(() => {
	// 	dispatch(getNotifications());
	// }, [dispatch]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<Dropdown variant="muted" isOpen={dropdownOpen} toggle={toggle}>
				<DropdownToggle className="nav-link collapsed" color="null">
					<FontAwesomeIcon icon={faBell} />
					<span className="badge badge-danger badge-counter my-4">
						{notifications.count()}
						3+
					</span>
				</DropdownToggle>

				<DropdownMenu className="collapse">
					<div className="rounded dropdown-list shadow animated--grow-in">
						<h6 className="dropdown-header">Alerts Center</h6>
						{notifications.map((notifications) => (
							<DropdownItem className="dropdown-item d-flex align-items-center animated--grow-in">
								<div className="mr-3">
									<div className="icon-circle bg-primary">
										<i className="text-white">
											<FontAwesomeIcon icon={faFileAlt} />
										</i>
									</div>
								</div>

								<div>
									<div className="small text-gray-500">
										{notifications.date}
										December 12, 2019
									</div>

									<span className="font-weight-bold">
										{notifications.brief}A new monthly report is ready to
										download!
									</span>
								</div>
							</DropdownItem>
						))}

						<DropdownItem className="dropdown-item d-flex align-items-center animated--grow-in">
							<div className="mr-3">
								<div className="icon-circle bg-success">
									<i className="text-white">
										<FontAwesomeIcon icon={faDonate} />
									</i>
								</div>
							</div>
							<div>
								<div className="small text-gray-500">December 7, 2019</div>
								$290.29 has been deposited into your account!
							</div>
						</DropdownItem>

						<DropdownItem className="dropdown-item d-flex align-items-center animated--grow-in">
							<div className="mr-3">
								<div className="icon-circle bg-warning">
									<i className="text-white">
										<FontAwesomeIcon icon={faExclamationTriangle} />
									</i>
								</div>
							</div>
							<div>
								<div className="small text-gray-500">December 2, 2019</div>
								Spending Alert: We've noticed unusually high spending for your
								account.
							</div>
						</DropdownItem>

						<DropdownItem className="dropdown-item text-center small text-gray-500">
							<Link
								to={'/notifications'}
								type="button"
								className="btn btn-light btn-small"
							>
								Show All Alerts
							</Link>
						</DropdownItem>
					</div>
				</DropdownMenu>
			</Dropdown>
		</>
	);
}
