import { Button, Col, Row } from 'reactstrap';
import { Examination } from '../../../constants/enums';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faCheckDouble, faXmark } from '@fortawesome/free-solid-svg-icons';
import {
	setEditTheoryGrade,
	setEditLabGrade,
} from '../../../features/courses/gradeSlice';
import Spinner from '../../../components/boilerplate/spinners/Spinner';
import GradeForm from '../forms/GradeForm';
import GradeCardInfo from './GradeCardInfo';
import StatementCardInfo from './StatementCardInfo';

const GradeCard = ({
	user,
	grades,
	statement,
	teachingsToGrade,
	isStatementsLoading,
	isEditingTheoryGrade,
	isEditingLabGrade,
	editGradeId,
	examinationType,
	teachingToEditId,
	isTheoryInstructor,
	isLabInstructor,
	handleFinalizeGrade,
	overallGrade,
	dispatch,
}) => {
	return (
		<>
			<StatementCardInfo statement={statement} />
			{isStatementsLoading ? (
				<Spinner card />
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
											const filterGrade = grades.filter(
												(grade) =>
													grade.teaching._id === teaching._id &&
													grade.exam.examination === Examination.Theory &&
													grade.exam.type === examination.type &&
													grade.statement._id === statement._id
											);
											const checkGrade = grades.some(
												(grade) =>
													grade.teaching._id === teaching._id &&
													grade.exam.examination === Examination.Theory &&
													grade.exam.type === examination.type &&
													grade.statement._id === statement._id
											);
											const findGrade = grades.find(
												(grade) =>
													grade.teaching._id === teaching._id &&
													grade.exam.examination === Examination.Theory &&
													grade.exam.type === examination.type &&
													grade.statement._id === statement._id
											);
											const finalizedGrade = grades.find(
												(grade) =>
													grade.teaching._id === teaching._id &&
													grade.exam.examination === Examination.Theory &&
													grade.exam.type === examination.type &&
													grade.statement._id === statement._id &&
													grade.isFinalized
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
														teachingToEditId === teaching._id ? (
															<GradeForm
																grade={filterGrade}
																examination={Examination.Theory}
																type={examination.type}
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
																						teachingToEditId: teaching._id,
																					})
																				);
																			}}
																		>
																			<FontAwesomeIcon icon={faEdit} />
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
																		<FontAwesomeIcon icon={faCheckDouble} />
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
											const filterGrade = grades.filter(
												(grade) =>
													grade.teaching._id === teaching._id &&
													grade.exam.examination === Examination.Lab &&
													grade.exam.type === examination.type &&
													grade.statement._id === statement._id
											);
											const checkGrade = grades.some(
												(grade) =>
													grade.teaching._id === teaching._id &&
													grade.exam.examination === Examination.Lab &&
													grade.exam.type === examination.type &&
													grade.statement._id === statement._id
											);
											const findGrade = grades.find(
												(grade) =>
													grade.teaching._id === teaching._id &&
													grade.exam.examination === Examination.Lab &&
													grade.exam.type === examination.type &&
													grade.statement._id === statement._id
											);
											const finalizedGrade = grades.find(
												(grade) =>
													grade.teaching._id === teaching._id &&
													grade.exam.examination === Examination.Lab &&
													grade.exam.type === examination.type &&
													grade.statement._id === statement._id &&
													grade.isFinalized
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
														teachingToEditId === teaching._id ? (
															<GradeForm
																grade={filterGrade}
																examination={Examination.Lab}
																type={examination.type}
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
																						teachingToEditId: teaching._id,
																					})
																				);
																			}}
																		>
																			<FontAwesomeIcon icon={faEdit} />
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
																		<FontAwesomeIcon icon={faCheckDouble} />
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
