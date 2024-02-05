import { useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';
import AdminDashboard from '../admin/AdminDashboard';
import CurrentSemester from '../../components/boilerplate/CurrentSemester';
import CurrentStatement from '../../components/boilerplate/CurrentStatement';
import UserDashboard from './UserDashboard';

export default function Dashboard() {
	const { user } = useSelector((state) => state.auth);

	return (
		<>
			{user ? (
				<>
					<Row className="mb-3 animated--grow-in">
						<Col>
							<h3 className="text-gray-800 font-weight-bold">Dashboard</h3>
						</Col>
						{user.user.student ? <CurrentStatement /> : null}
						<CurrentSemester />
					</Row>

					{user.user.isAdmin ? (
						<AdminDashboard />
					) : (
						<UserDashboard user={user} />
					)}
				</>
			) : null}
		</>
	);
}
