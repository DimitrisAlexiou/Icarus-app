import { Schema, model } from 'mongoose';

export interface NoteProps {
	title: string;
	text: string;
	file: string;
	categories: string[];
	importance: boolean;
	owner: string;
}

const noteSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		text: {
			type: String,
			required: true,
		},
		file: {
			type: String,
		},
		categories: [
			{
				type: String,
			},
		],
		importance: {
			type: Boolean,
			default: false,
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export const Note = model('Note', noteSchema);

export const createNote = (values: Record<string, any>) =>
	new Note(values).save().then((note) => note.toObject());
export const getNotes = (userId: string) => Note.find({ owner: userId });
export const getAllNotes = () => Note.find();
export const getNoteByTitle = (title: string) => Note.findOne({ title });
export const getNoteById = (id: string) => Note.findById(id);
export const updateNoteById = (id: string, values: Record<string, any>) =>
	Note.findByIdAndUpdate(id, values);
export const deleteNote = (id: string) => Note.findByIdAndDelete(id);
export const deleteNotes = (userId: string) => Note.deleteMany({ owner: userId });
export const deleteAllNotes = () => Note.deleteMany();
