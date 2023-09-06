import { useState, useRef, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { deleteSemester, setEditSemester } from '../../features/admin/semesterSlice';
import { deleteAlert } from '../../constants/sweetAlertNotification';
import moment from 'moment';
import DataTable from '../DataTable';
import SemesterForm from '../../components/admin/forms/SemesterForm';
import Spinner from '../../components/boilerplate/Spinner';
import { SemesterType } from '../../constants/enums';
import { academicYearEnd, academicYearStart } from '../../utils/academicYears';

export default function SemestersDataTable({ semesters }) {
	const { isLoading, isEditingSemester, editSemesterId } = useSelector(
		(state) => state.semesters
	);

	const modalRef = useRef(null);
	const [modal, setModal] = useState(false);
	const [currentSemester, setCurrentSemester] = useState({
		type: '',
		grading: 0,
		startDate: '',
		endDate: '',
	});

	const dispatch = useDispatch();

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
				<ModalHeader toggle={toggle}>Edit Semester ({currentSemester.type})</ModalHeader>
				<ModalBody>
					<SemesterForm
						semester={currentSemester}
						isEditingSemester={isEditingSemester}
						editSemesterId={editSemesterId}
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
				semester.type !== SemesterType.Any ? semester.grading + ' weeks' : 'unnecessary',
		},
		{
			name: 'startDate',
			label: 'Start Date',
			render: (semester) =>
				semester.type !== SemesterType.Any
					? moment(semester.startDate).format('DD/MM/YYYY')
					: `${academicYearStart}-${academicYearEnd}`,
		},
		{
			name: 'endDate',
			label: 'End Date',
			render: (semester) =>
				semester.type !== SemesterType.Any
					? moment(semester.endDate).format('DD/MM/YYYY')
					: `${academicYearStart}-${academicYearEnd}`,
		},
		{
			name: 'actions',
			label: 'Actions',
			render: (semester) => (
				<Row style={{ width: '150px' }}>
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
				{isLoading ? (
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
