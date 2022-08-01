import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { getCourses, reset } from '../../features/courses/courseSlice';
import { Spinner } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import CourseItem from '../../components/course/CourseItem';
import Notification from '../../components/boilerplate/Notification';

export default function Courses() {
	const { isAuthenticated } = useAuth0();
	const { courses, isLoading, isSuccess } = useSelector(
		(state) => state.courses,
	);

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
		return (
			<Spinner color="primary" type="grow">
				Loading...
			</Spinner>
		);
	}

	return (
		isAuthenticated && (
			<>
				{courses.map((course) =>
					course.type === 'Master' ? (
						<div id="content-wrapper" className="d-flex flex-column">
							<div id="content">
								<div className="row mb-3">
									<div className="col-6">
										<h1 className="h3 mb-3 text-gray-800 font-weight-bold">
											Master Courses !
										</h1>
									</div>
									<div className="col-6 mb-3 px-3 d-flex justify-content-end">
										<Link
											to="/course"
											className="btn btn-light-cornflower-blue btn-small align-self-center"
										>
											Back
										</Link>
									</div>
								</div>

								<div className="row">
									<div className="col-sm-12 col-md-9 col-lg-4 g-4 mb-3">
										<div className="col">
											<CourseItem key={course._id} course={course} />
										</div>
									</div>
								</div>
							</div>
						</div>
					) : (
						<Notification
							icon={<FontAwesomeIcon icon={faBook} />}
							message={'There are no master courses available right now !'}
							link={'/course'}
							linkMessage={'Back to Courses'}
						/>
					),
				)}
			</>
		)
	);
}
