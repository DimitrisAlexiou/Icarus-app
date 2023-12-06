import { useRef, useState, forwardRef } from 'react';
import { Row, Col, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useInstructors from '../../hooks/admin/useInstructors';
import AssignInstructorFormDataTable from '../../components/course/forms/AssignInstructorFormDataTable';
import DataTable from '../../components/DataTable';
import Spinner from '../../components/boilerplate/spinners/Spinner';
import SpinnerComponent from '../../components/boilerplate/spinners/SpinnerMessage';
import Header from '../../components/boilerplate/Header';

export default function Instructors() {
	const { instructors, isLoading } = useInstructors();

	const modalRef = useRef(null);
	const [modal, setModal] = useState(false);
	const [currentInstructor, setCurrentInstructor] = useState(null);

	const toggle = () => {
		setModal(!modal);
		setCurrentInstructor(null);
	};

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
				<ModalHeader toggle={toggle}>
					Assign Instructor (
					<span style={{ fontWeight: 'bold', fontSize: '21px' }}>
						{currentInstructor}
					</span>
					)
				</ModalHeader>
				<ModalBody>
					<Row className="justify-content-between animated--grow-in">
						<Col className="text-center">
							<Header title="active teachings" />
						</Col>
					</Row>
					<AssignInstructorFormDataTable setModal={setModal} />
				</ModalBody>
			</Modal>
		);
	});

	return (
		<>
			<h3 className="mb-4 text-gray-800 font-weight-bold animated--grow-in">
				Instructors
			</h3>

			{isLoading ? (
				<Spinner card />
			) : instructors.length > 0 ? (
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
								<SpinnerComponent message="There are no Instructors registered in the system." />
							</div>
						</div>
					</Col>
				</Row>
			)}

			<ModalComponent ref={modalRef} toggle={toggle} />
		</>
	);
}
