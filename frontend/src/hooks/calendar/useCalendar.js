import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteEvent,
	deleteEvents,
	deleteUserEvents,
	getEvents,
	getUserEvents,
	setEditEvent,
} from '../../features/calendar/eventSlice';
import { deleteAlert } from '../../constants/sweetAlertNotification';

const useCalendar = () => {
	const dispatch = useDispatch();

	const { events, isLoading, isEditingEvent, editEventId } = useSelector(
		(state) => state.events
	);
	const { user } = useSelector((state) => state.auth);

	const [time, setTime] = useState('10:00');
	const [selectedEvent, setSelectedEvent] = useState(null);
	const [modal, setModal] = useState(false);
	const calendarRef = useRef(null);
	const modalRef = useRef(null);

	const toggle = () => {
		setModal(!modal);
		dispatch(
			setEditEvent({
				isEditingEvent: false,
				editEventId: '',
			})
		);

		if (selectedEvent && calendarRef.current) {
			calendarRef.current.getApi().unselect();
			setSelectedEvent(null);
		}
	};

	const handleDateClick = (selected) => {
		const calendarApi = selected.view.calendar;
		calendarApi.unselect();

		calendarApi.addEvent({
			title: '',
			start: selected.startStr,
			end: selected.endStr,
			allDay: selected.allDay,
		});

		const newEvent = {
			title: '',
			startDate: new Date(selected.start),
			endDate: new Date(selected.end),
			// startDate: selected.start.toISOString(),
			// endDate: selected.end.toISOString(),
			allDay: selected.allDay,
		};

		setSelectedEvent(newEvent);
		setModal(true);
		console.log(newEvent);
	};

	const handleEventClick = (selected) => {
		const eventToDelete = {
			title: selected.event.title,
		};
		deleteAlert(() => dispatch(deleteEvent(eventToDelete)));
		selected.event.remove();
	};

	const handleDeleteEvents = () => {
		deleteAlert(() => dispatch(deleteEvents()));
	};

	const handleDeleteUserEvents = () => {
		deleteAlert(() => dispatch(deleteUserEvents()));
	};

	useEffect(() => {
		user.user.isAdmin ? dispatch(getEvents()) : dispatch(getUserEvents());
	}, [dispatch, user.user.isAdmin]);

	return {
		events,
		isLoading,
		isEditingEvent,
		editEventId,
		setEditEvent,
		time,
		selectedEvent,
		setSelectedEvent,
		modal,
		setModal,
		calendarRef,
		modalRef,
		setTime,
		toggle,
		handleDateClick,
		handleEventClick,
		handleDeleteEvents,
		handleDeleteUserEvents,
		dispatch,
	};
};

export default useCalendar;
