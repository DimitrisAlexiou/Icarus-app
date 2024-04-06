import { CardText, Col, Row, Spinner } from 'reactstrap';
import { AssessmentStatus } from '../../../constants/enums';

const StatementCardInfo = ({ statement, isStatementsLoading }) => {
	return (
		<>
			<Row className="mb-2">
				<Col>
					<Row className="align-items-center">
						<Col xs="12" sm="12" md="12">
							<CardText
								style={{
									fontWeight: '700',
									fontSize: 25,
								}}
							>
								<b>Semester</b>
							</CardText>
						</Col>
						<Col md="12">
							<CardText
								style={{
									fontWeight: '500',
									fontSize: 16,
								}}
								className="text-light-cornflower-blue"
							>
								{statement?.semester?.type} {statement?.semester?.academicYear}
							</CardText>
						</Col>
					</Row>
				</Col>
				<Col className="text-right">
					{isStatementsLoading ? (
						<Spinner size="sm" color="dark" type="grow" />
					) : (
						<small
							className={
								statement?.condition?.includes(AssessmentStatus.Finalized)
									? 'text-success pill-label'
									: 'text-warning pill-label'
							}
							style={{
								textAlign: 'justify',
								fontWeight: '700',
								fontSize: 12,
							}}
						>
							{statement?.condition}
						</small>
					)}
				</Col>
			</Row>
			<Row className="text-center">
				<label
					style={{
						fontWeight: '700',
						fontSize: 25,
					}}
					className="mb-3"
				>
					Courses
				</label>
			</Row>
		</>
	);
};

export default StatementCardInfo;
