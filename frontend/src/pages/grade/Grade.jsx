import { Row, Col, Button, Spinner } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';
import useGrades from '../../hooks/grade/useGrades';
import useCalculateGrades from '../../hooks/grade/useCalculateGrades';
import GradeCard from '../../components/grade/cards/GradeCard';
import BreadcrumbNav from '../../components/boilerplate/Breadcrumb';
import Header from '../../components/boilerplate/headers/Header';

export default function Grade() {
	const {
		user,
		statement,
		teachingsToGrade,
		isGradeLoading,
		isStatementsLoading,
		isEditingTheoryGrade,
		isEditingLabGrade,
		editGradeId,
		examinationType,
		teachingToEditId,
		isTheoryInstructor,
		isLabInstructor,
		gradeFilter,
		gradeCheck,
		gradeFind,
		gradeFinalized,
		hasUnsubmittedGrades,
		handleFinalizeGrade,
		handleGenerateTeachingGradingTranscriptPDF,
		dispatch,
	} = useGrades();

	const { overallGrade } = useCalculateGrades();

	return (
		<>
			<BreadcrumbNav
				className="animated--grow-in"
				link="/grades"
				header="Grades"
				active={statement?.user?.name + ' ' + statement?.user?.surname}
			/>

			<Row>
				<Col>
					<Header title="Assign Grades" />
				</Col>
				<Col className="text-end">
					<Button
						id="pdfButton"
						className="btn btn-light"
						disabled={isGradeLoading || hasUnsubmittedGrades()}
						onClick={() =>
							handleGenerateTeachingGradingTranscriptPDF(statement)
						}
					>
						{isGradeLoading ? (
							<Spinner size="sm" color="dark" type="grow" />
						) : (
							<FontAwesomeIcon icon={faFilePdf} />
						)}
					</Button>
				</Col>
			</Row>

			<Row className="justify-content-center animated--grow-in">
				<Col xs="12" sm="12" md="12" lg="12" xl="10">
					<div className="card shadow mb-4">
						<div className="card-body">
							<GradeCard
								user={user}
								statement={statement}
								teachingsToGrade={teachingsToGrade}
								isGradeLoading={isGradeLoading}
								isStatementsLoading={isStatementsLoading}
								isEditingTheoryGrade={isEditingTheoryGrade}
								isEditingLabGrade={isEditingLabGrade}
								editGradeId={editGradeId}
								examinationType={examinationType}
								teachingToEditId={teachingToEditId}
								isTheoryInstructor={isTheoryInstructor}
								isLabInstructor={isLabInstructor}
								gradeFilter={gradeFilter}
								gradeCheck={gradeCheck}
								gradeFind={gradeFind}
								gradeFinalized={gradeFinalized}
								handleFinalizeGrade={handleFinalizeGrade}
								overallGrade={overallGrade(teachingsToGrade)}
								dispatch={dispatch}
							/>
						</div>
					</div>
				</Col>
			</Row>
		</>
	);
}
