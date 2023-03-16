import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row } from 'reactstrap';
import { getGeneralReviews, reset } from '../../features/reviews/generalReviewSlice';
import GeneralReviewItem from '../../components/review/GeneralReviewItem';
import Spinner from '../../components/boilerplate/Spinner';
import BreadcrumbNav from '../../components/boilerplate/Breadcrumb';

export default function GeneralReviews() {
	const { generalReview, isLoading, isSuccess } = useSelector((state) => state.generalReview);

	const dispatch = useDispatch();

	useEffect(() => {
		return () => {
			if (isSuccess) {
				dispatch(reset());
			}
		};
	}, [dispatch, isSuccess]);

	useEffect(() => {
		dispatch(getGeneralReviews());
	}, [dispatch]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<BreadcrumbNav
				className="animated--grow-in"
				link={'/review'}
				header={'Reviews'}
				active={'General Reviews'}
			/>

			<h1 className="h3 mb-5 text-gray-800 font-weight-bold animated--grow-in">
				General Reviews
			</h1>

			<Row className="animated--grow-in">
				<Col sm="12" md="6" lg="4" className="g-4 mb-3">
					{generalReview.map((generalReview) => (
						<GeneralReviewItem key={generalReview._id} generalReview={generalReview} />
					))}
				</Col>
			</Row>
		</>
	);
}
