import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Row, Col, Button } from 'reactstrap';
import { Formik, Form } from 'formik';
import { CourseSchema } from '../../schemas/course/Course';
import { Toast } from '../../constants/sweetAlertNotification';
import { createCourse, getCourses, reset } from '../../features/courses/courseSlice';
import { getCycles } from '../../features/admin/cyclesSlice';
import CourseForm from '../../components/course/CourseForm';
import SubmitButton from '../../components/buttons/SubmitButton';
import Spinner from '../../components/boilerplate/Spinner';

export default function NewCourse() {
	const { courses, isLoading, isError, message } = useSelector((state) => state.courses);
	const { cycles, isLoading: cyclesIsLoading } = useSelector((state) => state.cycles);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (isError) {
			Toast.fire({
				title: 'Something went wrong!',
				text: message,
				icon: 'error',
			});
		}
		dispatch(reset());
	}, [dispatch, isError, message]);

	useEffect(() => {
		dispatch(getCourses());
		dispatch(getCycles());
	}, [dispatch]);

	if (isLoading || cyclesIsLoading) {
		return <Spinner />;
	}

	return (
		<>
			<Row className="mb-5">
				<Col md="6">
					<h1 className="h3 text-gray-800 font-weight-bold">Create new Course !</h1>
				</Col>
				<Col className="px-3 d-flex justify-content-end">
					<Link to="/course" className="btn btn-orange btn-small align-self-center">
						Cancel
					</Link>
				</Col>
			</Row>

			<Row className="justify-content-center">
				<Col>
					<div className="card shadow mb-4">
						<div className="card-header py-3">
							<h6 className="m-0 font-weight-bold text-primary">
								Fill the form below to create a new course
							</h6>
						</div>
						<div className="card-body">
							<Formik
								initialValues={{
									courseId: '',
									title: '',
									type: '',
									isObligatory: true,
									hasPrerequisites: false,
									hasLab: false,
									description: '',
									semester: '',
									ects: 0,
									year: '',
									cycle: '',
									prerequisites: [],
								}}
								validationSchema={CourseSchema}
								onSubmit={(values, { setSubmitting }) => {
									const course = {
										course: {
											courseId: values.courseId,
											title: values.title,
											type: values.type,
											isObligatory: values.isObligatory,
											hasPrerequisites: values.hasPrerequisites,
											hasLab: values.hasLab,
											description: values.description,
											semester: values.semester,
											ects: values.ects,
											year: values.year,
											cycle: values.cycle,
											prerequisites: values.prerequisites,
										},
									};
									dispatch(createCourse(course));
									Toast.fire({
										title: 'Success',
										text: 'Course created successfully!',
										icon: 'success',
									});
									navigate('/course');
									setSubmitting(false);
								}}
								validateOnMount
							>
								{({ isSubmitting, dirty, values, handleReset, setFieldValue }) => (
									<Form>
										<CourseForm
											courses={courses}
											cycles={cycles}
											values={values}
											setFieldValue={setFieldValue}
										/>

										<Row>
											<Col>
												<Button
													onClick={handleReset}
													disabled={!dirty || isSubmitting}
												>
													Clear
												</Button>
											</Col>
											<SubmitButton
												message={'Create Course'}
												disabled={isSubmitting}
											/>
										</Row>
									</Form>
								)}
							</Formik>
						</div>
					</div>
				</Col>
			</Row>
		</>
	);
}
