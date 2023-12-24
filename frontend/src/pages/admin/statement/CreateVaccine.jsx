import { Row, Col } from 'reactstrap';
import { AssessmentType } from '../../../constants/enums';
import CreateStatementForm from '../../../components/admin/forms/CreateStatementForm';
import Spinner from '../../../components/boilerplate/spinners/Spinner';
import useAdminStatements from '../../../hooks/admin/useAdminStatements';

export default function CreateStatement() {
	const {
		students,
		isStudentsLoading,
		semester,
		isSemesterLoading,
		isTeachingsLoading,
		canSubmitAvailableVaccineTeachings,
		dispatch,
	} = useAdminStatements();

	return (
		<>
			<Row className="mb-4 animated--grow-in">
				<Col sm="6" xs="9" md="6">
					<h3 className="text-gray-800 font-weight-bold">Create Vaccine</h3>
				</Col>
			</Row>

			{isStudentsLoading || isSemesterLoading || isTeachingsLoading ? (
				<Spinner card />
			) : (
				<>
					<Row className="justify-content-center animated--grow-in">
						<Col xl="7" lg="11" md="12">
							<div className="card shadow mb-5">
								<div className="card-header py-3">
									<Row className="align-items-center">
										<Col>
											<h6 className="m-0 font-weight-bold text-primary">
												Select from the available courses below to create a new
												vaccine course statement
											</h6>
										</Col>
									</Row>
								</div>
								<div className="card-body">
									<CreateStatementForm
										students={students}
										semester={semester}
										type={AssessmentType.Vaccine}
										canSubmitAvailableTeachings={
											canSubmitAvailableVaccineTeachings
										}
										dispatch={dispatch}
									/>
								</div>
							</div>
						</Col>
					</Row>
				</>
			)}
		</>
	);
}
