import { Link } from 'react-router-dom';
import { Card, CardText, CardTitle, Row, Col, CardBody } from 'reactstrap';
import useReviews from '../../hooks/review/useReviews';
import TeachingReviews from '../../components/review/TeachingReviews';
import InstructorReviews from '../../components/review/InstructorReviews';
import GeneralReviews from '../../components/review/GeneralReviews';
import Spinner from '../../components/boilerplate/spinners/Spinner';

export default function Reviews() {
	const { review, isLoading, reviewStartDate, reviewHasStarted } = useReviews();

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
						</CardBody>
					</Card>
				</Col>
			</Row>

			<Row className="mb-4 justify-content-center animated--grow-in">
				<Col md="7" lg="4">
					<Link
						style={{
							textDecoration: 'none',
							pointerEvents: review && reviewHasStarted ? 'auto' : 'none',
							opacity: review && reviewHasStarted ? 1 : 0.6,
						}}
						to="/review/teaching"
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
							pointerEvents: review && reviewHasStarted ? 'auto' : 'none',
							opacity: review && reviewHasStarted ? 1 : 0.6,
						}}
						to="/review/instructor"
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
							pointerEvents: review && reviewHasStarted ? 'auto' : 'none',
							opacity: review && reviewHasStarted ? 1 : 0.6,
						}}
						to="/review/general"
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
				<TeachingReviews />
			</Row>

			<Row className="mb-4 justify-content-center animated--grow-in">
				<InstructorReviews />
			</Row>

			<Row className="mb-4 justify-content-center animated--grow-in">
				<GeneralReviews />
			</Row>
		</>
	);
}
