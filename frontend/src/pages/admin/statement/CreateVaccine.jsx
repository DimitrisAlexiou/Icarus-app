import { Row, Col } from 'reactstrap';
import { AssessmentType } from '../../../constants/enums';
import CreateStatementForm from '../../../components/admin/forms/CreateStatementForm';
import Spinner from '../../../components/boilerplate/spinners/Spinner';
import useAdminStatements from '../../../hooks/admin/useAdminStatements';
import FormHeader from '../../../components/boilerplate/headers/FormHeader';
import Header from '../../../components/boilerplate/headers/Header';

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
			<Header title="Create Vaccine" />

			{isStudentsLoading || isSemesterLoading || isTeachingsLoading ? (
				<Spinner card />
			) : (
				<>
					<Row className="justify-content-center animated--grow-in">
						<Col xl="7" lg="11" md="12">
							<div className="card shadow mb-5">
								<FormHeader
									title="Select from the available courses below to create a new
												vaccine course statement"
								/>
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
