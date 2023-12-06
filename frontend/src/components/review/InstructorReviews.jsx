import { Col, Row } from 'reactstrap';
import useInstructorReviews from '../../hooks/review/useInstructorReviews';
import InstructorReviewCard from './cards/InstructorReviewCard';
import CarouselComponent from '../Carousel';
import Spinner from '../boilerplate/spinners/Spinner';

export default function InstructorReviews() {
	const { instructorReviews, isLoading } = useInstructorReviews();

	return (
		<>
			<h5 className="mb-4 text-gray-500 font-weight-bold animated--grow-in">
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
				<Row className="animated--grow-in text-gray-500">
					<Col>
						<div className="profile_card">
							<div className="card-body">
								<div className="align-items-center text-center">
									<span className="text-gray-500 animated--grow-in d-flex justify-content-center">
										There are no instructor reviews submitted.
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
