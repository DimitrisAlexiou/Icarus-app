import { useState, useEffect, useRef, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Row, Col, Modal, ModalHeader, ModalBody, Input } from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { updateSemester, deleteSemester, resetSemester } from '../../features/admin/semesterSlice';
import { SemesterSchema } from '../../schemas/admin/Semester';
import { Toast } from '../../constants/sweetAlertNotification';
import SemesterForm from '../../components/admin/SemesterForm';
import SubmitButton from '../../components/buttons/SubmitButton';
import Spinner from '../../components/boilerplate/Spinner';

export default function SemestersDataTable({ semesters }) {
	const { isLoading, isError, isSuccess, message } = useSelector((state) => state.semesters);

	const [isMounted, setIsMounted] = useState(true);
	const myRef = useRef(null);

	const [isEditting, setIsEditting] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [sortColumn, setSortColumn] = useState('type');
	const [sortOrder, setSortOrder] = useState('asc');
	const [currentPage, setCurrentPage] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [modal, setModal] = useState(false);
	const [currentSemester, setCurrentSemester] = useState({
		type: '',
		grdaing: 0,
		startDate: '',
		endDate: '',
	});

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const toggle = () => setModal(!modal);

	const editS = (semester) => {
		setCurrentSemester(semester);
		setModal(true);
	};

	const updateS = () => {
		if (isMounted) {
			dispatch(updateSemester(currentSemester));
			setModal(false);
		}
	};

	const deleteS = (semester) => {
		dispatch(deleteSemester(semester._id));
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

	const sortedSemesters = [...semesters].sort((a, b) => {
		if (sortOrder === 'asc') {
			return a[sortColumn].localeCompare(b[sortColumn]);
		}
		return b[sortColumn].localeCompare(a[sortColumn]);
	});

	const filteredSemesters = sortedSemesters.filter((semester) =>
		new Date(semester.startDate)
			.toLocaleDateString('en-US', {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
			})
			.replace(/(\d+)\/(\d+)\/(\d+)/, '$2/$1/$3')
			.toLowerCase()
			.includes(searchQuery.toLowerCase())
	);

	const indexOfLastItem = (currentPage + 1) * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentSemesters = filteredSemesters.slice(indexOfFirstItem, indexOfLastItem);

	const pageNumbers = [];
	for (let i = 0; i < Math.ceil(filteredSemesters.length / itemsPerPage); i++) {
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

	const semestersFound = currentSemesters.map((semester) => {
		return (
			<tr key={semester._id}>
				<th scope="row" onClick={() => handleSort('type')}>
					{semester.type}
				</th>
				<td>{semester.grading} weeks</td>
				<td onClick={() => handleSort('startDate')}>
					{new Date(semester.startDate)
						.toLocaleDateString('en-US', {
							year: 'numeric',
							month: '2-digit',
							day: '2-digit',
						})
						.replace(/(\d+)\/(\d+)\/(\d+)/, '$2/$1/$3')}
				</td>
				<td>
					{new Date(semester.endDate)
						.toLocaleDateString('en-US', {
							year: 'numeric',
							month: '2-digit',
							day: '2-digit',
						})
						.replace(/(\d+)\/(\d+)\/(\d+)/, '$2/$1/$3')}
				</td>
				<td>
					<Row style={{ width: '150px' }}>
						<Col xs="6" sm="4" className="mb-2">
							<Button
								className="btn btn-light"
								onClick={() => {
									editS(semester);
									setIsEditting(true);
								}}
							>
								<FontAwesomeIcon icon={faEdit} />
							</Button>
						</Col>
						<Col sm="4">
							<Button className="btn btn-light" onClick={() => deleteS(semester)}>
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
				<ModalHeader toggle={toggle}>Edit Semester ({currentSemester.type})</ModalHeader>
				<ModalBody>
					<Formik
						initialValues={{
							type: '',
							grading: 0,
							startDate: '',
							endDate: '',
						}}
						validationSchema={SemesterSchema}
						onSubmit={(values, { setSubmitting }) => {
							const semester = {
								type: values.courseId,
								grading: values.grading,
								startDate: values.startDate,
								endDate: values.endDate,
							};
							if (isMounted) {
								console.log(semester);
								dispatch(updateS(semester));
								setModal(false);
								setSubmitting(false);
								setIsMounted(false);
								navigate('/admin/dashboard');
							}
						}}
						validateOnMount
					>
						{({ isSubmitting, dirty, handleReset }) => (
							<Form>
								<SemesterForm
									isSubmitting={isSubmitting}
									dirty={dirty}
									handleReset={handleReset}
									isEditting={isEditting}
								/>
							</Form>
						)}
					</Formik>
				</ModalBody>
			</Modal>
		);
	});

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
			{semestersFound.length === 0 ? (
				<span className="mt-4 mb-4 text-gray-500 font-weight-bold">
					There are no entries for your current search
				</span>
			) : (
				<Table className="mt-3" responsive hover>
					<thead>
						<tr>
							<th>Type</th>
							<th>Grading Period</th>
							<th>Start Date</th>
							<th>End Date</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>{semestersFound}</tbody>
				</Table>
			)}
			<Row>
				<Col sm="6" xs="6" md="6">
					<span className="text-gray-500">
						Showing {indexOfFirstItem + 1} to{' '}
						{Math.min(indexOfLastItem, filteredSemesters.length)} of{' '}
						{filteredSemesters.length} entries
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
