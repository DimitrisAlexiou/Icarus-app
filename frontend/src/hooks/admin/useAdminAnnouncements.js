import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getAnnouncements,
	deleteAnnouncements,
} from '../../features/announcements/announcementSlice';
import { deleteAlert } from '../../constants/sweetAlertNotification';

const useAdminAnnouncements = () => {
	const dispatch = useDispatch();

	const { announcements, isLoading: isAnnouncementsLoading } = useSelector(
		(state) => state.announcements
	);

	useEffect(() => {
		dispatch(getAnnouncements());
	}, [dispatch]);

	const handleDeleteAnnouncements = () => {
		deleteAlert(() => dispatch(deleteAnnouncements()));
	};

	return {
		announcements,
		isAnnouncementsLoading,
		handleDeleteAnnouncements,
		dispatch,
	};
};

export default useAdminAnnouncements;
