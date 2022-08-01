import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import { useAuth0 } from '@auth0/auth0-react';
import { getCourse, reset } from '../../features/courses/courseSlice';
import { Spinner, Button } from 'reactstrap';
import { Toast } from '../../constants/sweetAlertNotification';
import { CourseSchema } from '../../schemas/Course';
import CourseForm from '../../components/course/CourseForm';
import courseService from '../../features/courses/courseService';
import { FormGroup, Label, Row, Col } from 'reactstrap';
import { Field, ErrorMessage } from 'formik';
import FormErrorMessage from '../../components/FormErrorMessage';
import CancelButton from '../../components/buttons/CancelButton';
import SubmitButton from '../../components/buttons/SubmitButton';

export default function CourseEdit() {
	const { user, isAuthenticated } = useAuth0;
	const { course, isSuccess, isError, isLoading, message } = useSelector(
		(state) => state.courses,
	);
	const { courseId } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// const existingCourse = course.map((course) => course._id === courseId._id);
	// const {
	// 	cid,
	// 	title,
	// 	type,
	// 	description,
	// 	semester,
	// 	year,
	// 	cycle,
	// 	ects,
	// 	hasLab,
	// 	isObligatory,
	// 	isActive,
	// } = existingCourse[0];

	// const initialValues = {
	// 	cid,
	// 	title,
	// 	type,
	// 	description,
	// 	semester,
	// 	year,
	// 	cycle,
	// 	ects,
	// 	hasLab,
	// 	isObligatory,
	// 	isActive,
	// };

	const [courseData, setCourseData] = useState([]);

	useEffect(() => {
		const course = dispatch(getCourse(courseId));
		setCourseData(course);
	}, [dispatch, courseId]);

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

	const onSubmit = async (formCourseData) => {
		try {
			await courseService.updateCourse(formCourseData);
			Toast.fire({
				title: 'Success',
				text: 'Course updated successfully!',
				icon: 'success',
			});
			navigate('/course/' + courseId);
		} catch (error) {
			Toast.fire({
				title: 'Error while updating course!',
				text: error.response.data,
				icon: 'error',
			});
		}
	};

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
		<Formik
			// initialValues={initialValues}
			validationSchema={CourseSchema}
			onSubmit={(formCourseData) => {
				onSubmit(formCourseData);
			}}
			validateOnMount
		>
			<div id="content-wrapper" className="d-flex flex-column">
				<div id="content">
					<div>
						<h1 className="h3 mb-5 text-gray-800 font-weight-bold">
							Update {course.title} Course
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
										</div>
									</div>
									<div className="card-body">
										<Form>
											<CourseForm courseData />

											<div className="row">
												<CancelButton url={`/course/${courseId}`} />
												<SubmitButton message={'Update Course'} />
											</div>
										</Form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Formik>
		// 	</>
		// )
	);
}
