import { useSelector } from 'react-redux';
import { Row, Col } from 'reactstrap';
import Calendar from '../components/calendar/calendar';
import AdminDashboard from './admin/AdminDashboard';

export default function Dashboard() {
	const { user } = useSelector((state) => state.auth);

	return (
		<>
			{user ? (
				<>
					<Row className="mb-5 animated--grow-in">
						<Col sm="6" xs="9" md="6">
							<h3 className="text-gray-800 font-weight-bold">
								Dashboard {user.user.name}
							</h3>
						</Col>
						<Col className="d-flex justify-content-end">
							<p className="text-xs text-gray-500">
								{!user.user.isActive && !user.user.lastLogin ? (
									<span>
										account is not yet active, it will be available soon. (Not
										yet logged in after registration)
									</span>
								) : (
									<span>account is active</span>
								)}
							</p>
						</Col>
					</Row>
					{user.user.isAdmin && <AdminDashboard />}
					<Calendar />
				</>
			) : (
				<h3 className="mb-5 text-gray-800 font-weight-bold animated--grow-in">Dashboard</h3>
			)}
		</>
	);
}
