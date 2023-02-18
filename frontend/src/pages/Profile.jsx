import React from 'react';
import { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import ProfileCard1 from '../components/user/ProfileCard1';
import ProfileCard2 from '../components/user/ProfileCard2';
import ProfileCard3 from '../components/user/ProfileCard3';
import Spinner from '../components/boilerplate/Spinner';

export default function Profile() {
	// if (isLoading) {
	// 	return <Spinner />;
	// }

	return (
		<>
			<h1 className="h3 mb-5 text-gray-800 font-weight-bold">Profile</h1>

			<div className="container">
				<div className="main-body">
					<Row>
						{/* <ProfileCard1 user={user} /> */}
						<Col lg="8">{/* <ProfileCard2 user={user} /> */}</Col>
					</Row>
					{/* <ProfileCard3 user={user} /> */}
				</div>
			</div>
		</>
	);
}
