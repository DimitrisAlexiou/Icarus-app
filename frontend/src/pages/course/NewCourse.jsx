import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Formik, Form } from 'formik';
import { CourseSchema } from '../../schemas/Course';
import { Spinner } from 'reactstrap';
import { Toast } from '../../constants/sweetAlertNotification';
import courseService from '../../features/courses/courseService';
import CourseForm from '../../components/course/CourseForm';
import CancelButton from '../../components/buttons/CancelButton';
import SubmitButton from '../../components/buttons/SubmitButton';

export default function NewCourse() {
	const { isAuthenticated, isLoading } = useAuth0();
	const initialValues = {
		cid: '',
		title: '',
		type: '',
		description: '',
		semester: '',
		year: '',
		cycle: '',
		ects: 0,
		hasLab: false,
		isObligatory: false,
		isActive: false,
	};

	const navigate = useNavigate();

	const onSubmit = async (formCourseData) => {
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
				<Formik
					initialValues={initialValues}
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
									Create new Course !
								</h1>
								<div className="row justify-content-center">
									<div className="col-sm-12 col-md-11 col-lg-10 col-xl-8">
										<div className="card shadow mb-4">
											<div className="card-header py-3">
												<h6 className="m-0 font-weight-bold text-primary">
													Fill the form below to create a new course
												</h6>
											</div>
											<div className="card-body">
												<Form>
													<CourseForm initialValues={initialValues} />

													<div className="row">
														<CancelButton url={'/course'} />
														<SubmitButton message={'Create Course'} />
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
			</>
		)
	);
}
