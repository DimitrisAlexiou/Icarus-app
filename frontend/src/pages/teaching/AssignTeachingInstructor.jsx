import { forwardRef, useEffect, useRef, useState } from 'react';
import {
	Col,
	Row,
	CardTitle,
	CardText,
	Modal,
	ModalHeader,
	ModalBody,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCircleCheck,
	faCircleXmark,
} from '@fortawesome/free-regular-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import useAssignTeachingInstructor from '../../hooks/teaching/useAssignTeachingInstructor';
import AssignInstructorForm from '../../components/course/forms/AssignInstructorForm';
import CarouselComponent from '../../components/Carousel';
import Spinner from '../../components/boilerplate/spinners/Spinner';
import SpinnerComponent from '../../components/boilerplate/spinners/SpinnerMessage';
import PillHeader from '../../components/boilerplate/headers/PillHeader';
import HeaderWithSemester from '../../components/boilerplate/headers/HeaderWithSemester';

export default function AssignTeachingInstructor() {
	const {
		semester,
		teachings,
		instructors,
		isSemesterLoading,
		isTeachingsLoading,
		isInstructorsLoading,
		availableTeachings,
		handleUnassignTheoryInstructors,
		handleUnassignLabInstructors,
		dispatch,
	} = useAssignTeachingInstructor();

	const modalRef = useRef(null);
	const [modal, setModal] = useState(false);
	const [selectedTeaching, setSelectedTeaching] = useState(null);
	const [assignedInstructorsCount, setAssignedInstructorsCount] = useState({
		theory: 0,
		lab: 0,
	});

	const handleTeachingClick = (teaching) => {
		setSelectedTeaching(teaching);
		setModal(true);
	};

	const toggle = () => {
		setModal(!modal);
		setSelectedTeaching(null);
	};

	const ModalComponent = forwardRef((props, ref) => {
		return (
			<Modal ref={ref} isOpen={modal} toggle={toggle} className="modal-lg">
				<ModalHeader toggle={toggle}>
					Assign Instructor (
					<span style={{ fontWeight: 'bold', fontSize: '21px' }}>
						{selectedTeaching?.course?.title}
					</span>
					)
				</ModalHeader>
				<ModalBody>
					<AssignInstructorForm
						teaching={selectedTeaching}
						instructors={instructors}
						isEditingTheoryInstructors={assignedInstructorsCount.theory > 0}
						isEditingLabInstructors={assignedInstructorsCount.lab > 0}
						setModal={setModal}
						dispatch={dispatch}
					/>
				</ModalBody>
			</Modal>
		);
	});

	useEffect(() => {
		const theoryCount = selectedTeaching?.theoryInstructors?.length || 0;
		const labCount = selectedTeaching?.labInstructors?.length || 0;
		setAssignedInstructorsCount({ theory: theoryCount, lab: labCount });
	}, [selectedTeaching]);

	return (
		<>
			<HeaderWithSemester title="Assign Instructor" />

			<Row className="mt-3 mb-4 justify-content-between animated--grow-in">
				<Col className="text-center">
					<PillHeader title="active teachings" />
					<h6
						className="text-muted pill-label"
						style={{
							fontWeight: '700',
							fontSize: 15,
						}}
					>
						{availableTeachings.length}
					</h6>
				</Col>
			</Row>

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
										{teaching.course.title}
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
															handleUnassignTheoryInstructors(teaching);
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
									{teaching.course.hasLab ? (
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
																handleUnassignLabInstructors(teaching);
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
									) : null}
								</>
							)}
							onObjectClick={(teaching) => {
								handleTeachingClick(teaching);
							}}
						/>
						<ModalComponent ref={modalRef} toggle={toggle} />
					</>
				) : (
					<span className="mt-5 mb-5">
						<SpinnerComponent message="There are no active teachings available in the current semester." />
					</span>
				)
			) : (
				<div className="mb-5">
					<SpinnerComponent message="There are no teachings available right now." />
				</div>
			)}
		</>
	);
}
