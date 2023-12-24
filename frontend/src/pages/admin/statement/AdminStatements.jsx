import { forwardRef } from 'react';
import {
	Row,
	Col,
	Card,
	CardBody,
	Modal,
	ModalBody,
	ModalHeader,
} from 'reactstrap';
import useAdminStatements from '../../../hooks/admin/useAdminStatements';
import useModal from '../../../hooks/generic/useModal';
import StatementCard from '../../../components/course/cards/StatementCard';
import CurrentSemester from '../../../components/boilerplate/CurrentSemester';
import Spinner from '../../../components/boilerplate/spinners/Spinner';
import PreviousStatements from '../../../components/statement/PreviousStatements';

export default function Statements() {
	const {
		user,
		semester,
		statements,
		isSemesterLoading,
		isAssessmentLoading,
		isStatementsLoading,
		assessmentIsAvailable,
		vaccineIsAvailable,
		assessmentEndDate,
		vaccineEndDate,
		previousStatements,
	} = useAdminStatements();

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
				<Col xl="3" lg="5" md="4" className="text-center mb-3">
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
										? `Statements available to submit until ${assessmentEndDate.toDateString()}`
										: `Statement submission expired at ${assessmentEndDate.toDateString()}`}
								</small>
							)}
						</CardBody>
					</Card>
				</Col>
				<CurrentSemester />
			</Row>
			{vaccineIsAvailable ? (
				<Row className="d-flex justify-content-end">
					<Col xs="auto" className="text-center">
						<Card className="card-note">
							<CardBody>
								{isAssessmentLoading ? (
									<Spinner card />
								) : (
									<small
										className="text-info"
										style={{
											textAlign: 'justify',
											fontWeight: '700',
											fontSize: 15,
										}}
									>
										Vaccine statements available until{' '}
										{vaccineEndDate.toDateString()}
									</small>
								)}
							</CardBody>
						</Card>
					</Col>
				</Row>
			) : null}

			<PreviousStatements
				user={user}
				semester={semester}
				statements={statements}
				previousStatements={previousStatements}
				isSemesterLoading={isSemesterLoading}
				isStatementsLoading={isStatementsLoading}
				handleStatementClick={handleStatementClick}
			/>

			<ModalComponent toggle={closeModal} />
		</>
	);
}
