import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteEvents,
	getEvents,
	getUserEvents,
} from '../../features/calendar/eventSlice';
import { deleteAlert } from '../../constants/sweetAlertNotification';

const useCalendar = () => {
	const dispatch = useDispatch();

	const { events, isLoading, isEditingEvent, editEventId } = useSelector(
		(state) => state.events
	);
	const { user } = useSelector((state) => state.auth);

	const [time, setTime] = useState('10:00');

	useEffect(() => {
		user.user.isAdmin ? dispatch(getEvents()) : dispatch(getUserEvents());
	}, [dispatch, user.user.isAdmin]);

	const handleDeleteEvents = () => {
		deleteAlert(() => dispatch(deleteEvents()));
	};

	return {
		user,
		events,
		isLoading,
		isEditingEvent,
		editEventId,
		time,
		setTime,
		handleDeleteEvents,
		dispatch,
	};
};

export default useCalendar;
