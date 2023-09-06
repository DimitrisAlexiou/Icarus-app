import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row } from 'reactstrap';
import { getUserInstructorReviews } from '../../features/reviews/instructorReviewSlice';
import InstructorReviewCard from './cards/InstructorReviewCard';
import Spinner from '../boilerplate/Spinner';
import CarouselComponent from '../Carousel';

export default function InstructorReviews() {
	const { instructorReviews, isLoading } = useSelector((state) => state.instructorReviews);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUserInstructorReviews());
	}, [dispatch]);

	return (
		<>
			<h5 className="mb-3 text-gray-500 font-weight-bold animated--grow-in">
				Instructor Reviews
			</h5>

			{instructorReviews.length > 0 ? (
				<>
					{isLoading ? (
						<Spinner card />
					) : (
						<CarouselComponent
							objects={instructorReviews}
							renderItem={(instructorReview) => (
								<InstructorReviewCard
									key={instructorReview._id}
									teachingReview={instructorReview}
								/>
							)}
						/>
					)}
				</>
			) : (
				<Row className="mb-5 animated--grow-in text-gray-500">
					<Col>There are no instructor reviews submitted.</Col>
				</Row>
			)}
		</>
	);
}
