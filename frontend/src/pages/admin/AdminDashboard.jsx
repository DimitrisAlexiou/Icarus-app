import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Badge, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faUserTie,
	faBook,
	faUserGraduate,
	faUsers,
	faLayerGroup,
	faClockRotateLeft,
	faSpinner,
	faChalkboard,
	faListCheck,
} from '@fortawesome/free-solid-svg-icons';
import { faNoteSticky, faComment, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { deleteCourses, getCourses } from '../../features/courses/courseSlice';
import { getTeachings } from '../../features/courses/teachingSlice';
import { getStatements } from '../../features/courses/statementSlice';
import { getSemesters } from '../../features/admin/semesterSlice';
import { getCycles } from '../../features/admin/cyclesSlice';
import { getInstructors, getStudents, getUsers } from '../../features/admin/userSlice';
import { getNotes } from '../../features/notes/noteSlice';
import { getTeachingReviews } from '../../features/reviews/teachingReviewSlice';
import { getInstructorReviews } from '../../features/reviews/instructorReviewSlice';
import { getGeneralReviews } from '../../features/reviews/generalReviewSlice';
import { deleteAlert } from '../../constants/sweetAlertNotification';
import Calendar from '../../components/calendar/Calendar';
import CoursesDataTable from '../../components/admin/CoursesDataTable';
import SemestersDataTable from '../../components/admin/SemestersDataTable';
import Spinner from '../../components/boilerplate/Spinner';

export default function AdminDashboard() {
	const { courses, isLoading: coursesIsLoading } = useSelector((state) => state.courses);
	const { teachings, isLoading: teachingsIsLoading } = useSelector((state) => state.teachings);
	const { statements, isLoading: isStatementsLoading } = useSelector((state) => state.statements);
	const {
		users,
		students,
		instructors,
		isLoading: usersIsLoading,
	} = useSelector((state) => state.users);
	const { cycles, isLoading: cyclesIsLoading } = useSelector((state) => state.cycles);
	const { semesters, isLoading: semestersIsLoading } = useSelector((state) => state.semesters);
	const { notes, isLoading: notesIsLoading } = useSelector((state) => state.notes);
	const { teachingReviews, isLoading: teachingReviewsIsLoading } = useSelector(
		(state) => state.teachingReviews
	);
	const { instructorReviews, isLoading: instructorReviewsIsLoading } = useSelector(
		(state) => state.instructorReviews
	);
	const { generalReviews, isLoading: generalReviewsIsLoading } = useSelector(
		(state) => state.generalReviews
	);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCourses());
		dispatch(getTeachings());
		dispatch(getStatements());
		dispatch(getSemesters());
		dispatch(getCycles());
		dispatch(getUsers());
		dispatch(getStudents());
		dispatch(getInstructors());
		dispatch(getNotes());
		dispatch(getTeachingReviews());
		dispatch(getInstructorReviews());
		dispatch(getGeneralReviews());
	}, [dispatch]);

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
											{statements && statements.length
												? statements.length
												: 0}
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

			{teachingReviewsIsLoading || instructorReviewsIsLoading || generalReviewsIsLoading ? (
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
										onClick={() => deleteAlert(() => dispatch(deleteCourses()))}
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
									<span className="text-gray-500 animated--grow-in d-flex justify-content-center">
										There are no courses registered in the system !
										<FontAwesomeIcon
											className="fa-1x text-gray-300 px-4"
											icon={faSpinner}
										/>
									</span>
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
									<span className="text-gray-500 animated--grow-in d-flex justify-content-center">
										There are no semesters defined in the system !
										<FontAwesomeIcon
											className="fa-1x text-gray-300 px-4"
											icon={faSpinner}
										/>
									</span>
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
