import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentCurrentStatement } from '../../features/courses/statementSlice';

const useCurrentStatement = () => {
	const dispatch = useDispatch();

	const { statement, isLoading } = useSelector((state) => state.statements);

	useEffect(() => {
		dispatch(getStudentCurrentStatement());
	}, [dispatch]);

	return {
		statement,
		isLoading,
		dispatch,
	};
};

export default useCurrentStatement;
