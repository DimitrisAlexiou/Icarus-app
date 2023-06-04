import { useState, useRef, forwardRef, useEffect, useMemo } from 'react';
import {
	Row,
	Col,
	Carousel,
	CarouselItem,
	CarouselControl,
	CarouselIndicators,
	Modal,
	ModalHeader,
	ModalBody,
	FormGroup,
	Button,
	Label,
	Card,
	CardBody,
	CardTitle,
	CardText,
	Spinner,
} from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { addEvent, getEvents, deleteEvents, deleteEvent } from '../../features/calendar/eventSlice';
import { EventSchema } from '../../schemas/calendar/Event';
import { Toast } from '../../constants/sweetAlertNotification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import moment from 'moment';
import TimePicker from 'react-time-picker';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import FormErrorMessage from '../FormErrorMessage';
import CustomSpinner from '../../components/boilerplate/Spinner';

export default function Calendar() {
	const { events, isLoading, isError, message } = useSelector((state) => state.events);
	const { user } = useSelector((state) => state.auth);

	const myRef = useRef(null);
	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);

	const itemsPerPage = 6;
	const [activeIndex, setActiveIndex] = useState(0);
	const [animating, setAnimating] = useState(false);
	const [time, setTime] = useState('10:00');

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getEvents());
		if (isError) {
			if (message === `Request failed with status code 404`) {
				// Toast.fire({
				// 	title: 'Hey!',
				// 	text: `Seems like there are no events ${user.user.name}`,
				// 	icon: 'info',
				// });
			} else if (message === 'Request failed with status code 400') {
				Toast.fire({
					title: 'Warning',
					text: 'Seems like an event with this title already exists for the day!',
					icon: 'warning',
				});
			} else {
				Toast.fire({
					title: 'Error',
					text: message,
					icon: 'error',
				});
			}
		}
	}, [dispatch, isError, message, user.user.name]);

	const handleDateClick = (selected) => {
		const title = prompt('Please enter a new title for your event');
		const calendarApi = selected.view.calendar;
		calendarApi.unselect();
		if (title) {
			calendarApi.addEvent({
				eventId: `${selected.start.getDate()}-${title}`,
				title,
				start: selected.startStr,
				end: selected.endStr,
				allDay: selected.allDay,
			});
		}

		const event = {
			eventId: `${selected.start.getDate()}-${title}`,
			title: title,
			start: selected.start,
			end: selected.end,
			allDay: selected.allDay,
		};
		console.log(event);
		dispatch(addEvent(event));
	};

	const handleEventClick = (selected) => {
		const eventId = selected.event.extendedProps._id;
		console.log(eventId);
		if (window.confirm(`Are you sure you want to delete the event '${selected.event.title}'`)) {
			const eventId = selected.event.extendedProps._id;
			console.log(eventId);
			dispatch(deleteEvent(eventId));
			selected.event.remove();
		}
	};

	const eventPages = useMemo(
		() =>
			events.reduce(
				(result, event, index) => {
					const pageIndex = Math.floor(index / itemsPerPage);
					result[pageIndex].push(event);
					return result;
				},
				Array.from({ length: Math.ceil(events.length / itemsPerPage) }, () => [])
			),
		[events, itemsPerPage]
	);

	const next = () => {
		if (animating) return;
		const nextIndex = activeIndex === eventPages.length - 1 ? 0 : activeIndex + 1;
		setActiveIndex(nextIndex);
	};

	const previous = () => {
		if (animating) return;
		const nextIndex = activeIndex === 0 ? eventPages.length - 1 : activeIndex - 1;
		setActiveIndex(nextIndex);
	};

	const goToIndex = (newIndex) => {
		if (animating) return;
		setActiveIndex(newIndex);
	};

	if (isLoading) return <CustomSpinner />;

	return (
		<>
			<h3 className="text-gray-800 font-weight-bold mb-4 animated--grow-in">Calendar</h3>

			<h6 className="text-gray-600 font-weight-bold animated--grow-in mb-4">Events</h6>
			{events.length > 0 ? (
				<>
					{/* <Row className="mb-1 animated--grow-in">
						<Col>
							<h6 className="text-gray-600 font-weight-bold animated--grow-in">
								Events
							</h6>
						</Col>
						<Col className="d-flex justify-content-end">
							<Button className="btn btn-red align-self-center" color="null">
								<FontAwesomeIcon icon={faTrashAlt} />
							</Button>
						</Col>
					</Row> */}
					<Carousel
						className="animated--grow-in"
						md="12"
						activeIndex={activeIndex}
						next={next}
						previous={previous}
					>
						<CarouselIndicators
							items={eventPages}
							activeIndex={activeIndex}
							onClickHandler={goToIndex}
						/>
						{eventPages.map((page) => (
							<CarouselItem
								className="mb-4"
								key={page}
								onExiting={() => setAnimating(true)}
								onExited={() => setAnimating(false)}
							>
								<Row>
									{page.map((event) => (
										<Col xs="6" sm="6" md="4" lg="3" xl="2" key={event._id}>
											<Card className="card-note mb-4">
												<CardBody>
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
															{moment(event.start).format(
																'MMMM D, YYYY'
															)}
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
												</CardBody>
											</Card>
										</Col>
									))}
								</Row>
							</CarouselItem>
						))}
						<CarouselControl
							direction="prev"
							directionText="Previous"
							onClickHandler={previous}
						/>
						<CarouselControl
							direction="next"
							directionText="Next"
							onClickHandler={next}
						/>
					</Carousel>
				</>
			) : (
				<span className="text-gray-500 animated--grow-in">
					There are no events available right now.
				</span>
			)}
			<Row className=" animated--grow-in mt-3 mb-5">
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
		</>
	);
}
