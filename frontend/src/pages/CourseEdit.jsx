import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { getCourse } from '../features/courses/courseSlice';
import { Spinner, Button, Form } from 'reactstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import CourseCard from '../components/CourseCard';

const MySwal = withReactContent(Swal);
const Toast = MySwal.mixin({
	toast: true,
	position: 'top-right',
	iconColor: 'white',
	customClass: {
		popup: 'colored-toast',
	},
	showConfirmButton: false,
	timer: 1500,
	timerProgressBar: true,
});

export default function NewCourse() {
	// const { user, isAuthenticated, isLoading } = useAuth0();
	const { course, isError, isLoading, message } = useSelector(
		(state) => state.courses,
	);

	const dispatch = useDispatch();
	const { courseId } = useParams();

	useEffect(() => {
		if (isError) {
			Toast.fire({
				animation: 'true',
				title: 'Error!',
				text: message,
				icon: 'error',
			});
		}
		dispatch(getCourse(courseId));
	}, [dispatch, isError, message, courseId]);

	if (isLoading) {
		return (
			<Spinner color="primary" type="grow">
				Loading...
			</Spinner>
		);
	}

	return (
		// isAuthenticated && (
		// 	<>
		<div id="content-wrapper" className="d-flex flex-column">
			<div id="content">
				<div>
					<h1 className="h3 mb-5 text-gray-800 font-weight-bold">
						Edit {course.title} Course
					</h1>
					<div className="row justify-content-center">
						<div className="col-sm-12 col-md-10 col-lg-8 col-xl-6">
							<div className="card shadow mb-4">
								<div className="card-header py-3">
									<div class="row">
										<div class="col-6">
											<h6 className="m-0 font-weight-bold text-primary">
												Course Information
											</h6>
										</div>
									</div>
								</div>
								<div className="card-body">
									<CourseCard key={course._id} course={course} />
									<Link
										class="btn btn-secondary btn-user btn-block"
										to={`/course/${course._id}`}
									>
										Back
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		// 	</>
		// )
	);
}
