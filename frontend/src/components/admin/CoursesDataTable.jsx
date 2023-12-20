import { useState, forwardRef, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import {
	deleteCourse,
	activateCourse,
	deActivateCourse,
	setEditCourse,
} from '../../features/courses/courseSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { deleteAlert } from '../../constants/sweetAlertNotification';
import DataTable from '../DataTable';
import Switch from 'react-switch';
import CourseForm from '../../components/course/forms/CourseForm';
import Spinner from '../../components/boilerplate/spinners/Spinner';

export default function CoursesDataTable({
	courses,
	cycles,
	coursesIsLoading,
	isEditingCourse,
	editCourseId,
	dispatch,
}) {
	const modalRef = useRef(null);
	const [modal, setModal] = useState(false);
	const [currentCourse, setCurrentCourse] = useState({
		courseId: '',
		title: '',
		type: '',
		isObligatory: '',
		hasPrerequisites: '',
		hasLab: '',
		description: '',
		semester: '',
		ects: '',
		year: '',
		cycle: '',
		prerequisites: [],
		isActive: '',
	});

	const navigate = useNavigate();

	const toggle = () => {
		setModal(!modal);
		dispatch(
			setEditCourse({
				isEditingCourse: false,
				editCourseId: '',
			})
		);
	};

	const handleSwitchToggle = (courseId, checked) => {
		if (checked) dispatch(activateCourse(courseId));
		else dispatch(deActivateCourse(courseId));
	};

	const handleCourseRowClick = (course) => {
		navigate(`/course/${course._id}`);
	};

	const ModalComponent = forwardRef((props, ref) => {
		return (
			<Modal ref={ref} isOpen={modal} toggle={toggle} className="modal-lg">
				<ModalHeader toggle={toggle}>
					Edit Course (
					<span style={{ fontWeight: 'bold', fontSize: '21px' }}>
						{currentCourse.title}
					</span>
					)
				</ModalHeader>
				<ModalBody>
					<CourseForm
						course={currentCourse}
						courses={courses}
						cycles={cycles}
						isEditingCourse={isEditingCourse}
						editCourseId={editCourseId}
						dispatch={dispatch}
					/>
				</ModalBody>
			</Modal>
		);
	});

	const dataTableConfig = [
		{
			name: 'courseId',
			label: 'Course ID',
			render: (course) => course.courseId,
		},
		{
			name: 'title',
			label: 'Title',
			render: (course) => course.title,
		},
		{
			name: 'type',
			label: 'Type',
			render: (course) => course.type,
		},
		{
			name: 'hasPrerequisites',
			label: 'Prerequisites',
			render: (course) => (course.hasPrerequisites ? 'Yes' : 'No'),
		},
		{
			name: 'hasLab',
			label: 'Lab',
			render: (course) => (course.hasLab ? 'Yes' : 'No'),
		},
		{
			name: 'isObligatory',
			label: 'Obligatory',
			render: (course) => (course.isObligatory ? 'Yes' : 'No'),
		},
		{
			name: 'isActive',
			label: 'Active',
			render: (course) => (
				<Switch
					onChange={(checked, event) => {
						event.stopPropagation();
						handleSwitchToggle(course._id, checked);
					}}
					checked={course.isActive}
					uncheckedIcon={false}
					checkedIcon={false}
					onColor="#3ea37d"
					offColor="#bfcbd9"
				/>
			),
		},
		{
			name: 'actions',
			label: 'Actions',
			render: (course) => (
				<Row
					id="actionsTooltip"
					style={{
						width: '150px',
						pointerEvents: course.isActive ? 'none' : 'auto',
						opacity: course.isActive ? 0.6 : 1,
					}}
				>
					<Col xs="6" sm="4" className="mb-2">
						<Button
							className="btn btn-light"
							onClick={(e) => {
								e.stopPropagation();
								dispatch(setEditCourse({ editCourseId: course._id }));
								setCurrentCourse(course);
								setModal(true);
							}}
						>
							<FontAwesomeIcon icon={faEdit} />
						</Button>
					</Col>
					<Col sm="4">
						<Button
							className="btn btn-light"
							onClick={async (e) => {
								e.stopPropagation();
								deleteAlert(() => dispatch(deleteCourse(course._id)));
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
			<div className="card card-body">
				{coursesIsLoading ? (
					<Spinner card />
				) : (
					<>
						<DataTable
							data={courses}
							config={dataTableConfig}
							sortColumns={['courseId', 'title']}
							searchMessage={'by Title or ID'}
							onRowClick={(course) => handleCourseRowClick(course)}
						/>
						{isEditingCourse ? <ModalComponent ref={modalRef} /> : null}
					</>
				)}
			</div>
		</>
	);
}
