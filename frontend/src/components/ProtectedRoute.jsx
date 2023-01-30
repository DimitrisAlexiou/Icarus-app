import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Dashboard from '../pages/Dashboard';
import Spinner from '../components/boilerplate/Spinner';

export default function ProtectedRoute() {
	const { user, isLoading } = useSelector((store) => store.user);

	if (isLoading) {
		return <Spinner />;
	}

	// return isAuthenticated === true ? <Dashboard /> : <Navigate to="/unauthorized" />;
	return user === true ? <Dashboard /> : <Navigate to="/unauthorized" />;
}
