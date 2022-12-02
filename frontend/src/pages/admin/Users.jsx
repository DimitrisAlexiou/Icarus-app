import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import UsersDataTable from '../../components/admin/UsersDataTable';
import Spinner from '../../components/boilerplate/Spinner';

export default function Users() {
	const { isAuthenticated, isLoading } = useAuth0();

	const navigate = useNavigate();

	if (isLoading) {
		return <Spinner />;
	}

	return (
		// isAuthenticated && (
		<>
			<div>
				<h1 className="h3 mb-5 text-gray-800 font-weight-bold">Users</h1>

				<div className="row justify-content-center">
					<div className="col-sm-12 col-md-11 col-lg-10 col-xl-8">
						{/* <UsersDataTable /> */}
					</div>
				</div>
			</div>
		</>
		// )
	);
}
