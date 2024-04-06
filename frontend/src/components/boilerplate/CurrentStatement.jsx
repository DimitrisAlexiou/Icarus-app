import { Card, CardBody, Col } from 'reactstrap';
import { AssessmentStatus } from '../../constants/enums';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCheckDouble,
	faClockRotateLeft,
} from '@fortawesome/free-solid-svg-icons';
import useCurrentStatement from '../../hooks/user/useCurrentStatement';
import Spinner from '../../components/boilerplate/spinners/Spinner';

export default function CurrentStatement() {
	const { statement, isLoading } = useCurrentStatement();

	return (
		<>
			{statement ? (
				<Col xl="2" lg="3" md="4" className="text-center mb-3">
					<Card className="card-note">
						<CardBody>
							{isLoading ? (
								<Spinner card />
							) : (
								<small
									className={
										statement?.condition?.includes(AssessmentStatus.Finalized)
											? 'text-success'
											: 'text-warning'
									}
									style={{
										textAlign: 'justify',
										fontWeight: '700',
										fontSize: 15,
									}}
								>
									<span className="mx-2">statement</span>
									{statement?.condition?.includes(
										AssessmentStatus.Finalized
									) ? (
										<FontAwesomeIcon icon={faCheckDouble} />
									) : (
										<FontAwesomeIcon icon={faClockRotateLeft} />
									)}
								</small>
							)}
						</CardBody>
					</Card>
				</Col>
			) : null}
		</>
	);
}
