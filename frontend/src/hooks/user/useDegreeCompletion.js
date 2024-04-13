import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDegreeRules } from '../../features/admin/degreeRulesSlice';

const useDegreeCompletion = () => {
	const dispatch = useDispatch();

	const { degreeRules, isLoading: isDegreeRulesLoading } = useSelector(
		(state) => state.degreeRules
	);
	const { user } = useSelector((state) => state.auth);
	const passedTeachings = user?.user?.student?.passedTeachings;

	const calculateRemainingCourses = () => {
		let degreeCourses = degreeRules?.courses;
		let remainingCourses = degreeCourses - passedTeachings.length;

		return remainingCourses;
	};

	useEffect(() => {
		dispatch(getDegreeRules());
	}, [dispatch]);

	return {
		passedTeachings,
		degreeRules,
		isDegreeRulesLoading,
		calculateRemainingCourses,
		dispatch,
	};
};

export default useDegreeCompletion;
