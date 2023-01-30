import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Row } from 'reactstrap';
import { Formik, Form } from 'formik';
import { createGeneralReview, reset } from '../../features/reviews/generalReviewSlice';
import { GeneralReviewSchema } from '../../schemas/review/GeneralReview';
import { Toast } from '../../constants/sweetAlertNotification';
import GeneralReviewForm from '../../components/review/GeneralReviewForm';
import CancelButton from '../../components/buttons/CancelButton';
import SubmitButton from '../../components/buttons/SubmitButton';
import Spinner from '../../components/boilerplate/Spinner';

export default function GeneralReview() {
	const { isError, isSuccess, isLoading, message } = useSelector((state) => state.generalReview);

	const initialValues = {
		course_opinion: '',
		instructor_opinion: '',
		likes: '',
		dislikes: '',
	};
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (isError) {
			Toast.fire({
				title: 'Error while creating general review!',
				text: message,
				icon: 'error',
			});
		}
		if (isSuccess) {
			Toast.fire({
				title: 'Success!',
				text: 'Review posted successfully!',
				icon: 'success',
			});
			dispatch(reset());
			navigate('/review');
		}
		dispatch(reset());
	}, [dispatch, isError, isSuccess, message, navigate]);

	const onSubmit = (data) => {
		dispatch(createGeneralReview(data));
	};

	if (isLoading) {
		return <Spinner />;
	}

	return (
		// isAuthenticated && (
		<>
			<h1 className="h3 mb-5 text-gray-800 font-weight-bold">General Review !</h1>

			<Row className="justify-content-center">
				<div className="col-sm-12 col-md-10 col-lg-8 col-xl-8">
					<div className="card shadow mb-4">
						<div className="card-header py-3">
							<h6 className="m-0 font-weight-bold text-primary">Leave your review</h6>
						</div>
						<div className="card-body">
							<Formik
								initialValues={initialValues}
								validationSchema={GeneralReviewSchema}
								onSubmit={(data) => {
									onSubmit(data);
								}}
								validateOnMount
							>
								<Form>
									<GeneralReviewForm />

									<Row>
										<CancelButton url={'/review'} />
										<SubmitButton message={'Review'} disabled={isLoading} />
									</Row>
								</Form>
							</Formik>
						</div>
					</div>
				</div>
			</Row>
		</>
		// )
	);
}
