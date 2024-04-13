import { Row, Col, NavItem, NavLink } from 'reactstrap';
import { myGradesCategories } from '../../utils/NavigationLinks';
import { MyGradesMenu } from '../../constants/enums';
import useMyGrades from '../../hooks/user/useMyGrades';
import PeriodStatisticsCard from '../../components/course/cards/PeriodStatisticsCard';
import RecentGradesCard from '../../components/course/cards/RecentGradesCard';
import CoursesCard from '../../components/course/cards/CoursesCard';
import TranscriptOfRecords from '../../components/course/cards/TranscriptOfRecords';
import ThesisCard from '../../components/course/cards/ThesisCard';
import Header from '../../components/boilerplate/headers/Header';

export default function MyGrades() {
	const {
		user,
		grades,
		statement,
		passedTeachings,
		isGradesLoading,
		isStatementsLoading,
		isPassedTeachingsLoading,
		statementsTotalTeachings,
		totalECTS,
		totalECTSBySemester,
		selectedCategory,
		setSelectedCategory,
		getOverallGrade,
		calculateSemesterAverageGrade,
		getGradeExamPeriod,
		handleTeachingRowClick,
		filterPassedTeachingsBySemester,
		handleGenerateGradesTranscriptPDF,
	} = useMyGrades();

	return (
		<>
			<Header title="My Grades" />

			<Row className="mb-4 animated--grow-in justify-content-center">
				<Col
					sm="12"
					md="9"
					lg="7"
					xl="5"
					className="nav nav-pills p-2 bg-white mb-3 rounded-pill align-items-center text-center"
				>
					{myGradesCategories.map((category) => {
						const { id, text } = category;
						return (
							<>
								<NavItem key={id} className="nav-item mx-3">
									<NavLink
										style={{ fontSize: '1.1rem' }}
										className={`nav-link ${
											selectedCategory === text
												? 'font-weight-bold text-gray-600 clickable'
												: 'text-gray-500 clickable'
										}`}
										onClick={() => {
											setSelectedCategory(text);
										}}
									>
										<span>{text}</span>
									</NavLink>
								</NavItem>
							</>
						);
					})}
				</Col>
			</Row>

			{selectedCategory && selectedCategory.includes(MyGradesMenu.Recent) ? (
				<Row className="animated--grow-in">
					<Col xl="3">
						<PeriodStatisticsCard
							user={user}
							grades={grades}
							statement={statement}
							isGradesLoading={isGradesLoading}
							isStatementsLoading={isStatementsLoading}
						/>
					</Col>
					<Col xl="9">
						<RecentGradesCard
							grades={grades}
							getOverallGrade={getOverallGrade}
							isGradesLoading={isGradesLoading}
							handleTeachingRowClick={handleTeachingRowClick}
						/>
					</Col>
				</Row>
			) : selectedCategory.includes(MyGradesMenu.Grades) ? (
				<Row className="animated--grow-in">
					<Col xl="3">
						<CoursesCard
							user={user}
							passedTeachings={passedTeachings}
							statementsTotalTeachings={statementsTotalTeachings}
							totalECTS={totalECTS}
							isStatementsLoading={isStatementsLoading}
							isPassedTeachingsLoading={isPassedTeachingsLoading}
						/>
					</Col>
					<Col xl="9">
						<TranscriptOfRecords
							getOverallGrade={getOverallGrade}
							getGradeExamPeriod={getGradeExamPeriod}
							calculateSemesterAverageGrade={calculateSemesterAverageGrade}
							isGradesLoading={isGradesLoading}
							totalECTSBySemester={totalECTSBySemester}
							handleTeachingRowClick={handleTeachingRowClick}
							filterPassedTeachingsBySemester={filterPassedTeachingsBySemester}
							handleGenerateGradesTranscriptPDF={
								handleGenerateGradesTranscriptPDF
							}
						/>
					</Col>
				</Row>
			) : selectedCategory.includes(MyGradesMenu.Thesis) ? (
				<Row className="justify-content-center animated--grow-in">
					<Col xl="10" lg="12" md="12" sm="12" xs="12">
						<ThesisCard user={user} statement={statement} />
					</Col>
				</Row>
			) : null}
		</>
	);
}
