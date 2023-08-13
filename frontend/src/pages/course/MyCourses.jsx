import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { getSemester } from '../../features/admin/semesterSlice';
import { getTeachings } from '../../features/courses/teachingSlice';
import { enrollCourse } from '../../features/courses/courseSlice';
import { enrollAlert } from '../../constants/sweetAlertNotification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import BreadcrumbNav from '../../components/boilerplate/Breadcrumb';
import Spinner from '../../components/boilerplate/Spinner';
import CarouselComponent from '../../components/Carousel';

export default function MyCourses() {
	const { semester, isLoading: isSemesterLoading } = useSelector((state) => state.semesters);
	const { teachings, isLoading: isTeachingsLoading } = useSelector((state) => state.teachings);
	const enrolledCourses = useSelector((state) => state.auth.user.user.student.enrolledCourses);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getSemester());
		dispatch(getTeachings());
	}, [dispatch]);

	if (isSemesterLoading || isTeachingsLoading) return <Spinner />;

	return (
		<>
			<BreadcrumbNav
				className="animated--grow-in"
				link={'/my-courses'}
				header={'My Courses'}
				active={'My Courses'}
			/>
			<Row className="mb-5 animated--grow-in">
				<Col>
					<h3 className="text-gray-800 font-weight-bold">My Courses</h3>
				</Col>
				{semester ? (
					<Col xl="3" md="6" className="text-right">
						<Card className="card-note">
							<CardBody>
								<CardTitle>
									<Col>
										<h6> Current Semester</h6>
									</Col>
									<Col>
										<h3>{semester.type}</h3>
									</Col>
								</CardTitle>
							</CardBody>
						</Card>
					</Col>
				) : null}
			</Row>
			<h6 className="mb-4 animated--grow-in" style={{ fontWeight: 700, textAlign: 'center' }}>
				active courses in the current semester
			</h6>
			{teachings.length > 0 && semester ? (
				teachings.filter((teaching) => teaching.semester._id === semester._id).length >
				0 ? (
					<CarouselComponent
						objects={teachings.filter(
							(teaching) => teaching.semester._id === semester._id
						)}
						renderItem={(teaching) => (
							<>
								<CardTitle
									style={{
										textAlign: 'justify',
										fontWeight: '700',
										fontSize: 15,
									}}
									className="text-light-cornflower-blue mb-2"
								>
									{teaching.course.title}
								</CardTitle>
								<CardText>
									<small
										className="text-muted"
										style={{
											textAlign: 'justify',
											fontWeight: '700',
											fontSize: 13,
										}}
									>
										{teaching.course.isObligatory ? 'Obligatory' : 'Optional'}
									</small>
								</CardText>
								<CardText
									style={{
										textAlign: 'justify',
										fontWeight: '600',
										fontSize: 11,
									}}
								>
									{teaching.course.courseId}
								</CardText>
							</>
						)}
						onObjectClick={(teaching) => {
							enrollAlert(() => dispatch(enrollCourse(teaching.course._id)));
						}}
					/>
				) : (
					<span className="mt-5 mb-5 text-gray-500 animated--grow-in d-flex justify-content-center">
						<FontAwesomeIcon className="fa-1x text-gray-300 px-4" icon={faSpinner} />
						There are no active courses available in the current semester.
					</span>
				)
			) : (
				<span className="mb-5 text-gray-500 animated--grow-in d-flex justify-content-center">
					<FontAwesomeIcon className="fa-1x text-gray-300 px-4" icon={faSpinner} />
					There are no courses available right now.
				</span>
			)}
			<h6
				className="mt-5 mb-4 animated--grow-in"
				style={{ fontWeight: 700, textAlign: 'center' }}
			>
				enrolled courses
			</h6>
			{enrolledCourses.length > 0 ? (
				<CarouselComponent
					objects={enrolledCourses}
					renderItem={(enrolledCourse) => {
						const teaching = teachings.find(
							(teaching) => teaching.course._id === enrolledCourse
						);
						if (teaching && teaching.course)
							return (
								<>
									<CardTitle
										style={{
											textAlign: 'justify',
											fontWeight: '700',
											fontSize: 15,
										}}
										className="text-light-cornflower-blue mb-2"
									>
										{teaching.course.title}
									</CardTitle>
									<CardText>
										<small
											className="text-muted"
											style={{
												textAlign: 'justify',
												fontWeight: '700',
												fontSize: 13,
											}}
										>
											{teaching.course.isObligatory
												? 'Obligatory'
												: 'Optional'}
										</small>
									</CardText>
									<CardText
										style={{
											textAlign: 'justify',
											fontWeight: '600',
											fontSize: 11,
										}}
									>
										{teaching.course.courseId}
									</CardText>
								</>
							);
					}}
					onObjectClick={(teaching) => {}}
				/>
			) : (
				<span className="mt-5 mb-5 text-gray-500 animated--grow-in d-flex justify-content-center">
					<FontAwesomeIcon className="fa-1x text-gray-300 px-4" icon={faSpinner} />
					You are not enrolled in any courses.
				</span>
			)}
		</>
	);
}
