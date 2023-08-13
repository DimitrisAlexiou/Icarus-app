import { Row, Col } from 'reactstrap';
import { UserType } from '../../constants/enums';
import Spinner from '../../components/boilerplate/Spinner';
import UpdateProfileForm from '../../components/auth/UpdateProfileForm';

export default function ProfileUpdateCard({ user, isLoading }) {
	return (
		<>
			<div className="profile_card  animated--grow-in">
				<div className="card-body">
					{user.user.type === UserType.student ? (
						<>
							<Row>
								<Col md="5">
									<label>
										<b>Student Type</b>
									</label>
									<p style={{ textAlign: 'justify' }}>
										{user.user.student.studentType}
									</p>
								</Col>
								<Col md="4">
									<label>
										<b>Entrance Year</b>
									</label>
									<p style={{ textAlign: 'justify' }}>
										{user.user.student.entranceYear}
									</p>
								</Col>
								<Col md="3">
									<label>
										<b>Student ID</b>
									</label>
									<p style={{ textAlign: 'justify' }}>
										{user.user.student.studentId}
									</p>
								</Col>
							</Row>
						</>
					) : user.user.type === UserType.instructor ? (
						<>
							<Row>
								<Col md="4">
									<label>
										<b>Entrance Year</b>
									</label>
									<p style={{ textAlign: 'justify' }}>
										{user.user.instructor.instructorEntranceYear}
									</p>
								</Col>
								<Col md="3">
									<label>
										<b>Faculty</b>
									</label>
									<p style={{ textAlign: 'justify' }}>
										{user.user.instructor.facultyType}
									</p>
								</Col>
							</Row>
						</>
					) : null}
					{isLoading ? <Spinner card /> : <UpdateProfileForm user={user} />}
				</div>
			</div>
		</>
	);
}
