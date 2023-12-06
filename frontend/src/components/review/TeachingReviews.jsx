import { Row, Col } from 'reactstrap';
import useTeachingReviews from '../../hooks/review/useTeachingReviews';
import TeachingReviewCard from './cards/TeachingReviewCard';
import CarouselComponent from '../Carousel';
import Spinner from '../boilerplate/spinners/Spinner';

export default function TeachingReviews() {
	const { teachingReviews, isLoading } = useTeachingReviews();

	return (
		<>
			<h5 className="mb-4 text-gray-500 font-weight-bold animated--grow-in">
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
				<Row className="animated--grow-in text-gray-500">
					<Col>
						<div className="profile_card">
							<div className="card-body">
								<div className="align-items-center text-center">
									<span className="text-gray-500 animated--grow-in d-flex justify-content-center">
										There are no teaching reviews submitted.
									</span>
								</div>
							</div>
						</div>
					</Col>
				</Row>
			)}
		</>
	);
}
