import { Navigate, Outlet } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { useAuth0 } from '@auth0/auth0-react';

const ProtectedRoute = () => {
	const { isAuthenticated, isLoading } = useAuth0();

	if (isLoading) {
		return (
			<Spinner color="primary" type="grow">
				Loading...
			</Spinner>
		);
	}

	return isAuthenticated === true ? (
		<Outlet />
	) : (
		<Navigate to="/UnAuthorized" />
	);
};

export default ProtectedRoute;
