import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '../../features/auth/authSlice';
import {
	displayErrorNotification,
	displayNotification,
} from '../../constants/sweetAlertNotification';
import { INFO, SUCCESS } from '../../constants/strings';

const useRegister = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { user, isError, isLoading, isSuccess, message } = useSelector(
		(state) => state.auth
	);

	useEffect(() => {
		if (isError) displayErrorNotification(message);

		if (user) {
			displayNotification('Hey!', 'You are already logged in.', INFO);
			navigate('/');
		}
		if (isSuccess) {
			displayNotification('Hoorah!', 'Account created!', SUCCESS);
			navigate('/');
		}
		dispatch(reset());
	}, [dispatch, navigate, isError, isSuccess, user, message]);

	return { isLoading, dispatch };
};

export default useRegister;
