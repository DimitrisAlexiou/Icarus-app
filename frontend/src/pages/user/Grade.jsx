import { Row, Col } from 'reactstrap';
import useGrades from '../../hooks/user/useGrades';
import useCalculateGrades from '../../hooks/user/useCalculateGrades';
import Header from '../../components/boilerplate/headers/Header';
import BreadcrumbNav from '../../components/boilerplate/Breadcrumb';
import GradeCard from '../../components/course/cards/GradeCard';

export default function Grade() {
	const {
		user,
		grades,
		statement,
		teachingsToGrade,
		isStatementsLoading,
		isEditingTheoryGrade,
		isEditingLabGrade,
		editGradeId,
		examinationType,
		teachingToEditId,
		isTheoryInstructor,
		isLabInstructor,
		handleFinalizeGrade,
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

			<Header title="Assign Grades" />

			<Row className="justify-content-center animated--grow-in">
				<Col xs="12" sm="12" md="12" lg="12" xl="10">
					<div className="card shadow mb-4">
						<div className="card-body">
							<GradeCard
								user={user}
								grades={grades}
								statement={statement}
								teachingsToGrade={teachingsToGrade}
								isStatementsLoading={isStatementsLoading}
								isEditingTheoryGrade={isEditingTheoryGrade}
								isEditingLabGrade={isEditingLabGrade}
								editGradeId={editGradeId}
								examinationType={examinationType}
								teachingToEditId={teachingToEditId}
								isTheoryInstructor={isTheoryInstructor}
								isLabInstructor={isLabInstructor}
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
