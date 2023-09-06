import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Button } from 'reactstrap';
import { getStudents, resetUsers } from '../../features/admin/userSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import DataTable from '../../components/DataTable';
import Spinner from '../../components/boilerplate/Spinner';

export default function Students() {
	const { students, isLoading } = useSelector((state) => state.users);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getStudents());
		dispatch(resetUsers());
	}, [dispatch]);

	const dataTableConfig = [
		{
			name: 'name',
			label: 'Name',
			render: (student) => student.user.name,
		},
		{
			name: 'surname',
			label: 'Surname',
			render: (student) => student.user.surname,
		},
		{
			name: 'email',
			label: 'Email',
			render: (student) => student.user.email,
		},
		{
			name: 'studentId',
			label: 'Student ID',
			render: (student) => student.studentId,
		},
		{
			name: 'studentType',
			label: 'Type',
			render: (student) => student.studentType,
		},
		{
			name: 'entranceYear',
			label: 'Admission Year',
			render: (student) => student.entranceYear,
		},
		{
			name: 'actions',
			label: 'Actions',
			render: (student) => (
				<Row style={{ width: '150px' }}>
					<Col xs="6" sm="4" className="mb-2">
						<Button
							className="btn btn-light"
							onClick={() => {
								navigate(`/user/${student.user._id}`);
							}}
						>
							<FontAwesomeIcon icon={faInfo} />
						</Button>
					</Col>
				</Row>
			),
		},
	];

	return (
		<>
			<h3 className="mb-4 text-gray-800 font-weight-bold animated--grow-in">Students</h3>

			<Row className="justify-content-center animated--grow-in">
				<Col className="card card-body mb-4" xs="12" sm="12" md="12" lg="12" xl="12">
					{isLoading ? (
						<Spinner card />
					) : students.length > 0 ? (
						<DataTable
							data={students}
							config={dataTableConfig}
							sortColumns={['name', 'surname', 'studentId', 'entranceYear']}
							searchMessage={'by Name or Surname'}
						/>
					) : (
						<span className="mt-4 mb-4 text-gray-500 font-weight-bold">
							There are no Students registered in the system.
						</span>
					)}
				</Col>
			</Row>
		</>
	);
}
