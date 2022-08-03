import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from 'react';
import ProfileCard1 from '../components/user/ProfileCard1';
import ProfileCard2 from '../components/user/ProfileCard2';
import ProfileCard3 from '../components/user/ProfileCard3';
import Spinner from '../components/boilerplate/Spinner';

export default function Profile() {
	const { user, isAuthenticated, isLoading } = useAuth0();

	if (isLoading) {
		return <Spinner />;
	}

	return (
		isAuthenticated && (
			<>
				<div id="content-wrapper" className="d-flex flex-column">
					<div id="content">
						<div className="container-fluid">
							<h1 className="h3 mb-5 text-gray-800 font-weight-bold">
								Profile
							</h1>
							<div className="container">
								<div className="main-body">
									<div className="row">
										<ProfileCard1 user={user} />
										<div className="col-lg-8">
											{/* <ProfileCard2 user={user} /> */}
										</div>
									</div>
									<ProfileCard3 user={user} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		)
	);
}
