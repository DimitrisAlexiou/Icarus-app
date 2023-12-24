import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	activateUser,
	deactivateUser,
	deleteUsers,
	getUsers,
	setEditUser,
	resetUsers,
	deleteUser,
} from '../../features/admin/userSlice';
import { deleteAlert } from '../../constants/sweetAlertNotification';

const useUsers = () => {
	const dispatch = useDispatch();

	const { users, isLoading, isEditingUser, editUserId } = useSelector(
		(state) => state.users
	);

	useEffect(() => {
		dispatch(getUsers());
		dispatch(resetUsers());
	}, [dispatch]);

	const handleSwitchToggle = (userId, checked) => {
		if (checked) dispatch(activateUser(userId));
		else dispatch(deactivateUser(userId));
	};

	const handleDeleteUser = (user) => {
		deleteAlert(() => dispatch(deleteUser(user._id)));
	};

	const handleDeleteUsers = () => {
		deleteAlert(() => dispatch(deleteUsers()));
	};

	return {
		users,
		isLoading,
		isEditingUser,
		editUserId,
		setEditUser,
		handleSwitchToggle,
		handleDeleteUser,
		handleDeleteUsers,
		dispatch,
	};
};

export default useUsers;
