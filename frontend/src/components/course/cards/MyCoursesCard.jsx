import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import { getTeachings } from '../../../features/courses/teachingSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Spinner from '../../boilerplate/Spinner';

export default function MyCoursesCard() {
	const { teachings, isLoading } = useSelector((state) => state.teachings);
	const enrolledCourses = useSelector((state) => state.auth.user.user.student.enrolledCourses);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getTeachings());
	}, [dispatch]);

	const handleCourseRowClick = (teaching) => {
		navigate('/teaching/' + teaching._id + '/portfolio');
	};

	return (
		<>
			{/* <Row className="mb-3 justify-content-center animated--grow-in">
				<Col xs="12" sm="12" md="12" lg="10" xl="9">
					<h6 className="text-gray-500 font-weight-bold">enrolled courses</h6>
				</Col>
			</Row> */}
			<Row className="justify-content-center animated--grow-in mb-3">
				<h6
					className="animated--grow-in text-gray-500"
					style={{ fontWeight: 700, textAlign: 'center' }}
				>
					enrolled courses
				</h6>
			</Row>
			<div className="profile_card">
				<div className="card-body">
					<div className="align-items-center text-center">
						{isLoading ? (
							<Spinner card />
						) : enrolledCourses.length > 0 ? (
							<>
								{enrolledCourses.map((enrolledCourse, index) => {
									const teaching = teachings.find(
										(teaching) => teaching._id === enrolledCourse
									);
									const instructorNames = teaching?.theoryInstructors.map(
										(instructor) => instructor.user.surname
									);
									return (
										<Row
											key={index}
											className="clickable"
											onClick={() => handleCourseRowClick(teaching)}
										>
											<Col>
												<p
													style={{
														textAlign: 'justify',
														fontWeight: '700',
														fontSize: 15,
													}}
													className="text-light-cornflower-blue mb-2"
												>
													{teaching?.course?.title} (
													{teaching?.course?.courseId})
												</p>
												<p
													style={{
														textAlign: 'justify',
														fontSize: 13,
													}}
												>
													{instructorNames?.join(', ')}
												</p>
												<hr />
											</Col>
										</Row>
									);
								})}
								<Col className="d-flex justify-content-end">
									<h6 className="text-gray-400 font-weight-bold animated--grow-in">
										{enrolledCourses.length} course
										{enrolledCourses.length > 1 && 's'} enrolled
									</h6>
								</Col>
								{/* {numOfPages > 1 ? <PageButton /> : null} */}
							</>
						) : (
							<span className="text-gray-500 animated--grow-in d-flex justify-content-center">
								<FontAwesomeIcon className="text-gray-300 px-2" icon={faSpinner} />
								You are not enrolled in any courses.
							</span>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
