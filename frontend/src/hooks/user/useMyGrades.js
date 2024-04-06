import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	getStudentOverallGrades,
	getStudentOverallRecentGrades,
} from '../../features/courses/gradeSlice';
import {
	getStudentCurrentStatement,
	getStudentStatementsTotalTeachings,
} from '../../features/courses/statementSlice';
import { getPassedTeachings } from '../../features/auth/authSlice';
import { ExamPeriods, MyGradesMenu, SemesterType } from '../../constants/enums';

const useMyGrades = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [selectedCategory, setSelectedCategory] = useState(MyGradesMenu.Recent);

	const { user, isLoading: isPassedTeachingsLoading } = useSelector(
		(state) => state.auth
	);
	const { grades, isLoading: isGradesLoading } = useSelector(
		(state) => state.grades
	);
	const {
		statement,
		statements,
		isLoading: isStatementsLoading,
	} = useSelector((state) => state.statements);
	const passedTeachings = user?.user?.student?.passedTeachings;

	const handleTeachingRowClick = (teaching) => {
		navigate('/my-grades/teaching/' + teaching._id + '/details');
	};

	const getOverallGrade = (teachingId) => {
		const grade = grades.find((grade) =>
			grade.teaching._id.includes(teachingId)
		);
		return grade ? grade.overallGrade : null;
	};

	const getGradeExamPeriod = (teachingId) => {
		const grade = grades.find((grade) =>
			grade.teaching._id.includes(teachingId)
		);
		if (grade && grade.statement && grade.statement.semester) {
			const { type, academicYear } = grade.statement.semester;
			let semesterType;
			if (type?.includes(SemesterType.Winter)) semesterType = ExamPeriods.FEB;
			else if (type?.includes(SemesterType.Spring))
				semesterType = ExamPeriods.JUN;
			else semesterType = ExamPeriods.SEP;
			return { semesterType, academicYear };
		}
		return null;
	};

	const filterPassedTeachingsBySemester = (semester) => {
		return passedTeachings.filter((teaching) => {
			const adjustedSemester = getAdjustedSemester(
				teaching?.course?.year,
				teaching?.course?.semester
			);
			return adjustedSemester === semester;
		});
	};

	const calculateTotalECTSBySemester = () => {
		const totalECTSBySemester = {};

		passedTeachings.forEach((teaching) => {
			const semester = getAdjustedSemester(
				teaching?.course?.year,
				teaching?.course?.semester
			);
			totalECTSBySemester[semester] =
				(totalECTSBySemester[semester] || 0) + teaching?.course?.ects;
		});

		return totalECTSBySemester;
	};

	const calculateTotalECTS = () => {
		let totalECTS = 0;

		passedTeachings.forEach((teaching) => {
			totalECTS += teaching?.course?.ects;
		});

		return totalECTS;
	};

	const calculateSemesterAverageGrade = (semester) => {
		const passedTeachingsInSemester = filterPassedTeachingsBySemester(semester);

		if (passedTeachingsInSemester.length === 0) return 0;
		else if (passedTeachingsInSemester.length === 1)
			return getOverallGrade(passedTeachingsInSemester[0]._id);
		else {
			const totalGrade = passedTeachingsInSemester.reduce((sum, teaching) => {
				const overallGrade = getOverallGrade(teaching._id);
				return sum + overallGrade;
			}, 0);
			return totalGrade / passedTeachingsInSemester.length;
		}
	};

	const getAdjustedSemester = (year, semester) => {
		const isWinterSemester = SemesterType.Winter.includes(semester);
		const adjustedYear = isWinterSemester ? year * 2 - 1 : year * 2;
		return adjustedYear;
	};

	useEffect(() => {
		if (selectedCategory.includes(MyGradesMenu.Recent))
			dispatch(getStudentOverallRecentGrades());
		else if (selectedCategory.includes(MyGradesMenu.Grades)) {
			dispatch(getStudentOverallGrades());
			dispatch(getStudentStatementsTotalTeachings());
		}

		dispatch(getStudentCurrentStatement());
		dispatch(getPassedTeachings());
	}, [dispatch, selectedCategory]);

	return {
		user,
		statement,
		statementsTotalTeachings: statements,
		grades,
		passedTeachings,
		isGradesLoading,
		isStatementsLoading,
		isPassedTeachingsLoading,
		selectedCategory,
		setSelectedCategory,
		getOverallGrade,
		calculateSemesterAverageGrade,
		getGradeExamPeriod,
		handleTeachingRowClick,
		filterPassedTeachingsBySemester,
		totalECTS: calculateTotalECTS(),
		totalECTSBySemester: calculateTotalECTSBySemester(),
		dispatch,
	};
};

export default useMyGrades;
