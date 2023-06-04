import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { resetTeachingReview } from '../../features/reviews/teachingReviewSlice';
import { Row, Col } from 'reactstrap';
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
		dispatch(resetTeachingReview());
	}, [dispatch, isError, isSuccess, message, navigate]);

	if (isLoading) return <Spinner />;

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
							<TeachingReviewForm />
						</div>
					</div>
				</Col>
			</Row>
		</>
	);
}
