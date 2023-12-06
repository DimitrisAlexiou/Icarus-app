import { Col, Row } from 'reactstrap';
import AdminDashboard from '../admin/AdminDashboard';
import InstructorDashboard from './InstructorDashboard';
import StudentDashboard from './StudentDashboard';
import CurrentSemester from '../../components/boilerplate/CurrentSemester';

export default function Dashboard({ user }) {
	return (
		<>
			{user ? (
				<>
					<Row className="mb-3 animated--grow-in">
						<Col>
							<h3 className="text-gray-800 font-weight-bold">Dashboard</h3>
						</Col>
						<CurrentSemester />
					</Row>
					{user.user.isAdmin ? (
						<AdminDashboard />
					) : user.user.student ? (
						<StudentDashboard />
					) : user.user.instructor ? (
						<InstructorDashboard />
					) : null}
				</>
			) : null}
		</>
	);
}
