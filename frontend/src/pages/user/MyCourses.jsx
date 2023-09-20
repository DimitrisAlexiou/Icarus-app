import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, CardTitle, CardText } from 'reactstrap';
import { getSemester } from '../../features/admin/semesterSlice';
import { getTeachings } from '../../features/courses/teachingSlice';
import { PrerequisiteType } from '../../constants/enums';
import { disenrollCourse, enrollCourse } from '../../features/courses/courseSlice';
import { deleteAlert, enrollAlert } from '../../constants/sweetAlertNotification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons';
import BreadcrumbNav from '../../components/boilerplate/Breadcrumb';
import Spinner from '../../components/boilerplate/Spinner';
import CarouselComponent from '../../components/Carousel';
import CurrentSemester from '../../components/boilerplate/CurrentSemester';

export default function MyCourses() {
	const { semester, isLoading: isSemesterLoading } = useSelector((state) => state.semesters);
	const { teachings, isLoading: isTeachingsLoading } = useSelector((state) => state.teachings);
	const enrolledCourses = useSelector((state) => state.auth.user.user.student.enrolledCourses);

	const availableTeachings = teachings.filter(
		(teaching) => teaching?.semester?._id === semester?._id
	);

	// const arePrerequisitesMet = (teaching) => {
	// 	const prerequisites = teaching.course.prerequisites;
	// 	console.log(prerequisites);

	// 	if (!prerequisites.length > 0) return true;

	// 	return prerequisites.every((prerequisite) => {
	// 		const prerequisiteTeaching = teachings.find(
	// 			(teaching) => teaching._id === prerequisite.prerequisite
	// 		);

	// 		if (!prerequisiteTeaching) return false;

	// 		if (prerequisite.prerequisiteType === PrerequisiteType.Hard) return false;
	// 		else if (prerequisite.prerequisiteType === PrerequisiteType.Soft) return true;

	// 		return false;
	// 	});
	// };

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getSemester());
		dispatch(getTeachings());
	}, [dispatch]);

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

			<h6 className="mb-4 animated--grow-in" style={{ fontWeight: 700, textAlign: 'center' }}>
				active courses in the current semester
			</h6>

			{isSemesterLoading || isTeachingsLoading ? (
				<Spinner card />
			) : teachings.length > 0 && semester ? (
				availableTeachings.length > 0 ? (
					<CarouselComponent
						objects={availableTeachings}
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
							// const prerequisitesMet = arePrerequisitesMet(teaching);

							// if (prerequisitesMet)
							enrollAlert(() => dispatch(enrollCourse(teaching._id)));
							// else
							// 	Toast.fire({
							// 		title: 'Oops!',
							// 		text: 'You have not met the prerequisites for this course. Please check the course description for more information.',
							// 		icon: 'warning',
							// 	});
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
							(teaching) => teaching._id === enrolledCourse
						);
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
												deleteAlert(() =>
													dispatch(disenrollCourse(teaching._id))
												);
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
						const teaching = teachings.find(
							(teaching) => teaching._id === enrolledCourse
						);
						navigate('/teaching/' + teaching._id + '/portfolio');
					}}
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
