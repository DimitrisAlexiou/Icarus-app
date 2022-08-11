import { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { getCourse, deleteCourse } from '../../features/courses/courseSlice';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Toast } from '../../constants/sweetAlertNotification';
import courseService from '../../features/courses/courseService';
import CourseCard from '../../components/course/CourseCard';
import BackButton from '../../components/buttons/BackButton';
import Spinner from '../../components/boilerplate/Spinner';

export default function Course() {
	const { isAuthenticated, isLoading } = useAuth0();

	const {
		course,
		isError,
		isLoading: courseIsLoading,
		message,
	} = useSelector((state) => state.courses);

	const { courseId } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const deleteCourse = async () => {
		try {
			await courseService.deleteCourse(courseId);
			Toast.fire({
				title: 'Success',
				text: 'Course deleted successfully!',
				icon: 'success',
			});
			navigate('/course');
		} catch (error) {
			Toast.fire({
				title: 'Error while deleting course!',
				text: error.response.data,
				icon: 'error',
			});
		}
	};

	const activateCourse = async () => {
		try {
			await courseService.activateCourse(courseId);
			Toast.fire({
				title: 'Success',
				text: 'Course activated successfully!',
				icon: 'success',
			});
			navigate('/course/' + courseId + '/teaching');
		} catch (error) {
			Toast.fire({
				title: 'Error while activating course!',
				text: error.response.data,
				icon: 'error',
			});
		}
	};

	useEffect(() => {
		if (isError) {
			Toast.fire({
				title: 'Error !',
				text: isError.response.data,
				icon: 'error',
			});
		}
		dispatch(getCourse(courseId));
	}, [dispatch, isError, message, courseId]);

	// const deleteCourse = () => {
	//  dispatch(deleteCourse(courseId));
	//  Toast.fire({
	//      title: 'Success',
	//      text: 'Course deleted successfully!',
	//      icon: 'success',
	//  });
	//  navigate('/course');
	// };

	if (isLoading || courseIsLoading) {
		return <Spinner />;
	}

	return (
		isAuthenticated && (
			<>
				<div id="content-wrapper" className="d-flex flex-column">
					<div id="content">
						<div>
							<h1 className="h3 mb-5 text-gray-800 font-weight-bold">
								{course.title}
							</h1>
							<div className="row justify-content-center">
								<div className="col-sm-12 col-md-10 col-lg-8 col-xl-6">
									<div className="card shadow mb-4">
										<div className="card-header py-3">
											<div className="row">
												<div className="col-6">
													<h6 className="m-0 font-weight-bold text-primary">
														Course Information
													</h6>
												</div>
												<div className="col-6 d-flex justify-content-end">
													<div className="px-2">
														<Button
															className="btn btn-light btn-small"
															style={{ fontWeight: 500, fontSize: 15 }}
															onClick={activateCourse}
														>
															<FontAwesomeIcon icon={faCheck} /> Activate
														</Button>
													</div>
													<div className="px-2">
														<Link
															to={`/course/${course._id}/edit`}
															className="btn btn-light btn-small"
															style={{ fontWeight: 500, fontSize: 15 }}
														>
															<FontAwesomeIcon icon={faEdit} />
															<span className="ml-1">Update</span>
														</Link>
													</div>
													<div className="px-2">
														<Button
															className="btn btn-light btn-small"
															style={{ fontWeight: 500, fontSize: 15 }}
															onClick={deleteCourse}
														>
															<FontAwesomeIcon icon={faTrashAlt} /> Delete
														</Button>
													</div>
												</div>
											</div>
										</div>
										<div className="card-body">
											<CourseCard key={course._id} course={course} />
											<BackButton url={'/course'} />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		)
	);
}
