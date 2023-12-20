import { Row, Col } from 'reactstrap';

const UserCard = ({ student }) => {
	return (
		<>
			<Row className="mb-3">
				<Col xl="2" lg="2" md="12" sm="12" xs="12">
					<label>
						<b>Name</b>
					</label>
					<p style={{ textAlign: 'justify' }}>{student.user.name}</p>
					<hr />
				</Col>
				<Col xl="3" lg="3" md="12" sm="12" xs="12">
					<label>
						<b>Surname</b>
					</label>
					<p style={{ textAlign: 'justify' }}>{student.user.surname}</p>
					<hr />
				</Col>
				<Col xl="5" lg="5" md="12" sm="12" xs="12">
					<label>
						<b>Email</b>
					</label>
					<p style={{ textAlign: 'justify' }}>{student.user.email}</p>
					<hr />
				</Col>
				<Col>
					<label>
						<b>Username</b>
					</label>
					<p style={{ textAlign: 'justify' }}>{student.user.username}</p>
					<hr />
				</Col>
			</Row>
			<Row className="mb-3">
				<Col xl="2" lg="2" md="12" sm="12" xs="12">
					<label>
						<b>Type</b>
					</label>
					<p style={{ textAlign: 'justify' }}>{student.user.type}</p>
					<hr />
				</Col>
				<Col xl="2" lg="2" md="12" sm="12" xs="12">
					<label>
						<b>Status</b>
					</label>
					<p
						style={{ textAlign: 'justify' }}
						className={student.user.isActive ? 'text-success' : 'text-warning'}
					>
						{student.user.isActive ? 'Active' : 'Inactive'}
					</p>
					<hr />
				</Col>
				<Col xl="3" lg="3" md="12" sm="12" xs="12">
					<label>
						<b>Studies</b>
					</label>
					<p style={{ textAlign: 'justify' }}>{student.studentType}</p>
					<hr />
				</Col>
				<Col xl="3" lg="3" md="12" sm="12" xs="12">
					<label>
						<b>Entrance Year</b>
					</label>
					<p style={{ textAlign: 'justify' }}>{student.entranceYear}</p>
					<hr />
				</Col>
				<Col>
					<label>
						<b>ID</b>
					</label>
					<p style={{ textAlign: 'justify' }}>{student.studentId}</p>
					<hr />
				</Col>
			</Row>
			<Row className="mb-3">
				<Col xl="3" lg="3" md="12" sm="12" xs="12">
					<label>
						<b>Enrolled Teachings</b>
					</label>
					<p style={{ textAlign: 'justify' }}>
						{student.enrolledCourses.length}
					</p>
					<hr />
				</Col>
				<Col xl="3" lg="3" md="12" sm="12" xs="12">
					<label>
						<b>Passed Teachings</b>
					</label>
					<p style={{ textAlign: 'justify' }}>
						{student.passedTeachings.length}
					</p>
					<hr />
				</Col>
				<Col xl="3" lg="3" md="12" sm="12" xs="12">
					<label>
						<b>Events</b>
					</label>
					<p style={{ textAlign: 'justify' }}>{student.user.events.length}</p>
					<hr />
				</Col>
				<Col xl="3" lg="3" md="12" sm="12" xs="12">
					<label>
						<b>Notes</b>
					</label>
					<p style={{ textAlign: 'justify' }}>{student.user.notes.length}</p>
					<hr />
				</Col>
			</Row>
		</>
	);
};

export default UserCard;
