import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';

const CourseCard = ({ course }) => {
	return (
		<>
			<Row className="mb-3">
				<Col md="6">
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
				<Col md="6">
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
					{/* <p style={{ textAlign: 'justify' }}>{course.semester.type}</p> */}
					<hr />
				</Col>
			</Row>
			<Row className="mb-3">
				<Col md="6">
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
					{/* <p style={{ textAlign: 'justify' }}>{course.cycle.cycle}</p> */}
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
				<Col md="6">
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
				<Col md="6">
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

// CourseCard.propTypes = {
// 	courseId: PropTypes.string.isRequired,
// 	title: PropTypes.string.isRequired,
// 	type: PropTypes.string.isRequired,
// 	description: PropTypes.string.isRequired,
// 	semester: PropTypes.object.isRequired,
// 	year: PropTypes.string.isRequired,
// 	cycle: PropTypes.object.isRequired,
// 	ects: PropTypes.number.isRequired,
// 	isActive: PropTypes.bool.isRequired,
// 	hasLab: PropTypes.bool.isRequired,
// 	isObligatory: PropTypes.bool.isRequired,
// };

// CourseCard.defaultProps = {
// 	courseId: 'Course ID is missing',
// 	title: 'Course title is missing',
// 	type: 'Course type is missing',
// 	description: 'Course description is missing',
// 	semester: 'Course semester is missing',
// 	year: 'Course year is missing',
// 	cycle: 'Course cycle is missing',
// 	ects: 'Course ECTS is missing',
// 	isActive: 'Course active status is missing',
// 	hasLab: 'Course lab status is missing',
// 	isObligatory: 'Course obligation status is missing',
// };

export default CourseCard;
