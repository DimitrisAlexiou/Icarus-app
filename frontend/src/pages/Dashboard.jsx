import { useSelector } from 'react-redux';
import Calendar from '../components/calendar/calendar';
import AdminDashboard from './admin/AdminDashboard';

export default function Dashboard() {
	const { user } = useSelector((state) => state.auth);

	return (
		<>
			{user ? (
				<>
					<h1 className="h3 mb-5 text-gray-800 font-weight-bold animated--grow-in">
						Dashboard {user.user.name}
					</h1>
					<p className="mb-5 animated--grow-in">
						{!user.user.isActive && !user.user.lastLogin ? (
							<span>
								Account is not yet active, it will be available soon. (Not yet
								logged in after registration)
							</span>
						) : (
							<span>
								Last login:{' '}
								{new Date(user.user.lastLogin)
									.toLocaleString('en-GB', {
										day: '2-digit',
										month: '2-digit',
										year: 'numeric',
										hour: 'numeric',
										minute: 'numeric',
										second: 'numeric',
									})
									.replace(',', '')}{' '}
								:: Account is active and has logged in at least once.
							</span>
						)}
					</p>

					{user.user.isAdmin && <AdminDashboard />}
					<Calendar />
				</>
			) : (
				<h1 className="h3 mb-5 text-gray-800 font-weight-bold animated--grow-in">
					Dashboard
				</h1>
			)}
		</>
	);
}
