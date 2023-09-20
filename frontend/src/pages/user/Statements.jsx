import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, CardTitle, CardText } from 'reactstrap';
import { getSemester } from '../../features/admin/semesterSlice';
import { getTeachings } from '../../features/courses/teachingSlice';
import { getStudentStatements } from '../../features/courses/statementSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import StatementForm from '../../components/user/forms/StatementForm';
import CarouselComponent from '../../components/Carousel';
import CurrentSemester from '../../components/boilerplate/CurrentSemester';
import Spinner from '../../components/boilerplate/Spinner';
import { getCourses } from '../../features/courses/courseSlice';

export default function Statements() {
	const { semester, isLoading: isSemesterLoading } = useSelector((state) => state.semesters);
	const {
		statements,
		statement,
		isLoading: isStatementsLoading,
		isEditingStatement,
		editStatementId,
	} = useSelector((state) => state.statements);
	const { teachings, isLoading: isTeachingsLoading } = useSelector((state) => state.teachings);
	const { courses } = useSelector((state) => state.courses);
	const { user } = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getSemester());
		dispatch(getTeachings());
		dispatch(getCourses());
		dispatch(getStudentStatements());
	}, [dispatch]);

	return (
		<>
			<Row className="mb-4 animated--grow-in">
				<Col>
					<h3 className="text-gray-800 font-weight-bold">Statements</h3>
				</Col>
				<CurrentSemester />
			</Row>

			<h6 className="mb-4 animated--grow-in" style={{ fontWeight: 700, textAlign: 'center' }}>
				Previous Statements
			</h6>

			{isSemesterLoading || isStatementsLoading ? (
				<Spinner card />
			) : statements.length > 0 && semester ? (
				<CarouselComponent
					objects={statements}
					renderItem={(statement) => (
						<>
							<CardTitle
								style={{
									textAlign: 'justify',
									fontWeight: '700',
									fontSize: 15,
								}}
								className="text-light-cornflower-blue mb-2"
							>
								{statement.teaching.course.title}
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
									{statement.teaching.course.courseId}
								</small>
							</CardText>
							<CardText
								style={{
									textAlign: 'justify',
									fontWeight: '600',
									fontSize: 11,
								}}
							>
								{statement.teaching.course.year}
							</CardText>
						</>
					)}
				/>
			) : (
				<span className="mb-5 text-gray-500 animated--grow-in d-flex justify-content-center">
					<FontAwesomeIcon className="fa-1x text-gray-300 px-4" icon={faSpinner} />
					There are no previous statements.
				</span>
			)}

			<Row className="justify-content-center animated--grow-in">
				<Col xl="7" lg="11" md="12">
					<div className="card shadow mb-4">
						<div className="card-header py-3">
							<h6 className="m-0 font-weight-bold text-primary">
								Select from the available courses below to create a new course
								statement
							</h6>
						</div>
						<div className="card-body">
							<StatementForm
								statement={statement}
								user={user}
								semester={semester}
								// teachings={teachings}
								courses={courses}
								isEditingStatement={isEditingStatement}
								editStatementId={editStatementId}
							/>
						</div>
					</div>
				</Col>
			</Row>
		</>
	);
}
