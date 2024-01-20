import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	setEditAnnouncement,
	deleteAnnouncement,
	getInstructorAnnouncements,
	deleteInstructorAnnouncements,
} from '../../features/announcements/announcementSlice';
import { deleteAlert } from '../../constants/sweetAlertNotification';
import useTeachings from '../admin/useTeachings';

const useAnnouncements = () => {
	const dispatch = useDispatch();

	const { teachings } = useTeachings();
	const {
		announcements,
		isLoading: isAnnouncementsLoading,
		isEditingAnnouncement,
		editAnnouncementId,
	} = useSelector((state) => state.announcements);

	useEffect(() => {
		dispatch(getInstructorAnnouncements());
	}, [dispatch]);

	const handleDeleteAnnouncement = (announcement) => {
		deleteAlert(() => dispatch(deleteAnnouncement(announcement._id)));
	};

	const handleDeleteInstructorAnnouncements = () => {
		deleteAlert(() => dispatch(deleteInstructorAnnouncements()));
	};

	return {
		teachings,
		announcements,
		isAnnouncementsLoading,
		isEditingAnnouncement,
		editAnnouncementId,
		setEditAnnouncement,
		handleDeleteAnnouncement,
		handleDeleteInstructorAnnouncements,
		dispatch,
	};
};

export default useAnnouncements;
