import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import { faAddressCard } from '@fortawesome/free-regular-svg-icons';
import ProfileCard1 from '../../components/user/ProfileCard1';
import ProfileCard2 from '../../components/user/ProfileCard2';
import ProfileCard3 from '../../components/user/ProfileCard3';
import ResetPassword from '../../components/auth/ResetPassword';
import Spinner from '../../components/boilerplate/Spinner';
import undraw_account from '../../assets/images/undraw_account.svg';

export default function Profile() {
	const { user, isLoading } = useSelector((state) => state.auth);
	const [selectedNavItem, setSelectedNavItem] = useState('overview');

	if (isLoading) {
		return <Spinner />;
	}

	const renderComponent = () => {
		switch (selectedNavItem) {
			case 'overview':
				return <ProfileCard2 user={user} />;
			case 'security':
				return <ResetPassword />;
			default:
				return null;
		}
	};

	return (
		<>
			<h1 className="h3 mb-5 text-gray-800 font-weight-bold animated--grow-in">Profile</h1>

			<Row className="animated--grow-in">
				<Col>
					<ProfileCard1 user={user} />
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
		</>
	);
}
