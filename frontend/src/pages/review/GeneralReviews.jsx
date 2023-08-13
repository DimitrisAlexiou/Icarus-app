import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row } from 'reactstrap';
import { getGeneralReviews } from '../../features/reviews/generalReviewSlice';
import GeneralReviewItem from '../../components/review/GeneralReviewItem';
import Spinner from '../../components/boilerplate/Spinner';

export default function GeneralReviews() {
	const { generalReviews, isLoading } = useSelector((state) => state.generalReview);

	const dispatch = useDispatch();

	useEffect(() => {
		// dispatch(getGeneralReviews());
	}, [dispatch]);

	if (isLoading) return <Spinner />;

	return (
		<>
			<h5 className="mb-5 text-gray-500 font-weight-bold animated--grow-in">
				General Reviews
			</h5>

			<Row className="animated--grow-in">
				<Col sm="12" md="6" lg="4" className="g-4 mb-3">
					{generalReviews.map((generalReview) => (
						<GeneralReviewItem key={generalReview._id} generalReview={generalReview} />
					))}
				</Col>
			</Row>
		</>
	);
}
