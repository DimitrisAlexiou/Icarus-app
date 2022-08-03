import { Navigate, Outlet } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Spinner from '../components/boilerplate/Spinner';

const ProtectedRoute = () => {
	const { isAuthenticated, isLoading } = useAuth0();

	if (isLoading) {
		return <Spinner />;
	}

	return isAuthenticated === true ? (
		<Outlet />
	) : (
		<Navigate to="/unauthorized" />
	);
};

export default ProtectedRoute;
