import { useState, useRef, forwardRef } from 'react';
import { Button, Row, Col, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import {
	deleteSemester,
	setEditSemester,
} from '../../features/admin/semesterSlice';
import { deleteAlert } from '../../constants/sweetAlertNotification';
import { SemesterType } from '../../constants/enums';
import moment from 'moment';
import DataTable from '../DataTable';
import SemesterForm from '../../components/admin/forms/SemesterForm';
import Spinner from '../../components/boilerplate/spinners/Spinner';

export default function SemestersDataTable({
	semesters,
	semestersIsLoading,
	isEditingSemester,
	editSemesterId,
	dispatch,
}) {
	const modalRef = useRef(null);
	const [modal, setModal] = useState(false);
	const [currentSemester, setCurrentSemester] = useState({
		type: '',
		grading: 0,
		startDate: '',
		endDate: '',
	});

	const toggle = () => {
		setModal(!modal);
		dispatch(
			setEditSemester({
				isEditingSemester: false,
				editSemesterId: '',
			})
		);
	};

	const ModalComponent = forwardRef((props, ref) => {
		return (
			<Modal ref={ref} isOpen={modal} toggle={toggle} className="modal-lg">
				<ModalHeader toggle={toggle}>
					Edit Semester (
					<span style={{ fontWeight: 'bold', fontSize: '21px' }}>
						{currentSemester.type}
					</span>
					)
				</ModalHeader>
				<ModalBody>
					<SemesterForm
						semester={currentSemester}
						isEditingSemester={isEditingSemester}
						editSemesterId={editSemesterId}
						dispatch={dispatch}
					/>
				</ModalBody>
			</Modal>
		);
	});

	const dataTableConfig = [
		{
			name: 'type',
			label: 'Type',
			render: (semester) => semester.type,
		},
		{
			name: 'grading',
			label: 'Grading Period',
			render: (semester) =>
				semester.type !== SemesterType.Any
					? semester.grading + ' weeks'
					: 'unnecessary',
		},
		{
			name: 'startDate',
			label: 'Start Date',
			render: (semester) => moment(semester.startDate).format('DD/MM/YYYY'),
		},
		{
			name: 'endDate',
			label: 'End Date',
			render: (semester) => moment(semester.endDate).format('DD/MM/YYYY'),
		},
		{
			name: 'actions',
			label: 'Actions',
			render: (semester) => (
				<Row style={{ width: '150px' }}>
					{semester.type !== SemesterType.Any ? (
						<Col xs="6" sm="4" className="mb-2">
							<Button
								className="btn btn-light"
								onClick={() => {
									dispatch(setEditSemester({ editSemesterId: semester._id }));
									setCurrentSemester(semester);
									setModal(true);
								}}
							>
								<FontAwesomeIcon icon={faEdit} />
							</Button>
						</Col>
					) : null}
					<Col sm="4">
						<Button
							className="btn btn-light"
							onClick={() =>
								deleteAlert(() => dispatch(deleteSemester(semester._id)))
							}
						>
							<FontAwesomeIcon icon={faTrashAlt} />
						</Button>
					</Col>
				</Row>
			),
		},
	];

	return (
		<>
			<div className="card card-body">
				{semestersIsLoading ? (
					<Spinner card />
				) : (
					<>
						<DataTable
							data={semesters}
							config={dataTableConfig}
							sortColumns={['type', 'startDate']}
							searchMessage={'by Start Date'}
						/>
						{isEditingSemester ? <ModalComponent ref={modalRef} /> : null}
					</>
				)}
			</div>
		</>
	);
}
