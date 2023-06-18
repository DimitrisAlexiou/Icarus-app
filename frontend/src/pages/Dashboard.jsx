import { useSelector } from 'react-redux';
import Calendar from '../components/calendar/calendar';
import AdminDashboard from './admin/AdminDashboard';

export default function Dashboard() {
	const { user } = useSelector((state) => state.auth);

	return (
		<>
			{
				user ? (
					<>
						<h3 className="mb-5 animated--grow-in text-gray-800 font-weight-bold">
							Dashboard
						</h3>
						{user.user.isAdmin ? <AdminDashboard /> : null}
						<Calendar />
					</>
				) : null
				// <h3 className="mb-5 text-gray-800 font-weight-bold animated--grow-in">Dashboard</h3>
			}
		</>
	);
}
