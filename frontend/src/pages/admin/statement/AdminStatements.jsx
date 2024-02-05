import { forwardRef } from 'react';
import { Row, Col, Modal, ModalBody, ModalHeader } from 'reactstrap';
import useAssessmentIsAvailable from '../../../hooks/user/useAssessmentIsAvailable';
import useAdminStatements from '../../../hooks/admin/useAdminStatements';
import useModal from '../../../hooks/generic/useModal';
import StatementCard from '../../../components/course/cards/StatementCard';
import CurrentSemester from '../../../components/boilerplate/CurrentSemester';
import PreviousStatements from '../../../components/statement/PreviousStatements';
import CurrentAssessment from '../../../components/boilerplate/CurrentAssessment';
import CurrentVaccine from '../../../components/boilerplate/CurrentVaccine';

export default function AdminStatements() {
	const {
		user,
		semester,
		statements,
		isSemesterLoading,
		statementsIsLoading,
		previousStatements,
	} = useAdminStatements();
	const {
		assessment,
		assessmentIsLoading,
		assessmentIsAvailable,
		assessmentEndDate,
		vaccineIsAvailable,
		vaccineEndDate,
	} = useAssessmentIsAvailable();

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
					<CurrentAssessment
						assessment={assessment}
						assessmentIsLoading={assessmentIsLoading}
						assessmentIsAvailable={assessmentIsAvailable}
						assessmentEndDate={assessmentEndDate}
					/>
				</Col>
				<CurrentSemester />
			</Row>
			{vaccineIsAvailable ? (
				<CurrentVaccine vaccineEndDate={vaccineEndDate} />
			) : null}

			<PreviousStatements
				user={user}
				semester={semester}
				statements={statements}
				previousStatements={previousStatements}
				isSemesterLoading={isSemesterLoading}
				statementsIsLoading={statementsIsLoading}
				handleStatementClick={handleStatementClick}
			/>

			<ModalComponent toggle={closeModal} />
		</>
	);
}
