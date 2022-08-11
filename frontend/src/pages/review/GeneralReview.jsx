import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { Formik, Form } from 'formik';
import {
	createGeneralReview,
	reset,
} from '../../features/reviews/generalReviewSlice';
import generalReviewService from '../../features/reviews/generalReviewService';
import { GeneralReviewSchema } from '../../schemas/GeneralReviewSchema';
import { Toast } from '../../constants/sweetAlertNotification';
import GeneralReviewForm from '../../components/review/GeneralReviewForm';
import CancelButton from '../../components/buttons/CancelButton';
import SubmitButton from '../../components/buttons/SubmitButton';
import Spinner from '../../components/boilerplate/Spinner';

export default function GeneralReview() {
	const { isAuthenticated, isLoading } = useAuth0();
	const {
		generalReview,
		isError,
		isSuccess,
		isLoading: generalReviewIsLoading,
		message,
	} = useSelector((state) => state.generalReview);

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
				animation: 'true',
				title: 'Error!',
				text: message,
				icon: 'error',
			});
		}
		if (isSuccess) {
			Toast.fire({
				animation: 'true',
				title: 'Success!',
				text: message,
				icon: 'success',
			});
			dispatch(reset());
			navigate('/review');
		}
		dispatch(reset());
	}, [dispatch, isError, isSuccess, message, navigate]);

	// const onSubmit = (generalReviewData) => {
	// 	dispatch(createGeneralReview(generalReviewData));
	// };

	const onSubmit = async (generalReviewData) => {
		try {
			await generalReviewService.createGeneralReview(generalReviewData);
			Toast.fire({
				title: 'Success',
				text: 'Review posted successfully!',
				icon: 'success',
			});
			navigate('/review');
		} catch (error) {
			Toast.fire({
				title: 'Error while posting review!',
				text: error.response.data,
				icon: 'error',
			});
		}
	};

	if (isLoading || generalReviewIsLoading) {
		return <Spinner />;
	}

	return (
		isAuthenticated && (
			<>
				<Formik
					initialValues={initialValues}
					validationSchema={GeneralReviewSchema}
					onSubmit={(generalReviewData) => {
						onSubmit(generalReviewData);
					}}
					validateOnMount
				>
					<div id="content-wrapper" className="d-flex flex-column">
						<div id="content">
							<div>
								<h1 className="h3 mb-5 text-gray-800 font-weight-bold">
									General Review !
								</h1>

								<div className="row justify-content-center">
									<div className="col-sm-12 col-md-10 col-lg-8 col-xl-6">
										<div className="card shadow mb-4">
											<div className="card-header py-3">
												<h6 className="m-0 font-weight-bold text-primary">
													Leave your review
												</h6>
											</div>
											<div className="card-body">
												<Form>
													<GeneralReviewForm initialValues={initialValues} />

													<div className="row">
														<CancelButton url={'/review'} />
														<SubmitButton message={'Review'} />
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
