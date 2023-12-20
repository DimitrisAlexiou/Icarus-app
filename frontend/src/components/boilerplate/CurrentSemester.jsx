import { Card, CardBody, CardTitle, Col } from 'reactstrap';
import useCurrentSemester from '../../hooks/useCurrentSemester';

export default function CurrentSemester() {
	const { semester } = useCurrentSemester();

	return (
		<>
			{semester ? (
				<Col xl="3" lg="4" md="4" className="text-right">
					<Card className="card-note">
						<CardBody>
							<CardTitle>
								<Col>
									<h6> Current Semester</h6>
								</Col>
								<Col>
									<h3>{semester.type}</h3>
								</Col>
							</CardTitle>
						</CardBody>
					</Card>
				</Col>
			) : null}
		</>
	);
}
