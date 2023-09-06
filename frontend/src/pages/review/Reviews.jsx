import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardText, CardTitle, Row, Col, CardBody } from 'reactstrap';
import { getReview } from '../../features/admin/reviewSlice';
// import { getTeachingReviews } from '../../features/reviews/teachingReviewSlice';
// import { getInstructorReviews } from '../../features/reviews/instructorReviewSlice';
// import { getGeneralReviews } from '../../features/reviews/generalReviewSlice';
import Spinner from '../../components/boilerplate/Spinner';

export default function Reviews() {
	const { review, isLoading } = useSelector((state) => state.review);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getReview());
		// dispatch(getTeachingReviews());
		// dispatch(getInstructorReviews());
		// dispatch(getGeneralReviews());
	}, [dispatch]);

	const reviewStartDate = review && review.startDate;
	const currentDate = new Date();
	const reviewHasStarted = reviewStartDate && currentDate >= new Date(reviewStartDate);

	return (
		<>
			<Row className="mb-5 animated--grow-in">
				<Col>
					<h3 className="mb-4 text-gray-800 font-weight-bold animated--grow-in">
						Reviews
					</h3>
				</Col>
				<Col xl="3" md="6" className="text-right">
					<Card className="card-note">
						<CardBody>
							<CardText>
								{isLoading ? (
									<Spinner card />
								) : review ? (
									reviewHasStarted ? (
										<small
											className="text-muted"
											style={{
												textAlign: 'justify',
												fontWeight: '800',
												fontSize: 15,
											}}
										>
											Reviews are available to submit
										</small>
									) : (
										<>
											<small
												className="text-muted pill-label"
												style={{
													textAlign: 'justify',
													fontWeight: '800',
													fontSize: 15,
												}}
											>
												Reviews start on
											</small>
											<small
												style={{
													textAlign: 'justify',
													fontWeight: '700',
													fontSize: 14,
												}}
											>
												{new Date(reviewStartDate).toDateString()}
											</small>
										</>
									)
								) : (
									<small
										className="text-muted"
										style={{
											textAlign: 'justify',
											fontWeight: '800',
											fontSize: 15,
										}}
									>
										Reviews will be available soon
									</small>
								)}
							</CardText>
						</CardBody>
					</Card>
				</Col>
			</Row>

			<Row className="mb-4 justify-content-center animated--grow-in">
				<Col md="7" lg="4">
					<Link style={{ textDecoration: 'none' }} to="/review/teaching">
						<Card className="card-animate" body color="primary" inverse>
							<CardTitle tag="h5">Teaching</CardTitle>
							<CardText>Teaching implementation.</CardText>
						</Card>
					</Link>
				</Col>
				<Col md="7" lg="4">
					<Link style={{ textDecoration: 'none' }} to="/review/instructor">
						<Card className="card-animate" body color="info" inverse>
							<CardTitle tag="h5">Instructor</CardTitle>
							<CardText>Instructor of the course.</CardText>
						</Card>
					</Link>
				</Col>
			</Row>
			<Row className="mb-4 justify-content-center animated--grow-in">
				<Col md="7" lg="4" className="mb-3">
					<Link style={{ textDecoration: 'none' }} to="/review/general">
						<Card className="card-animate" body color="success" inverse>
							<CardTitle tag="h5">General</CardTitle>
							<CardText>General aspects of the course.</CardText>
						</Card>
					</Link>
				</Col>
			</Row>
		</>
	);
}
