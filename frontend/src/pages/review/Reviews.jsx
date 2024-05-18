import { Link, useLocation } from 'react-router-dom';
import { Card, CardText, CardTitle, Row, Col } from 'reactstrap';
import { ReviewType } from '../../constants/enums';
import useReviews from '../../hooks/review/useReviews';
import useUserReviews from '../../hooks/review/useUserReviews';
import ReviewSection from '../../components/review/ReviewSection';
import ReviewForm from '../../components/review/ReviewForm';
import ReviewCard from '../../components/review/cards/ReviewCard';
import ReviewAvailabilityCard from '../../components/review/cards/ReviewAvailabilityCard';

export default function Reviews() {
	const {
		review,
		isLoading,
		reviewStartDate,
		reviewEndDate,
		reviewHasStarted,
		reviewHasEnded,
	} = useReviews();

	const {
		modal,
		setModal,
		generalReviews,
		isGeneralReviewLoading,
		isEditingGeneralReview,
		editGeneralReviewId,
		setEditGeneralReview,
		instructorReviews,
		isInstructorReviewLoading,
		isEditingInstructorReview,
		editInstructorReviewId,
		setEditInstructorReview,
		teachingReviews,
		isTeachingReviewLoading,
		isEditingTeachingReview,
		editTeachingReviewId,
		setEditTeachingReview,
		handleDeleteReview,
		handleDeleteReviews,
		dispatch,
	} = useUserReviews();

	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const reviewType = queryParams.get('type');

	return (
		<>
			{reviewType ? (
				<ReviewForm reviewType={reviewType} />
			) : (
				<>
					<Row className="mb-5 animated--grow-in">
						<Col>
							<h3 className="mb-4 text-gray-800 font-weight-bold animated--grow-in">
								Reviews
							</h3>
						</Col>
						<Col xl="3" md="6" className="text-center">
							<ReviewAvailabilityCard
								isLoading={isLoading}
								review={review}
								reviewHasStarted={reviewHasStarted}
								reviewHasEnded={reviewHasEnded}
								reviewStartDate={reviewStartDate}
								reviewEndDate={reviewEndDate}
							/>
						</Col>
					</Row>

					<Row className="mb-4 justify-content-center animated--grow-in">
						<Col md="7" lg="4">
							<Link
								style={{
									textDecoration: 'none',
									pointerEvents:
										reviewHasEnded || !reviewHasStarted ? 'none' : 'auto',
									opacity: reviewHasEnded || !reviewHasStarted ? 0.6 : 1,
								}}
								to={{ pathname: '/review', search: '?type=Teaching' }}
							>
								<Card className="card-animate" body color="primary" inverse>
									<CardTitle tag="h5">Teaching</CardTitle>
									<CardText>Teaching implementation.</CardText>
								</Card>
							</Link>
						</Col>
						<Col md="7" lg="4">
							<Link
								style={{
									textDecoration: 'none',
									pointerEvents:
										reviewHasEnded || !reviewHasStarted ? 'none' : 'auto',
									opacity: reviewHasEnded || !reviewHasStarted ? 0.6 : 1,
								}}
								to={{ pathname: '/review', search: '?type=Instructor' }}
							>
								<Card className="card-animate" body color="info" inverse>
									<CardTitle tag="h5">Instructor</CardTitle>
									<CardText>Instructor of the course.</CardText>
								</Card>
							</Link>
						</Col>
					</Row>

					<Row className="mb-4 justify-content-center animated--grow-in">
						<Col md="7" lg="4" className="mb-3">
							<Link
								style={{
									textDecoration: 'none',
									pointerEvents:
										reviewHasEnded || !reviewHasStarted ? 'none' : 'auto',
									opacity: reviewHasEnded || !reviewHasStarted ? 0.6 : 1,
								}}
								to={{ pathname: '/review', search: '?type=General' }}
								disabled={!review}
							>
								<Card className="card-animate" body color="success" inverse>
									<CardTitle tag="h5">General</CardTitle>
									<CardText>General aspects of the course.</CardText>
								</Card>
							</Link>
						</Col>
					</Row>

					<Row className="mb-4 justify-content-center animated--grow-in">
						<ReviewSection
							title="Teaching"
							reviews={teachingReviews}
							isLoading={isTeachingReviewLoading}
							reviewType={ReviewType.Teaching}
							reviewHasEnded={reviewHasEnded}
							isEditing={isEditingTeachingReview}
							editReviewId={editTeachingReviewId}
							setEditReview={setEditTeachingReview}
							ReviewCardComponent={ReviewCard}
							handleDeleteReview={handleDeleteReview}
							handleDeleteReviews={() =>
								handleDeleteReviews(ReviewType.Teaching)
							}
							modal={modal}
							setModal={setModal}
							dispatch={dispatch}
						/>

						<ReviewSection
							title="Instructor"
							reviews={instructorReviews}
							isLoading={isInstructorReviewLoading}
							reviewType={ReviewType.Instructor}
							reviewHasEnded={reviewHasEnded}
							isEditing={isEditingInstructorReview}
							editReviewId={editInstructorReviewId}
							setEditReview={setEditInstructorReview}
							ReviewCardComponent={ReviewCard}
							handleDeleteReview={(reviewId) =>
								handleDeleteReview(ReviewType.Instructor, reviewId)
							}
							handleDeleteReviews={() =>
								handleDeleteReviews(ReviewType.Instructor)
							}
							modal={modal}
							setModal={setModal}
							dispatch={dispatch}
						/>

						<ReviewSection
							title="General"
							reviews={generalReviews}
							isLoading={isGeneralReviewLoading}
							reviewType={ReviewType.General}
							reviewHasEnded={reviewHasEnded}
							isEditing={isEditingGeneralReview}
							editReviewId={editGeneralReviewId}
							setEditReview={setEditGeneralReview}
							ReviewCardComponent={ReviewCard}
							handleDeleteReview={(reviewId) =>
								handleDeleteReview(ReviewType.General, reviewId)
							}
							handleDeleteReviews={() =>
								handleDeleteReviews(ReviewType.General)
							}
							modal={modal}
							setModal={setModal}
							dispatch={dispatch}
						/>
					</Row>
				</>
			)}
		</>
	);
}
