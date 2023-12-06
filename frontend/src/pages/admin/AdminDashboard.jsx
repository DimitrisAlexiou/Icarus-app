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
} from '@fortawesome/free-solid-svg-icons';
import {
	faNoteSticky,
	faComment,
	faTrashAlt,
} from '@fortawesome/free-regular-svg-icons';
import useAdminDashboard from '../../hooks/admin/useAdminDashboard';
import Calendar from '../../components/calendar/Calendar';
import CoursesDataTable from '../../components/admin/CoursesDataTable';
import SemestersDataTable from '../../components/admin/SemestersDataTable';
import Spinner from '../../components/boilerplate/spinners/Spinner';
import SpinnerComponent from '../../components/boilerplate/spinners/SpinnerMessage';

export default function AdminDashboard() {
	const {
		courses,
		teachings,
		statements,
		users,
		students,
		instructors,
		cycles,
		semesters,
		notes,
		teachingReviews,
		instructorReviews,
		generalReviews,
		coursesIsLoading,
		teachingsIsLoading,
		isStatementsLoading,
		usersIsLoading,
		cyclesIsLoading,
		semestersIsLoading,
		notesIsLoading,
		teachingReviewsIsLoading,
		instructorReviewsIsLoading,
		generalReviewsIsLoading,
		deleteSystemCourses,
	} = useAdminDashboard();

	return (
		<>
			{coursesIsLoading ||
			teachingsIsLoading ||
			isStatementsLoading ||
			cyclesIsLoading ||
			semestersIsLoading ||
			notesIsLoading ? (
				<Spinner card />
			) : (
				<Row className="animated--grow-in">
					<Col xl="3" md="6" className="mb-4">
						<div className="card border-left-success shadow h-100 py-2">
							<div className="card-body">
								<Row className="no-gutters align-items-center">
									<Col className="mr-2">
										<div className="text-xs font-weight-bold text-success text-uppercase mb-1">
											Courses
										</div>
										<div className="h5 mb-0 font-weight-bold text-gray-800">
											{courses && courses.length ? courses.length : 0}
										</div>
									</Col>
									<div className="col-auto">
										<i className="fa-2x text-gray-300">
											<FontAwesomeIcon icon={faBook} />
										</i>
									</div>
								</Row>
							</div>
						</div>
					</Col>

					<Col xl="3" md="6" className="mb-4">
						<div className="card border-left-success shadow h-100 py-2">
							<div className="card-body">
								<Row className="no-gutters align-items-center">
									<Col className="mr-2">
										<div className="text-xs font-weight-bold text-success text-uppercase mb-1">
											Active Teachings
										</div>
										<div className="h5 mb-0 font-weight-bold text-gray-800">
											{teachings && teachings.length ? teachings.length : 0}
										</div>
									</Col>
									<div className="col-auto">
										<i className="fa-2x text-gray-300">
											<FontAwesomeIcon icon={faChalkboard} />
										</i>
									</div>
								</Row>
							</div>
						</div>
					</Col>

					<Col xl="3" md="6" className="mb-4">
						<div className="card border-left-success shadow h-100 py-2">
							<div className="card-body">
								<Row className="no-gutters align-items-center">
									<Col className="mr-2">
										<div className="text-xs font-weight-bold text-success text-uppercase mb-1">
											Student Course Statements
										</div>
										<div className="h5 mb-0 font-weight-bold text-gray-800">
											{statements && statements.length ? statements.length : 0}
										</div>
									</Col>
									<div className="col-auto">
										<i className="fa-2x text-gray-300">
											<FontAwesomeIcon icon={faListCheck} />
										</i>
									</div>
								</Row>
							</div>
						</div>
					</Col>

					<Col xl="3" md="6" className="mb-4">
						<div className="card border-left-warning shadow h-100 py-2">
							<div className="card-body">
								<Row className="no-gutters align-items-center">
									<Col className="mr-2">
										<div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
											Semesters
										</div>
										<div className="h5 mb-0 font-weight-bold text-gray-800">
											{semesters && semesters.length ? semesters.length : 0}
										</div>
									</Col>
									<div className="col-auto">
										<i className="fa-2x text-gray-300">
											<FontAwesomeIcon icon={faClockRotateLeft} />
										</i>
									</div>
								</Row>
							</div>
						</div>
					</Col>

					<Col xl="3" md="6" className="mb-4">
						<div className="card border-left-dark shadow h-100 py-2">
							<div className="card-body">
								<Row className="no-gutters align-items-center">
									<Col className="mr-2">
										<div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
											Cycles
										</div>
										<div className="h5 mb-0 font-weight-bold text-gray-800">
											{cycles ? cycles.length : 0}
										</div>
									</Col>
									<div className="col-auto">
										<i className="fa-2x text-gray-300">
											<FontAwesomeIcon icon={faLayerGroup} />
										</i>
									</div>
								</Row>
							</div>
						</div>
					</Col>

					<Col xl="3" md="6" className="mb-4">
						<div className="card border-left-primary shadow h-100 py-2">
							<div className="card-body">
								<Row className="no-gutters align-items-center">
									<Col className="mr-2">
										<div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
											Notes
										</div>
										<div className="h5 mb-0 font-weight-bold text-gray-800">
											{notes && notes.length ? notes.length : 0}
										</div>
									</Col>
									<div className="col-auto">
										<i className="fa-2x text-gray-300">
											<FontAwesomeIcon icon={faNoteSticky} />
										</i>
									</div>
								</Row>
							</div>
						</div>
					</Col>
				</Row>
			)}

			{usersIsLoading ? (
				<Spinner card />
			) : (
				<>
					<Badge color="info" className="mb-3 animated--grow-in">
						Users
					</Badge>
					<Row className="animated--grow-in">
						<Col xl="3" md="6" className="mb-4">
							<div className="card border-left-dark shadow h-100 py-2">
								<div className="card-body">
									<Row className="no-gutters align-items-center">
										<Col className="mr-2">
											<div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
												Users
											</div>
											<div className="h5 mb-0 font-weight-bold text-gray-800">
												{users && users.length ? users.length : 0}
											</div>
										</Col>
										<div className="col-auto">
											<i className="fa-2x text-gray-300">
												<FontAwesomeIcon icon={faUsers} />
											</i>
										</div>
									</Row>
								</div>
							</div>
						</Col>

						<Col xl="3" md="6" className="mb-4">
							<div className="card border-left-info shadow h-100 py-2">
								<div className="card-body">
									<Row className="no-gutters align-items-center">
										<Col className="mr-2">
											<div className="text-xs font-weight-bold text-info text-uppercase mb-1">
												Students
											</div>
											<div className="h5 mb-0 font-weight-bold text-gray-800">
												{students && students.length ? students.length : 0}
											</div>
										</Col>
										<div className="col-auto">
											<i className="fa-2x text-gray-300">
												<FontAwesomeIcon icon={faUserGraduate} />
											</i>
										</div>
									</Row>
								</div>
							</div>
						</Col>

						<Col xl="3" md="6" className="mb-4">
							<div className="card border-left-primary shadow h-100 py-2">
								<div className="card-body">
									<Row className="no-gutters align-items-center">
										<Col className="mr-2">
											<div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
												Instructors
											</div>
											<div className="h5 mb-0 font-weight-bold text-gray-800">
												{instructors && instructors.length
													? instructors.length
													: 0}
											</div>
										</Col>
										<div className="col-auto">
											<i className="fa-2x text-gray-300">
												<FontAwesomeIcon icon={faUserTie} />
											</i>
										</div>
									</Row>
								</div>
							</div>
						</Col>
					</Row>
				</>
			)}

			{teachingReviewsIsLoading ||
			instructorReviewsIsLoading ||
			generalReviewsIsLoading ? (
				<Spinner card />
			) : (
				<>
					<Badge color="info" className="mb-3 animated--grow-in">
						Reviews
					</Badge>
					<Row className="animated--grow-in">
						<Col xl="3" md="6" className="mb-4">
							<div className="card border-left-primary shadow h-100 py-2">
								<div className="card-body">
									<Row className="no-gutters align-items-center">
										<Col className="mr-2">
											<div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
												Teaching Reviews
											</div>
											<div className="h5 mb-0 font-weight-bold text-gray-800">
												{teachingReviews && teachingReviews.length
													? teachingReviews.length
													: 0}
											</div>
										</Col>
										<div className="col-auto">
											<i className="fa-2x text-gray-300">
												<FontAwesomeIcon icon={faComment} />
											</i>
										</div>
									</Row>
								</div>
							</div>
						</Col>

						<Col xl="3" md="6" className="mb-4">
							<div className="card border-left-primary shadow h-100 py-2">
								<div className="card-body">
									<Row className="no-gutters align-items-center">
										<Col className="mr-2">
											<div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
												Instructor Reviews
											</div>
											<div className="h5 mb-0 font-weight-bold text-gray-800">
												{instructorReviews && instructorReviews.length
													? instructorReviews.length
													: 0}
											</div>
										</Col>
										<div className="col-auto">
											<i className="fa-2x text-gray-300">
												<FontAwesomeIcon icon={faComment} />
											</i>
										</div>
									</Row>
								</div>
							</div>
						</Col>

						<Col xl="3" md="6" className="mb-4">
							<div className="card border-left-primary shadow h-100 py-2">
								<div className="card-body">
									<Row className="no-gutters align-items-center">
										<Col className="mr-2">
											<div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
												General Reviews
											</div>
											<div className="h5 mb-0 font-weight-bold text-gray-800">
												{generalReviews && generalReviews.length
													? generalReviews.length
													: 0}
											</div>
										</Col>
										<div className="col-auto">
											<i className="fa-2x text-gray-300">
												<FontAwesomeIcon icon={faComment} />
											</i>
										</div>
									</Row>
								</div>
							</div>
						</Col>
					</Row>
				</>
			)}

			{coursesIsLoading ? (
				<Spinner card />
			) : courses.length ? (
				<>
					<Row className="animated--grow-in mb-3">
						<Col>
							<Badge color="info">Courses</Badge>
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
								semesters={semesters}
							/>
						</Col>
					</Row>
				</>
			) : (
				<Row>
					<Col xl="4" md="6">
						<div className="profile_card">
							<div className="card-body">
								<div className="align-items-center text-center">
									<SpinnerComponent message="There are no courses registered in the system." />
								</div>
							</div>
						</div>
					</Col>
				</Row>
			)}

			{semestersIsLoading ? (
				<Spinner card />
			) : semesters.length ? (
				<>
					<Row className="animated--grow-in mb-3">
						<Col>
							<Badge color="info">Semesters</Badge>
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
							<SemestersDataTable semesters={semesters} />
						</Col>
					</Row>
				</>
			) : (
				<Row>
					<Col xl="4" md="6">
						<div className="profile_card">
							<div className="card-body">
								<div className="align-items-center text-center">
									<SpinnerComponent message="There are no semesters defined in the system." />
								</div>
							</div>
						</div>
					</Col>
				</Row>
			)}

			<Calendar />
		</>
	);
}
