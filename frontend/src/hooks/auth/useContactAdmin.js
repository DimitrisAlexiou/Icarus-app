import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { activateAccount, reset } from '../../features/auth/authSlice';
import {
	displayErrorNotification,
	displaySuccessNotification,
} from '../../constants/sweetAlertNotification';

const useContactAdmin = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { user, isError, isLoading, isSuccess, message } = useSelector(
		(state) => state.auth
	);

	useEffect(() => {
		if (isError) displayErrorNotification(message);

		if (isSuccess) {
			displaySuccessNotification(`New password restored ${user.name}`);
			navigate('/');
		}

		dispatch(reset());
	}, [isError, isSuccess, user, message, navigate, dispatch]);

	return { isLoading };
};

export default useContactAdmin;
