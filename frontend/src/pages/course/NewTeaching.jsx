import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { Formik, Form } from 'formik';
import { TeachingSchema } from '../../schemas/course/Teaching';
import { Toast } from '../../constants/sweetAlertNotification';
import { getCourse } from '../../features/courses/courseSlice';
import courseService from '../../features/courses/courseService';
import TeachingForm from '../../components/course/TeachingForm';
import CancelButton from '../../components/buttons/CancelButton';
import SubmitButton from '../../components/buttons/SubmitButton';
import Spinner from '../../components/boilerplate/Spinner';

export default function NewTeaching() {
	const { course, isError, isLoading, message } = useSelector((state) => state.courses);

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

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<h1 className="h3 mb-5 text-gray-800 font-weight-bold">
				Create new Teaching for the {course.title} course !
			</h1>

			<Row className="justify-content-center">
				<Col sm="12" md="11" lg="10" xl="8">
					<div className="card shadow mb-4">
						<div className="card-header py-3">
							<h6 className="m-0 font-weight-bold text-primary">
								Fill the form below to create a new teaching for the course
							</h6>
						</div>
						<div className="card-body">
							<Formik
								initialValues={{
									labWeight: 0,
									theoryWeight: 0,
									theoryGrade: 0,
									labGrade: 0,
									theoryGradeThreshold: 0,
									labGradeThreshold: 0,
									books: [],
								}}
								validationSchema={TeachingSchema}
								onSubmit={(formTeachingData) => {
									onSubmit(formTeachingData);
								}}
								validateOnMount
							>
								<Form>
									<TeachingForm />

									<Row>
										<Col>
											<CancelButton url={'/course/' + courseId} />
										</Col>
										<Col className="text-right px-0">
											<SubmitButton
												color={'primary'}
												message={'Create Teaching'}
												disabled={isLoading}
											/>
										</Col>
									</Row>
								</Form>
							</Formik>
						</div>
					</div>
				</Col>
			</Row>
		</>
	);
}
