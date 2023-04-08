import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function ProtectedRoute({ children, allowedRoles }) {
	const { user } = useSelector((state) => state.auth);

	// useEffect(() => {
	// 	// Check for an error message indicating that the JWT token is expired
	// 	const error = localStorage.getItem('error');
	// 	if (error === 'Invalid Token') {
	// 		// Remove the error message from local storage
	// 		localStorage.removeItem('error');

	// 		// Clear the user information
	// 		localStorage.removeItem('user');

	// 		// Redirect the user to the unauthorized page
	// 		history.push('/unauthorized');
	// 	}
	// }, [history]);

	if (!user) {
		// User is not logged in, redirect to unauthorized page
		return <Navigate to="/unauthorized" />;
	}

	if (user.user.lastLogin === null) {
		// User is not yet active, redirect to forbidden page
		return <Navigate to="/forbidden" />;
	}

	if (allowedRoles && !allowedRoles.some((role) => user.user.type?.includes(role))) {
		// User is not authorized to access this page, redirect to forbidden page
		return <Navigate to="/forbidden" />;
	}

	// User is authorized, show the page
	return children;
}
