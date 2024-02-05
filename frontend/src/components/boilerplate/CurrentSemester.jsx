import { Card, CardBody, CardTitle, Col } from 'reactstrap';
import { useSemester } from '../../context/SemesterProvider';
import Spinner from '../../components/boilerplate/spinners/Spinner';

export default function CurrentSemester() {
	const { semester, isSemesterLoading } = useSemester();

	return (
		<>
			{semester ? (
				<Col xl="3" lg="4" md="4" className="text-right">
					<Card className="card-note">
						<CardBody>
							{isSemesterLoading ? (
								<Spinner card />
							) : (
								<CardTitle>
									<Col>
										<h6> Current Semester</h6>
									</Col>
									<Col>
										<h3>{semester.type}</h3>
									</Col>
								</CardTitle>
							)}
						</CardBody>
					</Card>
				</Col>
			) : null}
		</>
	);
}
