import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { Formik, Form } from 'formik';
import { CourseSchema } from '../../schemas/Course';
import { Toast } from '../../constants/sweetAlertNotification';
import courseService from '../../features/courses/courseService';
import CourseForm from '../../components/course/CourseForm';
import SubmitButton from '../../components/buttons/SubmitButton';
import Spinner from '../../components/boilerplate/Spinner';

export default function NewCourse() {
	// const { isAuthenticated, isLoading } = useAuth0();

	const initialValues = {
		courseId: '',
		title: '',
		type: '',
		description: '',
		prerequisites: '',
		semester: '',
		year: '',
		cycle: '',
		ects: 0,
		hasPrerequisites: false,
		hasLab: false,
		isObligatory: true,
		isActive: false,
		teaching: null,
	};

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onSubmit = async (formCourseData) => {
		formCourseData.preventDefault();
		try {
			await courseService.createCourse(formCourseData);
			Toast.fire({
				title: 'Success',
				text: 'Course created successfully!',
				icon: 'success',
			});
			navigate('/course');
		} catch (error) {
			Toast.fire({
				title: 'Error while creating course!',
				text: error.response.data,
				icon: 'error',
			});
		}
	};

	// if (isLoading) {
	// 	return <Spinner />;
	// }

	return (
		// isAuthenticated && (
		<>
			<div className="row mb-3">
				<div className="col-6">
					<h1 className="h3 mb-4 text-gray-800 font-weight-bold">Create new Course !</h1>
				</div>
				<div className="col-6 mb-4 px-3 d-flex justify-content-end">
					<Link to="/course" className="btn btn-orange btn-small align-self-center">
						Cancel
					</Link>
				</div>
			</div>

			<div className="row justify-content-center">
				<div className="col-sm-12 col-md-11 col-lg-10 col-xl-9">
					<div className="card shadow mb-4">
						<div className="card-header py-3">
							<h6 className="m-0 font-weight-bold text-primary">
								Fill the form below to create a new course
							</h6>
						</div>
						<div className="card-body">
							<Formik
								initialValues={initialValues}
								validationSchema={CourseSchema}
								onSubmit={(formCourseData) => {
									onSubmit(formCourseData);
								}}
								validateOnMount
							>
								{(props) => {
									const {
										values,
										dirty,
										isSubmitting,
										handleChange,
										handleSubmit,
										handleReset,
										setFieldValue,
									} = props;
									return (
										<Form name="NewCourse">
											<CourseForm
												initialValues={initialValues}
												handleChange={handleChange}
												values={values}
												setFieldValue={setFieldValue}
												handleReset={handleReset}
											/>

											<div className="row">
												<div className="col-6 mb-3 d-flex justify-content-start">
													<Button
														onClick={handleReset}
														disabled={!dirty || isSubmitting}
													>
														Clear
													</Button>
												</div>
												<SubmitButton
													message={'Create Course'}
													disabled={isSubmitting}
												/>
											</div>
										</Form>
									);
								}}
							</Formik>
						</div>
					</div>
				</div>
			</div>
		</>
		// )
	);
}
