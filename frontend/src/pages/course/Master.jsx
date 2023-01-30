import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { getCourses, reset } from '../../features/courses/courseSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import CourseItem from '../../components/course/CourseItem';
import Notification from '../../components/boilerplate/Notification';
import Spinner from '../../components/boilerplate/Spinner';

export default function MasterCourses() {
	// const { isAuthenticated, isLoading } = useAuth0();

	const {
		courses,
		isLoading: courseIsLoading,
		isSuccess,
	} = useSelector((state) => state.courses);

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

	// if (isLoading || courseIsLoading) {
	// 	return <Spinner />;
	// }

	return (
		// isAuthenticated && (
		<>
			{courses.map((course) =>
				course.type === 'Master' ? (
					<div>
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
							<div className="col-sm-12 col-md-9 col-lg-4 g-4 mb-3">
								<Col>
									<CourseItem key={course._id} course={course} />
								</Col>
							</div>
						</Row>
					</div>
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
		// )
	);
}
