import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { Formik, Form } from 'formik';
import { TeachingSchema } from '../../schemas/Teaching';
import { Toast } from '../../constants/sweetAlertNotification';
import { getCourse } from '../../features/courses/courseSlice';
import courseService from '../../features/courses/courseService';
import TeachingForm from '../../components/course/TeachingForm';
import CancelButton from '../../components/buttons/CancelButton';
import SubmitButton from '../../components/buttons/SubmitButton';
import Spinner from '../../components/boilerplate/Spinner';

export default function NewTeaching() {
	const { isAuthenticated, isLoading } = useAuth0();

	const {
		course,
		isError,
		isLoading: courseIsLoading,
		message,
	} = useSelector((state) => state.courses);

	const initialValues = {
		labWeight: 0,
		theoryWeight: 0,
		theoryGrade: 0,
		labGrade: 0,
		theoryGradeThreshold: 0,
		labGradeThreshold: 0,
		books: [],
	};

	const { courseId } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onSubmit = async (formTeachingData) => {
		try {
			await courseService.createTeaching(formTeachingData);
			Toast.fire({
				title: 'Success',
				text: 'Teaching created successfully!',
				icon: 'success',
			});
			navigate('/course/' + courseId);
		} catch (error) {
			Toast.fire({
				title: 'Error while creating teaching for the course!',
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

	if (isLoading || courseIsLoading) {
		return <Spinner />;
	}

	return (
		isAuthenticated && (
			<>
				<Formik
					initialValues={initialValues}
					validationSchema={TeachingSchema}
					onSubmit={(formTeachingData) => {
						onSubmit(formTeachingData);
					}}
					validateOnMount
				>
					<div>
						<h1 className="h3 mb-5 text-gray-800 font-weight-bold">
							Create new Teaching for the {course.title} course !
						</h1>

						<div className="row justify-content-center">
							<div className="col-sm-12 col-md-11 col-lg-10 col-xl-8">
								<div className="card shadow mb-4">
									<div className="card-header py-3">
										<h6 className="m-0 font-weight-bold text-primary">
											Fill the form below to create a new teaching for the
											course
										</h6>
									</div>
									<div className="card-body">
										<Form name="newCourse">
											<TeachingForm initialValues={initialValues} />

											<div className="row">
												<CancelButton url={'/course/' + courseId} />
												<SubmitButton
													message={'Create Teaching'}
													disabled={isLoading}
												/>
											</div>
										</Form>
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
