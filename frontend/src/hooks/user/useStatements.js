import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSemester } from '../../features/admin/semesterSlice';
import { getAssessment } from '../../features/admin/assessmentSlice';
import { getTeachings } from '../../features/courses/teachingSlice';
import {
	deleteStatement,
	finalizeStatement,
	getStudentStatements,
	setEditStatement,
	setEditVaccine,
	setStatement,
	setVaccine,
} from '../../features/courses/statementSlice';
import { finalizeAlert } from '../../constants/sweetAlertNotification';
import { PrerequisiteType, AssessmentType } from '../../constants/enums';

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
		isLoading: isStatementsLoading,
		isEditingStatement,
		isEditingVaccine,
		editStatementId,
	} = useSelector((state) => state.statements);
	const { teachings, isLoading: isTeachingsLoading } = useSelector(
		(state) => state.teachings
	);
	const { user } = useSelector((state) => state.auth);
	const student = user.user.student;

	const currentDate = new Date();
	const assessmentStartDate = new Date(semester?.startDate);
	const assessmentEndDate = new Date(
		assessmentStartDate.getTime() + assessment?.period * 7 * 24 * 60 * 60 * 1000
	);

	const assessmentIsAvailable =
		assessmentStartDate && currentDate <= new Date(assessmentEndDate);

	const vaccineStartDate = new Date(assessment?.vaccineStartDate);
	const vaccineEndDate = new Date(assessment?.vaccineEndDate);

	const vaccineIsAvailable =
		vaccineStartDate && currentDate <= new Date(vaccineEndDate);

	const isVaccineStatement = (stmt) => stmt.type === AssessmentType.Vaccine;

	const isStatementSubmitted = statements.some(
		(stmt) => stmt.semester._id === semester._id && !isVaccineStatement(stmt)
	);

	const isVaccineSubmitted = statements.some(
		(stmt) => stmt.semester._id === semester._id && isVaccineStatement(stmt)
	);

	const currentStatement = statements.find(
		(stmt) => stmt.semester._id === semester._id && !isVaccineStatement(stmt)
	);

	const currentVaccine = statements.find(
		(stmt) => stmt.semester._id === semester._id && isVaccineStatement(stmt)
	);

	const getPreviousStatements = () => {
		const previousAssessments = statements.filter(
			(stmt) => stmt._id === currentStatement?._id && !isVaccineStatement(stmt)
		);
		const previousVaccines = statements.filter(
			(stmt) => stmt._id === currentVaccine?._id && isVaccineStatement(stmt)
		);
		return [...previousAssessments, ...previousVaccines];
	};

	const availableTeachings = teachings.filter(
		(teaching) => teaching.semester._id === semester._id
	);

	const studentPassedTeachings = student ? student.passedTeachings : [];

	const filterTeachingsByPassedTeachingsAndPrerequisites = (
		availableTeachings,
		passedTeachings
	) => {
		return availableTeachings.filter((teaching) => {
			const obligatoryPrerequisites = teaching.course.prerequisites.filter(
				(prerequisite) =>
					prerequisite.prerequisiteType === PrerequisiteType.Hard
			);

			// Check if the student has passed all obligatory prerequisites
			const passedObligatoryPrerequisites = obligatoryPrerequisites.every(
				(prerequisite) => passedTeachings.includes(prerequisite.prerequisite)
			);

			// Check if the student has already passed the teachings that has no prerequisites defined
			const passedTeachingWithoutPrerequisites = passedTeachings.includes(
				teaching._id
			);

			return (
				passedObligatoryPrerequisites || passedTeachingWithoutPrerequisites
			);
		});
	};

	const canSubmitAvailableTeachings =
		filterTeachingsByPassedTeachingsAndPrerequisites(
			availableTeachings,
			studentPassedTeachings
		);

	const filterTeachingsForVaccine = (availableTeachings, passedTeachings) => {
		return availableTeachings.filter((teaching) => {
			// Check if the student has already passed the teaching
			const passedTeaching = passedTeachings.includes(teaching._id);

			return passedTeaching;
		});
	};

	const canSubmitAvailableVaccineTeachings = filterTeachingsForVaccine(
		availableTeachings,
		studentPassedTeachings
	);

	useEffect(() => {
		dispatch(getSemester());
		dispatch(getAssessment());
		dispatch(getTeachings());
		dispatch(getStudentStatements());
	}, [dispatch]);

	useEffect(() => {
		if (isStatementSubmitted) dispatch(setStatement(currentStatement));
		if (isVaccineSubmitted) dispatch(setVaccine(currentVaccine));
	}, [
		currentStatement,
		currentVaccine,
		isStatementSubmitted,
		isVaccineSubmitted,
		dispatch,
	]);

	const handleFinalizeStatement = (statement) => {
		finalizeAlert(() => dispatch(finalizeStatement(statement._id)));
	};

	return {
		user,
		semester,
		assessment,
		statements,
		teachings,
		isSemesterLoading,
		isAssessmentLoading,
		isStatementsLoading,
		isTeachingsLoading,
		isEditingStatement,
		isEditingVaccine,
		editStatementId,
		setEditStatement,
		setEditVaccine,
		deleteStatement,
		assessmentIsAvailable,
		vaccineIsAvailable,
		assessmentEndDate,
		vaccineEndDate,
		isStatementSubmitted,
		isVaccineSubmitted,
		currentStatement,
		currentVaccine,
		previousStatements: getPreviousStatements(),
		canSubmitAvailableTeachings,
		canSubmitAvailableVaccineTeachings,
		handleFinalizeStatement,
		dispatch,
	};
};

export default useStatements;
