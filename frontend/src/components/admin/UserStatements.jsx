import { CardText, CardTitle, Col, Row } from 'reactstrap';
import { AssessmentType } from '../../constants/enums';
import { groupBy } from '../../utils/groupBy';
import CarouselComponent from '../Carousel';

export default function UserStatements({ statements, handleStatementClick }) {
	const userStatementsMap = groupBy(
		statements,
		(statement) => statement.user._id
	);

	return (
		<>
			{Object.entries(userStatementsMap).map(([userId, userStatements]) => (
				<div key={userId}>
					<Row className="mb-2 justify-content-between animated--grow-in">
						<Col className="text-center">
							<h6
								className="text-muted"
								style={{
									fontWeight: '700',
									fontSize: 20,
								}}
							>
								{userStatements[0].user.name} {userStatements[0].user.surname}
							</h6>
							<h6
								className="text-muted pill-label"
								style={{
									fontWeight: '700',
									fontSize: 15,
								}}
							>
								{userStatements.length}
							</h6>
						</Col>
					</Row>

					<CarouselComponent
						objects={userStatements}
						renderItem={(userStatements) => (
							<>
								<Row>
									<Col>
										<CardTitle
											style={{
												textAlign: 'justify',
												fontWeight: '700',
												fontSize: 15,
											}}
											className="text-light-cornflower-blue mb-2"
										>
											{userStatements.semester.type}{' '}
											{userStatements.semester.academicYear}
										</CardTitle>
									</Col>
									<Col xs="auto" className="text-right">
										<small
											className={
												userStatements.type === AssessmentType.Assessment
													? 'text-success'
													: 'text-warning'
											}
											style={{
												textAlign: 'justify',
												fontWeight: '700',
												fontSize: 12,
											}}
										>
											{userStatements.type}
										</small>
									</Col>
								</Row>
								<CardText className="text-align">
									<small
										className="pill-label text-muted"
										style={{
											textAlign: 'justify',
											fontWeight: '700',
											fontSize: 13,
										}}
									>
										Courses
									</small>
									<small
										className="text-muted"
										style={{
											textAlign: 'justify',
											fontWeight: '700',
											fontSize: 13,
										}}
									>
										{userStatements.teaching.length}
									</small>
								</CardText>
							</>
						)}
						onObjectClick={(userStatements) => {
							handleStatementClick(userStatements);
						}}
					/>
				</div>
			))}
		</>
	);
}
