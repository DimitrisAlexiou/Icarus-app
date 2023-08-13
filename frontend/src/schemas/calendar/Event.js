import * as Yup from 'yup';
import { eventTitleRegex } from '../../constants/regex';

export const EventSchema = Yup.object().shape({
	title: Yup.string()
		.max(50, 'Event title must be 50 characters or less.')
		.matches(eventTitleRegex, 'Event title must be alphabetic.')
		.required('Please provide a title for the event.'),
	start: Yup.date().when('allDay', {
		is: (allDay) => allDay === false,
		then: Yup.date().required('Please select starting date.'),
		otherwise: Yup.date().notRequired(),
	}),
	end: Yup.date().when('allDay', {
		is: (allDay) => allDay === false,
		then: Yup.date().required('Please select ending date.'),
		otherwise: Yup.date().notRequired(),
	}),
	allDay: Yup.boolean().required(),
});
