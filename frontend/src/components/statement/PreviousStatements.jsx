import { Row, Col, CardText, CardTitle } from 'reactstrap';
import { AssessmentType } from '../../constants/enums';
import Header from '../boilerplate/Header';
import Spinner from '../boilerplate/spinners/Spinner';
import SpinnerComponent from '../boilerplate/spinners/SpinnerMessage';
import CarouselComponent from '../Carousel';
import UserStatements from '../admin/UserStatements';

export default function PreviousStatements({
	user,
	semester,
	statements,
	previousStatements,
	isSemesterLoading,
	isStatementsLoading,
	handleStatementClick,
}) {
	return (
		<>
			<Row className="mt-4 mb-3 justify-content-between animated--grow-in">
				<Col className="text-center">
					<Header
						title={
							user.user.isAdmin ? 'User Statements' : 'Previous Statements'
						}
					/>
					{previousStatements.length ? (
						<h6
							className="text-muted pill-label"
							style={{
								fontWeight: '700',
								fontSize: 15,
							}}
						>
							{previousStatements.length}
						</h6>
					) : null}
				</Col>
			</Row>

			{isSemesterLoading || isStatementsLoading ? (
				<Spinner card />
			) : statements.length > 0 && semester ? (
				user.user.isAdmin ? (
					<UserStatements
						statements={statements}
						handleStatementClick={handleStatementClick}
					/>
				) : previousStatements.length > 0 ? (
					<CarouselComponent
						objects={previousStatements}
						renderItem={(statement) => (
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
											{statement.semester.type}{' '}
											{statement.semester.academicYear}
										</CardTitle>
									</Col>
									<Col xs="auto" className="text-right">
										<small
											className={
												statement.type === AssessmentType.Assessment
													? 'text-success'
													: 'text-warning'
											}
											style={{
												textAlign: 'justify',
												fontWeight: '700',
												fontSize: 12,
											}}
										>
											{statement.type}
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
										{statement.teaching.length}
									</small>
								</CardText>
							</>
						)}
						onObjectClick={(statement) => {
							handleStatementClick(statement);
						}}
					/>
				) : (
					<Row className="justify-content-center">
						<Col xl="10">
							<div className="card shadow mb-5">
								<div className="card-body">
									<SpinnerComponent message="There are no previous statements." />
								</div>
							</div>
						</Col>
					</Row>
				)
			) : (
				<Row className="justify-content-center">
					<Col xl="10">
						<div className="card shadow mb-5">
							<div className="card-body">
								<SpinnerComponent
									message={
										user.user.isAdmin
											? 'There are no statements registered in the system.'
											: 'There are no previous statements.'
									}
								/>
							</div>
						</div>
					</Col>
				</Row>
			)}
		</>
	);
}
