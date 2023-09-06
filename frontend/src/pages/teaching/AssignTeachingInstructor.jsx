import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { getSemester } from '../../features/admin/semesterSlice';
import {
	getTeachings,
	unassignTheoryInstructors,
	unassignLabInstructors,
} from '../../features/courses/teachingSlice';
import { getInstructors } from '../../features/admin/userSlice';
import { deleteAlert } from '../../constants/sweetAlertNotification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faEllipsis, faMinus, faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons';
import AssignInstructorForm from '../../components/course/forms/AssignInstructorForm';
import CarouselComponent from '../../components/Carousel';
import Spinner from '../../components/boilerplate/Spinner';

export default function AssignTeachingInstructor() {
	const { semester, isLoading: isSemesterLoading } = useSelector((state) => state.semesters);
	const { teachings, isLoading: isTeachingsLoading } = useSelector((state) => state.teachings);
	const { instructors, isLoading: isInstructorsLoading } = useSelector((state) => state.users);

	const [selectedTeaching, setSelectedTeaching] = useState(null);
	const [formIsVisible, setFormIsVisible] = useState(false);
	const [formIsOpen, setFormIsOpen] = useState(false);
	const [assignedInstructorsCount, setAssignedInstructorsCount] = useState({
		theory: 0,
		lab: 0,
	});

	const availableTeachings = teachings.filter(
		(teaching) => teaching.semester._id === semester._id
	);

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
		dispatch(getInstructors());
	}, [dispatch]);

	useEffect(() => {
		const theoryCount = selectedTeaching?.theoryInstructors.length || 0;
		const labCount = selectedTeaching?.labInstructors.length || 0;
		setAssignedInstructorsCount({ theory: theoryCount, lab: labCount });
	}, [selectedTeaching]);

	return (
		<>
			<Row className="mb-4 animated--grow-in">
				<Col>
					<h3 className="text-gray-800 font-weight-bold">Assign Instructor</h3>
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
				active teachings in the current semester
			</h6>

			{isSemesterLoading || isTeachingsLoading || isInstructorsLoading ? (
				<Spinner card />
			) : teachings.length > 0 && semester ? (
				availableTeachings.length > 0 ? (
					<>
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
										<Row>
											<Col>{teaching.course.title}</Col>
											<Col
												xs="2"
												sm="2"
												md="2"
												className="d-flex justify-content-end"
											>
												{teaching.theoryInstructors.length ||
												teaching.labInstructors.length ? (
													formIsOpen && selectedTeaching === teaching ? (
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
													)
												) : null}
											</Col>
										</Row>
									</CardTitle>
									<CardText
										style={{
											textAlign: 'justify',
											fontWeight: '600',
											fontSize: 11,
										}}
									>
										{teaching.course.courseId}
									</CardText>
									<CardText>
										<Row className="d-flex align-items-center">
											<Col>
												<small
													className={
														teaching.theoryInstructors.length
															? 'text-success pill-label'
															: 'text-muted pill-label'
													}
													style={{
														textAlign: 'justify',
														fontWeight: '700',
														fontSize: 12,
													}}
												>
													{teaching.theoryInstructors.length ? (
														<>
															<FontAwesomeIcon icon={faCircleCheck} />
															<span className="mx-2">Theory</span>
														</>
													) : (
														<>Theory</>
													)}
												</small>
											</Col>
											{teaching.theoryInstructors.length ? (
												<Col className="d-flex justify-content-end">
													<FontAwesomeIcon
														className="text-muted clickable"
														style={{
															textAlign: 'justify',
															fontWeight: '700',
															fontSize: 15,
														}}
														icon={faXmark}
														onClick={(e) => {
															e.stopPropagation();
															deleteAlert(() =>
																dispatch(
																	unassignTheoryInstructors(
																		teaching._id
																	)
																)
															);
															setFormIsVisible(false);
														}}
													/>
												</Col>
											) : null}
										</Row>
										<Row className="mt-1">
											<Col>
												<small
													className={
														teaching.theoryInstructors.length
															? 'text-success'
															: 'text-muted'
													}
													style={{
														textAlign: 'justify',
														fontWeight: '700',
														fontSize: 14,
													}}
												>
													{teaching.theoryInstructors.length ? (
														teaching.theoryInstructors
															.map((instructor) => {
																return instructor
																	? instructor.user.surname
																	: '';
															})
															.join(' | ')
													) : (
														<small
															className={
																teaching.theoryInstructors.length
																	? 'text-success'
																	: 'text-muted'
															}
															style={{
																textAlign: 'justify',
																fontWeight: '500',
																fontSize: 11,
															}}
														>
															<FontAwesomeIcon icon={faCircleXmark} />
															<span className="mx-2">Unassigned</span>
														</small>
													)}
												</small>
											</Col>
										</Row>
									</CardText>
									<CardText>
										<Row className="d-flex align-items-center">
											<Col>
												<small
													className={
														teaching.labInstructors.length
															? 'text-success pill-label'
															: 'text-muted pill-label'
													}
													style={{
														textAlign: 'justify',
														fontWeight: '700',
														fontSize: 12,
													}}
												>
													{teaching.labInstructors.length ? (
														<>
															<FontAwesomeIcon icon={faCircleCheck} />
															<span className="mx-2">Lab</span>
														</>
													) : (
														<>Lab</>
													)}
												</small>
											</Col>
											{teaching.labInstructors.length ? (
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
																dispatch(
																	unassignLabInstructors(
																		teaching._id
																	)
																)
															);
															setFormIsVisible(false);
														}}
													/>
												</Col>
											) : null}
										</Row>
										<Row className="mt-1">
											<Col>
												<small
													className={
														teaching.labInstructors.length
															? 'text-success'
															: 'text-muted'
													}
													style={{
														textAlign: 'justify',
														fontWeight: '700',
														fontSize: 14,
													}}
												>
													{teaching.labInstructors.length ? (
														teaching.labInstructors
															.map((instructor) => {
																return instructor
																	? instructor.user.surname
																	: '';
															})
															.join(' | ')
													) : (
														<small
															className={
																teaching.labInstructors.length
																	? 'text-success'
																	: 'text-muted'
															}
															style={{
																textAlign: 'justify',
																fontWeight: '500',
																fontSize: 11,
															}}
														>
															<FontAwesomeIcon icon={faCircleXmark} />
															<span className="mx-2">Unassigned</span>
														</small>
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
						{selectedTeaching && formIsVisible ? (
							<Col className="animated--grow-in" xl="4" lg="6" md="8" sm="3">
								<div className="card shadow mb-4">
									<div className="card-body">
										<AssignInstructorForm
											teaching={selectedTeaching}
											instructors={instructors}
											isEditingTheoryInstructors={
												assignedInstructorsCount.theory > 0
											}
											isEditingLabInstructors={
												assignedInstructorsCount.lab > 0
											}
											setFormIsVisible={setFormIsVisible}
										/>
									</div>
								</div>
							</Col>
						) : null}
					</>
				) : (
					<span className="mt-5 mb-5 text-gray-500 animated--grow-in d-flex justify-content-center">
						<FontAwesomeIcon className="fa-1x text-gray-300 px-4" icon={faSpinner} />
						There are no active teachings available in the current semester.
					</span>
				)
			) : (
				<span className="mb-5 text-gray-500 animated--grow-in d-flex justify-content-center">
					<FontAwesomeIcon className="fa-1x text-gray-300 px-4" icon={faSpinner} />
					There are no teachings available right now.
				</span>
			)}
		</>
	);
}
