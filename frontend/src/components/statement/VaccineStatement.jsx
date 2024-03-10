import { Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckDouble, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { AssessmentStatus, AssessmentType } from '../../constants/enums';
import StatementForm from '../user/forms/StatementForm';
import StatementCard from '../course/cards/StatementCard';
import PillHeader from '../boilerplate/headers/PillHeader';
import Spinner from '../boilerplate/spinners/Spinner';

export default function VaccineStatement({
	user,
	semester,
	assessment,
	isSemesterLoading,
	isStatementsLoading,
	isTeachingsLoading,
	canSubmitAvailableVaccineTeachings,
	vaccineIsAvailable,
	isVaccineSubmitted,
	isEditingVaccine,
	editStatementId,
	setEditVaccine,
	currentVaccine,
	handleFinalizeStatement,
	deleteStatement,
	deleteAlert,
	dispatch,
}) {
	return (
		<>
			<Row className="mt-3 mb-3 justify-content-between animated--grow-in">
				<Col className="text-center">
					<PillHeader title="Vaccine Statement" />
				</Col>
			</Row>

			{isSemesterLoading || isStatementsLoading ? (
				<Spinner card />
			) : !isVaccineSubmitted || isEditingVaccine ? (
				<Row className="justify-content-center animated--grow-in">
					<Col xl="8" lg="12" md="12">
						<div className="card shadow mb-5">
							{isTeachingsLoading ||
							(canSubmitAvailableVaccineTeachings &&
								canSubmitAvailableVaccineTeachings.length > 0) ? (
								<div
									style={{
										textDecoration: 'none',
										pointerEvents:
											assessment && vaccineIsAvailable ? 'auto' : 'none',
										opacity: assessment && vaccineIsAvailable ? 1 : 0.6,
									}}
								>
									<div className="card-header py-3">
										<Row className="align-items-center">
											<Col>
												<h6 className="m-0 font-weight-bold text-primary">
													{isEditingVaccine
														? 'Update your current vaccine course statement'
														: 'Select from the available courses below to create a new vaccine course statement'}
												</h6>
											</Col>
											{isEditingVaccine ? (
												<Col xs="2" className="text-right">
													<FontAwesomeIcon
														className="clickable"
														onClick={() =>
															dispatch(
																setEditVaccine({
																	isEditingVaccine: false,
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
											statement={currentVaccine}
											user={user}
											semester={semester}
											canSubmitAvailableTeachings={
												canSubmitAvailableVaccineTeachings
											}
											type={AssessmentType.Vaccine}
											isEditingVaccine={isEditingVaccine}
											editStatementId={editStatementId}
											dispatch={dispatch}
										/>
									</div>
								</div>
							) : (
								<div className="card-body">
									<Row className="text-gray-500">
										<Col className="text-center">
											<span>
												You haven't passed any teachings yet. Vaccine statements
												are allowed only for passed courses.
											</span>
										</Col>
									</Row>
								</div>
							)}
						</div>
					</Col>
				</Row>
			) : (
				<>
					{vaccineIsAvailable &&
					currentVaccine.condition === AssessmentStatus.Pending ? (
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
											onClick={() => handleFinalizeStatement(currentVaccine)}
										>
											<FontAwesomeIcon icon={faCheckDouble} />
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
													setEditVaccine({
														editStatementId: currentVaccine._id,
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
													dispatch(deleteStatement(currentVaccine._id))
												)
											}
										>
											<FontAwesomeIcon icon={faTrashAlt} />
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
									<StatementCard statement={currentVaccine} />
								</div>
							</div>
						</Col>
					</Row>
				</>
			)}
		</>
	);
}
