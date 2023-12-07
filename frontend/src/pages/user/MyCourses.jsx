import { Row, Col, CardTitle, CardText } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import useMyCourses from '../../hooks/user/useMyCourses';
import BreadcrumbNav from '../../components/boilerplate/Breadcrumb';
import Spinner from '../../components/boilerplate/spinners/Spinner';
import SpinnerComponent from '../../components/boilerplate/spinners/SpinnerMessage';
import CarouselComponent from '../../components/Carousel';
import CurrentSemester from '../../components/boilerplate/CurrentSemester';
import Header from '../../components/boilerplate/Header';

export default function MyCourses() {
	const {
		semester,
		teachings,
		isSemesterLoading,
		isTeachingsLoading,
		availableTeachings,
		filteredAvailableTeachings,
		hasMoreAvailableCoursesToEnroll,
		enrolledCourses,
		findTeaching,
		handleCourseEnrollment,
		handleCourseDisenrollment,
		handleNavigateToCoursePortfolio,
	} = useMyCourses();

	return (
		<>
			<BreadcrumbNav
				className="animated--grow-in"
				link={'/my-courses'}
				header={'My Courses'}
				active={'My Courses'}
			/>

			<Row className="mb-4 animated--grow-in">
				<Col>
					<h3 className="text-gray-800 font-weight-bold">My Courses</h3>
				</Col>
				<CurrentSemester />
			</Row>
			<Row className="mb-4 justify-content-between animated--grow-in">
				<Col className="text-center">
					<Header title="active courses in the current semester" />
				</Col>
			</Row>

			{isSemesterLoading || isTeachingsLoading ? (
				<Spinner card />
			) : teachings.length > 0 && semester ? (
				hasMoreAvailableCoursesToEnroll ? (
					<CarouselComponent
						objects={filteredAvailableTeachings}
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
						onObjectClick={(teaching) => handleCourseEnrollment(teaching)}
					/>
				) : (
					<div className="mt-5 mb-5">
						<SpinnerComponent message="There are no more active courses available to select." />
					</div>
				)
			) : availableTeachings.length > 0 ? (
				<div className="mt-5 mb-5">
					<SpinnerComponent message="There are no active courses available in the current semester." />
				</div>
			) : (
				<div className="mb-5">
					<SpinnerComponent message="There are no courses available right now." />
				</div>
			)}

			<Row className="mt-3 mb-4 justify-content-between animated--grow-in">
				<Col className="text-center">
					<Header title="enrolled courses" />
				</Col>
			</Row>

			{enrolledCourses && enrolledCourses.length > 0 ? (
				<CarouselComponent
					objects={enrolledCourses}
					renderItem={(enrolledCourse) => {
						const teaching = findTeaching(enrolledCourse);
						return (
							<>
								<Row>
									<Col>
										<CardTitle
											style={{
												textAlign: 'justify',
												fontWeight: '700',
												fontSize: 15,
											}}
											className="text-light-cornflower-blue mb-2"
										>
											{teaching?.course?.title}
										</CardTitle>
									</Col>
									<Col className="d-flex justify-content-end">
										<FontAwesomeIcon
											className="text-muted clickable"
											style={{
												textAlign: 'justify',
												fontWeight: '700',
												fontSize: 13,
											}}
											icon={faXmark}
											onClick={(e) => {
												e.stopPropagation();
												handleCourseDisenrollment(teaching);
											}}
										/>
									</Col>
								</Row>
								<CardText>
									<small
										className="text-muted"
										style={{
											textAlign: 'justify',
											fontWeight: '700',
											fontSize: 13,
										}}
									>
										{teaching?.course?.isObligatory ? 'Obligatory' : 'Optional'}
									</small>
								</CardText>
								<CardText
									style={{
										textAlign: 'justify',
										fontWeight: '600',
										fontSize: 11,
									}}
								>
									{teaching?.course?.courseId}
								</CardText>
							</>
						);
					}}
					onObjectClick={(enrolledCourse) => {
						handleNavigateToCoursePortfolio(enrolledCourse);
					}}
				/>
			) : (
				<div className="mt-5 mb-5">
					<SpinnerComponent message="You are not enrolled in any courses." />
				</div>
			)}
		</>
	);
}
