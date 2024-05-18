import { Col, Row } from 'reactstrap';
import CarouselComponent from '../Carousel';
import Loading from '../boilerplate/spinners/Spinner';

export default function ReviewSection({
	title,
	reviews,
	isLoading,
	reviewType,
	reviewHasEnded,
	isEditing,
	editReviewId,
	setEditReview,
	ReviewCardComponent,
	handleDeleteReview,
	handleDeleteReviews,
	modal,
	setModal,
	dispatch,
}) {
	return (
		<>
			<Row>
				<Col xl="2">
					<h5
						className="mb-4 text-gray-500 font-weight-bold animated--grow-in clickable"
						onClick={() => handleDeleteReviews()}
					>
						{title}
					</h5>
				</Col>
			</Row>

			{isLoading ? (
				<Loading card />
			) : reviews.length > 0 ? (
				<CarouselComponent
					objects={reviews}
					renderItem={(review) => (
						<ReviewCardComponent
							key={review._id}
							review={review}
							reviewType={reviewType}
							reviewHasEnded={reviewHasEnded}
							isEditing={isEditing}
							editReviewId={editReviewId}
							setEditReview={setEditReview}
							handleDeleteReview={handleDeleteReview}
							modal={modal}
							setModal={setModal}
							dispatch={dispatch}
						/>
					)}
				/>
			) : (
				<Row className="animated--grow-in text-gray-500">
					<Col>
						<div className="profile_card">
							<div className="card-body">
								<div className="align-items-center text-center">
									<span className="text-gray-500 animated--grow-in d-flex justify-content-center">
										There are no {title.toLowerCase()} reviews submitted.
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
