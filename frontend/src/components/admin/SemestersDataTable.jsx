import { useState, useEffect, useRef, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Row, Col, Modal, ModalHeader, ModalBody, Input } from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
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

	const [searchQuery, setSearchQuery] = useState('');
	const [sortColumn, setSortColumn] = useState('type');
	const [sortOrder, setSortOrder] = useState('asc');
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

	const semestersFound = filteredSemesters.map((semester) => {
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
							<Button className="btn btn-light" onClick={() => editS(semester)}>
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
								/>
								<Row>
									<Col className="mb-3">
										<Button
											onClick={handleReset}
											disabled={!dirty || isSubmitting}
										>
											Clear
										</Button>
									</Col>
									<Col className="text-right px-0">
										<SubmitButton
											color={'primary'}
											message={'Update Semester'}
											disabled={isSubmitting}
										/>
									</Col>
								</Row>
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
			<Input
				type="text"
				placeholder="Search by starting date . . ."
				value={searchQuery}
				onChange={handleSearchQueryChange}
			/>
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
			<ModalComponent ref={myRef} />
		</>
	);
}
