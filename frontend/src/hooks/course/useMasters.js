import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMasters, getMaster } from '../../features/admin/masterProgramSlice';

const useMasters = (masterId) => {
	const dispatch = useDispatch();

	const { masters, master, isLoading } = useSelector((state) => state.masters);

	useEffect(() => {
		dispatch(getMasters());
		if (masterId) dispatch(getMaster(masterId));
	}, [dispatch, masterId]);

	return {
		masters,
		master,
		isLoading,
		dispatch,
	};
};

export default useMasters;
