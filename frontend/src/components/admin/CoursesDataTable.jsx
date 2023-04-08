import { useState, useEffect, forwardRef, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	Row,
	Col,
	Table,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	FormGroup,
	Label,
	Input,
} from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {
	updateCourse,
	deleteCourse,
	activateCourse,
	resetCourses,
} from '../../features/courses/courseSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { Toast } from '../../constants/sweetAlertNotification';
import { CourseSchema } from '../../schemas/course/Course';
import CourseForm from '../../components/course/CourseForm';
import SubmitButton from '../../components/buttons/SubmitButton';
import FormErrorMessage from '../FormErrorMessage';
import Spinner from '../../components/boilerplate/Spinner';

export default function CoursesDataTable({ courses, cycles, semesters }) {
	const { isLoading, isSuccess } = useSelector((state) => state.courses);

	const [isMounted, setIsMounted] = useState(true);
	const myRef = useRef(null);

	const [isEditting, setIsEditting] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [sortColumn, setSortColumn] = useState('courseId');
	const [sortOrder, setSortOrder] = useState('asc');
	const [currentPage, setCurrentPage] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(10);
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

	useEffect(() => {
		if (isSuccess) {
			Toast.fire({
				title: 'Success',
				text: 'Course activated!',
				icon: 'success',
			});
			navigate('/admin/dashboard');
		}
	});

	const toggle = () => setModal(!modal);

	const viewCourse = (course) => {
		navigate(`/course/${course}`);
	};

	const activateC = (course) => {
		dispatch(activateCourse(course._id));
	};

	const editC = (course) => {
		setCurrentCourse(course);
		setModal(true);
	};

	const updateC = () => {
		if (isMounted) {
			dispatch(updateCourse(currentCourse));
			setModal(false);
		}
	};

	const deleteC = (course) => {
		dispatch(deleteCourse(course._id));
	};

	const handlePageClick = (event) => {
		setCurrentPage(Number(event.target.id));
	};

	const handleItemsPerPageChange = (event) => {
		setItemsPerPage(Number(event.target.value));
		setCurrentPage(0);
	};

	const handleSearchQueryChange = (e) => {
		setSearchQuery(e.target.value);
	};

	const handleSort = (column) => {
		if (sortColumn === column) {
			setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
		} else {
			setSortColumn(column);
			setSortOrder('asc');
		}
	};

	const sortedCourses = [...courses].sort((a, b) => {
		if (sortOrder === 'asc') {
			return a[sortColumn].localeCompare(b[sortColumn]);
		}
		return b[sortColumn].localeCompare(a[sortColumn]);
	});

	const filteredCourses = sortedCourses.filter((course) => {
		const matchTitle = course.title.toLowerCase().includes(searchQuery.toLowerCase());
		const matchID = course.courseId.toLowerCase().includes(searchQuery.toLowerCase());
		return matchTitle || matchID;
	});

	const indexOfLastItem = (currentPage + 1) * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentCourses = filteredCourses.slice(indexOfFirstItem, indexOfLastItem);

	const pageNumbers = [];
	for (let i = 0; i < Math.ceil(filteredCourses.length / itemsPerPage); i++) {
		pageNumbers.push(i);
	}

	const renderPageNumbers = pageNumbers.map((number) => {
		return (
			<Button
				className="text-gray-500"
				key={number}
				id={number}
				color="null"
				onClick={handlePageClick}
			>
				{number + 1}
			</Button>
		);
	});

	const itemsPerPageOptions = [10, 25, 50, 100];
	const renderItemsPerPageOptions = itemsPerPageOptions.map((option) => {
		return (
			<option key={option} value={option}>
				{option}
			</option>
		);
	});

	const coursesFound = currentCourses.map((course) => {
		return (
			<tr key={course._id} onClick={() => viewCourse(course._id)}>
				<th
					scope="row"
					onClick={(e) => {
						e.stopPropagation();
						handleSort('courseId');
					}}
				>
					{course.courseId}
				</th>
				<td
					onClick={(e) => {
						e.stopPropagation();
						handleSort('title');
					}}
				>
					{course.title}
				</td>
				<td>{course.type}</td>
				<td>{course.hasPrerequisites ? 'Yes' : 'No'}</td>
				<td>{course.hasLab ? 'Yes' : 'No'}</td>
				<td>{course.isObligatory ? 'Yes' : 'No'}</td>
				<td>{course.isActive ? 'Yes' : 'No'}</td>
				<td>
					<Row style={{ width: '150px' }}>
						{!course.isActive ? (
							<>
								<Col xs="6" sm="4" className="mb-2">
									<Button
										className="btn btn-light"
										onClick={(e) => {
											e.stopPropagation();
											activateC(course);
										}}
									>
										<FontAwesomeIcon icon={faCheck} />
									</Button>
								</Col>
							</>
						) : null}
						<Col xs="6" sm="4" className="mb-2">
							<Button
								className="btn btn-light"
								onClick={(e) => {
									e.stopPropagation();
									editC(course);
									setIsEditting(true);
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
									deleteC(course);
								}}
							>
								<FontAwesomeIcon icon={faTrashAlt} />
							</Button>
						</Col>
					</Row>
				</td>
			</tr>
		);
	});

	const ModalComponent = forwardRef((props, myRef) => {
		return (
			<Modal ref={myRef} isOpen={modal} toggle={toggle} className="modal-lg">
				<ModalHeader toggle={toggle}>Edit Course ({currentCourse.title})</ModalHeader>
				<ModalBody>
					<Formik
						initialValues={{
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
							prerequisites: '',
							isActive: '',
						}}
						validationSchema={CourseSchema}
						onSubmit={(values, { setSubmitting }) => {
							const course = {
								courseId: values.courseId,
								title: values.title,
								type: values.type,
								isObligatory: values.isObligatory,
								hasPrerequisites: values.hasPrerequisites,
								hasLab: values.hasLab,
								description: values.description,
								semester: values.semester,
								ects: values.ects,
								year: values.year,
								cycle: values.cycle,
								prerequisites: values.prerequisites,
								isActive: values.isActive,
							};
							if (isMounted) {
								console.log(course);
								dispatch(updateC(course));
								dispatch(resetCourses());
								setModal(false);
								setSubmitting(false);
								setIsMounted(false);
								navigate('/admin/dashboard');
							}
						}}
						validateOnMount
					>
						{({ values, setFieldValue }) => (
							<Form>
								<CourseForm
									courses={courses}
									cycles={cycles}
									semesters={semesters}
									values={values}
									setFieldValue={setFieldValue}
									isEditting={isEditting}
								/>
							</Form>
						)}
					</Formik>
				</ModalBody>
			</Modal>
		);
	});

	useEffect(() => {
		return () => {
			setIsMounted(false);
		};
	}, []);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<Row>
				<Col>
					<Input
						type="text"
						placeholder="Search by username or surname . . ."
						value={searchQuery}
						onChange={handleSearchQueryChange}
					/>
				</Col>
				<Col xs="3" sm="2" md="2" lg="2" xl="1" className="d-flex justify-content-end">
					<select
						value={itemsPerPage}
						onChange={handleItemsPerPageChange}
						className="form-control"
					>
						{renderItemsPerPageOptions}
					</select>
				</Col>
			</Row>
			{coursesFound.length === 0 ? (
				<span className="mt-4 mb-4 text-gray-500 font-weight-bold">
					There are no entries for your current search
				</span>
			) : (
				<Table className="mt-3" responsive hover>
					<thead>
						<tr>
							<th>ID</th>
							<th>Title</th>
							<th>Type</th>
							<th>Prerequisites</th>
							<th>Lab</th>
							<th>Obligatory</th>
							<th>Active</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>{coursesFound}</tbody>
				</Table>
			)}
			<Row>
				<Col sm="6" xs="6" md="6">
					<span className="text-gray-500">
						Showing {indexOfFirstItem + 1} to{' '}
						{Math.min(indexOfLastItem, filteredCourses.length)} of{' '}
						{filteredCourses.length} entries
					</span>
				</Col>
				<Col className="d-flex justify-content-end">
					<span id="page-numbers">{renderPageNumbers}</span>
				</Col>
			</Row>
			<ModalComponent ref={myRef} />
		</>
	);
}

{
	/* <Modal className="modal-dialog modal-content" isOpen={showDelete} toggle={toggleDelete}>
				<ModalHeader className="modal-header modal-title">
					Are you sure you want to delete this course?
				</ModalHeader>
				<ModalBody className="modal-body">
					If you confrim this action will delete this course permanently from the system.
				</ModalBody>
				<ModalFooter className="modal-footer">
					<Button
						className="btn btn-danger align-self-center"
						onClick={() => handleDeleteCourse()}
					>
						Confirm
					</Button>
				</ModalFooter>
			</Modal> */
}
