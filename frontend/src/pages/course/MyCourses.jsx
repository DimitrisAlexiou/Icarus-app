import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, CardBody, CardTitle } from 'reactstrap';
import { getSemester } from '../../features/admin/semesterSlice';
import { getCourses } from '../../features/courses/courseSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import BreadcrumbNav from '../../components/boilerplate/Breadcrumb';
import Spinner from '../../components/boilerplate/Spinner';
import CarouselComponent from '../../components/Carousel';

export default function MyCourses() {
	const { semester, isLoading: isSemesterLoading } = useSelector((state) => state.semesters);
	const { courses, isLoading: isCoursesLoading } = useSelector((state) => state.courses);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getSemester());
		dispatch(getCourses());
	}, [dispatch]);

	if (isSemesterLoading || isCoursesLoading) return <Spinner />;

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
				<Col xl="3" md="6" className="text-right">
					<Card className="card-note">
						<CardBody>
							<CardTitle>
								<Col>
									<h6> Current Semester</h6>
								</Col>
								<Col>
									<h3>{semester ? semester.type : null}</h3>
								</Col>
							</CardTitle>
						</CardBody>
					</Card>
				</Col>
			</Row>
			<h6 className="mb-4 animated--grow-in" style={{ fontWeight: 700, textAlign: 'center' }}>
				Active courses in the current semester
			</h6>
			{courses.length > 0 && semester ? (
				courses.filter((course) => course.isActive && course.semester === semester._id)
					.length > 0 ? (
					<CarouselComponent
						objects={courses.filter(
							(course) => course.isActive && course.semester === semester._id
						)}
						title={'title'}
						description={'isObligatory'}
						subtext={'courseId'}
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
				Enrolled courses
			</h6>
		</>
	);
}
