import { Row, Col, Spinner } from 'reactstrap';
import { Formik, Form } from 'formik';
import {
	addEvent,
	setEditEvent,
	updateEvent,
} from '../../features/calendar/eventSlice';
import { EventSchema } from '../../schemas/calendar/Event';
import DatePickerField from '../form/DatePickerField';
import TextField from '../form/TextField';
import SwitchField from '../form/SwitchField';
import ClearButton from '../buttons/ClearButton';
import SubmitButton from '../buttons/SubmitButton';

export default function EventForm({
	event,
	isEditingEvent,
	editEventId,
	setModal,
	dispatch,
}) {
	return (
		<>
			<Formik
				initialValues={{
					title: event ? event.title : '',
					startDate: event ? new Date(event.startDate) : new Date(),
					endDate: event ? new Date(event.endDate) : new Date(),
					allDay: event ? event.allDay : false,
				}}
				validationSchema={EventSchema}
				onSubmit={(values, { setSubmitting }) => {
					const event = {
						title: values.title,
						startDate: values.startDate,
						endDate: values.endDate,
						allDay: values.allDay,
					};
					if (isEditingEvent) {
						console.log(event);
						dispatch(
							updateEvent({
								eventId: editEventId,
								data: event,
							})
						);
						setSubmitting(false);
						dispatch(
							setEditEvent({
								isEditingEvent: false,
								editEventId: '',
							})
						);
						setModal(false);
						return;
					}
					dispatch(addEvent(event));
					setModal(false);
					setSubmitting(false);
				}}
				validateOnMount
			>
				{({ isSubmitting, dirty, values, setFieldValue, handleReset }) => (
					<Form>
						<Row>
							<Col xs="8" sm="8" md="8" lg="9" xl="9">
								<TextField name="title" label="Title" />
							</Col>
							<Col className="text-right">
								<SwitchField
									name="allDay"
									label="All day"
									onChange={() => setFieldValue('allDay', !values.allDay)}
								/>
							</Col>
						</Row>
						<Row>
							<DatePickerField />
						</Row>
						<Row>
							<ClearButton
								onClick={handleReset}
								disabled={!dirty || isSubmitting}
							/>
							<SubmitButton
								body={
									isSubmitting ? (
										<>
											Please wait <Spinner type="grow" size="sm" />
										</>
									) : isEditingEvent ? (
										'Update'
									) : (
										'Add'
									)
								}
								disabled={isSubmitting}
							/>
						</Row>
					</Form>
				)}
			</Formik>
		</>
	);
}
