import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSemester } from '../../features/admin/semesterSlice';
import { getAssessment } from '../../features/admin/assessmentSlice';
import { getTeachings } from '../../features/courses/teachingSlice';
import {
	deleteStatement,
	getStatements,
	getStudentStatements,
	setEditStatement,
} from '../../features/courses/statementSlice';

const useStatements = () => {
	const dispatch = useDispatch();

	const { semester, isLoading: isSemesterLoading } = useSelector(
		(state) => state.semesters
	);
	const { assessment, isLoading: isAssessmentLoading } = useSelector(
		(state) => state.assessment
	);
	const {
		statements,
		statement,
		isLoading: isStatementsLoading,
		isEditingStatement,
		editStatementId,
	} = useSelector((state) => state.statements);
	const { teachings, isLoading: isTeachingsLoading } = useSelector(
		(state) => state.teachings
	);
	const { user } = useSelector((state) => state.auth);

	const currentDate = new Date();
	const assessmentStartDate = new Date(semester?.startDate);
	const assessmentEndDate = new Date(
		assessmentStartDate.getTime() + assessment?.period * 7 * 24 * 60 * 60 * 1000
	);

	const assessmentIsAvailable =
		assessmentStartDate && currentDate <= new Date(assessmentEndDate);

	const availableTeachings = teachings.filter(
		(teaching) => teaching.semester._id === semester._id
	);

	const isStatementSubmitted = statements.some(
		(stmt) => stmt.semester._id === semester._id
	);

	const currentStatement = statements.find(
		(stmt) => stmt.semester._id === semester._id
	);

	useEffect(() => {
		dispatch(getSemester());
		dispatch(getAssessment());
		dispatch(getTeachings());
	}, [dispatch]);

	useEffect(() => {
		if (user.user.isAdmin) dispatch(getStatements());

		dispatch(getStudentStatements());
	}, [dispatch, user.user.isAdmin]);

	useEffect(() => {
		if (isStatementSubmitted) dispatch(getStudentStatements());
	}, [dispatch, isStatementSubmitted]);

	return {
		user,
		semester,
		assessment,
		statement,
		statements,
		teachings,
		isSemesterLoading,
		isAssessmentLoading,
		isStatementsLoading,
		isTeachingsLoading,
		isEditingStatement,
		editStatementId,
		setEditStatement,
		deleteStatement,
		assessmentIsAvailable,
		assessmentEndDate,
		availableTeachings,
		isStatementSubmitted,
		currentStatement,
		getStudentStatements,
		dispatch,
	};
};

export default useStatements;
