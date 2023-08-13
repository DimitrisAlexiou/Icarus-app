import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { getTeachingReviews } from '../../features/reviews/teachingReviewSlice';
import TeachingReviewItem from '../../components/review/TeachingReviewItem';
import Spinner from '../../components/boilerplate/Spinner';

export default function TeachingReviews() {
	const { teachingReviews, isLoading } = useSelector((state) => state.teachingReview);

	const dispatch = useDispatch();

	useEffect(() => {
		// dispatch(getTeachingReviews());
	}, [dispatch]);

	if (isLoading) return <Spinner />;

	return (
		<>
			<h5 className="mb-5 text-gray-500 font-weight-bold animated--grow-in">
				Teaching Reviews
			</h5>

			<Row className="mb-5 justify-content-center animated--grow-in">
				<Col sm="12" md="6" lg="4" className="g-4 mb-3">
					{teachingReviews.map((teachingReview) => (
						<TeachingReviewItem
							key={teachingReview._id}
							teachingReview={teachingReview}
						/>
					))}
				</Col>
			</Row>
		</>
	);
}
