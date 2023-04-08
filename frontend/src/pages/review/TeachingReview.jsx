import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createTeachingReview, reset } from '../../features/reviews/teachingReviewSlice';
import { Formik } from 'formik';
import { Row, Col } from 'reactstrap';
import { TeachingReviewSchema } from '../../schemas/review/TeachingReview';
import { Toast } from '../../constants/sweetAlertNotification';
import TeachingReviewForm from '../../components/review/TeachingReviewForm';
import BreadcrumbNav from '../../components/boilerplate/Breadcrumb';
import Spinner from '../../components/boilerplate/Spinner';

export default function TeachingReview() {
	const { isError, isSuccess, isLoading, message } = useSelector((state) => state.teachingReview);

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
				text: 'Review submitted!',
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
			<BreadcrumbNav
				className="animated--grow-in"
				link={'/review'}
				header={'Reviews'}
				active={'Teaching Review'}
			/>

			<h1 className="h3 mb-5 text-gray-800 font-weight-bold animated--grow-in">
				Teaching Review
			</h1>

			<Row className="justify-content-center animated--grow-in">
				<Col sm="12" md="10" lg="8" xl="8">
					<div className="card shadow mb-4">
						<div className="card-header py-3">
							<h6 className="m-0 font-weight-bold text-primary">Leave your review</h6>
						</div>
						<div className="card-body">
							<Formik
								initialValues={{
									clear_course_objectives: 1,
									course_material: 1,
									course_comprehension: 1,
									examination_method: 1,
									course_difficulty: 1,
									course_activities: 1,
								}}
								validationSchema={TeachingReviewSchema}
								onSubmit={(values, { setSubmitting }) => {
									const teachingReview = {
										clear_course_objectives: values.clear_course_objectives,
										course_material: values.course_material,
										course_comprehension: values.course_comprehension,
										examination_method: values.examination_method,
										course_difficulty: values.course_difficulty,
										course_activities: values.course_activities,
									};
									console.log(teachingReview);
									dispatch(createTeachingReview(teachingReview));
									setSubmitting(false);
								}}
								validateOnMount
							>
								{({ isSubmitting, dirty, handleReset }) => (
									<TeachingReviewForm
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
