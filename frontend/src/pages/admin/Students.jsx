import { Row, Col } from 'reactstrap';
import useStudents from '../../hooks/admin/useStudents';
import DataTable from '../../components/DataTable';
import Spinner from '../../components/boilerplate/spinners/Spinner';
import SpinnerComponent from '../../components/boilerplate/spinners/SpinnerMessage';

export default function Students() {
	const { students, isLoading, dataTableConfig } = useStudents();

	return (
		<>
			<h3 className="mb-4 text-gray-800 font-weight-bold animated--grow-in">
				Students
			</h3>

			{isLoading ? (
				<Spinner card />
			) : students.length > 0 ? (
				<Row className="justify-content-center animated--grow-in">
					<Col
						className="card card-body mb-4"
						xs="12"
						sm="12"
						md="12"
						lg="12"
						xl="12"
					>
						<DataTable
							data={students}
							config={dataTableConfig}
							sortColumns={['name', 'surname', 'studentId', 'entranceYear']}
							searchMessage={'by Name or Surname'}
						/>
					</Col>
				</Row>
			) : (
				<Row className="justify-content-center animated--grow-in mb-3">
					<Col>
						<div className="profile_card">
							<div className="card-body">
								<SpinnerComponent message="There are no Students registered in the system." />
							</div>
						</div>
					</Col>
				</Row>
			)}
		</>
	);
}
