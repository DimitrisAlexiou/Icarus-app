import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
// import { getMessages, reset } from '../../features/messages/messagesSlice';
import Spinner from './Spinner';
import '../../App.css';

export default function MessagesNavItem() {
	const [isOpenMessages, setIsOpenMessages] = useState(false);
	const [dropdownOpenMessages, setDropdownOpenMessages] = useState(false);

	const toggleMessages = () => setDropdownOpenMessages((prevState) => !prevState);

	// const HandletoggleMessages = () => {
	// 	setIsOpenMessages(!isOpenMessages);
	// };

	// const { messages, isLoading, isSuccess } = useSelector(
	// 	(state) => state.messages,
	// );

	const dispatch = useDispatch();

	// useEffect(() => {
	// 	return () => {
	// 		if (isSuccess) {
	// 			dispatch(reset());
	// 		}
	// 	};
	// }, [dispatch, isSuccess]);

	// useEffect(() => {
	// 	dispatch(getMessages());
	// }, [dispatch]);

	// if (isLoading) {
	// 	return <Spinner />;
	// }

	// {
	// 	messages.map((messages) => (
	// 		<DropdownItem className="dropdown-item d-flex align-items-center animated--grow-in">
	// 			<div className="dropdown-list-image mr-3">
	// 				<img
	// 					className="rounded-circle"
	// 					src={messages.user.userImage}
	// 					alt={messages.user.name}
	// 				/>
	// 				{/* <div className="status-indicator bg-success"></div> */}
	// 			</div>
	// 			<div className="font-weight-bold">
	// 				<div className="text-truncate">
	// 					{messages.description}
	// 					Hi there! I am wondering if you can help me with a problem I've been having.
	// 				</div>
	// 				<div className="small text-gray-500">
	// 					{messages.user} · {messages.time}
	// 					Emily Fowler · 58m
	// 				</div>
	// 			</div>
	// 		</DropdownItem>
	// 	));
	// }

	return (
		<>
			<Dropdown variant="muted" isOpen={dropdownOpenMessages} toggle={toggleMessages}>
				<DropdownToggle className="nav-link collapsed" color="null">
					<FontAwesomeIcon icon={faEnvelope} />
					<span className="badge badge-danger badge-counter my-4">
						{/* {messages.count()} */}7
					</span>
				</DropdownToggle>

				<DropdownMenu
					className="rounded dropdown-list animated--grow-in"
					style={{ margin: 0 }}
				>
					<h6 className="dropdown-header">Message Center</h6>

					<DropdownItem className="dropdown-item d-flex align-items-center animated--grow-in">
						<div className="dropdown-list-image mr-3">
							<img
								className="rounded-circle"
								// src="../public/undraw_profile_2.svg"
								alt="..."
							/>
							<div className="status-indicator"></div>
						</div>
						<div>
							<div className="text-truncate">
								I have the photos that you ordered last month, how would you like
								them sent to you?
							</div>
							<div className="small text-gray-500">Jae Chun · 1d</div>
						</div>
					</DropdownItem>

					<DropdownItem className="dropdown-item d-flex align-items-center animated--grow-in">
						<div className="dropdown-list-image mr-3">
							<img
								className="rounded-circle"
								// src="../public/undraw_profile_3.svg"
								alt="..."
							/>
							<div className="status-indicator bg-warning"></div>
						</div>
						<div>
							<div className="text-truncate">
								Last month's report looks great, I am very happy with the progress
								so far, keep up the good work!
							</div>
							<div className="small text-gray-500">Morgan Alvarez · 2d</div>
						</div>
					</DropdownItem>

					<DropdownItem className="dropdown-item d-flex align-items-center animated--grow-in">
						<div className="dropdown-list-image mr-3">
							<img
								className="rounded-circle"
								src="https://source.unsplash.com/Mv9hjnEUHR4/60x60"
								alt="..."
							/>
							<div className="status-indicator bg-success"></div>
						</div>
						<div>
							<div className="text-truncate">
								Am I a good boy? The reason I ask is because someone told me that
								people say this to all dogs, even if they aren't good...
							</div>
							<div className="small text-gray-500">Chicken the Dog · 2w</div>
						</div>
					</DropdownItem>

					<DropdownItem className="dropdown-item text-center  animated--grow-in small text-gray-500">
						<Link to={'/messages'} type="button" className="btn btn-light btn-small">
							Read More Messages
						</Link>
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</>
	);
}
