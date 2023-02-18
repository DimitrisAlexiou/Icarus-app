import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function ProtectedRoute({ children, history }) {
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

	if (user) return children;

	return <Navigate to="/unauthorized" />;
}
