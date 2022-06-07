import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { updateCourse, reset } from '../features/courses/courseSlice';
import { Spinner, FormGroup, Input, Button, Form, Label } from 'reactstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import CourseForm from '../components/CourseForm';

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

export default function CourseEdit() {
	// const { user, isAuthenticated, isLoading } = useAuth0();
	const { course, isSuccess, isError, message } = useSelector(
		(state) => state.courses,
	);

	const [formCourseData, setFormData] = useState({
		cid: '',
		title: '',
		type: '',
		description: '',
		// description: 'Please enter a description of the course..',
		semester: '',
		year: '',
		cycle: '',
		ects: 0,
		hasLab: false,
		isObligatory: false,
		isActive: false,
	});

	const [validated, setValidated] = useState(false);
	const dispatch = useDispatch();
	// const navigate = useNavigate();
	const { courseId } = useParams();

	// useEffect(() => {
	// 	if (isError) {
	// 		Toast.fire({
	// 			animation: 'true',
	// 			title: 'Error!',
	// 			text: message,
	// 			icon: 'error',
	// 		});
	// 	}
	// 	dispatch(updateCourse(courseId, formCourseData));
	// }, [dispatch, isError, message, courseId, formCourseData]);

	// useEffect(() => {
	// 	if (isError) {
	// 		Toast.fire({
	// 			animation: 'true',
	// 			title: 'Error!',
	// 			text: message,
	// 			icon: 'error',
	// 		});
	// 	}
	// 	if (isSuccess) {
	// 		Toast.fire({
	// 			animation: 'true',
	// 			title: 'Success!',
	// 			text: message,
	// 			icon: 'success',
	// 		});
	// 		dispatch(reset());
	// 		navigate('/course/' + courseId);
	// 	}
	// 	dispatch(reset());
	// }, [
	// 	dispatch,
	// 	isError,
	// 	isSuccess,
	// 	message,
	// 	courseId,
	// 	formCourseData,
	// 	navigate,
	// ]);

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = (e) => {
		const form = e.target;
		if (form.checkValidity() === false) {
			e.preventDefault();
			e.stopPropagation();
		}
		setValidated(true);
		dispatch(updateCourse(courseId, formCourseData));
		setFormData(formCourseData);
	};

	// if (isLoading) {
	// 	return (
	// 		<Spinner color="primary" type="grow">
	// 			Loading...
	// 		</Spinner>
	// 	);
	// }

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
									<Form
										className="user validated-form"
										validated={validated}
										onSubmit={onSubmit}
										noValidate
									>
										<CourseForm onChange={onChange} formCourseData />

										<FormGroup className="mx-1 mb-3" check>
											<Input
												type="checkbox"
												id="isActive"
												name="isActive"
												value={formCourseData.isActive}
												// onChangeCheckBox={checked ? 'true' : 'false'}
												// ={onChangeCheckBox}
												// onChange={onChange}
												required
											/>
											<Label for="isActive" className="text-gray-500">
												Course Activity
											</Label>
										</FormGroup>

										<div className="form-group row">
											<div className="col-sm-6 mb-3 mb-sm-0">
												<Link
													className="btn btn-secondary btn-block"
													to={`/course/${course._id}`}
												>
													Cancel
												</Link>
											</div>
											<div className="col-sm-6 mb-3 mb-sm-0 text-right">
												<Button
													className="btn btn-primary btn-block"
													type="submit"
													color="primary"
												>
													Update Course
												</Button>
											</div>
										</div>
									</Form>
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
