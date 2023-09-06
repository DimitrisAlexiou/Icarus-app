import { useDispatch } from 'react-redux';
import { FormGroup, Label, Row, Col, Button, Spinner, Input } from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { addEvent, setEditEvent, updateEvent } from '../../features/calendar/eventSlice';
import { EventSchema } from '../../schemas/calendar/Event';
import FormErrorMessage from '../form/FormErrorMessage';
import DatePickerField from '../form/DatePickerField';

export default function EventForm({ event, user, isEditingEvent, editEventId, setModal }) {
	const dispatch = useDispatch();

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
					const newEvent = {
						title: values.title,
						startDate: values.startDate,
						endDate: values.endDate,
						allDay: values.allDay,
						eventId: event.eventId,
						owner: user.user._id,
					};
					if (isEditingEvent) {
						dispatch(
							updateEvent({
								eventId: editEventId,
								data: newEvent,
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
					dispatch(addEvent(newEvent));
					setSubmitting(false);
				}}
				validateOnMount
			>
				{({ isSubmitting, dirty, values, setFieldValue, handleReset }) => (
					<Form>
						<Row>
							<Col xs="8" sm="8" md="8" lg="9" xl="9">
								<FormGroup className="form-floating mb-3" floating>
									<Field type="text" className="form-control" name="title" />
									<Label for="title" className="text-gray-600">
										Title
									</Label>
									<ErrorMessage name="title" component={FormErrorMessage} />
								</FormGroup>
							</Col>
							<Col className="text-right">
								<FormGroup switch>
									<Field name="allDay">
										{({ field }) => (
											<Input
												type="switch"
												role="switch"
												name="allDay"
												checked={field.value}
												onChange={() =>
													setFieldValue('allDay', !values.allDay)
												}
											/>
										)}
									</Field>
									<Label for="allDay" className="mx-1 text-gray-600">
										All day
									</Label>
									<ErrorMessage name="allDay" component={FormErrorMessage} />
								</FormGroup>
							</Col>
						</Row>
						<Row>
							<DatePickerField />
						</Row>
						<Row className="mb-3">
							<Col sm="6" md="6" xs="12" className="text-sm-left text-center">
								<Button onClick={handleReset} disabled={!dirty || isSubmitting}>
									Clear
								</Button>
							</Col>
							<Col className="text-sm-right text-center mt-sm-0 mt-3">
								<Button type="submit" color="primary" disabled={isSubmitting}>
									{isSubmitting ? (
										<>
											Please wait <Spinner type="grow" size="sm" />
										</>
									) : isEditingEvent ? (
										'Update'
									) : (
										'Add'
									)}
								</Button>
							</Col>
						</Row>
					</Form>
				)}
			</Formik>
		</>
	);
}
