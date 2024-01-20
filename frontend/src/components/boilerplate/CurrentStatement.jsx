import { Card, CardBody, Col } from 'reactstrap';
import { AssessmentStatus } from '../../constants/enums';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCheckDouble,
	faClockRotateLeft,
} from '@fortawesome/free-solid-svg-icons';
import useStatements from '../../hooks/user/useStatements';
import Spinner from '../../components/boilerplate/spinners/Spinner';

export default function CurrentStatement() {
	const { isStatementsLoading, isStatementSubmitted, currentStatement } =
		useStatements();

	return (
		<>
			{isStatementsLoading ? (
				<Spinner card />
			) : isStatementSubmitted ? (
				<Col xl="2" lg="3" md="4" className="text-center mb-3">
					<Card className="card-note">
						<CardBody>
							<small
								className={
									currentStatement.condition === AssessmentStatus.Finalized
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
								{currentStatement.condition === AssessmentStatus.Finalized ? (
									<FontAwesomeIcon icon={faCheckDouble} />
								) : (
									<FontAwesomeIcon icon={faClockRotateLeft} />
								)}
							</small>
						</CardBody>
					</Card>
				</Col>
			) : null}
		</>
	);
}
