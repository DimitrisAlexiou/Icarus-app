import { useState, forwardRef, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
import { useThunk } from '../../hooks/use-thunk';
import { Toast } from '../../constants/sweetAlertNotification';
import DataTable from '../DataTable';
import Switch from 'react-switch';
import CourseForm from '../../components/course/CourseForm';
import Spinner from '../../components/boilerplate/Spinner';

export default function CoursesDataTable({ courses, cycles, semesters }) {
	const { isLoading, isEditingCourse, editCourseId } = useSelector((state) => state.courses);
	const [doDeleteCourse, isDeletingCourse, deletingCourseError] = useThunk(deleteCourse);

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

	const dispatch = useDispatch();
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
		if (checked) {
			dispatch(activateCourse(courseId));
		} else {
			dispatch(deActivateCourse(courseId));
		}
	};

	const handleCourseRowClick = (course) => {
		navigate(`/course/${course._id}`);
	};

	const ModalComponent = forwardRef((props, ref) => {
		const { modalRef } = props;

		return (
			<Modal ref={modalRef} isOpen={modal} toggle={toggle} className="modal-lg">
				<ModalHeader toggle={toggle}>Edit Course ({currentCourse.title})</ModalHeader>
				<ModalBody>
					<CourseForm
						course={currentCourse}
						courses={courses}
						cycles={cycles}
						semesters={semesters}
						isEditingCourse={isEditingCourse}
						editCourseId={editCourseId}
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
				<Row style={{ width: '150px' }}>
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
							onClick={(e) => {
								e.stopPropagation();
								doDeleteCourse(course);
								// deleteAlert(dispatch(deleteCourse(course._id)));
							}}
						>
							<FontAwesomeIcon icon={faTrashAlt} />
						</Button>
					</Col>
				</Row>
			),
		},
	];

	if (isLoading) return <Spinner />;

	if (deletingCourseError)
		Toast.fire({
			title: 'Something went wrong!',
			text: 'Course did not deleted. Please try again later.',
			// text: deletingCourseError,
			icon: 'error',
		});

	return (
		<>
			<div className="card card-body">
				{isDeletingCourse ? (
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
						{isEditingCourse ? <ModalComponent modalRef={modalRef} /> : null}
					</>
				)}
			</div>
		</>
	);
}
