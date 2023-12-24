import { forwardRef } from 'react';
import { Row, Col, Modal, ModalHeader, ModalBody } from 'reactstrap';
import useStudents from '../../../hooks/admin/useStudents';
import useModal from '../../../hooks/generic/useModal';
import DataTable from '../../../components/DataTable';
import UserCard from '../../../components/admin/cards/UserCard';
import Spinner from '../../../components/boilerplate/spinners/Spinner';
import SpinnerComponent from '../../../components/boilerplate/spinners/SpinnerMessage';

export default function Students() {
	const { modal, selectedItem, openModal, closeModal } = useModal();
	const { students, isLoading, dataTableConfig } = useStudents({ openModal });

	const ModalComponent = forwardRef((props, ref) => {
		return (
			<Modal ref={ref} isOpen={modal} toggle={closeModal} className="modal-lg">
				<ModalHeader toggle={closeModal}>User Information</ModalHeader>
				<ModalBody>
					<UserCard student={selectedItem} />
				</ModalBody>
			</Modal>
		);
	});

	return (
		<>
			<h3 className="mb-4 text-gray-800 font-weight-bold animated--grow-in">
				Students
			</h3>

			{isLoading ? (
				<Spinner card />
			) : students.length > 0 ? (
				<Row className="justify-content-center animated--grow-in">
					<Col
						className="card card-body mb-4"
						xs="12"
						sm="12"
						md="12"
						lg="12"
						xl="12"
					>
						<DataTable
							data={students}
							config={dataTableConfig}
							sortColumns={['name', 'surname', 'studentId', 'entranceYear']}
							searchMessage={'by Name or Surname'}
						/>
					</Col>
				</Row>
			) : (
				<Row className="justify-content-center animated--grow-in mb-3">
					<Col>
						<div className="profile_card">
							<div className="card-body">
								<SpinnerComponent message="There are no Students registered in the system." />
							</div>
						</div>
					</Col>
				</Row>
			)}

			<ModalComponent toggle={closeModal} />
		</>
	);
}
