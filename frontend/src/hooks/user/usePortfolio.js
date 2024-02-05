import moment from 'moment';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTeaching } from '../../features/courses/teachingSlice';
import {
	deleteTeachingAnnouncements,
	getTeachingAnnouncements,
} from '../../features/announcements/announcementSlice';
import { deleteAlert } from '../../constants/sweetAlertNotification';

const usePortfolio = () => {
	const dispatch = useDispatch();

	const { teaching, isLoading: isTeachingsLoading } = useSelector(
		(state) => state.teachings
	);
	const { teachingId } = useParams();
	const { announcements, isLoading: isAnnouncementsLoading } = useSelector(
		(state) => state.announcements
	);

	useEffect(() => {
		dispatch(getTeaching(teachingId));
		dispatch(getTeachingAnnouncements(teachingId));
	}, [dispatch, teachingId]);

	const handleDeleteTeachingAnnouncements = () => {
		deleteAlert(() => dispatch(deleteTeachingAnnouncements(teachingId)));
	};

	const filteredAnnouncements = announcements.filter((announcement) => {
		const publishDate = moment.utc(announcement.publishDate);
		const currentDate = moment.utc();

		let isShown = false;

		if (announcement.isVisible) {
			const visibilityEnd = publishDate
				.clone()
				.add(announcement.visibility, 'days');

			isShown =
				moment.utc(currentDate).isSameOrAfter(publishDate) &&
				moment.utc(currentDate).isSameOrBefore(visibilityEnd);
		}

		return isShown;
	});

	return {
		teaching,
		filteredAnnouncements,
		isTeachingsLoading,
		isAnnouncementsLoading,
		handleDeleteTeachingAnnouncements,
		dispatch,
	};
};

export default usePortfolio;
