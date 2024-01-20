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

	// const filteredAnnouncements =
	// 	announcements &&
	// 	announcements.filter((announcement) => {
	// 		const publishDate = moment.utc(announcement.publishDate);
	// 		const endDate = moment
	// 			.utc(publishDate)
	// 			.add(announcement.visibility, 'days');
	// 		const currentDate = moment.utc();

	// 		return (
	// 			currentDate.isBetween(publishDate, endDate, null, '[]') &&
	// 			announcement.isVisible
	// 		);
	// 	});

	const filteredAnnouncements =
		announcements &&
		announcements.filter((announcement) => {
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

			// const isAfterPublishDate = currentDate.isSameOrAfter(
			// 	publishDate,
			// 	'minute'
			// );
			// console.log('Is After Publish Date:', isAfterPublishDate);

			// const isVisible = announcement.isVisible;
			// console.log('Is Visible:', isVisible);

			// return isAfterPublishDate && isVisible;
			// return (
			// 	publishDate.isSameOrBefore(currentDate, 'day') && announcement.isVisible
			// );
		});

	return {
		teaching,
		filteredAnnouncements,
		isTeachingsLoading,
		isAnnouncementsLoading,
		handleDeleteTeachingAnnouncements,
	};
};

export default usePortfolio;
