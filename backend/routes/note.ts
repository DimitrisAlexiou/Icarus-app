import express from 'express';
import {
	getUserNotes,
	viewUserNote,
	createUserNote,
	updateUserNote,
	deleteUserNote,
	deleteUserNotes,
} from '../controllers/note';
import { validateNote } from '../middleware/validations';
import { authorize, isOwner } from '../middleware/authMiddleware';
import { noteFileUpload } from '../utils/multer/noteFileUpload';

export default (router: express.Router) => {
	// @desc    Get / Post / Delete User Notes
	// @route   GET/POST/DELETE /api/note
	// @access  Private
	router
		.route('/note')
		.get(authorize, isOwner, getUserNotes)
		.post(authorize, noteFileUpload.single('file'), validateNote, createUserNote)
		.delete(authorize, isOwner, deleteUserNotes);

	// @desc    Get / Update / Delete User Note by ID
	// @route   GET/PUT/DELETE /api/note/:id
	// @access  Private
	router
		.route('/note/:id')
		.get(authorize, isOwner, viewUserNote)
		.put(authorize, isOwner, noteFileUpload.single('file'), validateNote, updateUserNote)
		.delete(authorize, isOwner, deleteUserNote);

	router.route('/note/:id/importance').patch(authorize, isOwner, validateNote, updateUserNote);
};
