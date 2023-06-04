import { useState, useRef, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Row, Col, Modal, ModalHeader, ModalBody, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { deleteSemester } from '../../features/admin/semesterSlice';
import moment from 'moment';
import SemesterForm from '../../components/admin/SemesterForm';
import Spinner from '../../components/boilerplate/Spinner';

export default function SemestersDataTable({ semesters }) {
	const { isLoading, isEditingSemester, editSemesterId } = useSelector(
		(state) => state.semesters
	);

	const myRef = useRef(null);

	const [searchQuery, setSearchQuery] = useState('');
	const [sortColumn, setSortColumn] = useState('type');
	const [sortOrder, setSortOrder] = useState('asc');
	const [currentPage, setCurrentPage] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [modal, setModal] = useState(false);
	const [currentSemester, setCurrentSemester] = useState({
		type: '',
		grading: 0,
		startDate: '',
		endDate: '',
	});

	const dispatch = useDispatch();

	const toggle = () => setModal(!modal);

	const editS = (semester) => {
		setCurrentSemester(semester);
		setModal(true);
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
					{moment(semester.startDate).format('DD/MM/YYYY')}
				</td>
				<td>{moment(semester.endDate).format('DD/MM/YYYY')}</td>
				<td>
					<Row style={{ width: '150px' }}>
						<Col xs="6" sm="4" className="mb-2">
							<Button
								className="btn btn-light"
								onClick={() => {
									editS(semester);
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
					<SemesterForm
						semester={currentSemester}
						isEditingSemester={isEditingSemester}
						editSemesterId={editSemesterId}
					/>
				</ModalBody>
			</Modal>
		);
	});

	if (isLoading) return <Spinner />;

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
