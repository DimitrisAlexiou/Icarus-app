import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { getCourses } from '../../features/courses/courseSlice';
import { getCycles } from '../../features/admin/cyclesSlice';
import { getSemesters } from '../../features/admin/semesterSlice';
import CourseForm from '../../components/course/forms/CourseForm';
import BackButton from '../../components/buttons/BackButton';
import Spinner from '../../components/boilerplate/Spinner';

export default function NewCourse() {
	const { courses, isLoading: coursesIsLoading } = useSelector((state) => state.courses);
	const { cycles, isLoading: cyclesIsLoading } = useSelector((state) => state.cycles);
	const { semesters, isLoading: semestersIsLoading } = useSelector((state) => state.semesters);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCourses());
		dispatch(getCycles());
		dispatch(getSemesters());
	}, [dispatch]);

	return (
		<>
			<Row className="mb-4 animated--grow-in">
				<Col sm="6" xs="9" md="6">
					<h3 className="text-gray-800 font-weight-bold">Create Course</h3>
				</Col>
				<Col className="d-flex justify-content-end">
					<BackButton url={'/course'} />
				</Col>
			</Row>

			<Row className="justify-content-center animated--grow-in">
				<Col lg="9">
					<div className="card shadow mb-4">
						<div className="card-header py-3">
							<h6 className="m-0 font-weight-bold text-primary">
								Fill the form below to create a new course
							</h6>
						</div>
						<div className="card-body">
							{coursesIsLoading || cyclesIsLoading || semestersIsLoading ? (
								<Spinner card />
							) : (
								<CourseForm
									courses={courses}
									cycles={cycles}
									semesters={semesters}
								/>
							)}
						</div>
					</div>
				</Col>
			</Row>
		</>
	);
}
