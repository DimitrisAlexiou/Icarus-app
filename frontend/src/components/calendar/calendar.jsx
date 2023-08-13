import { useState, forwardRef, useRef, useEffect } from 'react';
import { Row, Col, Modal, ModalHeader, ModalBody, Button, CardTitle, CardText } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
	getEvents,
	deleteEvents,
	deleteEvent,
	setEditEvent,
} from '../../features/calendar/eventSlice';
import { deleteAlert } from '../../constants/sweetAlertNotification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import moment from 'moment';
import TimePicker from 'react-time-picker';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import Spinner from '../../components/boilerplate/Spinner';
import CarouselComponent from '../Carousel';
import EventForm from './EventForm';

export default function Calendar() {
	const { events, isLoading, isEditingEvent, editEventId } = useSelector((state) => state.events);
	const { user } = useSelector((state) => state.auth);

	const [selectedEvent, setSelectedEvent] = useState(null);
	const myRef = useRef(null);
	const [modal, setModal] = useState(false);

	const toggle = () => {
		setModal(!modal);
		dispatch(
			setEditEvent({
				isEditingEvent: false,
				editEventId: '',
			})
		);
	};

	const [time, setTime] = useState('10:00');

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getEvents());
	}, [dispatch]);

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
			start: selected.start.toISOString(),
			end: selected.end.toISOString(),
			allDay: selected.allDay,
		};

		setSelectedEvent(newEvent);
		setModal(true);
		console.log(newEvent);
	};

	const handleEventClick = (selected) => {
		deleteAlert(() => dispatch(deleteEvent(selected.event.extendedProps._id)));
		selected.event.remove();
	};

	const ModalComponent = forwardRef(({ event, ...props }, ref) => {
		return (
			<Modal ref={ref} isOpen={modal} toggle={toggle} className="modal-lg">
				<ModalHeader toggle={toggle}>
					{isEditingEvent ? 'Edit Event' : 'Fill the form below to create a new event'}
				</ModalHeader>
				<ModalBody>
					<EventForm
						event={event}
						user={user.user}
						isEditingEvent={isEditingEvent}
						editEventId={editEventId}
					/>
				</ModalBody>
			</Modal>
		);
	});

	if (isLoading) return <Spinner card />;

	return (
		<>
			{events.length > 0 ? (
				<>
					<Row className="mb-4 animated--grow-in">
						<Col>
							<h6 className="text-gray-600 font-weight-bold animated--grow-in">
								Events
							</h6>
						</Col>
						<Col className="d-flex justify-content-end">
							<Button
								className="btn btn-red align-self-center"
								color="null"
								onClick={() => deleteAlert(() => dispatch(deleteEvents()))}
							>
								<FontAwesomeIcon icon={faTrashAlt} />
							</Button>
						</Col>
					</Row>
					<CarouselComponent
						objects={events}
						renderItem={(event) => (
							<>
								<CardTitle
									style={{
										textAlign: 'justify',
										fontWeight: '700',
										fontSize: 15,
									}}
									className="text-light-cornflower-blue mb-2"
								>
									{event.title}
								</CardTitle>
								<CardText>
									<small
										className="text-muted"
										style={{
											textAlign: 'justify',
											fontWeight: '700',
											fontSize: 13,
										}}
									>
										{moment(event.start).format('MMMM D, YYYY')}
									</small>
								</CardText>
								<CardText
									style={{
										textAlign: 'justify',
										fontWeight: '600',
										fontSize: 11,
									}}
								>
									{event.allDay ? 'All Day' : 'Timed Event'}
								</CardText>
							</>
						)}
						onObjectClick={(event) => {
							dispatch(setEditEvent({ editEventId: event._id }));
							setSelectedEvent(event);
							setModal(true);
						}}
					/>
				</>
			) : (
				<Row className="mb-5 animated--grow-in text-gray-500">
					<Col>There are no events available right now.</Col>
				</Row>
			)}
			<Row className=" animated--grow-in mt-4 mb-5">
				<Col md="12" lg="10" xl="8" className="mx-auto">
					<FullCalendar
						height="65vh"
						plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
						headerToolbar={{
							left: 'prev,next today',
							center: 'title',
							right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
						}}
						initialView="dayGridMonth"
						editable={true}
						selectable={true}
						selectMirror={true}
						dayMaxEvents={true}
						select={handleDateClick}
						eventClick={handleEventClick}
						events={events}
					/>
				</Col>
			</Row>
			<ModalComponent
				ref={myRef}
				isEditingEvent={isEditingEvent}
				toggle={toggle}
				event={selectedEvent}
			/>
		</>
	);
}
