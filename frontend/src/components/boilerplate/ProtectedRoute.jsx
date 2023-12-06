import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ user, children, allowedRoles }) {
	// User is not logged in, redirect to unauthorized page
	if (!user) return <Navigate to="/unauthorized" />;

	// User is not yet active, redirect to forbidden page
	if (user.user.lastLogin === null) return <Navigate to="/forbidden" />;

	// User is not authorized to access this page, redirect to forbidden page
	if (
		allowedRoles &&
		!allowedRoles.some((role) => user.user.type?.includes(role))
	)
		return <Navigate to="/forbidden" />;

	// User is authorized, show the page
	return children;
}
