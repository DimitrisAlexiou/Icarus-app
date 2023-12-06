import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEvents, getEvents } from '../../features/calendar/eventSlice';
import { deleteAlert } from '../../constants/sweetAlertNotification';

const useCalendar = () => {
	const dispatch = useDispatch();

	const { events, isLoading, isEditingEvent, editEventId } = useSelector(
		(state) => state.events
	);

	const [time, setTime] = useState('10:00');

	useEffect(() => {
		dispatch(getEvents());
	}, [dispatch]);

	const handleDeleteEvents = () => {
		deleteAlert(() => dispatch(deleteEvents()));
	};

	return {
		events,
		isLoading,
		isEditingEvent,
		editEventId,
		time,
		setTime,
		handleDeleteEvents,
	};
};

export default useCalendar;
