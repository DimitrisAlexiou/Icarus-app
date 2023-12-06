import { Col, Row } from 'reactstrap';
import useGeneralReviews from '../../hooks/review/useGeneralReviews';
import GeneralReviewCard from './cards/GeneralReviewCard';
import CarouselComponent from '../Carousel';
import Spinner from '../boilerplate/spinners/Spinner';

export default function GeneralReviews({ user }) {
	const { generalReviews, isLoading } = useGeneralReviews();

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
				<Row className="animated--grow-in text-gray-500">
					<Col>
						<div className="profile_card">
							<div className="card-body">
								<div className="align-items-center text-center">
									<span className="text-gray-500 animated--grow-in d-flex justify-content-center">
										There are no general reviews submitted.
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
