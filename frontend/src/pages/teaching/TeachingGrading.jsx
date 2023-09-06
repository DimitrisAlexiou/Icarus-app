import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { getSemester } from '../../features/admin/semesterSlice';
import { getTeachings } from '../../features/courses/teachingSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import CarouselComponent from '../../components/Carousel';
import Spinner from '../../components/boilerplate/Spinner';

export default function TeachingGrading() {
	const { user } = useSelector((state) => state.auth);
	const { semester, isLoading: isSemesterLoading } = useSelector((state) => state.semesters);
	const { teachings, isLoading: isTeachingsLoading } = useSelector((state) => state.teachings);
	const [filteredTeachings, setFilteredTeachings] = useState([]);

	const handleTeachingClick = (teaching) => {
		navigate(`/teaching/${teaching._id}`);
	};

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getSemester());
		dispatch(getTeachings());
	}, [dispatch]);

	useEffect(() => {
		const filteredTeachings = user.user.isAdmin
			? teachings
			: teachings.filter((teaching) => {
					const isInstructorAssigned =
						teaching.theoryInstructors.some(
							(instructor) => instructor.user._id === user.user._id
						) ||
						teaching.labInstructors.some(
							(instructor) => instructor.user._id === user.user._id
						);

					return isInstructorAssigned && teaching.semester?._id === semester?._id;
			  });
		setFilteredTeachings(filteredTeachings);
	}, [semester?._id, teachings, user.user._id, user.user.isAdmin]);

	return (
		<>
			<Row className="mb-4 animated--grow-in">
				<Col>
					<h3 className="text-gray-800 font-weight-bold">Teaching Grading</h3>
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
				active teachings
			</h6>

			{isSemesterLoading || isTeachingsLoading ? (
				<Spinner card />
			) : teachings.length > 0 ? (
				<>
					{filteredTeachings.length > 0 ? (
						<CarouselComponent
							objects={filteredTeachings.filter(
								(teaching) => teaching.semester._id === semester._id
							)}
							renderItem={(teaching) => (
								<>
									<Row className="mb-2">
										<Col>
											<CardTitle
												style={{
													textAlign: 'justify',
													fontWeight: '700',
													fontSize: 15,
												}}
												className="text-light-cornflower-blue mb-2"
											>
												<Row>
													<Col>{teaching.course.title}</Col>
												</Row>
											</CardTitle>
										</Col>
										<Col className="d-flex justify-content-end">
											<CardText
												style={{
													textAlign: 'justify',
													fontWeight: '600',
													fontSize: 11,
												}}
											>
												{teaching.course.courseId}
											</CardText>
										</Col>
									</Row>
									<CardText>
										<Row className="mt-1">
											<Col>
												<small
													className={
														teaching.theoryExamination.length
															? 'text-success pill-label'
															: 'text-muted pill-label'
													}
													style={{
														textAlign: 'justify',
														fontWeight: '700',
														fontSize: 12,
													}}
												>
													Theory
												</small>
											</Col>
											<Col>
												<small
													className={
														teaching.theoryExamination.length
															? 'text-success'
															: 'text-muted'
													}
													style={{
														textAlign: 'justify',
														fontWeight: '700',
														fontSize: 14,
													}}
												>
													{teaching.theoryExamination.length ? (
														<>
															<FontAwesomeIcon icon={faCircleCheck} />
															<span className="mx-2">Assigned</span>
														</>
													) : (
														<>
															<FontAwesomeIcon icon={faCircleXmark} />
															<span className="mx-2">Unassigned</span>
														</>
													)}
												</small>
											</Col>
										</Row>
									</CardText>
									<CardText>
										<Row className="mt-1">
											<Col>
												<small
													className={
														teaching.labExamination.length
															? 'text-success pill-label'
															: 'text-muted pill-label'
													}
													style={{
														textAlign: 'justify',
														fontWeight: '700',
														fontSize: 12,
													}}
												>
													Lab
												</small>
											</Col>
											<Col>
												<small
													className={
														teaching.labExamination.length
															? 'text-success'
															: 'text-muted'
													}
													style={{
														textAlign: 'justify',
														fontWeight: '700',
														fontSize: 14,
													}}
												>
													{teaching.labExamination.length ? (
														<>
															<FontAwesomeIcon icon={faCircleCheck} />
															<span className="mx-2">Assigned</span>
														</>
													) : (
														<>
															<FontAwesomeIcon icon={faCircleXmark} />
															<span className="mx-2">Unassigned</span>
														</>
													)}
												</small>
											</Col>
										</Row>
									</CardText>
								</>
							)}
							onObjectClick={(teaching) => {
								handleTeachingClick(teaching);
							}}
						/>
					) : (
						<span className="mt-5 mb-5 text-gray-500 animated--grow-in d-flex justify-content-center">
							<FontAwesomeIcon
								className="fa-1x text-gray-300 px-4"
								icon={faSpinner}
							/>
							There are no active teachings available in the current semester.
						</span>
					)}
				</>
			) : (
				<span className="mb-5 text-gray-500 animated--grow-in d-flex justify-content-center">
					<FontAwesomeIcon className="fa-1x text-gray-300 px-4" icon={faSpinner} />
					There are no teachings available right now.
				</span>
			)}
		</>
	);
}
