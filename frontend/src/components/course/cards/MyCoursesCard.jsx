import { Col, Row } from 'reactstrap';
import useMyCourses from '../../../hooks/user/useMyCourses';
import Spinner from '../../boilerplate/spinners/Spinner';
import SpinnerComponent from '../../boilerplate/spinners/SpinnerMessage';
import PillHeader from '../../boilerplate/headers/PillHeader';

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
				<Col className="text-center">
					<PillHeader title="Enrolled Courses" />
					{!isTeachingsLoading ? (
						<h6
							className="text-muted pill-label"
							style={{
								fontWeight: '700',
								fontSize: 15,
							}}
						>
							{enrolledCourses.length}
						</h6>
					) : null}
				</Col>
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
												{index !== enrolledCourses.length - 1 && <hr />}
											</Col>
										</Row>
									);
								})}
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
