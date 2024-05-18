import { Row, Col } from 'reactstrap';

const TeachingCard = ({ teaching }) => {
	return (
		<>
			<Row className="mb-3">
				<Col xl="6" lg="6" md="12" sm="12" xs="12">
					<label>
						<b>Theory Weight</b>
					</label>
					<p style={{ textAlign: 'justify' }}>{teaching.theoryWeight}</p>
					<hr />
				</Col>
				<Col>
					<label>
						<b>Lab Weight</b>
					</label>
					<p style={{ textAlign: 'justify' }}>{teaching.labWeight}</p>
					<hr />
				</Col>
			</Row>
			<Row className="mb-3">
				<Col xl="6" lg="6" md="12" sm="12" xs="12">
					<label>
						<b>Theory Grade Retention Years</b>
					</label>
					<p style={{ textAlign: 'justify' }}>
						{teaching.theoryGradeRetentionYears}
					</p>
					<hr />
				</Col>
				<Col>
					<label>
						<b>Lab Grade Retention Years</b>
					</label>
					<p style={{ textAlign: 'justify' }}>
						{teaching.labGradeRetentionYears}
					</p>
					<hr />
				</Col>
			</Row>
			<Row className="mb-3">
				<Col xl="6" lg="6" md="12" sm="12" xs="12">
					<label>
						<b>Theory Grade Threshold</b>
					</label>
					<p style={{ textAlign: 'justify' }}>
						{teaching.theoryGradeThreshold}
					</p>
					<hr />
				</Col>
				<Col>
					<label>
						<b>Lab Grade Threshold</b>
					</label>
					<p style={{ textAlign: 'justify' }}>{teaching.labGradeThreshold}</p>
					<hr />
				</Col>
			</Row>
			<Row className="mb-3">
				<Col>
					<label>
						<b>Theory Instructors</b>
					</label>
					<div>
						{teaching.theoryInstructors.length ? (
							teaching.theoryInstructors.map((instructor) => (
								<small
									key={instructor._id}
									className="text-muted pill-label"
									style={{
										textAlign: 'justify',
										fontWeight: '700',
										fontSize: 15,
									}}
								>
									{instructor.user.surname}
								</small>
							))
						) : (
							<p>Not yet assigned</p>
						)}
					</div>
					<hr />
				</Col>
			</Row>
			<Row className="mb-3">
				<Col>
					<label>
						<b>Lab Instructors</b>
					</label>
					<div>
						{teaching.labInstructors.length ? (
							teaching.labInstructors.map((instructor) => (
								<small
									key={instructor._id}
									className="text-muted pill-label"
									style={{
										textAlign: 'justify',
										fontWeight: '700',
										fontSize: 15,
									}}
								>
									{instructor.user.surname}
								</small>
							))
						) : teaching.course.hasLab ? (
							<p>Not yet assigned</p>
						) : (
							<p className="text-warning">Not applicable</p>
						)}
					</div>
					<hr />
				</Col>
			</Row>
			<Row>
				<Col xl="6" lg="6" md="12" sm="12" xs="12">
					<small
						className="text-muted pill-label mb-3"
						style={{
							textAlign: 'justify',
							fontWeight: '700',
							fontSize: 12,
						}}
					>
						Recommended Books
					</small>
					{teaching.books.length ? (
						teaching.books.map((book, index) => (
							<div key={index}>
								<p style={{ textAlign: 'justify' }}>{book}</p>
								<hr />
							</div>
						))
					) : (
						<p style={{ textAlign: 'justify' }}>No books available</p>
					)}
				</Col>
			</Row>
		</>
	);
};

export default TeachingCard;
