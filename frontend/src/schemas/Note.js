import * as Yup from 'yup';
import { noteTitleRegex } from '../constants/regex';

export const NoteSchema = Yup.object().shape({
	title: Yup.string()
		.max(40, 'Note title must be 40 characters or less.')
		.matches(noteTitleRegex, 'Note title must be alphabetic.')
		.required('Please provide a title for the note.'),
	text: Yup.string()
		.max(800, 'Note text must be 800 characters or less.')
		.required('Please provide text for the note.'),
	file: Yup.string(),
	categories: Yup.array().of(
		Yup.object().shape({
			label: Yup.string().required(),
			value: Yup.string().required(),
		})
	),
});
