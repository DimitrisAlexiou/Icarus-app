import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { Formik } from 'formik';
import { createGeneralReview, reset } from '../../features/reviews/generalReviewSlice';
import { GeneralReviewSchema } from '../../schemas/review/GeneralReview';
import { Toast } from '../../constants/sweetAlertNotification';
import GeneralReviewForm from '../../components/review/GeneralReviewForm';
import BreadcrumbNav from '../../components/boilerplate/Breadcrumb';
import Spinner from '../../components/boilerplate/Spinner';

export default function GeneralReview() {
	const { isError, isSuccess, isLoading, message } = useSelector((state) => state.generalReview);

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
				active={'General Review'}
			/>

			<h1 className="h3 mb-5 text-gray-800 font-weight-bold animated--grow-in">
				General Review
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
									course_opinion: '',
									instructor_opinion: '',
									likes: '',
									dislikes: '',
								}}
								validationSchema={GeneralReviewSchema}
								onSubmit={(values, { setSubmitting }) => {
									const generalReview = {
										course_opinion: values.course_opinion,
										instructor_opinion: values.instructor_opinion,
										likes: values.likes,
										dislikes: values.dislikes,
									};
									dispatch(createGeneralReview(generalReview));
									setSubmitting(false);
								}}
								validateOnMount
							>
								{({ isSubmitting, dirty, handleReset }) => (
									<GeneralReviewForm
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
