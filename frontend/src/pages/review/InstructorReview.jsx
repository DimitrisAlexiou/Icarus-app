import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Button } from 'reactstrap';
import { createInstructorReview, reset } from '../../features/reviews/instructorReviewSlice';
import { Formik, Form } from 'formik';
import { InstructorReviewSchema } from '../../schemas/review/InstructorReview';
import { Toast } from '../../constants/sweetAlertNotification';
import InstructorReviewForm from '../../components/review/InstructorReviewForm';
import BreadcrumbNav from '../../components/boilerplate/Breadcrumb';
import SubmitButton from '../../components/buttons/SubmitButton';
import Spinner from '../../components/boilerplate/Spinner';

export default function InstructorReview() {
	const { isError, isSuccess, isLoading, message } = useSelector(
		(state) => state.instructorReview
	);

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
		if (isSuccess) {
			Toast.fire({
				title: 'Success',
				text: 'Review submitted successfully!',
				icon: 'success',
			});
			navigate('/review');
		}
		dispatch(reset());
	}, [dispatch, isError, isSuccess, message, navigate]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<BreadcrumbNav link={'/review'} header={'Reviews'} active={'Instructor Review'} />

			<h1 className="h3 mb-5 text-gray-800 font-weight-bold">Instructor Review</h1>

			<Row className="justify-content-center">
				<Col sm="12" md="10" lg="8" xl="8">
					<div className="card shadow mb-4">
						<div className="card-header py-3">
							<h6 className="m-0 font-weight-bold text-primary">Leave your review</h6>
						</div>
						<div className="card-body">
							<Formik
								initialValues={{
									good_organization: 1,
									clear_comprehensive_answers: 1,
									student_participation: 1,
									course_consistency: 1,
									instructor_approachable: 1,
								}}
								validationSchema={InstructorReviewSchema}
								onSubmit={(values, { setSubmitting }) => {
									const instructorReview = {
										good_organization: values.good_organization,
										clear_comprehensive_answers:
											values.clear_comprehensive_answers,
										student_participation: values.student_participation,
										course_consistency: values.course_consistency,
										instructor_approachable: values.instructor_approachable,
									};
									console.log(instructorReview);
									dispatch(createInstructorReview(instructorReview));
									setSubmitting(false);
								}}
								validateOnMount
							>
								{({ isSubmitting, dirty, handleReset }) => (
									<Form>
										<InstructorReviewForm />

										<Row className="mt-4">
											<Col md="6" sm="6" xs="6">
												<Button
													onClick={handleReset}
													disabled={!dirty || isSubmitting}
												>
													Clear
												</Button>
											</Col>
											<Col className="text-right px-0">
												<SubmitButton
													color={'primary'}
													message={'Review'}
													disabled={isSubmitting}
												/>
											</Col>
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
