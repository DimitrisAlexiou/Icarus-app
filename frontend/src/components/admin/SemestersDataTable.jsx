import { useState, useRef, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { deleteSemester, setEditSemester } from '../../features/admin/semesterSlice';
import { deleteAlert } from '../../constants/sweetAlertNotification';
import moment from 'moment';
import DataTable from '../DataTable';
import SemesterForm from '../../components/admin/SemesterForm';
import Spinner from '../../components/boilerplate/Spinner';

export default function SemestersDataTable({ semesters }) {
	const { isLoading, isEditingSemester, editSemesterId } = useSelector(
		(state) => state.semesters
	);

	const myRef = useRef(null);
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

	const ModalComponent = forwardRef((props, myRef) => {
		return (
			<Modal ref={myRef} isOpen={modal} toggle={toggle} className="modal-lg">
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
			render: (semester) => semester.grading + ' weeks',
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
							onClick={() => dispatch(deleteSemester(semester._id))}
						>
							<FontAwesomeIcon icon={faTrashAlt} />
						</Button>
					</Col>
				</Row>
			),
		},
	];

	if (isLoading) return <Spinner />;

	return (
		<>
			<div className="card card-body">
				{/* {isDeletingSemester ? (
					<Spinner card />
				) : ( */}
				<>
					<DataTable
						data={semesters}
						config={dataTableConfig}
						sortColumns={['type', 'startDate']}
						searchMessage={'by Start Date'}
					/>
					{isEditingSemester ? <ModalComponent ref={myRef} /> : null}
				</>
				{/* )} */}
			</div>
		</>
	);
}
