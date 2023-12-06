import { CardText, CardTitle, Row } from 'reactstrap';
import CarouselComponent from '../Carousel';

export default function UserStatements({ statements, handleStatementClick }) {
	const userStatementsMap = statements.reduce((acc, statement) => {
		const userId = statement.user._id;
		if (!acc[userId]) acc[userId] = [];

		acc[userId].push(statement);
		return acc;
	}, {});

	return (
		<>
			{Object.entries(userStatementsMap).map(([userId, userStatements]) => (
				<div key={userId}>
					<Row className="mb-3 text-center">
						<label>
							<b
								style={{
									fontWeight: '700',
									fontSize: 20,
								}}
							>
								{userStatements[0].user.name} {userStatements[0].user.surname}
							</b>
						</label>
					</Row>

					<CarouselComponent
						objects={userStatements}
						renderItem={(userStatements) => (
							<>
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
