import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { Formik } from 'formik';
import { TeachingSchema } from '../../schemas/course/Teaching';
import { Toast } from '../../constants/sweetAlertNotification';
import { getCourse } from '../../features/courses/courseSlice';
import TeachingForm from '../../components/course/TeachingForm';
import BackButton from '../../components/buttons/BackButton';
import Spinner from '../../components/boilerplate/Spinner';

export default function NewTeaching() {
	const { course, isError, isLoading, message } = useSelector((state) => state.courses);

	const { courseId } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if (isError) {
			Toast.fire({
				title: 'Something went wrong!',
				text: message,
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
			<Row className="mb-5 animated--grow-in">
				<Col sm="6" xs="6" md="6">
					<h1 className="h3 text-gray-800 font-weight-bold">{course.title} Teaching</h1>
				</Col>
				<Col className="d-flex justify-content-end">
					<BackButton url={'/course/' + courseId} />
				</Col>
			</Row>

			<Row className="justify-content-center animated--grow-in">
				<Col sm="12" md="11" lg="10" xl="8">
					<div className="card shadow mb-4">
						<div className="card-header py-3">
							<h6 className="m-0 font-weight-bold text-primary">
								Fill the form below to configure the teaching for the course
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
									books: [''],
								}}
								validationSchema={TeachingSchema}
								onSubmit={(values, { setSubmitting }) => {
									const teaching = {
										labWeight: values.labWeight,
										theoryWeight: values.theoryWeight,
										theoryGrade: values.theoryGrade,
										labGrade: values.labGrade,
										theoryGradeThreshold: values.theoryGradeThreshold,
										labGradeThreshold: values.labGradeThreshold,
										books: values.books.some(Boolean) ? values.books : [null],
									};
									console.log(teaching);
									// dispatch(configureTeaching(teaching));
									setSubmitting(false);
									navigate('/course/' + courseId);
								}}
								validateOnMount
							>
								{({ isSubmitting, dirty, values, handleReset }) => (
									<TeachingForm
										values={values}
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
