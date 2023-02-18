import { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';

const CourseCard = ({ course }) => {
	const [cycle, setCycle] = useState(null);
	const [semester, setSemester] = useState(null);

	useEffect(() => {
		if (course.cycle) {
			setCycle(course.cycle.cycle);
		}
		if (course.semester) {
			setSemester(course.semester.type);
		}
	}, [course.cycle, course.semester]);

	return (
		<>
			<Row className="mb-3">
				<Col xl="6" lg="6" md="12" sm="12" xs="12">
					<label>
						<b>Course ID</b>
					</label>
					<p style={{ textAlign: 'justify' }}>{course.courseId}</p>
					<hr />
				</Col>
				<Col>
					<label>
						<b>Course Title</b>
					</label>
					<p style={{ textAlign: 'justify' }}>{course.title}</p>
					<hr />
				</Col>
			</Row>
			<Row className="mb-3">
				<Col xl="6" lg="6" md="12" sm="12" xs="12">
					<label>
						<b>Course Type</b>
					</label>
					<p style={{ textAlign: 'justify' }}>{course.type}</p>
					<hr />
				</Col>
				<Col>
					<label>
						<b>Course Semester</b>
					</label>
					<p style={{ textAlign: 'justify' }}>{semester ? semester : 'not available'}</p>
					<hr />
				</Col>
			</Row>
			<Row className="mb-3">
				<Col xl="6" lg="6" md="12" sm="12" xs="12">
					<label>
						<b>Course Year</b>
					</label>
					<p style={{ textAlign: 'justify' }}>{course.year}</p>
					<hr />
				</Col>
				<Col>
					<label>
						<b>Course Cycle</b>
					</label>
					<p style={{ textAlign: 'justify' }}>{cycle ? cycle : 'course is obligatory'}</p>
					<hr />
				</Col>
			</Row>
			<Row className="mb-3">
				<Col md="9">
					<label>
						<b>Course Description</b>
					</label>
					<p style={{ textAlign: 'justify' }}>{course.description}</p>
					<hr />
				</Col>
				<Col>
					<label>
						<b>Course Activity</b>
					</label>
					<p style={{ textAlign: 'justify' }}>
						{course.isActive ? 'Active' : 'Inactive'}
					</p>
					<hr />
				</Col>
			</Row>
			<Row className="mb-3">
				<Col xl="6" lg="6" md="12" sm="12" xs="12">
					<label>
						<b>Course ECTS</b>
					</label>
					<p style={{ textAlign: 'justify' }}>{course.ects}</p>
					<hr />
				</Col>
				<Col>
					<label>
						<b>Course Prerequisites</b>
					</label>
					<p style={{ textAlign: 'justify' }}>{course.hasPrerequisites ? 'Yes' : 'No'}</p>
					<hr />
				</Col>
			</Row>
			<Row className="mb-3">
				<Col xl="6" lg="6" md="12" sm="12" xs="12">
					<label>
						<b>Course Lab</b>
					</label>
					<p style={{ textAlign: 'justify' }}>{course.hasLab ? 'Yes' : 'No'}</p>
					<hr />
				</Col>
				<Col>
					<label>
						<b>Course Obligation</b>
					</label>
					<p style={{ textAlign: 'justify' }}>
						{course.isObligatory ? 'Obligatory' : 'Optional'}
					</p>
					<hr />
				</Col>
			</Row>
		</>
	);
};

export default CourseCard;
