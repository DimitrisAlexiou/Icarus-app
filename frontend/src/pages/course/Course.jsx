import { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCourse, deleteCourse, reset } from '../../features/courses/courseSlice';
import { Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Toast } from '../../constants/sweetAlertNotification';
import courseService from '../../features/courses/courseService';
import CourseCard from '../../components/course/CourseCard';
import BackButton from '../../components/buttons/BackButton';
import Spinner from '../../components/boilerplate/Spinner';

export default function Course() {
	const { course, isError, isSuccess, isLoading, message } = useSelector(
		(state) => state.courses
	);

	const { courseId } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// const deleteCourse = async () => {
	// 	try {
	// 		await courseService.deleteCourse(courseId);
	// 		Toast.fire({
	// 			title: 'Success',
	// 			text: 'Course deleted successfully!',
	// 			icon: 'success',
	// 		});
	// 		navigate('/course');
	// 	} catch (error) {
	// 		Toast.fire({
	// 			title: 'Error while deleting course!',
	// 			text: error.response.data,
	// 			icon: 'error',
	// 		});
	// 	}
	// };

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
		return () => {
			if (isSuccess) {
				dispatch(reset());
			}
		};
	}, [dispatch, isSuccess]);

	useEffect(() => {
		if (isError) {
			Toast.fire({
				title: 'Something went wrong !',
				text: isError.response.data,
				icon: 'error',
			});
		}
		dispatch(getCourse(courseId));
	}, [dispatch, isError, message, courseId]);

	const deleteCourse = () => {
		dispatch(deleteCourse(courseId));
		Toast.fire({
			title: 'Success',
			text: 'Course deleted successfully!',
			icon: 'success',
		});
		navigate('/course');
	};

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<h1 className="h3 mb-5 text-gray-800 font-weight-bold">{course.title}</h1>

			<Row className="justify-content-center">
				<Col xs="12" sm="12" md="12" lg="10" xl="10">
					<div className="card shadow mb-4">
						<div className="card-header py-3">
							<Row>
								<Col md="6" className="mb-3">
									<h6 className="m-0 font-weight-bold text-primary">
										Course Information
									</h6>
								</Col>
								<Col className="mb-2" xs="12" sm="12" md="12" lg="2" xl="2">
									<Button
										className="btn btn-light btn-small"
										style={{ fontWeight: 500, fontSize: 15 }}
										onClick={activateCourse}
									>
										<FontAwesomeIcon icon={faCheck} /> Activate
									</Button>
								</Col>
								<Col className="mb-2" xs="12" sm="12" md="12" lg="2" xl="2">
									<Link
										to={`/course/${course._id}/edit`}
										className="btn btn-light btn-small"
										style={{ fontWeight: 500, fontSize: 15 }}
									>
										<FontAwesomeIcon icon={faEdit} /> Update
									</Link>
								</Col>
								<Col className="mb-2" xs="12" sm="12" md="12" lg="2" xl="2">
									<Button
										className="btn btn-light btn-small"
										style={{ fontWeight: 500, fontSize: 15 }}
										onClick={deleteCourse}
									>
										<FontAwesomeIcon icon={faTrashAlt} /> Delete
									</Button>
								</Col>
							</Row>
						</div>
						<div className="card-body">
							<CourseCard key={course._id} course={course} />
							<BackButton url={'/course/undergraduate'} />
						</div>
					</div>
				</Col>
			</Row>
		</>
	);
}
