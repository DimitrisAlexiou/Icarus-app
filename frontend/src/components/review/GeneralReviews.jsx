import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row } from 'reactstrap';
import { getUserGeneralReviews } from '../../features/reviews/generalReviewSlice';
import GeneralReviewCard from './cards/GeneralReviewCard';
import Spinner from '../boilerplate/Spinner';
import CarouselComponent from '../Carousel';

export default function GeneralReviews() {
	const { generalReviews, isLoading } = useSelector((state) => state.generalReviews);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUserGeneralReviews());
	}, [dispatch]);

	return (
		<>
			<h5 className="mb-4 text-gray-500 font-weight-bold animated--grow-in">
				General Reviews
			</h5>

			{generalReviews.length > 0 ? (
				<>
					{isLoading ? (
						<Spinner card />
					) : (
						<CarouselComponent
							objects={generalReviews}
							renderItem={(generalReview) => (
								<GeneralReviewCard
									key={generalReview._id}
									teachingReview={generalReview}
								/>
							)}
						/>
					)}
				</>
			) : (
				<Row className="mb-5 animated--grow-in text-gray-500">
					<Col>There are no general reviews submitted.</Col>
				</Row>
			)}
		</>
	);
}
