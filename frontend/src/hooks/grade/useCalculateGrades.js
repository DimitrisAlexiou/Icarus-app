import { useSelector } from 'react-redux';
import { Examination } from '../../constants/enums';

const useCalculateGrades = () => {
	const { statement } = useSelector((state) => state.statements);
	const { grades } = useSelector((state) => state.grades);

	const calculateOverallGrade = (teaching) => {
		let totalTheoryGrade = 0;
		let totalLabGrade = 0;

		teaching.theoryExamination.forEach((exam) => {
			const grade = grades?.find(
				(g) =>
					g.teaching._id === teaching._id &&
					g.exam.examination === Examination.Theory &&
					g.exam.type === exam.type &&
					g.statement._id === statement._id
			);
			totalTheoryGrade += (grade ? grade.exam.grade : 0) * (exam.weight / 100);
		});

		teaching.labExamination.forEach((exam) => {
			const grade = grades?.find(
				(g) =>
					g.teaching._id === teaching._id &&
					g.exam.examination === Examination.Lab &&
					g.exam.type === exam.type &&
					g.statement._id === statement._id
			);
			totalLabGrade += (grade ? grade.exam.grade : 0) * (exam.weight / 100);
		});

		const isTheoryPassed = totalTheoryGrade >= teaching.theoryGradeThreshold;
		const isLabPassed = totalLabGrade >= teaching.labGradeThreshold;

		const overallGrade =
			(totalTheoryGrade * (teaching.theoryWeight / 100) +
				totalLabGrade * (teaching.labWeight / 100)) /
			(teaching.theoryWeight / 100 + teaching.labWeight / 100);

		const roundedOverallGrade = Math.round(overallGrade * 2) / 2;
		const roundedTotalTheoryGrade = Math.round(totalTheoryGrade * 10) / 10;
		const roundedTotalLabGrade = Math.round(totalLabGrade * 10) / 10;

		return {
			overallGrade: roundedOverallGrade.toFixed(1),
			totalTheoryGrade: roundedTotalTheoryGrade.toFixed(1),
			totalLabGrade: roundedTotalLabGrade.toFixed(1),
			isTheoryPassed,
			isLabPassed,
		};
	};

	const overallGrade = (teachings) => {
		const calculatedGrades = {};
		teachings.forEach((teaching) => {
			calculatedGrades[teaching._id] = calculateOverallGrade(teaching);
		});

		return calculatedGrades;
	};

	const recentGradesOverallGrade = (teachings) => {
		const calculatedGrades = {};
		Object.entries(teachings).forEach(([teachingId, teaching]) => {
			calculatedGrades[teachingId] = calculateOverallGrade(teaching?.teaching);
		});
		return calculatedGrades;
	};

	return {
		overallGrade,
		recentGradesOverallGrade,
	};
};

export default useCalculateGrades;
