import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getStudentTeachingGrades } from '../../features/courses/gradeSlice';

const useMyGradeDetails = () => {
	const dispatch = useDispatch();

	const { grades, isLoading: isGradesLoading } = useSelector(
		(state) => state.grades
	);
	const { teachingId } = useParams();

	const groupGradesByExamination = () => {
		const groupedGrades = {};
		grades?.studentTeachingGrades?.forEach((grade) => {
			const examination = grade?.exam?.examination;
			if (!groupedGrades[examination]) groupedGrades[examination] = [];

			groupedGrades[examination].push(grade);
		});
		return groupedGrades;
	};

	const extractCourseTitle = (grades) => {
		const courseTitlesSet = new Set();
		Object.keys(grades).forEach((examination) => {
			grades[examination].forEach((grade) => {
				const courseTitle = grade.teaching.course.title;
				courseTitlesSet.add(courseTitle);
			});
		});
		return Array.from(courseTitlesSet);
	};

	useEffect(() => {
		dispatch(getStudentTeachingGrades(teachingId));
	}, [dispatch, teachingId]);

	return {
		overallGrade: grades?.overallGrade,
		grades: groupGradesByExamination(),
		isGradesLoading,
		extractCourseTitle,
		dispatch,
	};
};

export default useMyGradeDetails;
