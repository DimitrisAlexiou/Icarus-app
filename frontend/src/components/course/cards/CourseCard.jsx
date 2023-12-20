import { Row, Col, Badge } from 'reactstrap';
import { PrerequisiteType } from '../../../constants/enums';

const CourseCard = ({ course }) => {
	return (
		<>
			<Row className="mb-3">
				<Col xl="2" lg="2" md="12" sm="12" xs="12">
					<label>
						<b>ID</b>
					</label>
					<p style={{ textAlign: 'justify' }}>{course.courseId}</p>
					<hr />
				</Col>
				<Col xl="8" lg="7" md="12" sm="12" xs="12">
					<label>
						<b>Title</b>
					</label>
					<p style={{ textAlign: 'justify' }}>{course.title}</p>
					<hr />
				</Col>
				<Col>
					<label>
						<b>Type</b>
					</label>
					<p style={{ textAlign: 'justify' }}>{course.type}</p>
					<hr />
				</Col>
			</Row>
			<Row className="mb-3">
				<Col xl="2" lg="3" md="3" sm="12" xs="12">
					<label>
						<b>Semester</b>
					</label>
					<p style={{ textAlign: 'justify' }}>{course.semester}</p>
					<hr />
				</Col>
				<Col xl="2" lg="2" md="2" sm="12" xs="12">
					<label>
						<b>Lab</b>
					</label>
					<p
						style={{ textAlign: 'justify' }}
						className={course.hasLab ? 'text-warning' : 'text-success'}
					>
						{course.hasLab ? 'Yes' : 'No'}
					</p>
					<hr />
				</Col>
				<Col>
					<label>
						<b>Cycle</b>
					</label>
					<p style={{ textAlign: 'justify' }}>
						{course.cycle ? course.cycle.cycle : 'Course is obligatory'}
					</p>
					<hr />
				</Col>
			</Row>
			<Row className="mb-3">
				<label>
					<b>Description</b>
				</label>
				<p style={{ textAlign: 'justify' }}>
					{course.description
						? course.description
						: 'There is no course description available.'}
				</p>
			</Row>
			<hr />
			<Row className="mb-3">
				<Col xl="4" lg="4" md="4" sm="12" xs="12">
					<label>
						<b>Year</b>
					</label>
					<p style={{ textAlign: 'justify' }}>{course.year}</p>
					<hr />
				</Col>
				<Col xl="4" lg="4" md="4" sm="12" xs="12">
					<label>
						<b>Prerequisites</b>
					</label>
					<p
						style={{ textAlign: 'justify' }}
						className={
							course.hasPrerequisites ? 'text-warning' : 'text-success'
						}
					>
						{course.hasPrerequisites ? 'Yes' : 'No'}
					</p>
					<hr />
				</Col>
				<Col>
					<label>
						<b>Availability</b>
					</label>
					<p
						style={{ textAlign: 'justify' }}
						className={course.isActive ? 'text-success' : 'text-warning'}
					>
						{course.isActive ? 'Active' : 'Inactive'}
					</p>
					<hr />
				</Col>
			</Row>
			<Row>
				<Col xl="6" lg="6" md="12" sm="12" xs="12">
					<label>
						<b>ECTS</b>
					</label>
					<p style={{ textAlign: 'justify' }}>{course.ects}</p>
					<hr />
				</Col>
				<Col>
					<label>
						<b>Obligation</b>
					</label>
					<p
						style={{ textAlign: 'justify' }}
						className={course.isObligatory ? 'text-warning' : 'text-success'}
					>
						{course.isObligatory ? 'Obligatory' : 'Optional'}
					</p>
					{course.hasPrerequisites ? (
						<hr />
					) : (
						<hr className="d-none d-lg-block" />
					)}
				</Col>
			</Row>
			{course.hasPrerequisites
				? course.prerequisites.map((prerequisite, index) => (
						<div key={prerequisite._id}>
							<Badge color="info" className="mt-3 mb-3" pill>
								<b>Prerequisite {index + 1}</b>
							</Badge>
							<Row>
								<Col xl="6" lg="6" md="12" sm="12" xs="12">
									<label>
										<b>Prerequisite Course</b>
									</label>
									<p style={{ textAlign: 'justify' }}>
										{prerequisite.prerequisite.title}
									</p>
									<hr />
								</Col>
								<Col>
									<label>
										<b>Prerequisite Type</b>
									</label>
									<p
										style={{ textAlign: 'justify' }}
										className={
											prerequisite.prerequisiteType === PrerequisiteType.Hard
												? 'text-danger'
												: 'text-warning'
										}
									>
										{prerequisite.prerequisiteType}
									</p>
									<hr className="d-none d-lg-block" />
								</Col>
							</Row>
						</div>
				  ))
				: null}
		</>
	);
};

export default CourseCard;
