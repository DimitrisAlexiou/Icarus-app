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
import { User, getUserById } from '../models/users/user';

interface User {
	id: string;
}

interface AuthenticatedRequest extends Request {
	user?: User;
}

export const createUserNote = async (req: AuthenticatedRequest, res: Response) => {
	const { title, text, postDate, file, importance } = req.body;
	let { categories } = req.body;

	if (!title || !text) return res.status(400).json('Please fill in all the required fields.');

	if (categories && typeof categories === 'string') categories = categories.split(',');

	try {
		const userId = req.user.id;
		const user = await getUserById(userId);

		if (!user) {
			return res.status(401).json('User not found.');
		} else {
			try {
				const existingNote = await getNoteByTitle(title);
				if (existingNote) {
					return res
						.status(400)
						.json('Seems like a note with this title already exists.');
				} else {
					try {
						const note = await createNote({
							title,
							text,
							postDate,
							file,
							categories,
							importance,
							owner: userId,
							status: 'new',
						});
						console.log(note);
						return res.status(201).json(note);
					} catch (error) {
						console.error('❌ Error while creating note: ', error);
						return res.status(500).json({
							message: 'Something went wrong, unfortunately note did not posted.',
						});
					}
				}
			} catch (error) {
				console.error('❌ Error while checking if note already exists: ', error);
				return res.status(500).json({ message: 'Something went wrong, try again later.' });
			}
		}
	} catch (error) {
		console.error('❌ Error while finding user: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later.' });
	}
};

export const viewUserNote = async (req: AuthenticatedRequest, res: Response) => {
	try {
		const userId = req.user.id;
		const user = await getUserById(userId);

		if (!user) {
			return res.status(401).json('User not found.');
		} else {
			try {
				const { id } = req.params;
				const note = await getNoteById(id);
				if (!note) {
					return res
						.status(404)
						.json(`Seems like there is no note with this ID for this user.`);
				} else {
					return res.status(200).json(note);
				}
			} catch (error) {
				console.error('❌ Error while finding user note: ', error);
				return res.status(500).json({ message: 'Something went wrong, try again later.' });
			}
		}
	} catch (error) {
		console.error('❌ Error while finding user: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later.' });
	}
};

export const updateUserNote = async (req: AuthenticatedRequest, res: Response) => {
	const { title, text } = req.body;

	if (!title || !text) return res.status(400).json('Please fill in all the required fields.');

	try {
		const userId = req.user.id;
		const user = await getUserById(userId);

		if (!user) {
			return res.status(401).json('User not found.');
		} else {
			try {
				const { id } = req.params;
				const updatedNote = await updateNoteById(id, req.body);
				return res.status(200).json(updatedNote);
			} catch (error) {
				console.error('❌ Error while updating user note: ', error);
				return res
					.status(500)
					.json({ message: 'Something went wrong, unfortunately note did not updated.' });
			}
		}
	} catch (error) {
		console.error('❌ Error while finding user: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later.' });
	}
};

export const getUserNotes = async (req: AuthenticatedRequest, res: Response) => {
	try {
		const userId = req.user.id;
		const user = await getUserById(userId);

		if (!user) {
			return res.status(401).json('User not found.');
		} else {
			try {
				const userNotes = await getNotes(userId);
				if (!userNotes)
					return res.status(404).json('Seems like there are no notes for this user.');
				else return res.status(200).json(userNotes);
			} catch (error) {
				console.error('❌ Error while finding user notes: ', error);
				return res.status(500).json({ message: 'Something went wrong, try again later.' });
			}
		}
	} catch (error) {
		console.error('❌ Error while finding user: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later.' });
	}
};

export const deleteUserNote = async (req: AuthenticatedRequest, res: Response) => {
	try {
		const userId = req.user.id;
		const user = await getUserById(userId);

		if (!user) {
			return res.status(401).json('User not found.');
		} else {
			try {
				const { id } = req.params;
				await deleteNote(id);
				return res.status(200).json('Note deleted.');
			} catch (error) {
				console.error('❌ Error while deleting user note: ', error);
				return res.status(500).json({ message: 'Something went wrong, try again later.' });
			}
		}
	} catch (error) {
		console.error('❌ Error while finding user: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later.' });
	}
};

export const deleteUserNotes = async (req: AuthenticatedRequest, res: Response) => {
	try {
		const userId = req.user.id;
		const user = await getUserById(userId);

		if (!user) {
			return res.status(401).json('User not found.');
		} else {
			try {
				await deleteNotes(userId);
				return res.status(200).json('All user notes deleted.');
			} catch (error) {
				console.error('❌ Error while deleting all user notes: ', error);
				return res.status(500).json({ message: 'Something went wrong, try again later.' });
			}
		}
	} catch (error) {
		console.error('❌ Error while finding user: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later.' });
	}
};
