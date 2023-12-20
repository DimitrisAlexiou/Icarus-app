import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { reset, resetLoginStatus } from '../../features/auth/authSlice';
import {
	displayErrorNotification,
	displayNotification,
} from '../../constants/sweetAlertNotification';
import { INFO, SUCCESS } from '../../constants/strings';

const useLogin = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { user, isAccountLocked, isError, isLoading, isSuccess, message } =
		useSelector((state) => state.auth);

	useEffect(() => {
		if (isError) {
			if (message === 'Account is not yet active, it will be available soon.')
				displayNotification('Oops!', message, INFO);
			// else if (
			// 	message ===
			// 	'Account is deactivated due to three login failed attempts, please contact the admin.'
			// )
			// 	displayNotification('Oops!', message, WARNING);
			// 	navigate('/auth/contact-admin');
			else displayErrorNotification(message);
		}
		if (user) {
			displayNotification('Hey!', 'You are already logged in.', INFO);
			navigate('/');
		}
		if (isSuccess) {
			displayNotification('Hello!', `Welcome Back ${user.user.name}!`, SUCCESS);
			navigate('/');
		}

		dispatch(reset());
	}, [isError, isSuccess, user, message, navigate, dispatch]);

	const handleResetLoginStatus = () => {
		dispatch(resetLoginStatus());
	};

	return { isLoading, isAccountLocked, handleResetLoginStatus, dispatch };
};

export default useLogin;
