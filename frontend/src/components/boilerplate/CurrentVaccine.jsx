import { Card, CardBody, Col, Row } from 'reactstrap';
import Spinner from '../../components/boilerplate/spinners/Spinner';

export default function CurrentVaccine({
	assessmentIsLoading,
	vaccineEndDate,
}) {
	return (
		<>
			<Row className="d-flex justify-content-end">
				<Col xs="auto" className="text-center">
					<Card className="card-note">
						<CardBody>
							{assessmentIsLoading ? (
								<Spinner card />
							) : (
								<small
									className="text-info"
									style={{
										textAlign: 'justify',
										fontWeight: '700',
										fontSize: 15,
									}}
								>
									Vaccine statements available until{' '}
									{vaccineEndDate.toDateString()}
								</small>
							)}
						</CardBody>
					</Card>
				</Col>
			</Row>
		</>
	);
}
