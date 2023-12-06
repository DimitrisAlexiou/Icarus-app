import { forwardRef } from 'react';
import {
	Row,
	Col,
	CardTitle,
	CardText,
	Card,
	CardBody,
	Modal,
	ModalBody,
	ModalHeader,
	Button,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { deleteAlert } from '../../constants/sweetAlertNotification';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import useStatements from '../../hooks/user/useStatements';
import useModal from '../../hooks/generic/useModal';
import StatementCard from '../../components/course/cards/StatementCard';
import StatementForm from '../../components/user/forms/StatementForm';
import UserStatements from '../../components/admin/UserStatements';
import CarouselComponent from '../../components/Carousel';
import CurrentSemester from '../../components/boilerplate/CurrentSemester';
import Spinner from '../../components/boilerplate/spinners/Spinner';
import SpinnerComponent from '../../components/boilerplate/spinners/SpinnerMessage';
import Header from '../../components/boilerplate/Header';

export default function Statements() {
	const {
		semester,
		isSemesterLoading,
		assessment,
		isAssessmentLoading,
		statements,
		statement,
		isStatementsLoading,
		isEditingStatement,
		editStatementId,
		isTeachingsLoading,
		user,
		deleteStatement,
		setEditStatement,
		assessmentIsAvailable,
		assessmentEndDate,
		availableTeachings,
		isStatementSubmitted,
		currentStatement,
		getStudentStatements,
		dispatch,
	} = useStatements();

	const { modal, selectedItem, openModal, closeModal } = useModal();

	const handleStatementClick = (statement) => {
		openModal(statement);
	};

	const ModalComponent = forwardRef((props, ref) => {
		return (
			<Modal ref={ref} isOpen={modal} toggle={closeModal} className="modal-lg">
				<ModalHeader toggle={closeModal}>Statement Information</ModalHeader>
				<ModalBody>
					<StatementCard statement={selectedItem} />
				</ModalBody>
			</Modal>
		);
	});

	return (
		<>
			<Row className="mb-4 animated--grow-in">
				<Col>
					<h3 className="text-gray-800 font-weight-bold">Statements</h3>
				</Col>
				<Col xl="3" md="6" className="text-right mb-3">
					<Card className="card-note">
						<CardBody>
							{isAssessmentLoading ? (
								<Spinner card />
							) : (
								<small
									className={`text-${
										assessmentIsAvailable ? 'success' : 'muted text-gray-500'
									}`}
									style={{
										textAlign: 'justify',
										fontWeight: '700',
										fontSize: 15,
									}}
								>
									{assessmentIsAvailable
										? `Statements are available to submit until ${assessmentEndDate.toDateString()}`
										: `Statement submission expired at ${assessmentEndDate.toDateString()}`}
								</small>
							)}
						</CardBody>
					</Card>
				</Col>
				<CurrentSemester />
			</Row>
			<Row className="mt-5 mb-4 justify-content-between animated--grow-in">
				<Col className="text-center">
					<Header
						title={
							user.user.isAdmin ? 'User Statements' : 'Previous Statements'
						}
					/>
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
				) : (
					<CarouselComponent
						objects={statements}
						renderItem={(statement) => (
							<>
								<CardTitle
									style={{
										textAlign: 'justify',
										fontWeight: '700',
										fontSize: 15,
									}}
									className="text-light-cornflower-blue mb-2"
								>
									{statement.semester.type} {statement.semester.academicYear}
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
										{statement.teaching.length}
									</small>
								</CardText>
							</>
						)}
						onObjectClick={(statement) => {
							handleStatementClick(statement);
						}}
					/>
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

			<ModalComponent toggle={closeModal} />

			<Row className="mt-3 mb-3 justify-content-between animated--grow-in">
				<Col className="text-center">
					<Header title="Current Statement" />
				</Col>
			</Row>

			{isSemesterLoading || isStatementsLoading ? (
				<Spinner card />
			) : !isStatementSubmitted || isEditingStatement ? (
				<Row className="justify-content-center animated--grow-in">
					<Col xl="7" lg="11" md="12">
						<div className="card shadow mb-5">
							{isTeachingsLoading ||
							(availableTeachings && availableTeachings.length > 0) ? (
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
											statement={statement}
											user={user}
											semester={semester}
											availableTeachings={availableTeachings}
											isEditingStatement={isEditingStatement}
											editStatementId={editStatementId}
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
					{assessmentIsAvailable ? (
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
