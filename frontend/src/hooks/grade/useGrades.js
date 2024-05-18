import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteAlert,
	downloadAlert,
	finalizeAlert,
} from '../../constants/sweetAlertNotification';
import { useSemester } from '../../context/SemesterProvider';
import {
	deleteGrade,
	finalizeGrade,
	getStatementGrades,
	setEditTheoryGrade,
	setEditLabGrade,
	finalizeGrades,
	downloadTeachingGradingTranscriptPDF,
} from '../../features/courses/gradeSlice';
import {
	getStatement,
	getStatementsInGradingWindow,
} from '../../features/courses/statementSlice';
import { Examination } from '../../constants/enums';

const useGrades = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { statementId } = useParams();

	const { semester } = useSemester();
	const { user } = useSelector((state) => state.auth);
	const {
		statement,
		statements,
		isLoading: isStatementsLoading,
	} = useSelector((state) => state.statements);
	const {
		grade,
		grades,
		isLoading: isGradeLoading,
		isEditingTheoryGrade,
		isEditingLabGrade,
		editGradeId,
		examinationType,
		teachingToEditId,
	} = useSelector((state) => state.grades);

	useEffect(() => {
		if (statementId) {
			dispatch(getStatement(statementId));
			dispatch(getStatementGrades(statementId));
		} else dispatch(getStatementsInGradingWindow());
	}, [dispatch, statementId]);

	const handleDeleteGrade = () => {
		deleteAlert(() => dispatch(deleteGrade()));
	};

	const handleStatementClick = (statement) => {
		navigate(`/grades/${statement._id}`);
	};

	const handleFinalizeGrade = (grade) => {
		finalizeAlert(
			'Finalize examination grade?',
			'Your current examination grade will be finalized if accept!',
			() => dispatch(finalizeGrade(grade._id))
		);
	};

	const handleFinalizeGrading = (statement) => {
		finalizeAlert(
			'Finalize examination grades for this statement?',
			'Your theory and lab examination grades will be finalized if accept!',
			() => dispatch(finalizeGrades(statement._id))
		);
	};

	const isTheoryInstructor = (teaching) => {
		return teaching.theoryInstructors.some(
			(instructor) => instructor.user._id === user.user._id
		);
	};

	const isLabInstructor = (teaching) => {
		return teaching.labInstructors.some(
			(instructor) => instructor.user._id === user.user._id
		);
	};

	const getInstructorRoles = (teaching) => {
		const roles = teaching.reduce((roles, teaching) => {
			if (isTheoryInstructor(teaching) && !roles.includes(Examination.Theory))
				roles.push(Examination.Theory);

			if (isLabInstructor(teaching) && !roles.includes(Examination.Lab))
				roles.push(Examination.Lab);

			return roles;
		}, []);
		return roles.join(', ');
	};

	const gradeFilter = (teaching, examination, examinationType) => {
		return grades.filter(
			(grade) =>
				grade.teaching._id === teaching._id &&
				grade.exam.examination === examinationType &&
				grade.exam.type === examination.type &&
				grade.statement._id === statement._id
		);
	};

	const gradeCheck = (teaching, examination, examinationType) => {
		return grades.some(
			(grade) =>
				grade.teaching._id === teaching._id &&
				grade.exam.examination === examinationType &&
				grade.exam.type === examination.type &&
				grade.statement._id === statement._id
		);
	};

	const gradeFind = (teaching, examination, examinationType) => {
		return grades.find(
			(grade) =>
				grade.teaching._id === teaching._id &&
				grade.exam.examination === examinationType &&
				grade.exam.type === examination.type &&
				grade.statement._id === statement._id
		);
	};

	const gradeFinalized = (teaching, examination, examinationType) => {
		return grades.find(
			(grade) =>
				grade.teaching._id === teaching._id &&
				grade.exam.examination === examinationType &&
				grade.exam.type === examination.type &&
				grade.statement._id === statement._id &&
				grade.isFinalized
		);
	};

	const teachingsToGrade =
		statement?.teaching?.filter(
			(teaching) =>
				teaching?.theoryInstructors?.some(
					(instructor) => instructor.user._id === user.user._id
				) ||
				teaching?.labInstructors?.some(
					(instructor) => instructor.user._id === user.user._id
				)
		) ?? [];

	const hasUnsubmittedGrades = () => {
		return teachingsToGrade.some((teaching) => {
			return (
				teaching.theoryExamination.some((examination) => {
					return !gradeFinalized(teaching, examination, Examination.Theory);
				}) ||
				teaching.labExamination.some((examination) => {
					return !gradeFinalized(teaching, examination, Examination.Lab);
				})
			);
		});
	};

	const handleGenerateTeachingGradingTranscriptPDF = (statement) => {
		downloadAlert(() =>
			dispatch(downloadTeachingGradingTranscriptPDF(statement._id))
		);
	};

	return {
		user,
		grade,
		semester,
		statement,
		statements,
		teachingsToGrade,
		isGradeLoading,
		isStatementsLoading,
		isEditingTheoryGrade,
		isEditingLabGrade,
		editGradeId,
		examinationType,
		teachingToEditId,
		setEditTheoryGrade,
		setEditLabGrade,
		isTheoryInstructor,
		isLabInstructor,
		getInstructorRoles,
		gradeFilter,
		gradeCheck,
		gradeFind,
		gradeFinalized,
		hasUnsubmittedGrades,
		handleStatementClick,
		handleFinalizeGrade,
		handleDeleteGrade,
		handleFinalizeGrading,
		handleGenerateTeachingGradingTranscriptPDF,
		dispatch,
	};
};

export default useGrades;
