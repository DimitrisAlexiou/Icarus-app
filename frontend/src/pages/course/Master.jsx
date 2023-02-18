import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { getCourses, reset } from '../../features/courses/courseSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import CourseItem from '../../components/course/CourseItem';
import Notification from '../../components/boilerplate/Notification';
import Spinner from '../../components/boilerplate/Spinner';

export default function MasterCourses() {
	const { courses, isLoading, isSuccess } = useSelector((state) => state.courses);

	const dispatch = useDispatch();

	useEffect(() => {
		return () => {
			if (isSuccess) {
				dispatch(reset());
			}
		};
	}, [dispatch, isSuccess]);

	useEffect(() => {
		dispatch(getCourses());
	}, [dispatch]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			{courses.map((course) =>
				course.type === 'Master' ? (
					<>
						<Row className="mb-3">
							<Col md="6">
								<h1 className="h3 mb-3 text-gray-800 font-weight-bold">
									Master Courses !
								</h1>
							</Col>
							<Col className="mb-3 px-3 d-flex justify-content-end">
								<Link
									to="/course"
									className="btn btn-light-cornflower-blue btn-small align-self-center"
								>
									Back
								</Link>
							</Col>
						</Row>

						<Row>
							<Col sm="12" md="9" lg="4" className="g-4 mb-3">
								<CourseItem key={course._id} course={course} />
							</Col>
						</Row>
					</>
				) : (
					<Notification
						icon={<FontAwesomeIcon icon={faBook} />}
						message={'There are no master courses available right now !'}
						link={'/course'}
						linkMessage={'Back to Courses'}
					/>
				)
			)}
		</>
	);
}
