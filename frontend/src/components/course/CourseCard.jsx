import { useState, useEffect } from 'react';
import { Row, Col, Badge } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getCycles } from '../../features/admin/cyclesSlice';
import { Toast } from '../../constants/sweetAlertNotification';

const CourseCard = ({ course }) => {
	const { cycles, isError, message } = useSelector((state) => state.cycles);

	const [cycle, setCycle] = useState(null);
	const [semester, setSemester] = useState(null);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCycles());
		if (isError) {
			Toast.fire({
				title: 'Something went wrong!',
				text: message,
				icon: 'error',
			});
		}
	}, [dispatch, isError, message]);

	useEffect(() => {
		if (course.cycle) {
			const cycle = cycles.names.find((c) => c._id === course.cycle);
			if (cycle) {
				setCycle(cycle.cycle);
			}
		}
		if (course.semester) {
			setSemester(course.semester.type);
		}
	}, [course.cycle, course.semester, cycles.names]);

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
					<p style={{ textAlign: 'justify' }}>{semester ? semester : 'Not available'}</p>
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
					<p style={{ textAlign: 'justify' }}>{cycle ? cycle : 'Course is obligatory'}</p>
					<hr />
				</Col>
			</Row>
			<Row className="mb-3">
				<Col lg="9">
					<label>
						<b>Course Description</b>
					</label>
					<p style={{ textAlign: 'justify' }}>
						{course.description
							? course.description
							: 'There is no course description available.'}
					</p>
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
			<Row>
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
					{course.hasPrerequisites ? <hr /> : <hr className="d-none d-lg-block" />}
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
									<p style={{ textAlign: 'justify' }}>
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
