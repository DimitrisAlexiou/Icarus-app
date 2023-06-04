import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCourse } from '../../features/courses/courseSlice';
import { Row, Col } from 'reactstrap';
import CourseCard from '../../components/course/CourseCard';
import BackButton from '../../components/buttons/BackButton';
import Spinner from '../../components/boilerplate/Spinner';

export default function Course() {
	const { course, isLoading } = useSelector((state) => state.courses);

	const { courseId } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCourse(courseId));
	}, [dispatch, courseId]);

	if (isLoading) return <Spinner />;

	return (
		<>
			<Row className="mb-4 animated--grow-in">
				<Col>
					<h1 className="h3 text-gray-800 font-weight-bold animated--grow-in">
						{course.title}
					</h1>
				</Col>
				<Col className="text-right px-3">
					<BackButton url={'/course/undergraduate'} />
				</Col>
			</Row>

			<Row className="justify-content-center animated--grow-in">
				<Col xs="12" sm="12" md="12" lg="10" xl="10">
					<div className="card shadow mb-4">
						<div className="card-header py-3">
							<Row>
								<Col md="6">
									<h6 className="m-0 font-weight-bold text-primary">
										Course Information
									</h6>
								</Col>
							</Row>
						</div>
						<div className="card-body">
							<CourseCard key={course._id} course={course} />
						</div>
					</div>
				</Col>
			</Row>
		</>
	);
}
