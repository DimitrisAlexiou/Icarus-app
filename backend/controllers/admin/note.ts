import { Request, Response } from 'express';
import { getAllNotes, deleteAllNotes } from '../../models/note';

export const getAllUsersNotes = async (_: Request, res: Response) => {
	try {
		const notes = await getAllNotes();
		if (!notes) return res.status(404).json('Seems like there are no notes.');
		else return res.status(200).json(notes);
	} catch (error) {
		console.error('❌ Error while finding notes: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later.' });
	}
};

export const deleteAllUsersNotes = async (_: Request, res: Response) => {
	try {
		await deleteAllNotes();
		return res.status(200).json('All notes deleted.');
	} catch (error) {
		console.error('❌ Error while deleting all notes: ', error);
		return res.status(500).json({ message: 'Something went wrong, try again later.' });
	}
};
