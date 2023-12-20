import mongoose, { ClientSession, Schema, model } from 'mongoose';

export interface NoteProps {
	title: string;
	text: string;
	file: string;
	categories: string[];
	importance: boolean;
	owner: mongoose.Types.ObjectId;
}

const noteSchema = new Schema<NoteProps>(
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

export const Note = model<NoteProps>('Note', noteSchema);

export const createNote = (values: Record<string, any>) =>
	new Note(values).save().then((note) => note.toObject());
export const getNotes = (userId: string) => Note.find({ owner: userId });
export const getNoteByTitle = (title: string) => Note.findOne({ title });
export const getNoteById = (id: string) => Note.findById(id);
export const updateNoteById = (id: string, note: Record<string, any>) =>
	Note.findByIdAndUpdate(id, note, { new: true });
export const deleteNote = (id: string) => Note.findByIdAndDelete(id);
export const deleteNotes = (userId: string, session: ClientSession) =>
	Note.deleteMany({ owner: userId }).session(session);
export const getAllNotes = () =>
	Note.find().populate({
		path: 'owner',
		select: 'name surname email',
	});
export const deleteAllNotes = () => Note.deleteMany();
