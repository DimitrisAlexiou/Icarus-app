import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSemester } from '../features/admin/semesterSlice';

const useCurrentSemester = () => {
	const dispatch = useDispatch();

	const { semester } = useSelector((state) => state.semesters);

	useEffect(() => {
		dispatch(getSemester());
	}, [dispatch]);

	return {
		semester,
	};
};

export default useCurrentSemester;
