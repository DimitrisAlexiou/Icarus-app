import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { getUserTeachingReviews } from '../../features/reviews/teachingReviewSlice';
import TeachingReviewCard from './cards/TeachingReviewCard';
import Spinner from '../boilerplate/Spinner';
import CarouselComponent from '../Carousel';

export default function TeachingReviews() {
	const { teachingReviews, isLoading } = useSelector((state) => state.teachingReviews);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUserTeachingReviews());
	}, [dispatch]);

	return (
		<>
			<h5 className="mb-3 text-gray-500 font-weight-bold animated--grow-in">
				Teaching Reviews
			</h5>

			{teachingReviews.length > 0 ? (
				<>
					{isLoading ? (
						<Spinner card />
					) : (
						<CarouselComponent
							objects={teachingReviews}
							renderItem={(teachingReview) => (
								<TeachingReviewCard
									key={teachingReview._id}
									teachingReview={teachingReview}
								/>
							)}
						/>
					)}
				</>
			) : (
				<Row className="mb-5 animated--grow-in text-gray-500">
					<Col>There are no teaching reviews submitted.</Col>
				</Row>
			)}
		</>
	);
}
