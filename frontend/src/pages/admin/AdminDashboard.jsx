import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Badge } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faUserTie,
	faBook,
	faUserGraduate,
	faUsers,
	faLayerGroup,
	faClockRotateLeft,
	faNoteSticky,
	faComment,
	faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import CoursesDataTable from '../../components/admin/CoursesDataTable';
import SemestersDataTable from '../../components/admin/SemestersDataTable';
import Spinner from '../../components/boilerplate/Spinner';
import { getCourses } from '../../features/courses/courseSlice';
import { getSemesters } from '../../features/admin/semesterSlice';
import { getCycles } from '../../features/admin/cyclesSlice';
import { getInstructors, getStudents, getUsers } from '../../features/admin/userSlice';

export default function AdminDashboard() {
	const { courses, isLoading } = useSelector((state) => state.courses);
	const { users, students, instructors } = useSelector((state) => state.users);
	const { cycles, isLoading: cyclesIsLoading } = useSelector((state) => state.cycles);
	const { semesters, isLoading: semesterIsLoading } = useSelector((state) => state.semesters);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCourses());
		dispatch(getSemesters());
		dispatch(getCycles());
		dispatch(getUsers());
		dispatch(getStudents());
		dispatch(getInstructors());
	}, [dispatch]);

	if (isLoading || cyclesIsLoading || semesterIsLoading) {
		return <Spinner />;
	}

	return (
		<>
			<h1 className="h3 mb-5 text-gray-800 font-weight-bold animated--grow-in">
				Admin Dashboard
			</h1>

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
										{cycles.names && cycles.names.length
											? cycles.names.length
											: 0}
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
										{/* {notes && notes.length ? notes.length : 0} */}
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

			<Badge color="info" className="animated--grow-in">
				Users
			</Badge>
			<Row className="mt-3 mb-4 animated--grow-in">
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
										{instructors && instructors.length ? instructors.length : 0}
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

			<Badge color="info" className="animated--grow-in">
				Reviews
			</Badge>
			<Row className="mt-3 mb-4 animated--grow-in">
				<Col xl="3" md="6" className="mb-4">
					<div className="card border-left-primary shadow h-100 py-2">
						<div className="card-body">
							<Row className="no-gutters align-items-center">
								<Col className="mr-2">
									<div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
										Teaching Reviews
									</div>
									<div className="h5 mb-0 font-weight-bold text-gray-800">
										{/* {notes && notes.length ? notes.length : 0} */}
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
										{/* {instructors && instructors.length ? instructors.length : 0} */}
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
										{/* {instructors && instructors.length ? instructors.length : 0} */}
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

			<Badge color="info" className="animated--grow-in mb-3">
				Courses
			</Badge>
			{courses.length ? (
				<Row className="justify-content-center animated--grow-in">
					<Col xs="12" sm="12" md="12" lg="12" xl="12">
						<div className="card card-body mb-5">
							<CoursesDataTable
								courses={courses}
								cycles={cycles}
								semesters={semesters}
							/>
						</div>
					</Col>
				</Row>
			) : (
				<Row>
					<Col xl="4" md="6" className="mb-4">
						<div className="card border-left-primary shadow h-100 no-gutters align-items-center">
							<div className="card-body">
								<p
									className="mt-3"
									style={{
										fontWeight: 500,
										fontSize: 13,
									}}
								>
									There are no courses available right now !
									<FontAwesomeIcon
										className="fa-1x text-gray-300 px-4"
										icon={faSpinner}
									/>
								</p>
							</div>
						</div>
					</Col>
				</Row>
			)}

			<Badge color="info" className="animated--grow-in mb-3">
				Semesters
			</Badge>
			{semesters.length ? (
				<Row className="justify-content-center animated--grow-in">
					<Col xs="12" sm="12" md="12" lg="12" xl="12">
						<div className="card card-body mb-5">
							<SemestersDataTable semesters={semesters} />
						</div>
					</Col>
				</Row>
			) : (
				<Row>
					<Col xl="4" md="6" className="mb-4">
						<div className="card border-left-primary shadow h-100 no-gutters align-items-center">
							<div className="card-body">
								<p
									className="mt-3"
									style={{
										fontWeight: 500,
										fontSize: 13,
									}}
								>
									There are no semesters available right now !
									<FontAwesomeIcon
										className="fa-1x text-gray-300 px-4"
										icon={faSpinner}
									/>
								</p>
							</div>
						</div>
					</Col>
				</Row>
			)}
		</>
	);
}
