import { Card, CardBody } from 'reactstrap';
import Spinner from '../../../components/boilerplate/spinners/Spinner';

const ReviewAvailabilityCard = ({
	isLoading,
	review,
	reviewHasStarted,
	reviewHasEnded,
	reviewStartDate,
	reviewEndDate,
}) => {
	return (
		<>
			<Card className="card-note">
				<CardBody>
					{isLoading ? (
						<Spinner card />
					) : review ? (
						<small
							className="text-muted text-gray-500"
							style={{
								textAlign: 'justify',
								fontWeight: '700',
								fontSize: 15,
							}}
						>
							{reviewHasStarted && !reviewHasEnded ? (
								<>
									Available to submit until{' '}
									<small
										className="pill-label text-success"
										style={{
											textAlign: 'justify',
											fontWeight: '700',
											fontSize: 15,
										}}
									>
										{new Date(reviewEndDate).toDateString()}
									</small>
								</>
							) : reviewHasEnded ? (
								<>
									Submission ended on{' '}
									<small
										className="pill-label text-warning"
										style={{
											textAlign: 'justify',
											fontWeight: '700',
											fontSize: 15,
										}}
									>
										{new Date(reviewEndDate).toDateString()}
									</small>
								</>
							) : (
								<>
									Submission starts on{' '}
									<small
										className="pill-label text-info"
										style={{
											textAlign: 'justify',
											fontWeight: '700',
											fontSize: 15,
										}}
									>
										{new Date(reviewStartDate).toDateString()}
									</small>
								</>
							)}
						</small>
					) : (
						<small
							className="text-muted text-gray-500"
							style={{
								textAlign: 'justify',
								fontWeight: '700',
								fontSize: 15,
							}}
						>
							Reviews will be available soon
						</small>
					)}
				</CardBody>
			</Card>
		</>
	);
};

export default ReviewAvailabilityCard;
