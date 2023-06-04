import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { Toast } from '../../constants/sweetAlertNotification';
import { getCourses } from '../../features/courses/courseSlice';
import { getCycles } from '../../features/admin/cyclesSlice';
import { getSemesters } from '../../features/admin/semesterSlice';
import CourseForm from '../../components/course/CourseForm';
import BackButton from '../../components/buttons/BackButton';
import Spinner from '../../components/boilerplate/Spinner';

export default function NewCourse() {
	const { courses, isLoading: coursesIsLoading } = useSelector((state) => state.courses);
	const {
		cycles,
		isLoading: cyclesIsLoading,
		isError: cyclesIsError,
		message: cyclesMessage,
	} = useSelector((state) => state.cycles);
	const {
		semesters,
		isLoading: semestersIsLoading,
		isError: semestersIsError,
		message: semestersMessage,
	} = useSelector((state) => state.semesters);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCourses());
		dispatch(getCycles());
		dispatch(getSemesters());

		if (cyclesIsError) {
			Toast.fire({
				title: 'Something went wrong!',
				text: cyclesMessage,
				icon: 'error',
			});
		} else if (semestersIsError) {
			Toast.fire({
				title: 'Something went wrong!',
				text: semestersMessage,
				icon: 'error',
			});
		}
	}, [dispatch, cyclesIsError, semestersIsError, cyclesMessage, semestersMessage]);

	if (coursesIsLoading || cyclesIsLoading || semestersIsLoading) return <Spinner />;

	return (
		<>
			<Row className="mb-5 animated--grow-in">
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
							<CourseForm courses={courses} cycles={cycles} semesters={semesters} />
						</div>
					</div>
				</Col>
			</Row>
		</>
	);
}
