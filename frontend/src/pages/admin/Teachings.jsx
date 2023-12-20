import { useRef, useState, forwardRef } from 'react';
import { Row, Col, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faArrowUp91 } from '@fortawesome/free-solid-svg-icons';
import useTeachings from '../../hooks/admin/useTeachings';
import TeachingGradingForm from '../../components/course/forms/TeachingGradingForm';
import TeachingForm from '../../components/course/forms/TeachingForm';
import CustomSpinner from '../../components/boilerplate/spinners/Spinner';
import DataTable from '../../components/DataTable';
import SpinnerComponent from '../../components/boilerplate/spinners/SpinnerMessage';

export default function Teachings() {
	const {
		teachings,
		user,
		isLoading,
		isEditingTeaching,
		isEditingTeachingGrading,
		editTeachingId,
		instructorTeachings,
		setEditTeaching,
		setEditTeachingGrading,
		handleTeachingRowClick,
		handleDeleteTeachings,
		handleDeleteTeaching,
		dispatch,
	} = useTeachings();

	const modalRef = useRef(null);
	const modalGradingRef = useRef(null);
	const [modal, setModal] = useState(false);
	const [modalGrading, setModalGrading] = useState(false);

	const [currentTeaching, setCurrentTeaching] = useState({
		theoryWeight: 0,
		labWeight: 0,
		theoryGradeRetentionYears: 0,
		labGradeRetentionYears: 0,
		theoryGradeThreshold: 0,
		labGradeThreshold: 0,
		books: [],
		theoryInstructors: [],
		labInstructors: [],
	});

	const toggle = () => {
		setModal(!modal);
		dispatch(
			setEditTeaching({
				isEditingTeaching: false,
				editTeachingId: '',
			})
		);
	};

	const toggleGrading = () => {
		setModalGrading(!modalGrading);
		dispatch(
			setEditTeachingGrading({
				isEditingTeachingGrading: false,
				editTeachingId: '',
			})
		);
	};

	const ModalComponent = forwardRef((props, ref) => {
		return (
			<Modal ref={ref} isOpen={modal} toggle={toggle} className="modal-lg">
				<ModalHeader toggle={toggle}>
					Edit Teaching (
					<span style={{ fontWeight: 'bold', fontSize: '21px' }}>
						{currentTeaching?.course?.title}
					</span>
					)
				</ModalHeader>
				<ModalBody>
					<TeachingForm
						teaching={currentTeaching}
						isEditingTeaching={isEditingTeaching}
						editTeachingId={editTeachingId}
						setModal={setModal}
						dispatch={dispatch}
					/>
				</ModalBody>
			</Modal>
		);
	});

	const ModalGradingComponent = forwardRef((props, ref) => {
		return (
			<Modal
				ref={ref}
				isOpen={modalGrading}
				toggle={toggleGrading}
				className="modal-lg"
			>
				<ModalHeader toggle={toggleGrading}>
					{(currentTeaching?.theoryExamination?.length ?? 0) ||
					(currentTeaching?.labExamination?.length ?? 0) ? (
						<>
							Edit Grading (
							<span style={{ fontWeight: 'bold', fontSize: '21px' }}>
								{currentTeaching?.course?.title}
							</span>
							)
						</>
					) : (
						<>
							Configure Grading (
							<span style={{ fontWeight: 'bold', fontSize: '21px' }}>
								{currentTeaching?.course?.title}
							</span>
							)
						</>
					)}
				</ModalHeader>
				<ModalBody>
					<TeachingGradingForm
						user={user}
						teaching={currentTeaching}
						setModalGrading={setModalGrading}
						isEditingTeachingGrading={isEditingTeachingGrading}
						editTeachingId={editTeachingId}
						dispatch={dispatch}
					/>
				</ModalBody>
			</Modal>
		);
	});

	const dataTableConfig = [
		{
			name: 'course',
			label: 'Course Title',
			render: (teaching) => teaching.course.title,
		},
		{
			name: 'courseId',
			label: 'Course ID',
			render: (teaching) => teaching.course.courseId,
		},
		{
			name: 'semester',
			label: 'Semester',
			render: (teaching) => teaching.semester.type,
		},
		{
			name: 'actions',
			label: 'Actions',
			render: (teaching) => (
				<Row style={{ width: '150px' }}>
					<Col xs="4" sm="4" className="mb-2">
						<Button
							className="btn btn-light"
							onClick={(e) => {
								e.stopPropagation();
								dispatch(setEditTeaching({ editTeachingId: teaching._id }));
								setCurrentTeaching(teaching);
								setModal(true);
							}}
						>
							<FontAwesomeIcon icon={faEdit} />
						</Button>
					</Col>
					<Col xs="4" sm="4" className="mb-2">
						<Button
							className="btn btn-light"
							onClick={(e) => {
								e.stopPropagation();
								dispatch(
									setEditTeachingGrading({ editTeachingId: teaching._id })
								);
								setCurrentTeaching(teaching);
								setModalGrading(true);
							}}
						>
							<FontAwesomeIcon icon={faArrowUp91} />
						</Button>
					</Col>
					<Col xs="4" sm="4">
						<Button
							className="btn btn-light"
							onClick={(e) => {
								e.stopPropagation();
								handleDeleteTeaching(teaching);
							}}
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
			<Row className="mb-4 animated--grow-in">
				<Col xs="12" sm="12" md="5" lg="7" xl="8">
					<h3 className="text-gray-800 font-weight-bold animated--grow-in">
						Teachings
					</h3>
				</Col>
				{teachings.length && user.user.isAdmin ? (
					<Col
						xs="12"
						sm="12"
						md="7"
						lg="5"
						xl="4"
						className="text-sm-right text-center"
					>
						<Button
							className="btn btn-red align-self-center"
							color="null"
							onClick={() => handleDeleteTeachings()}
						>
							<FontAwesomeIcon icon={faTrashAlt} /> Delete Teachings
						</Button>
					</Col>
				) : null}
			</Row>

			{isLoading ? (
				<CustomSpinner card />
			) : instructorTeachings.length > 0 ? (
				<Row className="justify-content-center animated--grow-in">
					<Col
						className="card card-body mb-3"
						xs="12"
						sm="12"
						md="12"
						lg="12"
						xl="12"
					>
						<DataTable
							data={instructorTeachings}
							config={dataTableConfig}
							sortColumns={['course', 'courseId', 'semester']}
							searchMessage={'by Course or Course ID'}
							onRowClick={(teaching) => handleTeachingRowClick(teaching)}
						/>
					</Col>
				</Row>
			) : (
				<Row className="justify-content-center animated--grow-in mb-3">
					<Col>
						<div className="profile_card">
							<div className="card-body">
								<SpinnerComponent message="There are no active teachings in the system." />
							</div>
						</div>
					</Col>
				</Row>
			)}

			<ModalComponent ref={modalRef} toggle={toggle} />
			<ModalGradingComponent
				ref={modalGradingRef}
				toggleGrading={toggleGrading}
			/>
		</>
	);
}
