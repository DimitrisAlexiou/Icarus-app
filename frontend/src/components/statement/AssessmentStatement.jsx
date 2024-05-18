import { Row, Col, Button, Spinner } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckDouble, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { AssessmentStatus, AssessmentType } from '../../constants/enums';
import StatementForm from '../statement/forms/StatementForm';
import StatementCard from '../statement/cards/StatementCard';
import PillHeader from '../boilerplate/headers/PillHeader';
import Loading from '../boilerplate/spinners/Spinner';
import SpinnerComponent from '../boilerplate/spinners/SpinnerMessage';

export default function AssessmentStatement({
	user,
	semester,
	assessment,
	isSemesterLoading,
	isStatementsLoading,
	isTeachingsLoading,
	canSubmitAvailableTeachings,
	assessmentIsAvailable,
	isStatementSubmitted,
	isEditingStatement,
	editStatementId,
	setEditStatement,
	currentStatement,
	handleFinalizeStatement,
	deleteStatement,
	deleteAlert,
	dispatch,
}) {
	return (
		<>
			<Row className="mt-3 mb-3 justify-content-between animated--grow-in">
				<Col className="text-center">
					<PillHeader title="Current Statement" />
				</Col>
			</Row>

			{isSemesterLoading || isStatementsLoading ? (
				<Loading card />
			) : !isStatementSubmitted || isEditingStatement ? (
				<Row className="justify-content-center animated--grow-in">
					<Col xl="8" lg="12" md="12">
						<div className="card shadow mb-5">
							{isTeachingsLoading ||
							(canSubmitAvailableTeachings &&
								canSubmitAvailableTeachings.length > 0) ? (
								<div
									style={{
										textDecoration: 'none',
										pointerEvents:
											assessment && assessmentIsAvailable ? 'auto' : 'none',
										opacity: assessment && assessmentIsAvailable ? 1 : 0.6,
									}}
								>
									<div className="card-header py-3">
										<Row className="align-items-center">
											<Col>
												<h6 className="m-0 font-weight-bold text-primary">
													{isEditingStatement
														? 'Update your current course statement'
														: 'Select from the available courses below to create a new course statement'}
												</h6>
											</Col>
											{isEditingStatement ? (
												<Col xs="2" className="text-right">
													<FontAwesomeIcon
														className="clickable"
														onClick={() =>
															dispatch(
																setEditStatement({
																	isEditingStatement: false,
																	editStatementId: '',
																})
															)
														}
														icon={faXmark}
													/>
												</Col>
											) : null}
										</Row>
									</div>
									<div className="card-body">
										<StatementForm
											statement={currentStatement}
											user={user}
											semester={semester}
											type={AssessmentType.Assessment}
											canSubmitAvailableTeachings={canSubmitAvailableTeachings}
											isEditingStatement={isEditingStatement}
											editStatementId={editStatementId}
											dispatch={dispatch}
										/>
									</div>
								</div>
							) : (
								<div className="card-body">
									<SpinnerComponent message="There are no active teachings." />
								</div>
							)}
						</div>
					</Col>
				</Row>
			) : (
				<>
					{assessmentIsAvailable &&
					currentStatement.condition.includes(AssessmentStatus.Pending) ? (
						<Row className="mb-3 justify-content-center animated--grow-in">
							<Col xs="auto" className="text-center">
								<Row>
									<Col>
										<Button
											className="btn btn-light"
											style={{
												fontWeight: 500,
												fontSize: 15,
											}}
											onClick={() => handleFinalizeStatement(currentStatement)}
										>
											{isStatementsLoading ? (
												<Spinner size="sm" color="dark" type="grow" />
											) : (
												<FontAwesomeIcon icon={faCheckDouble} />
											)}
										</Button>
									</Col>
									<Col>
										<Button
											className="btn btn-light"
											style={{
												fontWeight: 500,
												fontSize: 15,
											}}
											onClick={() =>
												dispatch(
													setEditStatement({
														editStatementId: currentStatement._id,
													})
												)
											}
										>
											<FontAwesomeIcon icon={faEdit} />
										</Button>
									</Col>
									<Col>
										<Button
											className="btn btn-light"
											style={{
												fontWeight: 500,
												fontSize: 15,
											}}
											onClick={() =>
												deleteAlert(() =>
													dispatch(deleteStatement(currentStatement._id))
												)
											}
										>
											{isStatementsLoading ? (
												<Spinner size="sm" color="dark" type="grow" />
											) : (
												<FontAwesomeIcon icon={faTrashAlt} />
											)}
										</Button>
									</Col>
								</Row>
							</Col>
						</Row>
					) : null}
					<Row className="justify-content-center animated--grow-in">
						<Col xs="12" sm="12" md="12" lg="10" xl="10">
							<div className="card shadow mb-4">
								<div className="card-body">
									<StatementCard statement={currentStatement} />
								</div>
							</div>
						</Col>
					</Row>
				</>
			)}
		</>
	);
}
