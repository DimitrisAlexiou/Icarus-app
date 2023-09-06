import { useSelector } from 'react-redux';
import { Card, CardBody, CardTitle, Col, Row } from 'reactstrap';
import AdminDashboard from '../admin/AdminDashboard';
import InstructorDashboard from './InstructorDashboard';
import StudentDashboard from './StudentDashboard';

export default function Dashboard() {
	const { user } = useSelector((state) => state.auth);
	const { semester } = useSelector((state) => state.semesters);

	return (
		<>
			{user ? (
				<>
					<Row className="mb-4 animated--grow-in">
						<Col>
							<h3 className="mb-4 animated--grow-in text-gray-800 font-weight-bold">
								Dashboard
							</h3>
						</Col>
						{semester ? (
							<Col xl="3" md="6" className="text-right">
								<Card className="card-note">
									<CardBody>
										<CardTitle>
											<Col>
												<h6> Current Semester</h6>
											</Col>
											<Col>
												<h3>{semester.type}</h3>
											</Col>
										</CardTitle>
									</CardBody>
								</Card>
							</Col>
						) : null}
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
