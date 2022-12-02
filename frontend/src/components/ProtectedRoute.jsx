import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import Dashboard from '../pages/Dashboard';
import Spinner from '../components/boilerplate/Spinner';

const ProtectedRoute = ({ children }) => {
	// const { isAuthenticated, isLoading } = useAuth0();
	const { user, isLoading } = useSelector((store) => store.user);

	if (isLoading) {
		return <Spinner />;
	}

	// return isAuthenticated === true ? <Dashboard /> : <Navigate to="/unauthorized" />;
	return user === true ? <Dashboard /> : <Navigate to="/unauthorized" />;
};

export default ProtectedRoute;
