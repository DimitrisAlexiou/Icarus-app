import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getRecentGrades,
	getStudentRecentGrades,
} from '../../features/courses/gradeSlice';

const useMyGradesCard = () => {
	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.auth);
	const { grades, isLoading: isGradesLoading } = useSelector(
		(state) => state.grades
	);

	const gradesByTeaching = grades?.reduce((acc, grade) => {
		const { teaching } = grade;
		if (teaching && teaching._id) {
			if (!acc[teaching._id]) acc[teaching._id] = { teaching, grades: [] };

			acc[teaching._id].grades.push(grade);
		}

		return acc;
	}, {});

	useEffect(() => {
		if (user.user.student) dispatch(getStudentRecentGrades());
		else dispatch(getRecentGrades());
	}, [dispatch, user.user.student]);

	return {
		user,
		grades: gradesByTeaching,
		isGradesLoading,
		dispatch,
	};
};

export default useMyGradesCard;
