import { useEffect, useRef, useState, forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { getInstructors, resetUsers } from '../../features/admin/userSlice';
import { faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AssignInstructorForm from '../../components/course/forms/AssignInstructorForm';
import DataTable from '../../components/DataTable';
import Spinner from '../../components/boilerplate/Spinner';

export default function Instructors() {
	const { instructors, isLoading } = useSelector((state) => state.users);

	const modalRef = useRef(null);
	const [modal, setModal] = useState(false);
	const [selectedTeaching, setSelectedTeaching] = useState(null);
	const [currentInstructor, setCurrentInstructor] = useState(null);

	const toggle = () => {
		setModal(!modal);
	};

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getInstructors());
		dispatch(resetUsers());
	}, [dispatch]);

	const dataTableConfig = [
		{
			name: 'name',
			label: 'Name',
			render: (instructor) => instructor.user.name,
		},
		{
			name: 'surname',
			label: 'Surname',
			render: (instructor) => instructor.user.surname,
		},
		{
			name: 'email',
			label: 'Email',
			render: (instructor) => instructor.user.email,
		},
		{
			name: 'degree',
			label: 'Degree',
			render: (instructor) => instructor.degree,
		},
		{
			name: 'facultyType',
			label: 'Faculty Type',
			render: (instructor) => instructor.facultyType,
		},
		{
			name: 'admissionYear',
			label: 'Admission Year',
			render: (instructor) => instructor.instructorEntranceYear,
		},
		{
			name: 'actions',
			label: 'Actions',
			render: (instructor) => (
				<Row style={{ width: '150px' }}>
					{!instructor.user.isActive ? (
						<Col xs="6" sm="4" className="mb-2">
							<Button
								className="btn btn-light"
								onClick={() => {
									setCurrentInstructor(instructor.user.surname);
									setModal(true);
								}}
							>
								<FontAwesomeIcon icon={faChalkboardTeacher} />
							</Button>
						</Col>
					) : null}
				</Row>
			),
		},
	];

	const ModalComponent = forwardRef((props, ref) => {
		return (
			<Modal ref={ref} isOpen={modal} toggle={toggle} className="modal-lg">
				<ModalHeader toggle={toggle}>Assign Instructor ({currentInstructor})</ModalHeader>
				<ModalBody>
					{/* <AssignInstructorForm
						teaching={selectedTeaching}
						setModal={setModal}
						instructors={instructors}
						isEditingInstructors={isEditingInstructors}
					/> */}
				</ModalBody>
			</Modal>
		);
	});

	return (
		<>
			<h3 className="mb-4 text-gray-800 font-weight-bold animated--grow-in">Instructors</h3>

			{isLoading ? (
				<Spinner card />
			) : instructors.length > 0 ? (
				<Row className="justify-content-center animated--grow-in">
					<Col className="card card-body mb-4" xs="12" sm="12" md="12" lg="12" xl="12">
						<DataTable
							data={instructors}
							config={dataTableConfig}
							sortColumns={['name', 'surname', 'degree', 'admissionYear']}
							searchMessage={'by Name or Surname'}
						/>
					</Col>
				</Row>
			) : (
				<Row className="justify-content-center animated--grow-in mb-3">
					<Col>
						<div className="profile_card">
							<div className="card-body">
								<div className="align-items-center text-center">
									<span className="text-gray-500 animated--grow-in d-flex justify-content-center">
										There are no Instructors registered in the system.
									</span>
								</div>
							</div>
						</div>
					</Col>
				</Row>
			)}

			<ModalComponent ref={modalRef} toggle={toggle} />
		</>
	);
}
