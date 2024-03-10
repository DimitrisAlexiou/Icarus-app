import { Col, Row, Badge, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faUserTie,
	faBook,
	faUserGraduate,
	faUsers,
	faLayerGroup,
	faClockRotateLeft,
	faChalkboard,
	faListCheck,
	faGraduationCap,
} from '@fortawesome/free-solid-svg-icons';
import {
	faCircleCheck,
	faComment,
	faTrashAlt,
} from '@fortawesome/free-regular-svg-icons';
import useAdminDashboard from '../../hooks/admin/useAdminDashboard';
import Calendar from '../../components/calendar/Calendar';
import CoursesDataTable from '../../components/admin/CoursesDataTable';
import SemestersDataTable from '../../components/admin/SemestersDataTable';
import Spinner from '../../components/boilerplate/spinners/Spinner';
import SpinnerComponent from '../../components/boilerplate/spinners/SpinnerMessage';
import DashboardCard from '../../components/boilerplate/DashboardCard';

export default function AdminDashboard() {
	const {
		courses,
		page,
		activeTeachings,
		cycles,
		masters,
		semesters,
		coursesIsLoading,
		teachingsIsLoading,
		isStatementsLoading,
		usersIsLoading,
		cyclesIsLoading,
		mastersIsLoading,
		semestersIsLoading,
		teachingReviewsIsLoading,
		instructorReviewsIsLoading,
		generalReviewsIsLoading,
		isEditingSemester,
		editSemesterId,
		isEditingCourse,
		editCourseId,
		totalCourses,
		totalTeachings,
		totalStatements,
		totalInstructors,
		totalStudents,
		totalUsers,
		totalTeachingReviews,
		totalInstructorReviews,
		totalGeneralReviews,
		totalSemesters,
		totalCycles,
		totalMasterPrograms,
		deleteSystemCourses,
		dispatch,
	} = useAdminDashboard();

	return (
		<>
			{coursesIsLoading || teachingsIsLoading || isStatementsLoading ? (
				<Spinner card />
			) : (
				<>
					<Badge color="success" className="mb-3 animated--grow-in">
						Courses
					</Badge>
					<Row className="animated--grow-in">
						<DashboardCard
							borderClass="border-left-success"
							textClass="text-success"
							label="Courses"
							object={totalCourses}
							icon={faBook}
						/>
						<DashboardCard
							borderClass="border-left-success"
							textClass="text-success"
							label="Teachings"
							object={totalTeachings}
							icon={faChalkboard}
						/>
						<DashboardCard
							borderClass="border-left-success"
							textClass="text-success"
							label="Active Teachings"
							object={activeTeachings.length}
							icon={faCircleCheck}
						/>
						<DashboardCard
							borderClass="border-left-success"
							textClass="text-success"
							label="Student Course Statements"
							object={totalStatements}
							icon={faListCheck}
						/>
					</Row>
				</>
			)}

			{cyclesIsLoading || semestersIsLoading || mastersIsLoading ? (
				<Spinner card />
			) : (
				<>
					<Badge color="warning" className="mb-3 animated--grow-in">
						System
					</Badge>
					<Row className="animated--grow-in">
						<DashboardCard
							borderClass="border-left-warning"
							textClass="text-warning"
							label="Semesters"
							object={totalSemesters}
							icon={faClockRotateLeft}
						/>
						<DashboardCard
							borderClass="border-left-warning"
							textClass="text-warning"
							label="Cycles"
							object={totalCycles}
							icon={faLayerGroup}
						/>
						<DashboardCard
							borderClass="border-left-warning"
							textClass="text-warning"
							label="Master Programs"
							object={totalMasterPrograms}
							icon={faGraduationCap}
						/>
					</Row>
				</>
			)}

			{usersIsLoading ? (
				<Spinner card />
			) : (
				<>
					<Badge color="dark" className="mb-3 animated--grow-in">
						Users
					</Badge>
					<Row className="animated--grow-in">
						<DashboardCard
							borderClass="border-left-dark"
							textClass="text-dark"
							label="Users"
							object={totalUsers}
							icon={faUsers}
						/>
						<DashboardCard
							borderClass="border-left-dark"
							textClass="text-dark"
							label="Students"
							object={totalStudents}
							icon={faUserGraduate}
						/>
						<DashboardCard
							borderClass="border-left-dark"
							textClass="text-dark"
							label="Instructors"
							object={totalInstructors}
							icon={faUserTie}
						/>
					</Row>
				</>
			)}

			{teachingReviewsIsLoading ||
			instructorReviewsIsLoading ||
			generalReviewsIsLoading ? (
				<Spinner card />
			) : (
				<>
					<Badge color="primary" className="mb-3 animated--grow-in">
						Reviews
					</Badge>
					<Row className="animated--grow-in">
						<DashboardCard
							borderClass="border-left-primary"
							textClass="text-primary"
							label="Teaching Reviews"
							object={totalTeachingReviews}
							icon={faComment}
						/>
						<DashboardCard
							borderClass="border-left-primary"
							textClass="text-primary"
							label="Instructor Reviews"
							object={totalInstructorReviews}
							icon={faComment}
						/>
						<DashboardCard
							borderClass="border-left-primary"
							textClass="text-primary"
							label="General Reviews"
							object={totalGeneralReviews}
							icon={faComment}
						/>
					</Row>
				</>
			)}

			{coursesIsLoading ? (
				<Spinner card />
			) : courses.length ? (
				<>
					<Row className="animated--grow-in mb-3">
						<Col>
							<Badge color="success">Courses</Badge>
						</Col>
						<Col>
							{courses ? (
								<Col className="d-flex justify-content-end">
									<Button
										className="btn btn-red align-self-center"
										color="null"
										onClick={() => deleteSystemCourses()}
									>
										<FontAwesomeIcon icon={faTrashAlt} />
									</Button>
								</Col>
							) : null}
						</Col>
					</Row>
					<Row className="justify-content-center animated--grow-in mb-3">
						<Col xs="12" sm="12" md="12" lg="12" xl="12">
							<CoursesDataTable
								courses={courses}
								cycles={cycles}
								masters={masters}
								coursesIsLoading={coursesIsLoading}
								isEditingCourse={isEditingCourse}
								editCourseId={editCourseId}
								page={page}
								dispatch={dispatch}
							/>
						</Col>
					</Row>
				</>
			) : (
				<>
					<Row className="animated--grow-in mb-3">
						<Col>
							<Badge color="success">Courses</Badge>
						</Col>
					</Row>
					<Row>
						<Col xl="6">
							<div className="profile_card">
								<div className="card-body">
									<div className="align-items-center text-center">
										<SpinnerComponent message="There are no courses registered in the system." />
									</div>
								</div>
							</div>
						</Col>
					</Row>
				</>
			)}

			{semestersIsLoading ? (
				<Spinner card />
			) : semesters.length ? (
				<>
					<Row className="animated--grow-in mb-3">
						<Col>
							<Badge color="warning">Semesters</Badge>
						</Col>
						<Col>
							{semesters ? (
								<Col className="d-flex justify-content-end">
									<Button
										className="btn btn-red align-self-center"
										color="null"
										// onClick={() => deleteAlert(() => dispatch(deleteSemesters()))}
									>
										<FontAwesomeIcon icon={faTrashAlt} />
									</Button>
								</Col>
							) : null}
						</Col>
					</Row>
					<Row className="justify-content-center animated--grow-in mb-3">
						<Col xs="12" sm="12" md="12" lg="12" xl="12">
							<SemestersDataTable
								semesters={semesters}
								semestersIsLoading={semestersIsLoading}
								isEditingSemester={isEditingSemester}
								editSemesterId={editSemesterId}
								dispatch={dispatch}
							/>
						</Col>
					</Row>
				</>
			) : (
				<>
					<Row className="animated--grow-in mb-3">
						<Col>
							<Badge color="warning">Semesters</Badge>
						</Col>
					</Row>
					<Row>
						<Col xl="6">
							<div className="profile_card">
								<div className="card-body">
									<div className="align-items-center text-center">
										<SpinnerComponent message="There are no semesters defined in the system." />
									</div>
								</div>
							</div>
						</Col>
					</Row>
				</>
			)}

			<Row className="mt-4">
				<Calendar />
			</Row>
		</>
	);
}
