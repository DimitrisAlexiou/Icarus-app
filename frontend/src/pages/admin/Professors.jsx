import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Table, Button } from 'reactstrap';
import { getInstructors, resetUsers } from '../../features/admin/userSlice';
import { faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spinner from '../../components/boilerplate/Spinner';

export default function Professors() {
	const { instructors, isLoading } = useSelector((state) => state.users);
	const [sortColumn, setSortColumn] = useState('username');
	const [sortOrder, setSortOrder] = useState('asc');

	const dispatch = useDispatch();

	const handleSort = (column) => {
		if (sortColumn === column) setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');

		setSortColumn(column);
		setSortOrder('asc');
	};

	useEffect(() => {
		dispatch(getInstructors());
		dispatch(resetUsers());
	}, [dispatch]);

	if (isLoading) return <Spinner />;

	const professorsFound = instructors.map((instructor) => {
		return (
			<tr key={instructor._id}>
				<td>{instructor.name}</td>
				<td>{instructor.surname}</td>
				<td>{instructor.email}</td>
				<th scope="row" onClick={() => handleSort('degree')}>
					{instructor.degree}
				</th>
				<td onClick={() => handleSort('facultyType')}>{instructor.facultyType}</td>
				<td onClick={() => handleSort('instructorEntranceYear')}>
					{instructor.instructorEntranceYear}
				</td>
				<td>
					<Row style={{ width: '150px' }}>
						{!instructor.isActive ? (
							<>
								<Col xs="6" sm="4" className="mb-2">
									<Button
										className="btn btn-light"
										// onClick={() => dispatch(assignProfessor(user._id))}
									>
										<FontAwesomeIcon icon={faChalkboardTeacher} />
									</Button>
								</Col>
							</>
						) : null}
					</Row>
				</td>
			</tr>
		);
	});

	return (
		<>
			<h3 className="mb-5 text-gray-800 font-weight-bold animated--grow-in">Professors</h3>

			<Row className="justify-content-center animated--grow-in">
				<Col className="card card-body mb-4" xs="12" sm="12" md="12" lg="12" xl="12">
					{instructors.length > 0 ? (
						<Table className="mt-3" responsive hover>
							<thead>
								<tr>
									<th>Name</th>
									<th>Surname</th>
									<th>Email</th>
									<th>Degree</th>
									<th>Faculty Type</th>
									<th>Admission Year</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>{professorsFound}</tbody>
						</Table>
					) : (
						<span className="mt-4 mb-4 text-gray-500 font-weight-bold">
							There are no Professors registered in the system.
						</span>
					)}
				</Col>
			</Row>
		</>
	);
}
