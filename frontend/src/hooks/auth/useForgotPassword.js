import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, reset } from '../../features/auth/authSlice';
import {
	displayErrorNotification,
	displaySuccessNotification,
} from '../../constants/sweetAlertNotification';

const useForgotPassword = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { user, isError, isLoading, isSuccess, message } = useSelector(
		(state) => state.auth
	);

	useEffect(() => {
		if (isError) displayErrorNotification(message);

		if (isSuccess) {
			displaySuccessNotification(`New password restored ${user.user.name}`);
			navigate('/');
		}

		dispatch(reset());
	}, [isError, isSuccess, user, message, navigate, dispatch]);

	const handleForgotPassword = (user) => {
		dispatch(forgotPassword(user));
	};

	return { isLoading, handleForgotPassword };
};

export default useForgotPassword;
