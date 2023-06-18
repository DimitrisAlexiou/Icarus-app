import * as Yup from 'yup';
import { eventTitleRegex } from '../../constants/regex';

export const EventSchema = Yup.object().shape({
	eventId: Yup.string().required(),
	title: Yup.string()
		.max(50, 'Event title must be 50 characters or less.')
		.matches(eventTitleRegex, 'Event title must be alphabetic.')
		.required('Please provide a title for the event.'),
	start: Yup.date().required(),
	end: Yup.date().required(),
	allDay: Yup.boolean().required(),
});
