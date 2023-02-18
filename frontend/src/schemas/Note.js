import * as Yup from 'yup';

export const NoteSchema = Yup.object().shape({
	title: Yup.string()
		.max(40, 'Note title must be 40 characters or less!')
		.matches(/^[A-Za-z ]+$/, 'Note title must be alphabetic!')
		.required('Please provide a title for the note.'),
	text: Yup.string()
		.max(200, 'Note text must be 200 characters or less!')
		.required('Please provide a text for the note.'),
});
