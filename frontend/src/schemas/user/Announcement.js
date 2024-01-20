import * as Yup from 'yup';

export const AnnouncementSchema = Yup.object().shape({
	title: Yup.string()
		.max(60, 'Title must be 60 characters or less.')
		.required('Title is required.'),
	text: Yup.string()
		.max(1500, 'Text must be 1500 characters or less.')
		.required('Text is required.'),
	publishDate: Yup.date()
		// .min(new Date(), 'Publish date should be greater than today.')
		.required('Please select publish date.'),
	visibility: Yup.number()
		.min(1, 'Visibilty must be at least 1.')
		.positive('Number must be positive.')
		.required('Visibility value is required.'),
	teaching: Yup.string()
		.notOneOf(['Select teaching'], 'Please select a teaching.')
		.required('Please select a teaching.'),
});
