import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import { faAddressCard } from '@fortawesome/free-regular-svg-icons';
import ProfileInfoCard from '../../components/user/ProfileInfoCard';
import ProfileUpdateCard from '../../components/user/ProfileUpdateCard';
import ProfileCard3 from '../../components/user/ProfileCard3';
import ChangePassword from '../../components/user/ChangePassword';
import Spinner from '../../components/boilerplate/Spinner';
import moment from 'moment';

export default function Profile() {
	const { user, isLoading } = useSelector((state) => state.auth);
	const [selectedNavItem, setSelectedNavItem] = useState('overview');

	if (isLoading) return <Spinner />;

	const renderComponent = () => {
		switch (selectedNavItem) {
			case 'overview':
				return <ProfileUpdateCard user={user} isLoading={isLoading} />;
			case 'security':
				return <ChangePassword />;
			default:
				return null;
		}
	};

	return (
		<>
			<Row className="animated--grow-in">
				<Col sm="6" xs="9" md="6">
					<h3 className="mb-5 text-gray-800 font-weight-bold animated--grow-in">
						Profile
					</h3>
				</Col>
				<Col className="d-flex justify-content-end">
					<p className="text-xs text-gray-500">
						{!user.user.isActive && !user.user.lastLogin ? (
							<span>
								account is not yet active, it will be available soon. (Not yet
								logged in after registration)
							</span>
						) : (
							<span>account is active</span>
						)}
					</p>
				</Col>
			</Row>

			<Row className="animated--grow-in">
				<Col>
					<ProfileInfoCard user={user} />
				</Col>
				<Col md="12" xl="7">
					<Nav className="justify-content-between navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow sticky-top">
						<div className="navbar-nav">
							<NavItem className="nav-item mx-1">
								<NavLink
									className={`nav-link ${
										selectedNavItem === 'overview'
											? 'font-weight-bold text-gray-500'
											: ''
									}`}
									onClick={() => setSelectedNavItem('overview')}
								>
									<FontAwesomeIcon icon={faAddressCard} />
									<span className="ml-2">Overview</span>
								</NavLink>
							</NavItem>

							<NavItem className="nav-item  mx-1">
								<NavLink
									className={`nav-link ${
										selectedNavItem === 'security'
											? 'font-weight-bold text-gray-500'
											: ''
									}`}
									onClick={() => setSelectedNavItem('security')}
								>
									<FontAwesomeIcon icon={faShieldHalved} />
									<span className="ml-2">Security</span>
								</NavLink>
							</NavItem>
						</div>
					</Nav>
					{renderComponent()}
				</Col>
				{/* <img src={undraw_account} alt="undraw_account" className="profile_card_photo" /> */}
			</Row>
			<ProfileCard3 user={user} />
			<Row className="mb-5 animated--grow-in">
				<Col className="d-flex justify-content-end">
					<span className="text-xs text-gray-500">
						Last login: {moment(user.user.lastLogin).fromNow()}
					</span>
				</Col>
			</Row>
			{/* <ChangePassword /> */}
		</>
	);
}
