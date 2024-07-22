import { Button, Col, Row, Spinner } from 'reactstrap';
import { Examination } from '../../../constants/enums';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faCheckDouble, faXmark } from '@fortawesome/free-solid-svg-icons';
import {
	setEditTheoryGrade,
	setEditLabGrade,
} from '../../../features/courses/gradeSlice';
import Loading from '../../boilerplate/spinners/Spinner';
import GradeForm from '../forms/GradeForm';
import GradeCardInfo from './GradeCardInfo';
import StatementCardInfo from '../../statement/cards/StatementCardInfo';

const GradeCard = ({
	user,
	statement,
	teachingsToGrade,
	isGradeLoading,
	isStatementsLoading,
	isEditingTheoryGrade,
	isEditingLabGrade,
	editGradeId,
	examinationType,
	examId,
	teachingToEditId,
	isTheoryInstructor,
	isLabInstructor,
	gradeFilter,
	gradeCheck,
	gradeFind,
	gradeFinalized,
	handleFinalizeGrade,
	overallGrade,
	dispatch,
}) => {
	return (
		<>
			<StatementCardInfo
				statement={statement}
				isStatementsLoading={isStatementsLoading}
			/>
			{isStatementsLoading ? (
				<Loading card />
			) : (
				teachingsToGrade.map((teaching, index) => (
					<div key={index}>
						<ul className="list-group list-group-flush">
							<li className="list-group-item">
								<GradeCardInfo
									teaching={teaching}
									statement={statement}
									overallGrade={overallGrade[teaching._id].overallGrade}
								/>
								{teaching.theoryExamination.length ? (
									<>
										<Row
											className="mb-3"
											style={{
												pointerEvents: isTheoryInstructor(teaching)
													? 'auto'
													: 'none',
												opacity: isTheoryInstructor(teaching) ? 1 : 0.6,
											}}
										>
											<Col xl="4" md="6" xs="10">
												<h6
													className="text-muted pill-label"
													style={{
														fontWeight: '700',
														fontSize: 15,
													}}
												>
													Theory Examination
												</h6>
												<h6
													className="text-muted pill-label"
													style={{
														fontWeight: '700',
														fontSize: 13,
													}}
												>
													{overallGrade[teaching._id].totalTheoryGrade}
												</h6>
											</Col>
											<Col md="1" xl="1" xs="1">
												{isEditingTheoryGrade &&
												teachingToEditId === teaching._id ? (
													<FontAwesomeIcon
														className="clickable"
														onClick={() =>
															dispatch(
																setEditTheoryGrade({
																	isEditingTheoryGrade: false,
																	editGradeId: '',
																	examinationType: '',
																	examId: '',
																	teachingToEditId: '',
																})
															)
														}
														icon={faXmark}
													/>
												) : null}
											</Col>
										</Row>
										{teaching.theoryExamination.map((examination, index) => {
											const filterGrade = gradeFilter(
												teaching,
												examination,
												Examination.Theory
											);
											const checkGrade = gradeCheck(
												teaching,
												examination,
												Examination.Theory
											);
											const findGrade = gradeFind(
												teaching,
												examination,
												Examination.Theory
											);
											const finalizedGrade = gradeFinalized(
												teaching,
												examination,
												Examination.Theory
											);
											return (
												<Row
													key={index}
													className="align-items-center"
													style={{
														pointerEvents: isTheoryInstructor(teaching)
															? 'auto'
															: 'none',
														opacity: isTheoryInstructor(teaching) ? 1 : 0.6,
													}}
												>
													<Col xs="9">
														{isEditingTheoryGrade &&
														examinationType === examination.type &&
														examId === examination._id &&
														teachingToEditId === teaching._id ? (
															<GradeForm
																grade={filterGrade}
																examination={Examination.Theory}
																type={examination.type}
																examId={examination._id}
																teachingId={teaching._id}
																statementId={statement._id}
																userId={user.user._id}
																isEditingTheoryGrade={isEditingTheoryGrade}
																editGradeId={editGradeId}
																dispatch={dispatch}
															/>
														) : checkGrade ? (
															<Row>
																<Col xl="2" lg="4" md="4">
																	<label>{examination.type}</label>
																</Col>
																<Col sm="7" md="2" lg="4">
																	<p style={{ textAlign: 'justify' }}>
																		{filterGrade?.map(
																			(grade) => grade.exam.grade
																		)}
																	</p>
																</Col>
															</Row>
														) : (
															<GradeForm
																examination={Examination.Theory}
																type={examination.type}
																examId={examination._id}
																teachingId={teaching._id}
																statementId={statement._id}
																userId={user.user._id}
																isEditingTheoryGrade={isEditingTheoryGrade}
																editGradeId={editGradeId}
																dispatch={dispatch}
															/>
														)}
													</Col>
													<Col className="text-right">
														{checkGrade && !finalizedGrade ? (
															<Row className="mb-sm-0 mb-3">
																{!isEditingTheoryGrade ? (
																	<Col>
																		<Button
																			className="btn btn-light"
																			style={{
																				fontWeight: 500,
																				fontSize: 15,
																			}}
																			onClick={() => {
																				dispatch(
																					setEditTheoryGrade({
																						isEditingTheoryGrade: true,
																						editGradeId: findGrade?._id,
																						examinationType: examination.type,
																						examId: examination._id,
																						teachingToEditId: teaching._id,
																					})
																				);
																			}}
																		>
																			{isGradeLoading ? (
																				<Spinner
																					size="sm"
																					color="dark"
																					type="grow"
																				/>
																			) : (
																				<FontAwesomeIcon icon={faEdit} />
																			)}
																		</Button>
																	</Col>
																) : null}
																<Col className="mt-sm-0 mt-3">
																	<Button
																		className="btn btn-light"
																		style={{
																			fontWeight: 500,
																			fontSize: 15,
																		}}
																		onClick={() =>
																			handleFinalizeGrade(findGrade)
																		}
																	>
																		{isGradeLoading ? (
																			<Spinner
																				size="sm"
																				color="dark"
																				type="grow"
																			/>
																		) : (
																			<FontAwesomeIcon icon={faCheckDouble} />
																		)}
																	</Button>
																</Col>
															</Row>
														) : null}
														{finalizedGrade ? (
															<small
																className="text-info"
																style={{
																	textAlign: 'justify',
																	fontWeight: '600',
																	fontSize: 12,
																}}
															>
																finalized
															</small>
														) : null}
													</Col>
												</Row>
											);
										})}
									</>
								) : (
									<Row
										className={`animated--grow-in ${
											!teaching.theoryExamination.length ? 'mb-3' : null
										}`}
									>
										<Col className="d-flex justify-content-center">
											<span className="text-sm text-gray-500">
												<small
													className="text-warning pill-label"
													style={{
														textAlign: 'justify',
														fontWeight: '700',
														fontSize: 16,
													}}
												>
													Theory examination schema is not yet assigned
												</small>
											</span>
										</Col>
									</Row>
								)}
								{teaching.labExamination.length ? (
									<>
										<Row
											className="mb-3"
											style={{
												pointerEvents: isLabInstructor(teaching)
													? 'auto'
													: 'none',
												opacity: isLabInstructor(teaching) ? 1 : 0.6,
											}}
										>
											<Col xl="4" md="6" xs="10">
												<h6
													className="text-muted pill-label"
													style={{
														fontWeight: '700',
														fontSize: 15,
													}}
												>
													Lab Examination
												</h6>
												<h6
													className="text-muted pill-label"
													style={{
														fontWeight: '700',
														fontSize: 13,
													}}
												>
													{overallGrade[teaching._id].totalLabGrade}
												</h6>
											</Col>
											<Col md="1" xl="1" xs="1">
												{isEditingLabGrade &&
												teachingToEditId === teaching._id ? (
													<FontAwesomeIcon
														className="clickable"
														onClick={() =>
															dispatch(
																setEditLabGrade({
																	isEditingLabGrade: false,
																	editGradeId: '',
																	examinationType: '',
																	examId: '',
																	teachingToEditId: '',
																})
															)
														}
														icon={faXmark}
													/>
												) : null}
											</Col>
										</Row>
										{teaching.labExamination.map((examination, index) => {
											const filterGrade = gradeFilter(
												teaching,
												examination,
												Examination.Lab
											);
											const checkGrade = gradeCheck(
												teaching,
												examination,
												Examination.Lab
											);
											const findGrade = gradeFind(
												teaching,
												examination,
												Examination.Lab
											);
											const finalizedGrade = gradeFinalized(
												teaching,
												examination,
												Examination.Lab
											);
											return (
												<Row
													key={index}
													className="align-items-center"
													style={{
														pointerEvents: isLabInstructor(teaching)
															? 'auto'
															: 'none',
														opacity: isLabInstructor(teaching) ? 1 : 0.6,
													}}
												>
													<Col xs="9">
														{isEditingLabGrade &&
														examinationType === examination.type &&
														examId === examination._id &&
														teachingToEditId === teaching._id ? (
															<GradeForm
																grade={filterGrade}
																examination={Examination.Lab}
																type={examination.type}
																examId={examination._id}
																teachingId={teaching._id}
																statementId={statement._id}
																userId={user.user._id}
																isEditingLabGrade={isEditingLabGrade}
																editGradeId={editGradeId}
																dispatch={dispatch}
															/>
														) : checkGrade ? (
															<Row>
																<Col xl="2" lg="4" md="4">
																	<label>{examination.type}</label>
																</Col>
																<Col sm="7" md="2" lg="4">
																	<p style={{ textAlign: 'justify' }}>
																		{filterGrade?.map(
																			(grade) => grade.exam.grade
																		)}
																	</p>
																</Col>
															</Row>
														) : (
															<GradeForm
																examination={Examination.Lab}
																type={examination.type}
																examId={examination._id}
																teachingId={teaching._id}
																statementId={statement._id}
																userId={user.user._id}
																isEditingLabGrade={isEditingLabGrade}
																editGradeId={editGradeId}
																dispatch={dispatch}
															/>
														)}
													</Col>
													<Col className="text-right">
														{checkGrade && !finalizedGrade ? (
															<Row className="mb-sm-0 mb-3">
																{!isEditingLabGrade ? (
																	<Col>
																		<Button
																			className="btn btn-light"
																			style={{
																				fontWeight: 500,
																				fontSize: 15,
																			}}
																			onClick={() => {
																				dispatch(
																					setEditLabGrade({
																						isEditingLabGrade: true,
																						editGradeId: findGrade?._id,
																						examinationType: examination.type,
																						examId: examination._id,
																						teachingToEditId: teaching._id,
																					})
																				);
																			}}
																		>
																			{isGradeLoading ? (
																				<Spinner
																					size="sm"
																					color="dark"
																					type="grow"
																				/>
																			) : (
																				<FontAwesomeIcon icon={faEdit} />
																			)}
																		</Button>
																	</Col>
																) : null}
																<Col className="mt-sm-0 mt-3">
																	<Button
																		className="btn btn-light"
																		style={{
																			fontWeight: 500,
																			fontSize: 15,
																		}}
																		onClick={() =>
																			handleFinalizeGrade(findGrade)
																		}
																	>
																		{isGradeLoading ? (
																			<Spinner
																				size="sm"
																				color="dark"
																				type="grow"
																			/>
																		) : (
																			<FontAwesomeIcon icon={faCheckDouble} />
																		)}
																	</Button>
																</Col>
															</Row>
														) : null}
														{finalizedGrade ? (
															<small
																className="text-info"
																style={{
																	textAlign: 'justify',
																	fontWeight: '600',
																	fontSize: 12,
																}}
															>
																finalized
															</small>
														) : null}
													</Col>
												</Row>
											);
										})}
									</>
								) : (
									<Row className="animated--grow-in">
										<Col className="d-flex justify-content-center">
											<span className="text-sm text-gray-500">
												<small
													className="text-warning pill-label"
													style={{
														textAlign: 'justify',
														fontWeight: '700',
														fontSize: 16,
													}}
												>
													Lab examination schema is not yet assigned
												</small>
											</span>
										</Col>
									</Row>
								)}
							</li>
						</ul>
						{index !== teachingsToGrade.length - 1 && <hr />}
					</div>
				))
			)}
		</>
	);
};

export default GradeCard;
