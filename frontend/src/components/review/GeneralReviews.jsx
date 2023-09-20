import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row } from 'reactstrap';
import {
	getGeneralReviews,
	getUserGeneralReviews,
} from '../../features/reviews/generalReviewSlice';
import GeneralReviewCard from './cards/GeneralReviewCard';
import CarouselComponent from '../Carousel';
import Spinner from '../boilerplate/Spinner';

export default function GeneralReviews({ user }) {
	const { generalReviews, isLoading } = useSelector((state) => state.generalReviews);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(user ? getUserGeneralReviews() : getGeneralReviews());
	}, [dispatch, user]);

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
