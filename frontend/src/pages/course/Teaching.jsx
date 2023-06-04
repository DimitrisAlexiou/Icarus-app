import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { getCourse } from '../../features/courses/courseSlice';
import TeachingForm from '../../components/course/TeachingForm';
import BackButton from '../../components/buttons/BackButton';
import Spinner from '../../components/boilerplate/Spinner';

export default function NewTeaching() {
	const { course, isLoading } = useSelector((state) => state.courses);

	const { courseId } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCourse(courseId));
	}, [dispatch, courseId]);

	if (isLoading) return <Spinner />;

	return (
		<>
			<Row className="mb-5 animated--grow-in">
				<Col sm="6" xs="6" md="6">
					<h1 className="h3 text-gray-800 font-weight-bold">{course.title} Teaching</h1>
				</Col>
				<Col className="d-flex justify-content-end">
					<BackButton url={'/course/' + courseId} />
				</Col>
			</Row>

			<Row className="justify-content-center animated--grow-in">
				<Col sm="12" md="11" lg="10" xl="8">
					<div className="card shadow mb-4">
						<div className="card-header py-3">
							<h6 className="m-0 font-weight-bold text-primary">
								Fill the form below to configure the teaching for the course
							</h6>
						</div>
						<div className="card-body">
							<TeachingForm courseId={courseId} />
						</div>
					</div>
				</Col>
			</Row>
		</>
	);
}
