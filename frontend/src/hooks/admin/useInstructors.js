import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getInstructors, resetUsers } from '../../features/admin/userSlice';

const useInstructors = () => {
	const dispatch = useDispatch();

	const { instructors, isLoading } = useSelector((state) => state.users);

	useEffect(() => {
		dispatch(getInstructors());
		dispatch(resetUsers());
	}, [dispatch]);

	return {
		instructors,
		isLoading,
	};
};

export default useInstructors;
