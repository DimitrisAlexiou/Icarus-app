import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { getSemester } from '../../features/admin/semesterSlice';
import { getTeachings } from '../../features/courses/teachingSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faMinus } from '@fortawesome/free-solid-svg-icons';
import TeachingReviewForm from '../../components/review/forms/TeachingReviewForm';
import BreadcrumbNav from '../../components/boilerplate/Breadcrumb';
import Spinner from '../../components/boilerplate/Spinner';
import CarouselComponent from '../../components/Carousel';

export default function TeachingReview() {
	const { user } = useSelector((state) => state.auth);
	const { teachings, isLoading: isTeachingsLoading } = useSelector((state) => state.teachings);
	const { semester, isLoading: isSemesterLoading } = useSelector((state) => state.semesters);
	const { isLoading: isTeachingReviewLoading } = useSelector((state) => state.teachingReviews);
	const enrolledCourses = useSelector((state) => state.auth.user.user.student.enrolledCourses);

	const [selectedTeaching, setSelectedTeaching] = useState(null);
	const [formIsVisible, setFormIsVisible] = useState(false);
	const [formIsOpen, setFormIsOpen] = useState(false);

	const handleTeachingClick = (teaching) => {
		setSelectedTeaching((prevTeaching) => {
			return prevTeaching === teaching ? null : teaching;
		});
		setFormIsVisible(true);
		setFormIsOpen(true);
	};

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getSemester());
		dispatch(getTeachings());
	}, [dispatch]);

	return (
		<>
			<BreadcrumbNav
				className="animated--grow-in"
				link={'/review'}
				header={'Reviews'}
				active={'Teaching Review'}
			/>

			<Row className="mb-4 animated--grow-in">
				<Col>
					<h3 className="mb-5 text-gray-800 font-weight-bold animated--grow-in">
						Teaching Review
					</h3>
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

			<h6
				className="mb-4 animated--grow-in text-gray-500"
				style={{ fontWeight: 700, textAlign: 'center' }}
			>
				enrolled courses
			</h6>

			{isSemesterLoading || isTeachingsLoading ? (
				<Spinner card />
			) : enrolledCourses.length > 0 ? (
				<CarouselComponent
					objects={enrolledCourses}
					renderItem={(enrolledCourse) => {
						const teaching = teachings.find(
							(teaching) => teaching._id === enrolledCourse
						);
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
									<Row>
										<Col>{teaching?.course?.title}</Col>
										<Col
											xs="2"
											sm="2"
											md="2"
											className="d-flex justify-content-end"
										>
											{formIsOpen && selectedTeaching === teaching ? (
												<FontAwesomeIcon
													className="text-muted clickable"
													style={{
														textAlign: 'justify',
														fontWeight: '700',
														fontSize: 13,
													}}
													icon={faMinus}
													onClick={() => {
														setFormIsVisible(false);
														setFormIsOpen(false);
													}}
												/>
											) : (
												<FontAwesomeIcon
													className="text-muted clickable"
													style={{
														textAlign: 'justify',
														fontWeight: '700',
														fontSize: 15,
													}}
													icon={faEllipsis}
													onClick={(e) => {
														e.stopPropagation();
														handleTeachingClick(teaching);
													}}
												/>
											)}
										</Col>
									</Row>
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
					onObjectClick={(teaching) => {
						setSelectedTeaching(teaching);
					}}
				/>
			) : (
				<span className="mb-5 text-gray-500 animated--grow-in d-flex justify-content-center">
					You have no enrolled courses available.
				</span>
			)}

			{selectedTeaching && formIsVisible ? (
				<Row className="justify-content-center animated--grow-in">
					<Col sm="12" md="10" lg="10" xl="8">
						<div className="card shadow mb-4">
							<div className="card-header py-3">
								<h6 className="m-0 font-weight-bold text-primary">
									Leave your review
								</h6>
							</div>
							<div className="card-body">
								{isTeachingReviewLoading ? (
									<Spinner card />
								) : (
									<TeachingReviewForm
										user={user}
										teaching={selectedTeaching}
										setFormIsVisible={setFormIsVisible}
										setFormIsOpen={setFormIsOpen}
									/>
								)}
							</div>
						</div>
					</Col>
				</Row>
			) : enrolledCourses.length ? (
				<span className="mb-5 text-gray-500 animated--grow-in d-flex justify-content-center">
					Select a course to review.
				</span>
			) : null}
		</>
	);
}
