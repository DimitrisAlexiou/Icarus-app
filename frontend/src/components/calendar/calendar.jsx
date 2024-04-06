import { useState, forwardRef, useRef } from 'react';
import {
	Row,
	Col,
	Modal,
	ModalHeader,
	ModalBody,
	Button,
	CardTitle,
	CardText,
	Spinner,
} from 'reactstrap';
import { deleteEvent, setEditEvent } from '../../features/calendar/eventSlice';
import { deleteAlert } from '../../constants/sweetAlertNotification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import useCalendar from '../../hooks/calendar/useCalendar';
import moment from 'moment';
import TimePicker from 'react-time-picker';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import Loading from '../boilerplate/spinners/Spinner';
import CarouselComponent from '../Carousel';
import PillHeader from '../boilerplate/headers/PillHeader';
import EventForm from './EventForm';
import SpinnerComponent from '../boilerplate/spinners/SpinnerMessage';

export default function Calendar() {
	const {
		user,
		events,
		isLoading,
		isEditingEvent,
		editEventId,
		handleDeleteEvents,
		dispatch,
	} = useCalendar();

	const calendarRef = useRef(null);
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
		deleteAlert(() => dispatch(deleteEvent(selected.event.extendedProps._id)));
		selected.event.remove();
	};

	const ModalComponent = forwardRef(({ event, ...props }, ref) => {
		return (
			<Modal ref={ref} isOpen={modal} toggle={toggle} className="modal-lg">
				<ModalHeader toggle={toggle}>
					{isEditingEvent ? (
						<>
							Edit Event (
							<span style={{ fontWeight: 'bold', fontSize: '21px' }}>
								{event.title}
							</span>
							)
						</>
					) : (
						'Fill the form below to create a new event'
					)}
				</ModalHeader>
				<ModalBody>
					<EventForm
						event={event}
						user={user}
						isEditingEvent={isEditingEvent}
						editEventId={editEventId}
						setModal={setModal}
						dispatch={dispatch}
					/>
				</ModalBody>
			</Modal>
		);
	});

	return (
		<>
			{events.length > 0 ? (
				<>
					<Row className="mb-4 animated--grow-in">
						<Col>
							<PillHeader title="Events" />
							{!isLoading ? (
								<h6
									className="text-muted pill-label"
									style={{
										fontWeight: '700',
										fontSize: 15,
									}}
								>
									{events.length}
								</h6>
							) : null}
						</Col>
						<Col className="d-flex justify-content-end">
							<Button
								className="btn btn-red align-self-center"
								color="null"
								onClick={() => handleDeleteEvents()}
							>
								{isLoading ? (
									<Spinner size="sm" color="dark" type="grow" />
								) : (
									<FontAwesomeIcon icon={faTrashAlt} />
								)}
							</Button>
						</Col>
					</Row>
					{isLoading ? (
						<Loading card />
					) : (
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
											{moment(event.startDate).format('MMMM D, YYYY')}
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
					)}
				</>
			) : (
				<Row className="animated--grow-in text-gray-500">
					<Col>
						<div className="profile_card">
							<div className="card-body">
								<SpinnerComponent message="There are no events available right now." />
							</div>
						</div>
					</Col>
				</Row>
			)}
			<Row className="animated--grow-in mt-3 mb-5">
				<Col md="12" lg="10" xl="8" className="mx-auto">
					<div className="profile_card">
						<div className="card-body">
							<div className="align-items-center text-center">
								<FullCalendar
									ref={calendarRef}
									height="65vh"
									plugins={[
										dayGridPlugin,
										timeGridPlugin,
										interactionPlugin,
										listPlugin,
									]}
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
							</div>
						</div>
					</div>
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
