import { CardText, CardTitle, Col, Row } from 'reactstrap';
import { groupBy } from '../../utils/groupBy';
import CarouselComponent from '../Carousel';
import moment from 'moment';

export default function UserEvents({
	events,
	setSelectedEvent,
	setEditEvent,
	setModal,
	dispatch,
}) {
	const userEventsMap = groupBy(events, (event) => event.owner._id);

	return (
		<>
			{Object.entries(userEventsMap).map(([userId, userEvents]) => (
				<div key={userId}>
					<Row className="mb-2 justify-content-between animated--grow-in">
						<Col className="text-center">
							<h6
								className="text-muted"
								style={{
									fontWeight: '700',
									fontSize: 20,
								}}
							>
								{userEvents[0].owner.name} {userEvents[0].owner.surname}
							</h6>
							<h6
								className="text-muted pill-label"
								style={{
									fontWeight: '700',
									fontSize: 15,
								}}
							>
								{userEvents.length}
							</h6>
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
				</div>
			))}
		</>
	);
}
