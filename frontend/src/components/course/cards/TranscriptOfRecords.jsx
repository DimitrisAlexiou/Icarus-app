import React from 'react';
import { Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faBarcode,
	faDiagramPredecessor,
	faMinus,
	faPersonChalkboard,
} from '@fortawesome/free-solid-svg-icons';
import {
	faCircle,
	faCircleDot,
	faClock,
	faFileLines,
} from '@fortawesome/free-regular-svg-icons';
import { getOrdinalNumbers } from '../../../utils/ordinalNumbers';
import { academicSemesters } from '../../../utils/academicSemesters';
import { CourseObligation, CourseType } from '../../../constants/enums';
import Spinner from '../../boilerplate/spinners/Spinner';

export default function TranscriptOfRecords({
	isGradesLoading,
	getOverallGrade,
	calculateSemesterAverageGrade,
	getGradeExamPeriod,
	totalECTSBySemester,
	handleTeachingRowClick,
	filterPassedTeachingsBySemester,
}) {
	return (
		<>
			<div className="profile_card">
				<div className="card-body">
					<Row className="mb-3 d-flex flex-column align-items-center text-center">
						<Col>
							<small
								className="text-muted pill-label"
								style={{
									textAlign: 'justify',
									fontWeight: '700',
									fontSize: 18,
								}}
							>
								Transcript of records
							</small>
						</Col>
					</Row>
					{isGradesLoading ? (
						<Spinner card />
					) : (
						academicSemesters.map((semester, index) => {
							const passedTeachings = filterPassedTeachingsBySemester(semester);
							const isTenthSemester = index === 9;
							return (
								<div className="mb-3" key={semester}>
									<Row className="mb-1">
										<Col>
											<h6
												className="text-gray-700"
												style={{
													fontWeight: '600',
													fontSize: 18,
												}}
											>
												<FontAwesomeIcon
													className="mr-2 text-gray-600"
													icon={faCircleDot}
												/>
												{getOrdinalNumbers(semester)} Semester
											</h6>
										</Col>
									</Row>
									{passedTeachings.length > 0 ? (
										passedTeachings.map((teaching, index) => (
											<Row
												key={index}
												onClick={() => handleTeachingRowClick(teaching)}
											>
												<ul className="list-group list-group-flush">
													<li className="list-group-item">
														<Row className="clickable">
															<Col className="d-flex justify-content-between flex-wrap">
																<h6
																	className="text-gray-600"
																	style={{
																		fontWeight: '500',
																	}}
																>
																	<FontAwesomeIcon
																		className="mr-2 text-gray-600"
																		icon={faFileLines}
																	/>
																	{teaching.course.title}
																</h6>
																<span
																	className="text-success"
																	style={{
																		textAlign: 'justify',
																		fontWeight: '600',
																		fontSize: 19,
																	}}
																>
																	{getOverallGrade(teaching._id)}
																</span>
															</Col>
															<Row className="mt-2">
																<Col xs="12" sm="12" md="3" lg="3" xl="2">
																	<small
																		className="text-muted"
																		style={{
																			textAlign: 'justify',
																			fontWeight: '600',
																			fontSize: 11,
																		}}
																	>
																		<FontAwesomeIcon
																			className="mr-2 text-gray-600"
																			icon={faBarcode}
																		/>
																		{teaching.course.courseId}
																	</small>
																</Col>
																<Col xs="12" sm="12" md="5" lg="6" xl="4">
																	<small
																		className="text-muted"
																		style={{
																			textAlign: 'justify',
																			fontWeight: '600',
																			fontSize: 11,
																		}}
																	>
																		<FontAwesomeIcon
																			className="mr-2 text-gray-600"
																			icon={faPersonChalkboard}
																		/>
																		{teaching.theoryInstructors?.map(
																			(instructor, index) => (
																				<span key={instructor._id}>
																					{index > 0 && ', '}
																					{`${instructor?.user?.name.toUpperCase()} ${instructor?.user?.surname.toUpperCase()}`}
																				</span>
																			)
																		)}
																	</small>
																</Col>
																<Col xs="12" sm="12" md="4" lg="3" xl="3">
																	<small
																		className="text-muted"
																		style={{
																			textAlign: 'justify',
																			fontWeight: '600',
																			fontSize: 11,
																		}}
																	>
																		<FontAwesomeIcon
																			className="mr-2 text-gray-600"
																			icon={faClock}
																		/>
																		{getGradeExamPeriod(teaching._id) ? (
																			<>
																				{
																					getGradeExamPeriod(teaching._id)
																						.semesterType
																				}{' '}
																				{
																					getGradeExamPeriod(teaching._id)
																						.academicYear
																				}
																			</>
																		) : null}
																	</small>
																</Col>
																<Col xs="12" sm="12" md="4" lg="3" xl="3">
																	<small
																		className="text-muted"
																		style={{
																			textAlign: 'justify',
																			fontWeight: '600',
																			fontSize: 11,
																		}}
																	>
																		<FontAwesomeIcon
																			className="mr-2 text-gray-600"
																			icon={faDiagramPredecessor}
																		/>
																		{teaching.course.isObligatory
																			? CourseObligation.Obligatory
																			: CourseObligation.Optional}
																	</small>
																</Col>
																{teaching.course.isObligatory ? null : (
																	<Col xs="12" sm="12" md="4" lg="3" xl="3">
																		<small
																			className="text-muted"
																			style={{
																				textAlign: 'justify',
																				fontWeight: '600',
																				fontSize: 11,
																			}}
																		>
																			<FontAwesomeIcon
																				className="mr-2 text-gray-600"
																				icon={faCircle}
																			/>
																			{teaching.course.type !==
																			CourseType.Master
																				? teaching.course.cycle.cycle
																				: teaching.course.master.title}
																		</small>
																	</Col>
																)}
															</Row>
														</Row>
													</li>
												</ul>
												{index !== passedTeachings.length - 1 && (
													<FontAwesomeIcon
														className="mx-3 mr-2 text-gray-600"
														icon={faMinus}
													/>
												)}
											</Row>
										))
									) : (
										<p
											style={{
												textAlign: 'justify',
												fontWeight: '600',
												fontSize: 12,
											}}
											className="text-muted"
										>
											{isTenthSemester
												? "Thesis isn't submitted yet."
												: 'There are no passed teachings for this semester.'}
										</p>
									)}
									<hr />
									<ul className="list-group list-group-flush">
										<li className="list-group-item">
											<Row>
												<Col className="d-flex justify-content-end">
													<Row>
														<Col xs="6" sm="6" md="2">
															<small
																className="text-muted"
																style={{
																	textAlign: 'justify',
																	fontWeight: '600',
																	fontSize: 11,
																}}
															>
																Total Courses
															</small>
														</Col>
														<Col>
															<span className="text-secondary">
																{isTenthSemester
																	? `${passedTeachings.length}/1`
																	: `${passedTeachings.length}/6`}
															</span>
														</Col>
														<Col xs="6" sm="6" md="2">
															<small
																className="text-muted"
																style={{
																	textAlign: 'justify',
																	fontWeight: '600',
																	fontSize: 11,
																}}
															>
																Grade Average
															</small>
														</Col>
														<Col>
															<span
																className={`${
																	passedTeachings.length
																		? 'text-success'
																		: 'text-danger'
																}`}
																style={{
																	textAlign: 'justify',
																	fontWeight: '600',
																}}
															>
																{passedTeachings.length
																	? calculateSemesterAverageGrade(semester)
																	: 0}
															</span>
														</Col>
														<Col xs="6" sm="6" md="2">
															<small
																className="text-muted"
																style={{
																	textAlign: 'justify',
																	fontWeight: '600',
																	fontSize: 11,
																}}
															>
																Total ECTS
															</small>
														</Col>
														<Col>
															<span className="text-secondary">
																{totalECTSBySemester[semester] || 0}/30
															</span>
														</Col>
													</Row>
												</Col>
											</Row>
										</li>
									</ul>
								</div>
							);
						})
					)}
				</div>
			</div>
		</>
	);
}
