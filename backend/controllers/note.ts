import { Request, Response } from 'express';
import {
	createNote,
	getNotes,
	getNoteById,
	getNoteByTitle,
	updateNoteById,
	deleteNote,
	deleteNotes,
} from '../models/note';
import { UserProps } from '../models/users/user';
import { tryCatch } from '../utils/tryCatch';
import CustomError from '../utils/CustomError';

interface AuthenticatedRequest extends Request {
	user?: UserProps;
}

export const createUserNote = tryCatch(async (req: AuthenticatedRequest, res: Response) => {
	const { title, text, file, importance } = req.body;
	let { categories } = req.body;

	if (!title || !text) throw new CustomError('Please fill in all the required fields.', 400);

	if (categories && typeof categories === 'string') categories = categories.split(',');

	const userId = req.user.id;
	const existingNote = await getNoteByTitle(title);

	if (existingNote)
		throw new CustomError('Seems like a note with this title already exists.', 400);

	const note = await createNote({
		title,
		text,
		file,
		categories,
		importance,
		owner: userId,
		status: 'new',
	});
	console.log(note);

	return res.status(201).json(note);
});

export const viewUserNote = tryCatch(async (req: AuthenticatedRequest, res: Response) => {
	const { id } = req.params;
	const note = await getNoteById(id);

	if (!note)
		throw new CustomError(
			'Seems like the note that you are trying to view does not exist.',
			404
		);

	return res.status(200).json(note);
});

export const updateUserNote = tryCatch(async (req: AuthenticatedRequest, res: Response) => {
	const { title, text } = req.body;

	if (!title || !text) throw new CustomError('Please fill in all the required fields.', 400);

	const { id } = req.params;
	const updatedNote = await updateNoteById(id, { ...req.body });

	if (!updatedNote)
		throw new CustomError(
			'Seems like the note that you are trying to update does not exist.',
			404
		);

	return res.status(200).json(updatedNote);
});

export const getUserNotes = tryCatch(async (req: AuthenticatedRequest, res: Response) => {
	const userId = req.user.id;
	const userNotes = await getNotes(userId);

	if (!userNotes)
		throw new CustomError('Seems like there are no notes registered for this user.', 404);

	return res.status(200).json(userNotes);
});

export const deleteUserNote = tryCatch(async (req: AuthenticatedRequest, res: Response) => {
	const { id } = req.params;
	const noteToDelete = await deleteNote(id);

	if (!noteToDelete)
		throw new CustomError(
			'Seems like the note that you are trying to delete does not exist.',
			404
		);

	return res.status(200).json({ message: 'Note deleted.' });
});

export const deleteUserNotes = tryCatch(async (req: AuthenticatedRequest, res: Response) => {
	const userId = req.user.id;

	await deleteNotes(userId);

	return res.status(200).json({ message: 'User notes existing in the system deleted.' });
});
