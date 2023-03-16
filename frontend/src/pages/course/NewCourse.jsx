import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import { Formik } from 'formik';
import { CourseSchema } from '../../schemas/course/Course';
import { Toast } from '../../constants/sweetAlertNotification';
import { createCourse, getCourses } from '../../features/courses/courseSlice';
import { getCycles } from '../../features/admin/cyclesSlice';
import { getSemesters } from '../../features/admin/semesterSlice';
import CourseForm from '../../components/course/CourseForm';
import BackButton from '../../components/buttons/BackButton';
import Spinner from '../../components/boilerplate/Spinner';

export default function NewCourse() {
	const {
		courses,
		isLoading: coursesIsLoading,
		isError: coursesIsError,
		message: coursesMessage,
	} = useSelector((state) => state.courses);
	const {
		cycles,
		isLoading: cyclesIsLoading,
		isError: cyclesIsError,
		message: cyclesMessage,
	} = useSelector((state) => state.cycles);
	const {
		semesters,
		isLoading: semestersIsLoading,
		isError: semestersIsError,
		message: semestersMessage,
	} = useSelector((state) => state.semesters);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getCourses());
		dispatch(getCycles());
		dispatch(getSemesters());

		if (coursesIsError) {
			Toast.fire({
				title: 'Something went wrong!',
				text: coursesMessage,
				icon: 'error',
			});
		} else if (cyclesIsError) {
			Toast.fire({
				title: 'Something went wrong!',
				text: cyclesMessage,
				icon: 'error',
			});
		} else if (semestersIsError) {
			Toast.fire({
				title: 'Something went wrong!',
				text: semestersMessage,
				icon: 'error',
			});
		}
	}, [
		dispatch,
		coursesIsError,
		cyclesIsError,
		semestersIsError,
		coursesMessage,
		cyclesMessage,
		semestersMessage,
	]);

	if (coursesIsLoading || cyclesIsLoading || semestersIsLoading) {
		return <Spinner />;
	}

	return (
		<>
			<Row className="mb-5 animated--grow-in">
				<Col sm="6" xs="6" md="6">
					<h1 className="h3 text-gray-800 font-weight-bold">Create Course</h1>
				</Col>
				<Col className="d-flex justify-content-end">
					<BackButton url={'/course'} />
				</Col>
			</Row>

			<Row className="justify-content-center animated--grow-in">
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
									prerequisites: [''],
								}}
								validationSchema={CourseSchema}
								onSubmit={(values, { setSubmitting }) => {
									const course = {
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
										cycle: values.cycle ? values.cycle : null,
										prerequisites: values.prerequisites.some(Boolean)
											? values.prerequisites
											: [null],
									};
									console.log(course);
									dispatch(createCourse(course));
									setSubmitting(false);
									navigate('/course');
								}}
								validateOnMount
							>
								{({ isSubmitting, dirty, values, handleReset, setFieldValue }) => (
									<CourseForm
										courses={courses}
										cycles={cycles}
										semesters={semesters}
										values={values}
										setFieldValue={setFieldValue}
										isSubmitting={isSubmitting}
										dirty={dirty}
										handleReset={handleReset}
									/>
								)}
							</Formik>
						</div>
					</div>
				</Col>
			</Row>
		</>
	);
}
