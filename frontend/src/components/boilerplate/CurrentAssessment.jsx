import { Card, CardBody } from 'reactstrap';
import Spinner from '../../components/boilerplate/spinners/Spinner';

export default function CurrentAssessment({
	assessment,
	assessmentIsLoading,
	assessmentIsAvailable,
	assessmentEndDate,
}) {
	return (
		<>
			<Card className="card-note">
				<CardBody>
					{assessmentIsLoading ? (
						<Spinner card />
					) : (
						<small
							className={`text-${
								assessmentIsAvailable ? 'success' : 'muted text-gray-500'
							}`}
							style={{
								textAlign: 'justify',
								fontWeight: '700',
								fontSize: 15,
							}}
						>
							{assessmentIsAvailable
								? `Statements available to submit until ${assessmentEndDate.toDateString()}`
								: assessment === null
								? `Statement submission will be available soon`
								: `Statement submission expired at ${assessmentEndDate.toDateString()}`}
						</small>
					)}
				</CardBody>
			</Card>
		</>
	);
}
