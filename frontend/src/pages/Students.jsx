import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Spinner } from 'reactstrap';

export default function Users() {
	const { isAuthenticated, isLoading } = useAuth0();

	const navigate = useNavigate();

	if (isLoading) {
		return (
			<Spinner color="primary" type="grow">
				Loading...
			</Spinner>
		);
	}

	return (
		isAuthenticated && (
			<>
				<div id="content-wrapper" className="d-flex flex-column">
					<div id="content">
						<div>
							<h1 className="h3 mb-5 text-gray-800 font-weight-bold">
								Students !
							</h1>
							<div className="row justify-content-center">
								<div className="col-sm-12 col-md-11 col-lg-10 col-xl-8"></div>
							</div>
						</div>
					</div>
				</div>
			</>
		)
	);
}
