import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button } from 'reactstrap';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { getStudents, resetUsers } from '../../features/admin/userSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const useStudents = ({ openModal }) => {
	const dispatch = useDispatch();

	const { students, isLoading } = useSelector((state) => state.users);

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
								handleStudentClick(student);
							}}
						>
							<FontAwesomeIcon icon={faInfo} />
						</Button>
					</Col>
				</Row>
			),
		},
	];

	const handleStudentClick = (student) => {
		openModal(student);
	};

	return {
		students,
		isLoading,
		dataTableConfig,
	};
};

export default useStudents;
