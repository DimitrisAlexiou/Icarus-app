import { Col, Row } from 'reactstrap';
import useMyCourses from '../../../hooks/user/useMyCourses';
import Spinner from '../../boilerplate/spinners/Spinner';
import SpinnerComponent from '../../boilerplate/spinners/SpinnerMessage';

export default function MyCoursesCard() {
	const {
		isTeachingsLoading,
		enrolledCourses,
		findTeaching,
		getInstructorNames,
		handleCourseRowClick,
	} = useMyCourses();

	return (
		<>
			<Row className="justify-content-center animated--grow-in mb-3">
				<h6
					className="animated--grow-in text-gray-500"
					style={{ textAlign: 'center' }}
				>
					<small
						className="text-muted pill-label"
						style={{
							fontWeight: '700',
							fontSize: 15,
						}}
					>
						Enrolled Courses
					</small>
				</h6>
			</Row>
			<div className="profile_card">
				<div className="card-body">
					<div className="align-items-center text-center">
						{isTeachingsLoading ? (
							<Spinner card />
						) : enrolledCourses && enrolledCourses.length > 0 ? (
							<>
								{enrolledCourses.map((enrolledCourse, index) => {
									const teaching = findTeaching(enrolledCourse);
									const instructorNames = getInstructorNames(teaching);
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
							<SpinnerComponent message="You are not enrolled in any courses." />
						)}
					</div>
				</div>
			</div>
		</>
	);
}
