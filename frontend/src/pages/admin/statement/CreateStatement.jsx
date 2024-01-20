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
		canSubmitAvailableTeachings,
		dispatch,
	} = useAdminStatements();

	// {
	// 	user.user.isAdmin ? (
	// 		<Row className="mt-3 animated--grow-in d-flex justify-content-end">
	// 			<Col xs="6" sm="6" md="3" lg="2" xl="2">
	// 				<Button
	// 					onClick={() => {
	// 						setNewStatement(true);
	// 					}}
	// 					color="null"
	// 					className="btn btn-orange align-self-center"
	// 				>
	// 					Create Statement
	// 				</Button>
	// 			</Col>
	// 		</Row>
	// 	) : null;
	// }

	// const StatementModalComponent = forwardRef((props, ref) => {
	// 	return (
	// 		<Modal
	// 			ref={ref}
	// 			isOpen={newStatement}
	// 			toggle={toggleNewStatement}
	// 			className="modal-lg"
	// 		>
	// 			<ModalHeader toggle={toggleNewStatement}>
	// 				Create Statement
	// 			</ModalHeader>
	// 			<ModalBody className="p-4">
	// 				<CreateStatementForm
	// 					students={students}
	// 					semester={semester}
	// 					canSubmitAvailableTeachings={canSubmitAvailableTeachings}
	// 					dispatch={dispatch}
	// 				/>
	// 			</ModalBody>
	// 		</Modal>
	// 	);
	// });

	// <StatementModalComponent
	// 	ref={newStatementRef}
	// 	toggleNewStatement={toggleNewStatement}
	// />
	// const [newStatement, setNewStatement] = useState(false);
	// const newStatementRef = useRef(null);
	// const toggleNewStatement = () => setNewStatement(!newStatement);

	return (
		<>
			<Header title="Create Statement" />

			{isStudentsLoading || isSemesterLoading || isTeachingsLoading ? (
				<Spinner card />
			) : (
				<Row className="justify-content-center animated--grow-in">
					<Col xl="7" lg="11" md="12">
						<div className="card shadow mb-5">
							<FormHeader
								title="Select from the available courses below to create a new
											course statement"
							/>
							<div className="card-body">
								<CreateStatementForm
									students={students}
									semester={semester}
									type={AssessmentType.Assessment}
									canSubmitAvailableTeachings={canSubmitAvailableTeachings}
									dispatch={dispatch}
								/>
							</div>
						</div>
					</Col>
				</Row>
			)}
		</>
	);
}
