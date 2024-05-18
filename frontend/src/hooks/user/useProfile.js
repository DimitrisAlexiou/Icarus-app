import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPassedTeachings } from '../../features/auth/authSlice';

const useProfile = () => {
	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.auth);
	const passedTeachings = user?.user?.student?.passedTeachings;

	const calculatePercentagePassedTeachings = () => {
		const totalPassedTeachings = passedTeachings?.length;
		const totalCourses = 56;

		const progressPassedTeachings = (totalPassedTeachings / totalCourses) * 100;

		return progressPassedTeachings;
	};

	const calculatePercentageTotalECTS = () => {
		let totalECTS = 0;

		passedTeachings?.forEach((teaching) => {
			totalECTS += teaching?.course?.ects;
		});

		const totalECTSRequired = 300;
		const progressECTS = (totalECTS / totalECTSRequired) * 100;

		return progressECTS;
	};

	useEffect(() => {
		dispatch(getPassedTeachings());
	}, [dispatch]);

	return {
		user,
		calculatePercentagePassedTeachings,
		calculatePercentageTotalECTS,
		dispatch,
	};
};

export default useProfile;
